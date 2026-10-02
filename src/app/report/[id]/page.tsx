"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AnalysisReport, ReportFeedback, TendencyItem } from "@/types";
import { getCanonicalSampleReport } from "@/services/analysis/sample-reports";
import { LocalReportStore } from "@/services/storage/local-report-store";
import NinePalaceGrid from "@/components/chart/NinePalaceGrid";
import ReportFeedbackSection from "@/components/report/ReportFeedbackSection";
import {
  Compass,
  Bookmark,
  BookmarkCheck,
  Share2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Activity,
  Layers,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertCircle,
} from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id as string;

  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [expandedTendencies, setExpandedTendencies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      if (reportId === "sample") {
        const sample = await getCanonicalSampleReport();
        setReport(sample);
        setIsSaved(LocalReportStore.isReportSaved(sample.id));
      } else {
        const stored = LocalReportStore.getReportById(reportId);
        if (stored) {
          setReport(stored);
          setIsSaved(true);
        } else {
          // 若刷新后无数据，回退到示例报告并友好提示
          const fallback = await getCanonicalSampleReport();
          setReport({
            ...fallback,
            sampleLabel: "未找到指定本地记录，已为您呈现基准示例报告。",
          });
          setIsSaved(false);
        }
      }
      setLoading(false);
    }
    loadReport();
  }, [reportId]);

  const handleToggleSave = () => {
    if (!report) return;
    if (isSaved) {
      LocalReportStore.deleteReport(report.id);
      setIsSaved(false);
      triggerToast("已从本设备移除此报告");
    } else {
      LocalReportStore.saveReport(report);
      setIsSaved(true);
      triggerToast("已保存在本设备，可随时在「已存报告」查看");
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    triggerToast("分享链接已复制！仅呈现公开解读框架，不公开敏感出生原档。");
  };

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const toggleTendencyBasis = (id: string) => {
    setExpandedTendencies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFeedbackSaved = (feedback: ReportFeedback) => {
    if (!report) return;
    const updated = { ...report, userFeedback: feedback };
    setReport(updated);
    LocalReportStore.saveReport(updated);
    triggerToast("反馈已记入本份报告");
  };

  if (loading || !report) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-moss-800 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-ink-500">正在调取分析报告...</p>
      </div>
    );
  }

  const { birthProfile, chartResult } = report;

  return (
    <div className="space-y-8 pb-24 max-w-2xl mx-auto">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-moss-900 text-warm-50 text-xs px-4 py-2.5 rounded-full shadow-floating flex items-center space-x-2 animate-fadeIn">
          <CheckCircle className="w-3.5 h-3.5 text-champagne-300 flex-shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Banner if Sample */}
      {report.isSample && (
        <div className="p-3.5 rounded-xl bg-champagne-100/70 border border-champagne-300 text-xs text-champagne-900 flex items-start space-x-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-champagne-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block">【示例报告标注】</span>
            <p className="text-[11px] leading-relaxed">
              {report.sampleLabel || "示例命盘，非根据你的资料动态计算。仅供展示排盘体系与解读结构。"}
            </p>
          </div>
        </div>
      )}

      {/* Action Header: Save & Share */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 text-xs text-ink-500">
          <span className="px-2 py-0.5 rounded bg-warm-200 text-moss-900 font-medium">
            个人专属报告
          </span>
          <span>生成于 {report.createdAt}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleSave}
            className={`inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border transition ${
              isSaved
                ? "bg-moss-50 border-moss-600 text-moss-800 font-medium"
                : "bg-white border-warm-200 text-ink-700 hover:bg-warm-100"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-moss-700" />
                <span>已保存在此设备</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-ink-500" />
                <span>保存在此设备</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl border border-warm-200 bg-white text-ink-600 hover:bg-warm-100 transition"
            title="安全分享"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* A. 个人资料摘要 */}
      <section className="bg-white rounded-2xl border border-[#E5E0D2] p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-warm-200">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-moss-800" />
            <h2 className="font-serif font-bold text-base text-moss-900">
              A. 个人资料与排盘摘要
            </h2>
          </div>
          <span className="text-[11px] text-ink-400">
            {chartResult.engineMetadata.school}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
            <span className="text-[10px] text-ink-400 block mb-0.5">称呼</span>
            <span className="font-medium text-ink-800">
              {birthProfile.callsign || "未具名"}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
            <span className="text-[10px] text-ink-400 block mb-0.5">公历出生日期</span>
            <span className="font-semibold text-moss-900">
              {birthProfile.solarDate}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
            <span className="text-[10px] text-ink-400 block mb-0.5">出生时辰</span>
            <span className="font-semibold text-moss-900">
              {birthProfile.isTimeUnknown ? "时间不确定" : `${birthProfile.solarTime} (24H)`}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
            <span className="text-[10px] text-ink-400 block mb-0.5">出生城市及时区</span>
            <span className="font-medium text-ink-800 truncate block">
              {birthProfile.city} · {birthProfile.timezone.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF9F5] border border-warm-200 text-[11px] text-ink-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>四柱干支：{chartResult.fourPillars.year}年 {chartResult.fourPillars.month}月 {chartResult.fourPillars.day}日 {chartResult.fourPillars.hour}时</span>
            <span className="font-medium text-moss-800">{chartResult.juNumber}</span>
          </div>
          <div>时空校正说明：{chartResult.engineMetadata.timeAdjustmentNote}</div>
        </div>
      </section>

      {/* B. 一句话核心概括（表达内在矛盾） */}
      <section className="bg-moss-900 text-warm-50 rounded-2xl p-6 sm:p-7 shadow-floating relative overflow-hidden space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-champagne-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>B. 核心心智张力</span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-bold leading-relaxed tracking-wide text-[#FBFBF9]">
          “{report.coreContradiction}”
        </h3>

        <p className="text-xs text-warm-200/80 leading-relaxed pt-1">
          这并非宿命的缺陷，而是你为了适应成长环境所发展出的一套高敏捷应对策略。当环境变迁时，原本保护你的策略可能会转变为内在消耗。
        </p>
      </section>

      {/* C. 三个核心倾向 */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-moss-800" />
          <h2 className="font-serif font-bold text-base text-moss-900">
            C. 三个核心倾向与生活投射
          </h2>
        </div>

        <div className="space-y-3.5">
          {report.coreTendencies.map((tendency, idx) => {
            const isExpanded = expandedTendencies[tendency.id];
            return (
              <div
                key={tendency.id}
                className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-moss-50 border border-moss-200 text-moss-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-moss-900">
                      {tendency.title}
                    </h4>
                    <p className="text-xs text-ink-700 leading-relaxed">
                      {tendency.explanation}
                    </p>
                  </div>
                </div>

                {/* 生活表现 */}
                <div className="p-3 rounded-xl bg-warm-100/70 border border-warm-200 text-xs text-ink-700 leading-relaxed">
                  <strong className="text-moss-900">在生活中常见的表现：</strong>
                  <span>{tendency.manifestation}</span>
                </div>

                {/* 命盘依据展开 */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleTendencyBasis(tendency.id)}
                    className="flex items-center space-x-1.5 text-xs text-champagne-700 hover:text-champagne-800 font-medium"
                  >
                    <span>对应命盘依据：{tendency.chartBasis.palaceName}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3 rounded-xl bg-moss-50 border border-moss-200 text-xs text-ink-700 space-y-1 animate-fadeIn">
                      <div className="font-medium text-moss-900">
                        格局象征：{tendency.chartBasis.symbols}
                      </div>
                      <p className="text-[11px] leading-relaxed text-ink-600">
                        {tendency.chartBasis.symbolExplanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* 反思提问 */}
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-champagne-200/80 text-xs text-ink-800 space-y-1">
                  <span className="text-[11px] font-semibold text-champagne-800 flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 text-champagne-600" />
                    <span>供你核对的反思问题</span>
                  </span>
                  <p className="italic text-ink-700 leading-relaxed">
                    “{tendency.reflectionQuestion}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. 一个容易重复的模式 */}
      <section className="bg-white rounded-2xl border border-[#E5E0D2] p-5 sm:p-6 shadow-card space-y-3.5">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-moss-800" />
          <h2 className="font-serif font-bold text-base text-moss-900">
            D. 一个容易重复的行为模式
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-warm-100/70 border border-warm-200 space-y-2">
          <span className="font-serif font-bold text-sm text-moss-900 block">
            {report.repeatingPattern.title}
          </span>
          <p className="text-xs text-ink-700 leading-relaxed">
            {report.repeatingPattern.causalDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-[#FCFAF6] border border-warm-200 space-y-1">
            <span className="text-[10px] text-ink-500 block">主要影响领域</span>
            <span className="font-medium text-moss-900">{report.repeatingPattern.impactArea}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#FCFAF6] border border-warm-200 space-y-1">
            <span className="text-[10px] text-ink-500 block">觉察引爆点</span>
            <span className="font-medium text-moss-900">{report.repeatingPattern.awarenessTrigger}</span>
          </div>
        </div>
      </section>

      {/* E. 当前值得厘清的问题 */}
      <section className="bg-white rounded-2xl border border-[#E5E0D2] p-5 sm:p-6 shadow-card space-y-3.5">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-moss-800" />
          <h2 className="font-serif font-bold text-base text-moss-900">
            E. 当前值得进一步厘清的问题
          </h2>
        </div>

        <p className="text-xs text-ink-500">
          基于你选择的探索主题，以下问题有助于你将模糊的焦虑转化为具体的思考焦点：
        </p>

        <div className="space-y-2.5 pt-1">
          {report.focusQuestions.map((q, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-warm-50 border border-warm-200 text-xs text-ink-800 flex items-start space-x-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-warm-200 text-ink-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F. 一条可以尝试的小行动（微实验） */}
      <section className="bg-moss-50 border border-moss-200 rounded-2xl p-5 sm:p-6 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-champagne-600" />
            <h2 className="font-serif font-bold text-base text-moss-900">
              F. 一条可以尝试的小行动
            </h2>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-moss-200 text-moss-800 font-medium">
            {report.actionableExperiment.duration}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <h3 className="font-serif font-bold text-sm text-moss-900">
            {report.actionableExperiment.title}
          </h3>
          <p className="text-ink-700 leading-relaxed whitespace-pre-line">
            {report.actionableExperiment.description}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-moss-200 text-xs text-ink-600 space-y-1">
          <span className="font-semibold text-moss-900 block">预期收获：</span>
          <p className="text-[11px] leading-relaxed">
            {report.actionableExperiment.expectedOutcome}
          </p>
        </div>
      </section>

      {/* G. 互动奇门命盘（九宫格，支持展开与词典弹窗） */}
      <section className="space-y-2">
        <div className="flex items-center space-x-2 px-1">
          <Compass className="w-4 h-4 text-moss-800" />
          <h2 className="font-serif font-bold text-base text-moss-900">
            G. 互动命盘与客观词典
          </h2>
        </div>
        <NinePalaceGrid palaces={chartResult.palaces} />
      </section>

      {/* H. 用户反馈 */}
      <section className="space-y-2">
        <ReportFeedbackSection
          reportId={report.id}
          initialFeedback={report.userFeedback}
          onFeedbackSaved={handleFeedbackSaved}
        />
      </section>

      {/* I. 老师入口（内嵌式卡片） */}
      <section className="bg-gradient-to-br from-moss-900 to-moss-800 text-warm-50 rounded-2xl p-6 sm:p-8 shadow-floating space-y-4">
        <div className="space-y-2 max-w-lg">
          <span className="text-[11px] text-champagne-300 font-semibold tracking-wide">
            I. 深入解读会谈
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FBFBF9] leading-snug">
            想结合你的真实经历，把这个问题聊透？
          </h2>
          <p className="text-xs text-warm-200/90 leading-relaxed">
            老师将结合命盘与你的实际情况，进一步讨论这些模式出现的背景，以及你可以考虑的调整方向。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-champagne-500 text-moss-900 text-xs font-bold hover:bg-champagne-400 transition shadow-soft"
          >
            <span>预约老师深入解读</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-moss-700/80 text-warm-50 text-xs font-medium hover:bg-moss-700 transition border border-moss-600"
          >
            <span>查看老师介绍</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-moss-700/60 flex items-center justify-between text-[11px] text-warm-300/70">
          <span>会谈定价自 RM 220 起 · 支持 1 对 1 线上视频 / 语音</span>
          <span>不设恐吓断言 · 纯净探讨</span>
        </div>
      </section>

      {/* Mobile Sticky CTA bar (简洁避免遮挡) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-warm-200/80 shadow-card">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] text-ink-500 block">遇到卡点？</span>
            <span className="text-xs font-bold text-moss-900">与老师深入对话</span>
          </div>
          <Link
            href="/teachers"
            className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft flex-shrink-0"
          >
            <span>预约深入解读</span>
            <ArrowRight className="w-3 h-3 text-champagne-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

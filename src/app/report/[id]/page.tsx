"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnalysisReport, ReportFeedback } from "@/types";
import { getCanonicalSampleReport } from "@/services/analysis/sample-reports";
import { LocalReportStore } from "@/services/storage/local-report-store";
import NinePalaceGrid from "@/components/chart/NinePalaceGrid";
import ReportFeedbackSection from "@/components/report/ReportFeedbackSection";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Activity,
  Layers,
  User,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
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
      triggerToast("已从当前设备移除此报告");
    } else {
      LocalReportStore.saveReport(report);
      setIsSaved(true);
      triggerToast("已保存在本设备，可随时在「我的报告」查阅");
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
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#131513] border-t-[#C92A2A] animate-spin mx-auto" />
        <p className="text-xs font-mono text-[#767973]">正在调取分析报告...</p>
      </div>
    );
  }

  const { birthProfile, chartResult } = report;

  return (
    <div className="space-y-8 pb-28 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131513] text-white text-xs px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 animate-fadeIn font-medium border border-[#3E423A]">
          <CheckCircle className="w-3.5 h-3.5 text-[#C92A2A] flex-shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Banner if Sample */}
      {report.isSample && (
        <div className="p-4 rounded-2xl bg-[#C92A2A]/10 border border-[#C92A2A]/30 text-xs text-[#131513] flex items-start space-x-3 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-[#C92A2A] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[#C92A2A] block">【示例报告标注】</span>
            <p className="text-[11px] leading-relaxed text-[#454842]">
              {report.sampleLabel || "示例命盘，非根据你的资料动态计算。仅供展示排盘体系与解读结构。"}
            </p>
          </div>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E1DA] pb-4">
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono tracking-widest text-[#C92A2A] font-bold uppercase">
            PERSONAL ORACULAR REPORT · 观己命盘
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#131513]">
            {birthProfile.callsign ? `${birthProfile.callsign} 的命盘认知报告` : "个人专属命盘分析报告"}
          </h1>
          <span className="text-[10px] font-mono text-[#868A82]">
            生成日期：{report.createdAt} · 编号：{report.id}
          </span>
        </div>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            onClick={handleToggleSave}
            className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition ${
              isSaved
                ? "bg-[#C92A2A] border-[#C92A2A] text-white"
                : "bg-white border-[#D5D4CC] text-[#131513] hover:border-[#C92A2A]"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-white" />
                <span>已存本设备</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-[#868A82]" />
                <span>存至此设备</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full border border-[#D5D4CC] bg-white flex items-center justify-center text-[#111211] hover:border-black transition"
            title="安全分享"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* A. 个人资料摘要 */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-5 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE9E1]">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-[#111211]" />
            <h2 className="text-lg font-black text-[#111211]">
              A. 个人资料与排盘摘要
            </h2>
          </div>
          <span className="text-xs font-mono text-[#767973]">
            {chartResult.engineMetadata.school}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
            <span className="text-[10px] text-[#767973] uppercase block mb-1">称呼</span>
            <span className="font-bold text-[#111211]">
              {birthProfile.callsign || "未具名"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
            <span className="text-[10px] text-[#767973] uppercase block mb-1">公历出生日期</span>
            <span className="font-black text-[#111211]">
              {birthProfile.solarDate}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
            <span className="text-[10px] text-[#767973] uppercase block mb-1">出生时间 (24H)</span>
            <span className="font-black text-[#111211]">
              {birthProfile.isTimeUnknown ? "时间未定" : `${birthProfile.solarTime}`}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
            <span className="text-[10px] text-[#767973] uppercase block mb-1">城市与时区</span>
            <span className="font-bold text-[#111211] truncate block">
              {birthProfile.city} · {birthProfile.timezone.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE9E1] text-[11px] font-mono text-[#5C6057] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE9E1] pb-2">
            <span className="font-bold text-[#131513]">
              四柱干支：{chartResult.fourPillars.year}年 {chartResult.fourPillars.month}月 {chartResult.fourPillars.day}日 {chartResult.fourPillars.hour}
              {chartResult.fourPillars.hour !== "时柱未定" && !chartResult.fourPillars.hour.endsWith("时") ? "时" : ""}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#131513] text-[#FAF8F2] font-serif font-bold text-xs">
              {chartResult.juNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#454942]">
            <div>农历交节：{chartResult.lunarDateFormatted}</div>
            <div>领袖首领：{chartResult.zhiFu} · {chartResult.zhiShi}</div>
            <div>空亡位：{chartResult.kongWang?.join("、") || "无"}</div>
            <div>驿马位：{chartResult.yiMa || "无"}</div>
          </div>

          <div className="pt-1 text-[10px] text-[#8C9087] border-t border-[#F0EFE8]">
            校正说明：{chartResult.engineMetadata.timeAdjustmentNote}
          </div>
        </div>
      </section>

      {/* B. 一句话核心概括 */}
      <section className="bg-[#131513] text-white rounded-3xl p-7 sm:p-10 shadow-2xl space-y-4 relative overflow-hidden border border-[#2A2D27]">
        <div className="inline-flex items-center space-x-2 text-[#C92A2A] text-xs font-mono font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#C92A2A]" />
          <span>B. 核心心智张力 / CORE CONTRADICTION</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white leading-relaxed tracking-wide">
          “{report.coreContradiction}”
        </h3>

        <p className="text-xs text-[#A2A69D] leading-relaxed max-w-2xl pt-1">
          这并非宿命的缺陷，而是你在成长中发展出的一套高敏捷适应策略。随着环境的变迁，原本保护你的策略可能会转化为内在消耗。
        </p>
      </section>

      {/* C. 三个核心倾向 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E1DA] pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#C92A2A]" />
            <h2 className="text-lg font-black text-[#131513]">
              C. 三个核心倾向与生活表现
            </h2>
          </div>
          <span className="text-xs font-mono text-[#767973]">[ 01 / 02 / 03 ]</span>
        </div>

        <div className="space-y-4">
          {report.coreTendencies.map((tendency, idx) => {
            const isExpanded = expandedTendencies[tendency.id];
            return (
              <div
                key={tendency.id}
                className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white"
              >
                <div className="flex items-start space-x-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#131513] text-[#FAF8F2] font-mono text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#3E423A]">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-base sm:text-lg font-black text-[#131513]">
                      {tendency.title}
                    </h4>
                    <p className="text-xs text-[#454842] leading-relaxed">
                      {tendency.explanation}
                    </p>
                  </div>
                </div>

                {/* 生活表现 */}
                <div className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] text-xs text-[#2A2D28] leading-relaxed space-y-1">
                  <span className="font-bold text-[#131513] block">在生活中常见的表现：</span>
                  <p>{tendency.manifestation}</p>
                </div>

                {/* 命盘依据展开 */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleTendencyBasis(tendency.id)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C92A2A] hover:text-[#9B1C1C]"
                  >
                    <span>对应命盘依据：{tendency.chartBasis.palaceName}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-2xl bg-[#131513] text-white text-xs space-y-1.5 animate-fadeIn border border-[#2D3028]">
                      <div className="font-bold text-[#D4AF37] text-xs">
                        格局象征：{tendency.chartBasis.symbols}
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#D2D6CC]">
                        {tendency.chartBasis.symbolExplanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* 反思提问 */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] text-xs space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-[#131513] flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 text-[#C92A2A]" />
                    <span>供你核对的反思问题</span>
                  </span>
                  <p className="italic text-[#353833] text-xs sm:text-sm leading-relaxed">
                    “{tendency.reflectionQuestion}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. 一个容易重复的模式 */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-5 bg-white">
        <div className="flex items-center space-x-2 border-b border-[#EAE9E1] pb-3">
          <Activity className="w-4 h-4 text-[#C92A2A]" />
          <h2 className="text-lg font-black text-[#131513]">
            D. 一个容易重复的行为模式
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] space-y-2">
          <span className="font-black text-base text-[#131513] block">
            {report.repeatingPattern.title}
          </span>
          <p className="text-xs text-[#353833] leading-relaxed">
            {report.repeatingPattern.causalDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
            <span className="text-[10px] text-[#767973] uppercase font-bold block">主要影响领域</span>
            <span className="font-bold text-[#131513] block">{report.repeatingPattern.impactArea}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
            <span className="text-[10px] text-[#767973] uppercase font-bold block">觉察引爆点</span>
            <span className="font-bold text-[#131513] block">{report.repeatingPattern.awarenessTrigger}</span>
          </div>
        </div>
      </section>

      {/* E. 当前值得厘清的问题 */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white">
        <div className="flex items-center space-x-2 border-b border-[#EAE9E1] pb-3">
          <HelpCircle className="w-4 h-4 text-[#C92A2A]" />
          <h2 className="text-lg font-black text-[#131513]">
            E. 当前值得进一步厘清的问题
          </h2>
        </div>

        <div className="space-y-3">
          {report.focusQuestions.map((q, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] text-xs text-[#131513] flex items-start space-x-3"
            >
              <span className="font-mono text-xs font-black text-[#C92A2A] flex-shrink-0 mt-0.5">
                0{i + 1}.
              </span>
              <p className="leading-relaxed font-medium">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F. 一条可以尝试的小行动 (松石翠墨东方雅韵) */}
      <section className="rounded-3xl p-6 sm:p-8 shadow-card space-y-4 bg-[#0C5A43] text-white border border-[#147053]">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-widest font-black uppercase text-[#D4AF37]">
              TAKEAWAY EXPERIMENT · 践行觉察
            </span>
            <h2 className="text-xl font-black text-white">
              F. 一条可以尝试的小行动
            </h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#C92A2A] text-white font-bold">
            {report.actionableExperiment.duration}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <h3 className="text-base font-black text-[#FAF8F2]">
            {report.actionableExperiment.title}
          </h3>
          <p className="leading-relaxed whitespace-pre-line text-[#E0EFEA]">
            {report.actionableExperiment.description}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#084030] text-xs text-[#E0EFEA] space-y-1 border border-[#147053]">
          <span className="font-bold text-[#FAF8F2] block">预期收获：</span>
          <p className="text-[11px] leading-relaxed text-[#B7D8CE]">
            {report.actionableExperiment.expectedOutcome}
          </p>
        </div>
      </section>

      {/* G. 互动奇门九宫格 */}
      <section className="space-y-2">
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

      {/* I. 老师深入解读入口 */}
      <section className="rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 bg-[#131513] text-white relative overflow-hidden border border-[#2D3028]">
        <div className="space-y-3 max-w-xl">
          <span className="text-[10px] font-mono tracking-widest text-[#C92A2A] font-bold uppercase">
            CONCIERGE DIALOGUE · 导师深谈
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
            想结合你的真实经历，把这个问题聊透？
          </h2>
          <p className="text-xs sm:text-sm text-[#A2A69D] leading-relaxed">
            老师将结合命盘与你的实际情况，进一步讨论这些模式出现的背景，以及你可以考虑的调整方向。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href="/teachers"
            className="btn-cinnabar inline-flex items-center justify-center space-x-2 px-8 py-4 text-xs font-bold uppercase shadow-lg"
          >
            <span>预约老师深入解读</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#262824] text-white text-xs font-bold hover:bg-[#323630] transition border border-[#3E423A]"
          >
            <span>查看老师介绍</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#262824] flex flex-wrap items-center justify-between text-[11px] text-[#868A81] gap-2">
          <span>· 会谈单次 RM 220 起 · 1 对 1 线上视频 / 语音</span>
          <span>· 不设恐吓断言 · 纯净探讨</span>
        </div>
      </section>

      {/* Mobile Sticky CTA bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#FAF8F2]/95 backdrop-blur-md border-t border-[#E2E1DA]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] text-[#767973] uppercase font-bold block">1-ON-1 CONSULTATION</span>
            <span className="text-xs font-black text-[#131513]">与老师深入对话</span>
          </div>
          <Link
            href="/teachers"
            className="btn-cinnabar inline-flex items-center space-x-1 px-5 py-2.5 text-xs font-bold"
          >
            <span>预约解读</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
      triggerToast("已保存在本设备，可随时在「档案库」查阅");
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
      <div className="py-24 text-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-editorial-950 border-t-gold-500 animate-spin mx-auto" />
        <p className="font-mono text-xs uppercase text-editorial-500 tracking-widest">
          CURATING REPORT DOSSIER...
        </p>
      </div>
    );
  }

  const { birthProfile, chartResult } = report;

  return (
    <div className="space-y-10 pb-28 max-w-3xl mx-auto">
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-editorial-950 text-gold-200 text-xs px-5 py-3 rounded-full shadow-haute border border-editorial-800 flex items-center space-x-2 animate-fadeIn font-mono">
          <CheckCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Banner if Sample */}
      {report.isSample && (
        <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-xs text-gold-900 flex items-start space-x-3 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold font-mono text-[11px] uppercase block tracking-wider">
              [ SAMPLE REPORT EXHIBIT / 示例报告标注 ]
            </span>
            <p className="text-[11px] leading-relaxed text-gold-950">
              {report.sampleLabel || "示例命盘，非根据你的资料动态计算。仅供展示排盘体系与解读结构。"}
            </p>
          </div>
        </div>
      )}

      {/* Editorial Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-canvas-200 pb-4">
        <div className="space-y-0.5">
          <div className="editorial-tag text-gold-700">PERSONAL METAPHYSICAL DOSSIER</div>
          <h1 className="font-serif text-2xl sm:text-3xl text-editorial-950 font-normal">
            {birthProfile.callsign ? `${birthProfile.callsign} 的认知镜像报告` : "个人专属命盘分析报告"}
          </h1>
          <span className="text-[10px] font-mono text-editorial-400 uppercase">
            ARCHIVED ON {report.createdAt} · ID: {report.id}
          </span>
        </div>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            onClick={handleToggleSave}
            className={`inline-flex items-center space-x-1.5 text-xs font-mono uppercase px-4 py-2 rounded-full border transition ${
              isSaved
                ? "bg-editorial-950 border-editorial-950 text-gold-200 font-bold"
                : "bg-white border-canvas-300 text-editorial-700 hover:border-gold-600"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>已存本设备</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-editorial-400" />
                <span>存至此设备</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full border border-canvas-300 bg-white flex items-center justify-center text-editorial-700 hover:border-gold-600 transition"
            title="安全分享"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* A. 个人资料摘要 (Architectural Grid) */}
      <section className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-5 border border-canvas-200">
        <div className="flex items-center justify-between pb-3 border-b border-canvas-200">
          <div className="space-y-0.5">
            <span className="editorial-tag text-gold-700">SECTION A · DOSSIER SUMMARY</span>
            <h2 className="font-serif font-bold text-lg text-editorial-950">
              个人资料与排盘摘要
            </h2>
          </div>
          <span className="font-mono text-[10px] text-editorial-500 uppercase">
            {chartResult.engineMetadata.school}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block mb-1">CALLSIGN / 称呼</span>
            <span className="font-semibold text-editorial-950">
              {birthProfile.callsign || "未具名"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block mb-1">SOLAR DATE / 日期</span>
            <span className="font-bold text-editorial-950 font-serif">
              {birthProfile.solarDate}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block mb-1">TIME (24H) / 时辰</span>
            <span className="font-bold text-editorial-950 font-serif">
              {birthProfile.isTimeUnknown ? "时间未定" : `${birthProfile.solarTime}`}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block mb-1">CITY / 城市时区</span>
            <span className="font-medium text-editorial-950 truncate block">
              {birthProfile.city} · {birthProfile.timezone.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-canvas-200 text-[11px] font-mono text-editorial-600 space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>四柱：{chartResult.fourPillars.year}年 {chartResult.fourPillars.month}月 {chartResult.fourPillars.day}日 {chartResult.fourPillars.hour}时</span>
            <span className="font-bold text-gold-800">{chartResult.juNumber}</span>
          </div>
          <div className="text-[10px] text-editorial-400">
            时空校正：{chartResult.engineMetadata.timeAdjustmentNote}
          </div>
        </div>
      </section>

      {/* B. 一句话核心概括 (Haute Couture Obsidian Card) */}
      <section className="bg-editorial-950 text-gold-100 rounded-3xl p-7 sm:p-10 shadow-haute relative overflow-hidden space-y-4 border border-editorial-800">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="editorial-tag text-gold-400">
          SECTION B · CORE COGNITIVE TENSION / 内在张力
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-canvas-pure font-normal leading-relaxed tracking-wide">
          “{report.coreContradiction}”
        </h3>

        <p className="text-xs text-canvas-300 leading-relaxed max-w-2xl pt-1">
          这并非命运的瑕疵，而是你在成长中发展出的一套高适应策略。随着生活周期的演进，昔日的铠甲有时会在新阶段带来不必要的耗能。
        </p>
      </section>

      {/* C. 三个核心倾向 */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-canvas-200 pb-3">
          <div className="space-y-0.5">
            <span className="editorial-tag text-gold-700">SECTION C · BEHAVIORAL TENDENCIES</span>
            <h2 className="font-serif font-bold text-xl text-editorial-950">
              三个核心倾向与生活投射
            </h2>
          </div>
          <span className="font-mono text-xs text-editorial-400">[ 01 / 02 / 03 ]</span>
        </div>

        <div className="space-y-4">
          {report.coreTendencies.map((tendency, idx) => {
            const isExpanded = expandedTendencies[tendency.id];
            return (
              <div
                key={tendency.id}
                className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-4 border border-canvas-200"
              >
                <div className="flex items-start space-x-4">
                  <span className="font-mono text-sm font-bold text-gold-700 border-b border-gold-400 pb-0.5">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-editorial-950">
                      {tendency.title}
                    </h4>
                    <p className="text-xs text-editorial-700 leading-relaxed">
                      {tendency.explanation}
                    </p>
                  </div>
                </div>

                {/* 生活表现 */}
                <div className="p-4 rounded-2xl bg-canvas-100/60 border border-canvas-200 text-xs text-editorial-800 leading-relaxed space-y-1">
                  <span className="font-mono text-[10px] text-editorial-500 uppercase block">MANIFESTATION IN LIFE / 生活表现</span>
                  <p>{tendency.manifestation}</p>
                </div>

                {/* 命盘依据展开 */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleTendencyBasis(tendency.id)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-gold-800 hover:text-gold-900 font-semibold"
                  >
                    <span>CELESTIAL RATIONALE: {tendency.chartBasis.palaceName}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-2xl bg-editorial-950 text-gold-100 border border-editorial-800 text-xs space-y-1.5 animate-fadeIn">
                      <div className="font-mono font-bold text-gold-400 text-xs">
                        配置象意：{tendency.chartBasis.symbols}
                      </div>
                      <p className="text-[11px] leading-relaxed text-canvas-300">
                        {tendency.chartBasis.symbolExplanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* 反思提问 */}
                <div className="p-4 rounded-2xl bg-white border border-canvas-200 text-xs text-editorial-900 space-y-1 shadow-gallery">
                  <span className="editorial-tag text-gold-700 block">
                    INQUIRY PROMPT / 供你核对的反思提问
                  </span>
                  <p className="italic font-serif text-editorial-900 text-xs sm:text-sm leading-relaxed">
                    “{tendency.reflectionQuestion}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. 一个容易重复的模式 */}
      <section className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-5 border border-canvas-200">
        <div className="space-y-0.5 border-b border-canvas-200 pb-3">
          <span className="editorial-tag text-gold-700">SECTION D · RECURSIVE PATTERN</span>
          <h2 className="font-serif font-bold text-xl text-editorial-950">
            容易重复的行为因果模式
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-canvas-100/70 border border-canvas-200 space-y-2">
          <span className="font-serif font-bold text-base text-editorial-950 block">
            {report.repeatingPattern.title}
          </span>
          <p className="text-xs text-editorial-700 leading-relaxed">
            {report.repeatingPattern.causalDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
            <span className="editorial-tag text-editorial-400">IMPACT DOMAIN / 影响领域</span>
            <span className="font-medium text-editorial-950 block">{report.repeatingPattern.impactArea}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
            <span className="editorial-tag text-gold-700">AWARENESS TRIGGER / 觉察触发点</span>
            <span className="font-medium text-editorial-950 block">{report.repeatingPattern.awarenessTrigger}</span>
          </div>
        </div>
      </section>

      {/* E. 当前值得厘清的问题 */}
      <section className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-5 border border-canvas-200">
        <div className="space-y-0.5 border-b border-canvas-200 pb-3">
          <span className="editorial-tag text-gold-700">SECTION E · CLARIFICATION</span>
          <h2 className="font-serif font-bold text-xl text-editorial-950">
            当前值得进一步厘清的问题
          </h2>
        </div>

        <div className="space-y-3">
          {report.focusQuestions.map((q, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-canvas-100/60 border border-canvas-200 text-xs text-editorial-900 flex items-start space-x-3"
            >
              <span className="font-mono text-xs font-bold text-gold-700 flex-shrink-0 mt-0.5">
                [0{i + 1}]
              </span>
              <p className="leading-relaxed font-sans">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F. 一条可以尝试的小行动 (48h Experiment) */}
      <section className="rounded-3xl p-6 sm:p-8 shadow-haute space-y-4 bg-gold-50/70 border border-gold-200">
        <div className="flex items-center justify-between border-b border-gold-200 pb-3">
          <div className="space-y-0.5">
            <span className="editorial-tag text-gold-800">SECTION F · TANGIBLE MICRO-ACTION</span>
            <h2 className="font-serif font-bold text-xl text-editorial-950">
              一条可以尝试的小行动
            </h2>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-gold-200 text-gold-900 font-bold uppercase">
            {report.actionableExperiment.duration}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <h3 className="font-serif font-bold text-base text-editorial-950">
            {report.actionableExperiment.title}
          </h3>
          <p className="text-editorial-800 leading-relaxed whitespace-pre-line">
            {report.actionableExperiment.description}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gold-200 text-xs text-editorial-700 space-y-1 shadow-gallery">
          <span className="editorial-tag text-gold-800">EXPECTED OUTCOME / 预期收获</span>
          <p className="text-[11px] leading-relaxed">
            {report.actionableExperiment.expectedOutcome}
          </p>
        </div>
      </section>

      {/* G. 互动奇门九宫格 */}
      <section className="space-y-3">
        <div className="editorial-tag text-gold-700 px-1">
          SECTION G · CHRONO MATRIX & GLOSSARY
        </div>
        <NinePalaceGrid palaces={chartResult.palaces} />
      </section>

      {/* H. 用户反馈 */}
      <section className="space-y-3">
        <div className="editorial-tag text-gold-700 px-1">
          SECTION H · DIALOGUE ATTRIBUTION
        </div>
        <ReportFeedbackSection
          reportId={report.id}
          initialFeedback={report.userFeedback}
          onFeedbackSaved={handleFeedbackSaved}
        />
      </section>

      {/* I. 老师深入解读入口 */}
      <section className="rounded-3xl p-8 sm:p-12 shadow-haute space-y-6 bg-editorial-950 text-gold-100 border border-editorial-800 relative overflow-hidden">
        <div className="space-y-3 max-w-xl">
          <span className="editorial-tag text-gold-400">
            SECTION I · CONCIERGE DIALOGUE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-canvas-pure font-normal leading-snug">
            想结合你的真实经历，把这个问题聊透？
          </h2>
          <p className="text-xs sm:text-sm text-canvas-300 leading-relaxed">
            老师将结合命盘与你的实际情况，进一步讨论这些模式出现的背景，以及你可以考虑的调整方向。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href="/teachers"
            className="btn-haute inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-gold-500 text-editorial-950 text-xs font-mono font-bold uppercase hover:bg-gold-400 transition"
          >
            <span>预约老师深入解读</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-editorial-900 text-canvas-200 text-xs font-mono uppercase hover:bg-editorial-800 transition border border-editorial-700"
          >
            <span>查看老师介绍 / DIRECTORY</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-editorial-800 flex flex-wrap items-center justify-between text-[10px] font-mono text-canvas-400 gap-2">
          <span>· 会谈定价自 RM 220 起 · 1-ON-1 线上会晤</span>
          <span>· 拒绝恐吓性预测 · 深度陪伴探讨</span>
        </div>
      </section>

      {/* Mobile Sticky CTA bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#FAF7EE]/95 backdrop-blur-xl border-t border-canvas-200 shadow-haute">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="font-mono text-[9px] text-editorial-400 uppercase block">1-ON-1 ATELIER</span>
            <span className="font-serif text-xs font-bold text-editorial-950">与老师深入对话</span>
          </div>
          <Link
            href="/teachers"
            className="btn-haute inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-editorial-950 text-gold-300 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition flex-shrink-0"
          >
            <span>预约解读</span>
            <ArrowUpRight className="w-3 h-3 text-gold-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

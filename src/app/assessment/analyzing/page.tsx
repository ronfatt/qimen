"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BirthProfile } from "@/types";
import { dynamicChartEngine } from "@/services/chart/dynamic-qimen-engine";
import { defaultAnalysisProvider } from "@/services/analysis/structured-rule-analysis";
import { LocalReportStore } from "@/services/storage/local-report-store";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type ProcessingStage = "validating" | "calculating_chart" | "analyzing" | "completed" | "error";

export default function AnalyzingPage() {
  const router = useRouter();
  const [stage, setStage] = useState<ProcessingStage>("validating");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function runAnalysisPipeline() {
      try {
        const raw = sessionStorage.getItem("guanji_assessment_draft");
        if (!raw) {
          throw new Error("未读取到填写的出生资料，请返回重新填写。");
        }

        const profile: BirthProfile = JSON.parse(raw);

        // 阶段 1：真实资料校验
        setStage("validating");
        const valRes = dynamicChartEngine.validateProfile(profile);
        if (!valRes.valid) {
          throw new Error(valRes.error || "出生资料校验失败");
        }

        await new Promise((r) => setTimeout(r, 450));
        if (!isMounted) return;

        // 阶段 2：排盘演算
        setStage("calculating_chart");
        const chart = await dynamicChartEngine.calculateChart(profile);

        await new Promise((r) => setTimeout(r, 550));
        if (!isMounted) return;

        // 阶段 3：分析整理
        setStage("analyzing");
        const report = await defaultAnalysisProvider.generateReport(profile, chart);

        await new Promise((r) => setTimeout(r, 450));
        if (!isMounted) return;

        LocalReportStore.saveReport(report);
        setStage("completed");
        router.push(`/report/${report.id}`);
      } catch (err: any) {
        if (!isMounted) return;
        setStage("error");
        setErrorMessage(err.message || "生成报告时发生未知异常，已保留您的输入资料。");
      }
    }

    runAnalysisPipeline();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-8 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#111211]">
          {stage === "error" ? "计算中断" : "正在生成命盘与认知梳理"}
        </h2>
        <p className="text-xs text-[#767973]">
          按照标准规则严格校准时空参数 · 绝无虚假等待动画
        </p>
      </div>

      {stage !== "error" ? (
        <div className="clean-card p-7 shadow-card space-y-5 text-left bg-white">
          {/* Stage 1 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "validating" ? (
              <Loader2 className="w-5 h-5 text-[#111211] animate-spin flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#111211] flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className={`font-bold text-sm ${stage === "validating" ? "text-[#111211]" : "text-[#5C6057]"}`}>
                01. 校验出生时空与经纬度时区
              </span>
              <p className="text-[10px] text-[#868A82]">公历日期与真太阳时天文校准</p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "calculating_chart" ? (
              <Loader2 className="w-5 h-5 text-[#111211] animate-spin flex-shrink-0" />
            ) : stage === "validating" ? (
              <div className="w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#111211] flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-bold text-sm ${
                  stage === "calculating_chart"
                    ? "text-[#111211]"
                    : stage === "validating"
                    ? "text-neutral-400"
                    : "text-[#5C6057]"
                }`}
              >
                02. 演化奇门命盘结构（转盘局）
              </span>
              <p className="text-[10px] text-[#868A82]">九宫星、门、神、干方位排定</p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "analyzing" || stage === "completed" ? (
              stage === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-[#111211] flex-shrink-0" />
              ) : (
                <Loader2 className="w-5 h-5 text-[#111211] animate-spin flex-shrink-0" />
              )
            ) : (
              <div className="w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-bold text-sm ${
                  stage === "analyzing"
                    ? "text-[#111211]"
                    : stage === "completed"
                    ? "text-[#5C6057]"
                    : "text-neutral-400"
                }`}
              >
                03. 整理心智倾向、因果模式与微实验
              </span>
              <p className="text-[10px] text-[#868A82]">结合选择主题，提炼客观反思视点</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="clean-card border-red-200 p-6 sm:p-7 shadow-card space-y-4 text-left bg-white">
          <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>未能完成处理</span>
          </div>
          <p className="text-xs text-[#353833] leading-relaxed bg-red-50 p-4 rounded-2xl border border-red-100">
            {errorMessage}
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => router.push("/assessment")}
              className="flex-1 py-3 rounded-full border border-[#D5D4CC] text-xs font-bold text-[#111211] hover:bg-[#FAF9F5] transition"
            >
              返回检查资料
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-dark flex-1 py-3 text-xs font-bold"
            >
              重试演算
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

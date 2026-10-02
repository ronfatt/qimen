"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BirthProfile } from "@/types";
import { defaultChartEngine } from "@/services/chart/sample-chart-engine";
import { defaultAnalysisProvider } from "@/services/analysis/structured-rule-analysis";
import { LocalReportStore } from "@/services/storage/local-report-store";
import { CheckCircle2, Loader2, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

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
        const valRes = defaultChartEngine.validateProfile(profile);
        if (!valRes.valid) {
          throw new Error(valRes.error || "出生资料校验失败");
        }

        await new Promise((r) => setTimeout(r, 450));
        if (!isMounted) return;

        // 阶段 2：排盘演算
        setStage("calculating_chart");
        const chart = await defaultChartEngine.calculateChart(profile);

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
        <div className="editorial-tag text-gold-700">
          CURATORIAL COMPUTATION ENGINE
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-editorial-950">
          {stage === "error" ? "计算中断" : "正在生成命盘与认知图谱"}
        </h2>
        <p className="text-xs text-editorial-600 font-mono">
          按照标准规则严格校准时空参数 · 绝无虚假等待动画
        </p>
      </div>

      {stage !== "error" ? (
        <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-5 text-left border border-canvas-200">
          {/* Stage 1 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "validating" ? (
              <Loader2 className="w-4 h-4 text-gold-600 animate-spin flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-editorial-950 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className={`font-mono uppercase ${stage === "validating" ? "text-editorial-950 font-bold" : "text-editorial-700"}`}>
                01. 校验出生时空与经纬度时区
              </span>
              <p className="text-[10px] text-editorial-500 font-mono">
                SOLAR DATE & TRUE SOLAR TIME CALIBRATION
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "calculating_chart" ? (
              <Loader2 className="w-4 h-4 text-gold-600 animate-spin flex-shrink-0" />
            ) : stage === "validating" ? (
              <div className="w-4 h-4 rounded-full border border-canvas-300 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-editorial-950 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-mono uppercase ${
                  stage === "calculating_chart"
                    ? "text-editorial-950 font-bold"
                    : stage === "validating"
                    ? "text-editorial-400"
                    : "text-editorial-700"
                }`}
              >
                02. 演化奇门命盘结构 (转盘局)
              </span>
              <p className="text-[10px] text-editorial-500 font-mono">
                PALACE MATRIX & CELESTIAL DEITIES DERIVATION
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="flex items-center space-x-3.5 text-xs">
            {stage === "analyzing" || stage === "completed" ? (
              stage === "completed" ? (
                <CheckCircle2 className="w-4 h-4 text-editorial-950 flex-shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-gold-600 animate-spin flex-shrink-0" />
              )
            ) : (
              <div className="w-4 h-4 rounded-full border border-canvas-300 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-mono uppercase ${
                  stage === "analyzing"
                    ? "text-editorial-950 font-bold"
                    : stage === "completed"
                    ? "text-editorial-700"
                    : "text-editorial-400"
                }`}
              >
                03. 整理心智倾向、因果模式与微实验
              </span>
              <p className="text-[10px] text-editorial-500 font-mono">
                COGNITIVE MIRROR & EXPERIMENT SYNTHESIS
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="gallery-card rounded-3xl border border-red-200 p-6 sm:p-7 shadow-haute space-y-4 text-left">
          <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>未能完成处理</span>
          </div>
          <p className="text-xs text-editorial-700 leading-relaxed bg-red-50 p-4 rounded-2xl border border-red-100">
            {errorMessage}
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => router.push("/assessment")}
              className="flex-1 py-3 rounded-full border border-canvas-300 text-xs font-mono uppercase text-editorial-800 hover:bg-canvas-100 transition"
            >
              返回检查资料
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono uppercase hover:bg-editorial-900 transition"
            >
              重试演算
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

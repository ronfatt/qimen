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
        // 读取草稿
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

        // 短暂过渡让用户看清真实处理
        await new Promise((r) => setTimeout(r, 400));
        if (!isMounted) return;

        // 阶段 2：排盘引擎演算
        setStage("calculating_chart");
        const chart = await defaultChartEngine.calculateChart(profile);

        await new Promise((r) => setTimeout(r, 500));
        if (!isMounted) return;

        // 阶段 3：心智倾向与模式整理分析
        setStage("analyzing");
        const report = await defaultAnalysisProvider.generateReport(profile, chart);

        await new Promise((r) => setTimeout(r, 400));
        if (!isMounted) return;

        // 保存至本地存储
        LocalReportStore.saveReport(report);

        setStage("completed");

        // 跳转至报告展示页
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
    <div className="max-w-md mx-auto py-12 px-4 space-y-8 text-center">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-moss-900">
          {stage === "error" ? "处理中断" : "正在生成命盘与认知梳理"}
        </h2>
        <p className="text-xs text-ink-500">
          按照标准规则严格校准时空参数，绝不使用虚假等待动画
        </p>
      </div>

      {stage !== "error" ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D2] p-6 shadow-card space-y-5 text-left">
          {/* Stage 1: Validation */}
          <div className="flex items-center space-x-3 text-xs">
            {stage === "validating" ? (
              <Loader2 className="w-4 h-4 text-moss-800 animate-spin flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-moss-700 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className={`font-medium ${stage === "validating" ? "text-moss-900 font-semibold" : "text-ink-700"}`}>
                校验出生资料与经纬度时区
              </span>
              <p className="text-[10px] text-ink-400">核对公历日期、24小时制时间及地域时差</p>
            </div>
          </div>

          {/* Stage 2: Chart generation */}
          <div className="flex items-center space-x-3 text-xs">
            {stage === "calculating_chart" ? (
              <Loader2 className="w-4 h-4 text-moss-800 animate-spin flex-shrink-0" />
            ) : stage === "validating" ? (
              <div className="w-4 h-4 rounded-full border border-warm-300 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-moss-700 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-medium ${
                  stage === "calculating_chart"
                    ? "text-moss-900 font-semibold"
                    : stage === "validating"
                    ? "text-ink-400"
                    : "text-ink-700"
                }`}
              >
                生成奇门命盘结构（转盘局）
              </span>
              <p className="text-[10px] text-ink-400">确定九宫干支、八神、九星与八门定位</p>
            </div>
          </div>

          {/* Stage 3: Compiling Analysis */}
          <div className="flex items-center space-x-3 text-xs">
            {stage === "analyzing" || stage === "completed" ? (
              stage === "completed" ? (
                <CheckCircle2 className="w-4 h-4 text-moss-700 flex-shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-moss-800 animate-spin flex-shrink-0" />
              )
            ) : (
              <div className="w-4 h-4 rounded-full border border-warm-300 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span
                className={`font-medium ${
                  stage === "analyzing"
                    ? "text-moss-900 font-semibold"
                    : stage === "completed"
                    ? "text-ink-700"
                    : "text-ink-400"
                }`}
              >
                整理心智倾向、因果模式与微实验
              </span>
              <p className="text-[10px] text-ink-400">结合选择主题，提炼客观反思视点</p>
            </div>
          </div>
        </div>
      ) : (
        /* Error handling */
        <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-card space-y-4 text-left">
          <div className="flex items-center space-x-2.5 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-semibold text-sm">未能完成处理</h3>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed bg-red-50 p-3 rounded-xl border border-red-100">
            {errorMessage}
          </p>
          <p className="text-[11px] text-ink-500">
            您的表单草稿已被安全保存在本设备，返回后无需重新输入全部字段。
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => router.push("/assessment")}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-xl border border-warm-300 text-xs font-medium text-ink-700 hover:bg-warm-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回检查资料</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重试演算</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

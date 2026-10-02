import { AnalysisReport } from "@/types";
import { defaultChartEngine } from "../chart/sample-chart-engine";
import { defaultAnalysisProvider } from "./structured-rule-analysis";

export async function getCanonicalSampleReport(): Promise<AnalysisReport> {
  const sampleProfile = {
    callsign: "林先生",
    solarDate: "1993-10-24",
    solarTime: "15:45",
    country: "马来西亚",
    city: "吉隆坡",
    timezone: "Asia/Kuala_Lumpur (UTC+8)",
    isTimeUnknown: false,
    focusTopic: "career_direction" as const,
    specificQuestion: "面对当前行业变动，是继续深耕原有管理架构，还是联合朋友尝试独立做新方向？",
    consentGiven: true,
  };

  const chart = await defaultChartEngine.calculateChart(sampleProfile);
  const report = await defaultAnalysisProvider.generateReport(sampleProfile, chart);
  
  return {
    ...report,
    id: "sample-canonical-report",
    isSample: true,
    sampleLabel: "【示例报告】基于 1993年10月24日 申时 吉隆坡出生基准命盘生成，仅作结构与解读样式参考",
  };
}

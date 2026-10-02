import { AnalysisReport, BirthProfile, ChartResult } from "@/types";

export interface IAnalysisProvider {
  /**
   * 解读服务标识
   */
  readonly id: string;

  /**
   * 服务名称
   */
  readonly name: string;

  /**
   * 生成分析报告
   * @param profile 用户出生与关注主题资料
   * @param chart 排盘引擎生成的结构化命盘（严禁大模型自行编造命盘符号）
   */
  generateReport(profile: BirthProfile, chart: ChartResult): Promise<AnalysisReport>;
}

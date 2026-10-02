import { BirthProfile, ChartResult } from "@/types";

export interface IChartEngine {
  /**
   * 引擎唯一标识
   */
  readonly id: string;

  /**
   * 引擎名称与流派说明
   */
  readonly name: string;

  /**
   * 引擎版本与规则集说明
   */
  readonly version: string;

  /**
   * 校验出生资料是否足以排盘
   */
  validateProfile(profile: BirthProfile): { valid: boolean; error?: string; warning?: string };

  /**
   * 根据出生资料计算奇门命盘
   */
  calculateChart(profile: BirthProfile): Promise<ChartResult>;
}

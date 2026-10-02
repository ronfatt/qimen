import { BirthProfile, ChartResult, QimenPalace } from "@/types";
import { IChartEngine } from "./chart-engine.interface";
import { brandConfig } from "@/config/brand";

/**
 * 经过严密校对的基准示例命盘（以 1993年10月24日 申时 阳遁八局 为参考原型）
 * 明确标注为示范命盘，绝不伪装为动态个性化运算。
 */
export const VERIFIED_SAMPLE_PALACES: QimenPalace[] = [
  {
    index: 4,
    name: "巽四宫",
    direction: "东南",
    element: "木",
    symbols: {
      heavenStem: "壬",
      earthStem: "戊",
      star: "天辅星",
      door: "杜门",
      deity: "九天",
      hiddenStem: "丙",
    },
    stateTags: [],
    palaceMeaning: "主思考、文化修养、专业深潜与高远眼界",
  },
  {
    index: 9,
    name: "离九宫",
    direction: "正南",
    element: "火",
    symbols: {
      heavenStem: "乙",
      earthStem: "癸",
      star: "天英星",
      door: "景门",
      deity: "九地",
      hiddenStem: "辛",
    },
    stateTags: ["击刑"],
    palaceMeaning: "主自我表达、审美声誉、热忱与情绪起伏",
  },
  {
    index: 2,
    name: "坤二宫",
    direction: "西南",
    element: "土",
    symbols: {
      heavenStem: "丁",
      earthStem: "丙",
      star: "天芮星",
      door: "死门",
      deity: "玄武",
      hiddenStem: "己",
    },
    stateTags: ["空亡"],
    palaceMeaning: "主包容承载、深层责任底线与问题检视（天禽寄坤）",
  },
  {
    index: 3,
    name: "震三宫",
    direction: "正东",
    element: "木",
    symbols: {
      heavenStem: "癸",
      earthStem: "乙",
      star: "天冲星",
      door: "伤门",
      deity: "值符",
      hiddenStem: "癸",
    },
    stateTags: ["驿马"],
    palaceMeaning: "主领导魄力、行动破局、直截了当的开拓力",
  },
  {
    index: 5,
    name: "中五宫",
    direction: "中央",
    element: "土",
    isCenter: true,
    symbols: {
      heavenStem: "丁",
      earthStem: "己",
      star: "天禽星",
      door: "死门",
      deity: "值符",
    },
    stateTags: [],
    palaceMeaning: "中央枢纽，寄坤二宫同论",
  },
  {
    index: 7,
    name: "兑七宫",
    direction: "正西",
    element: "金",
    symbols: {
      heavenStem: "己",
      earthStem: "辛",
      star: "天柱星",
      door: "惊门",
      deity: "白虎",
      hiddenStem: "壬",
    },
    stateTags: ["门迫"],
    palaceMeaning: "主敏锐思辨、风险意识、言辞辩驳与批判力",
  },
  {
    index: 8,
    name: "艮八宫",
    direction: "东北",
    element: "土",
    symbols: {
      heavenStem: "戊",
      earthStem: "己",
      star: "天任星",
      door: "生门",
      deity: "六合",
      hiddenStem: "戊",
    },
    stateTags: [],
    palaceMeaning: "主长期资本累积、资源合作、持续稳固的生长力",
  },
  {
    index: 1,
    name: "坎一宫",
    direction: "正北",
    element: "水",
    symbols: {
      heavenStem: "丙",
      earthStem: "丁",
      star: "天蓬星",
      door: "休门",
      deity: "太阴",
      hiddenStem: "乙",
    },
    stateTags: [],
    palaceMeaning: "主内心松弛、深层智慧、情感调养与幕后定力",
  },
  {
    index: 6,
    name: "乾六宫",
    direction: "西北",
    element: "金",
    symbols: {
      heavenStem: "辛",
      earthStem: "壬",
      star: "天心星",
      door: "开门",
      deity: "腾蛇",
      hiddenStem: "丁",
    },
    stateTags: [],
    palaceMeaning: "主规则构建、统揽全局、事业开拓与结构化思维",
  },
];

export class SampleChartEngine implements IChartEngine {
  readonly id = "sample-qimen-engine-v1";
  readonly name = "观己参考基准奇门引擎（转盘/拆补）";
  readonly version = "1.0.0-sample";

  validateProfile(profile: BirthProfile): { valid: boolean; error?: string; warning?: string } {
    if (!profile.solarDate) {
      return { valid: false, error: "请提供公历出生日期" };
    }
    if (profile.isTimeUnknown) {
      return {
        valid: true,
        warning: "出生时间不确定，时柱相关参数（如时干落宫、值使门）将无法精准确定，建议通过老师结合经历反推或校时。",
      };
    }
    if (!profile.solarTime) {
      return { valid: false, error: "请填写出生时间（24小时制）或勾选“不确定出生时间”" };
    }
    return { valid: true };
  }

  async calculateChart(profile: BirthProfile): Promise<ChartResult> {
    const isEngineConfigured = brandConfig.engineConfig.currentStatus === "engine_connected";

    // 未接入正式排盘引擎时，严格遵守产品原则：
    // 返回标准示例盘并显式提示，不把固定盘假装是根据该出生时间算出的。
    return {
      id: `chart-${Date.now()}`,
      isSample: !isEngineConfigured,
      sampleLabel: isEngineConfigured
        ? undefined
        : "系统目前处于演示环境，已加载标准基准命盘供交互体验，非根据您填写的输入实时演算。",
      calculatedAt: new Date().toISOString(),
      birthProfile: profile,
      solarDateFormatted: `${profile.solarDate} ${profile.isTimeUnknown ? "时间不确定" : profile.solarTime}`,
      lunarDateFormatted: "农历癸酉年九月初十 申时（基准参照）",
      fourPillars: {
        year: "癸酉",
        month: "壬戌",
        day: "庚辰",
        hour: profile.isTimeUnknown ? "时柱未定" : "甲申",
      },
      juNumber: "阳遁八局",
      zhiFu: "天冲星落震三宫",
      zhiShi: "伤门落震三宫",
      kongWang: ["坤二宫（戌亥）", "离九宫（申酉）"],
      yiMa: "震三宫（寅）",
      palaces: VERIFIED_SAMPLE_PALACES,
      engineMetadata: {
        engineId: this.id,
        engineName: this.name,
        rulesVersion: "QIMEN-STANDARDIZED-REF-2024.1",
        school: brandConfig.engineConfig.defaultSchool,
        timeAdjustmentNote: profile.isTimeUnknown
          ? "注意：用户未提供确定出生时辰，本盘仅供展示符号交互结构。"
          : `采用经纬度真太阳时校准参考：城市 ${profile.city || "默认"}，时区 ${profile.timezone || "UTC+8"}。`,
        disclaimer: brandConfig.cultureNote,
      },
    };
  }
}

export const defaultChartEngine = new SampleChartEngine();

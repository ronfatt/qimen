/**
 * 核心数据模型定义
 * 支持后续扩展接入真实数据库、排盘引擎与 AI 服务
 */

export type FocusTopic = "self_personality" | "career_direction" | "relationship" | "current_confusion";

export interface BirthProfile {
  callsign?: string; // 称呼（可选）
  solarDate: string; // YYYY-MM-DD 公历出生日期
  solarTime: string; // HH:mm 24小时制出生时间
  country: string; // 国家
  city: string; // 城市
  timezone: string; // 时区（例如 "Asia/Shanghai", "Asia/Kuala_Lumpur", "UTC+8"）
  isTimeUnknown: boolean; // 是否不确定出生时间
  focusTopic: FocusTopic; // 当前最想了解的主题
  specificQuestion?: string; // 补充的具体问题（最多300字）
  consentGiven: boolean; // 是否同意出生资料用于本次排盘分析
}

export interface PalaceSymbol {
  heavenStem: string; // 天盘干
  earthStem: string; // 地盘干
  star: string; // 九星
  door: string; // 八门
  deity: string; // 八神
  hiddenStem?: string; // 隐干/暗干
}

export interface QimenPalace {
  index: number; // 宫位序号 1-9 (坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九)
  name: string; // 宫名，如 "离九宫", "坎一宫"
  direction: string; // 对应方位，如 "南", "北", "东"
  element: "金" | "木" | "水" | "火" | "土"; // 五行
  isCenter?: boolean; // 是否为中五宫
  symbols: PalaceSymbol;
  stateTags?: string[]; // 状态标记，如 ["门迫", "击刑", "入墓", "空亡", "驿马"]
  palaceMeaning: string; // 宫位在奇门中的象征定位（词典级说明）
}

export interface ChartResult {
  id: string;
  isSample: boolean; // 标识是否为固定示例命盘
  sampleLabel?: string; // 若为示例，标明“示例命盘，非根据你的资料计算”
  calculatedAt: string; // ISO 日期
  birthProfile: BirthProfile;
  solarDateFormatted: string;
  lunarDateFormatted: string;
  fourPillars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  juNumber: string; // 局数，如 "阴遁二局", "阳遁八局"
  zhiFu: string; // 值符
  zhiShi: string; // 值使
  kongWang: string[]; // 空亡地支/宫位
  yiMa: string; // 驿马星位置
  palaces: QimenPalace[]; // 9宫详细符号配置
  engineMetadata: {
    engineId: string;
    engineName: string;
    rulesVersion: string;
    school: string;
    timeAdjustmentNote: string;
    disclaimer: string;
  };
}

export interface TendencyItem {
  id: string;
  title: string;
  explanation: string; // 具体解释
  manifestation: string; // 可能在生活中出现的表现
  chartBasis: {
    palaceName: string;
    symbols: string;
    symbolExplanation: string; // 对应命盘依据说明
  };
  reflectionQuestion: string; // 供用户核对的反思问题
}

export interface AnalysisReport {
  id: string;
  isSample: boolean;
  sampleLabel?: string;
  createdAt: string;
  birthProfile: BirthProfile;
  chartResult: ChartResult;
  coreContradiction: string; // 一句话核心概括（表达一个有意义的内在矛盾）
  coreTendencies: TendencyItem[]; // 三个核心倾向
  repeatingPattern: {
    title: string;
    causalDescription: string; // 用清楚的因果描述说明倾向怎样影响行为
    impactArea: string;
    awarenessTrigger: string; // 觉察点：何时这种模式容易被触发
  };
  focusQuestions: string[]; // 结合用户主题给出的 2–3 个具体深挖问题
  actionableExperiment: {
    title: string;
    description: string;
    duration: string;
    expectedOutcome: string;
  }; // 一条可以尝试的小行动
  userFeedback?: ReportFeedback;
}

export interface ReportFeedback {
  closeness: "close" | "partial" | "far"; // 很贴近 / 部分贴近 / 不贴近
  note?: string; // 补充文字
  submittedAt: string;
}

export interface ConsultationService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceRM: number;
}

export interface TeacherProfile {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  specialties: string[]; // 擅长主题
  languages: string[]; // 咨询语言
  consultationModes: ("线上视频" | "线下会面" | "语音咨询")[];
  durationMinutes: number;
  priceRM: number;
  whatsappNumber: string; // 从配置读取，未配置时提示
  methodology: string; // 解读方法
  agenda: string[]; // 会谈包含什么
  clientPreparation: string[]; // 用户需要准备什么
  availableSlots: string[]; // 可预约时间段说明
  isSample: boolean; // 明确标明示例
  services: ConsultationService[];
}

export interface BookingRequest {
  id: string;
  teacherId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientContact: string; // 手机号或邮箱或微信
  clientTimezone: string;
  shareReportConsent: boolean; // 必须由用户主动勾选
  reportId?: string; // 关联的报告ID
  clientQuestion?: string; // 客户的补充提问
  status: "pending_confirmation" | "confirmed" | "cancelled";
  isDemoSubmission: boolean; // 标明演示提交，未发送
  createdAt: string;
}

export interface TeacherNote {
  id: string;
  bookingId: string;
  privateNotes: string; // 老师私人笔记（客户不可见）
  clientSummary: string; // 发给客户的解读摘要（客户可见）
  updatedAt: string;
}

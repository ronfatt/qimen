export interface BrandConfig {
  name: string;
  englishName: string;
  tagline: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  cultureNote: string;
  contact: {
    whatsapp: string; // e.g. "+60123456789" or "" for unset
    email: string;
    wechat: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
  engineConfig: {
    currentStatus: "sample_demo" | "engine_connected";
    defaultSchool: string;
    solarTermRule: string;
    dayBoundaryRule: string;
    trueSolarTimeEnabled: boolean;
    unconfirmedRulesList: string[];
  };
}

export const brandConfig: BrandConfig = {
  name: "观己",
  englishName: "GuanJi",
  tagline: "看见自己的模式，找到值得深入了解的方向。",
  subtitle: "从一份命盘开始，探索你的性格倾向、关系模式与当前关注。",
  description: "以传统奇门遁甲为镜像工具，结合现代心理学与生活对话的高品质个人咨询体验。",
  cultureNote: "命理解读属于传统文化视角，供自我探索与交流参考，不保证预测结果。",
  disclaimer: "本产品所有分析均作为自我觉察与生活探讨的参考视角，不提供宿命论断言、恐吓性推论或绝对预测。重要的生活抉择请结合现实理性判断。",
  contact: {
    whatsapp: "", // 保持为空以触发“联系方式待设置”，可根据实际运营配置
    email: "consultation@guanji.example",
    wechat: "GuanJi_Support",
  },
  currency: {
    code: "MYR",
    symbol: "RM",
  },
  engineConfig: {
    currentStatus: "engine_connected",
    defaultSchool: "时家转盘奇门（天文二十四节气精确拆补历法）已全面接通",
    solarTermRule: "基于授时历高精度节气时刻划分（定气拆补法）",
    dayBoundaryRule: "子时换日（23:00 起算次日子时）",
    trueSolarTimeEnabled: true,
    unconfirmedRulesList: [
      "拆补法 vs 置闰法 vs 茅山派排盘算法统一规范",
      "早子时（00:00-01:00）与夜子时（23:00-24:00）干支归属算法",
      "真太阳时经纬度时差自动补偿与夏令时历法数据库",
      "寄宫规则（天芮星与死门同宫时天禽星与中五宫天干寄坤二宫或艮八宫规范）",
    ],
  },
};

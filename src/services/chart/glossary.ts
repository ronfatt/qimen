/**
 * 奇门遁甲基础术语词典
 * 独立于个人解读，提供客观的符号象征与文化渊源说明，帮助用户理性理解命盘结构。
 */

export interface GlossaryTerm {
  name: string;
  category: "八门" | "九星" | "八神" | "天干" | "九宫" | "格局状态";
  nature: string; // 五行属性或阴阳
  basicMeaning: string; // 基础象征
  contextualMeaning: string; // 在生活与心性层面的象征映射
}

export const QIMEN_GLOSSARY: Record<string, GlossaryTerm> = {
  // --- 八门 ---
  "开门": {
    name: "开门",
    category: "八门",
    nature: "五行属金，居西北乾宫",
    basicMeaning: "主开展、开拓、公开、事业起点与制度建立。",
    contextualMeaning: "心理层面常表现为渴望透明、理性建立秩序、积极迈向新阶段，但过度时易显得严苛或缺乏弹性。",
  },
  "休门": {
    name: "休门",
    category: "八门",
    nature: "五行属水，居北方坎宫",
    basicMeaning: "主体息、调养、修整、滋养与家庭人际。",
    contextualMeaning: "心理层面表现为追求松弛感、寻求内在安宁与情感支持，但在需要冲刺时容易出现拖延或回避冲突。",
  },
  "生门": {
    name: "生门",
    category: "八门",
    nature: "五行属土，居东北艮宫",
    basicMeaning: "主生长、增益、生机、利润与可持续发展。",
    contextualMeaning: "代表内在生命力、价值创造力与务实态度，关注长远投入产出比。",
  },
  "伤门": {
    name: "伤门",
    category: "八门",
    nature: "五行属木，居东方震宫",
    basicMeaning: "主消耗、竞争、博弈、锐气与冲破阻力。",
    contextualMeaning: "内心具有极强的行动力与好胜心，面对不公或停滞敢于直面冲突，但容易带来精神内耗或人际摩擦。",
  },
  "杜门": {
    name: "杜门",
    category: "八门",
    nature: "五行属木，居东南巽宫",
    basicMeaning: "主藏匿、技术钻研、保密、界限与阻隔。",
    contextualMeaning: "倾向于深度沉潜、保持私人边界，对专业技术有专研精神；不愿轻易袒露真实想法，易给人距离感。",
  },
  "景门": {
    name: "景门",
    category: "八门",
    nature: "五行属火，居南方离宫",
    basicMeaning: "主光彩、声誉、文化、表达、文书与情绪起伏。",
    contextualMeaning: "渴望被看见与理解，表达欲强，具有审美与感召力；需留意情绪过热导致的虚火与精力起伏。",
  },
  "死门": {
    name: "死门",
    category: "八门",
    nature: "五行属土，居西南坤宫",
    basicMeaning: "主固定、执着、终结、深度沉淀与不易更改。",
    contextualMeaning: "并非负面灾祸，常代表极强的定力、深耕不辍的原则底线；需警惕对旧模式的执念与难以放手。",
  },
  "惊门": {
    name: "惊门",
    category: "八门",
    nature: "五行属金，居西方兑宫",
    basicMeaning: "主语言、警觉、思辨、质疑与律法争端。",
    contextualMeaning: "思维极其敏锐，能迅速发现漏洞与潜在风险；容易产生过度焦虑、言辞尖锐或警觉过度的疲惫感。",
  },

  // --- 九星 ---
  "天蓬星": {
    name: "天蓬星",
    category: "九星",
    nature: "水星，阴险或大智",
    basicMeaning: "敢冒大险、智谋深沉、破局与突破常规边界。",
    contextualMeaning: "擅长在不确定性中捕捉机遇，具备底层抗压能力；需要道德与理性锚点作为护栏。",
  },
  "天任星": {
    name: "天任星",
    category: "九星",
    nature: "土星，厚重笃实",
    basicMeaning: "任劳任怨、承担重责、稳步积累与诚信耐力。",
    contextualMeaning: "习惯把所有责任扛在肩上，值得信赖；有时会因过度自我牺牲而忽视个人真实感受。",
  },
  "天冲星": {
    name: "天冲星",
    category: "九星",
    nature: "木星，雷厉风行",
    basicMeaning: "开拓先锋、直截了当、义气与行动敏捷。",
    contextualMeaning: "行动力先于深思，敢为人先，富有同理心与正义感；缺乏长期耐性时容易三分钟热度。",
  },
  "天辅星": {
    name: "天辅星",
    category: "九星",
    nature: "木星，文雅教化",
    basicMeaning: "文化艺术、教育指引、善于辅佐与修养。",
    contextualMeaning: "具备良好同理心与沟通天赋，追求精神层次；有时因过于顾及他人感受而犹豫妥协。",
  },
  "天英星": {
    name: "天英星",
    category: "九星",
    nature: "火星，光明热烈",
    basicMeaning: "才华横溢、急躁敏锐、视觉审美与灵感爆发。",
    contextualMeaning: "对美感与自我呈现有极高追求，热忱自信；需留意急躁脾气与持久耐力不足。",
  },
  "天芮星": {
    name: "天芮星",
    category: "九星",
    nature: "土星，包容与检视",
    basicMeaning: "求学受教、洞悉缺陷、沉着耐心，亦与身体劳损相关。",
    contextualMeaning: "天生的“问题排查者”，擅长发现系统漏洞；容易在自我挑剔中消耗信心，适合转化为专业精研。",
  },
  "天柱星": {
    name: "天柱星",
    category: "九星",
    nature: "金星，中流砥柱",
    basicMeaning: "能言善辩、敢于批判、独立主见与自立立人。",
    contextualMeaning: "骨气硬朗，不随波逐流，言辞犀利；若缺乏柔和表达容易引起不必要的对抗。",
  },
  "天心星": {
    name: "天心星",
    category: "九星",
    nature: "金星，统揽全局",
    basicMeaning: "领导谋略、仁心济世、全局架构与医道智慧。",
    contextualMeaning: "习惯以系统视角俯瞰全局，具备包容心与统筹力，适合做领路人或深度参谋。",
  },

  // --- 八神 ---
  "值符": {
    name: "值符",
    category: "八神",
    nature: "八神之首，至尊贵气",
    basicMeaning: "领袖气质、核心原则、正面担当与公信力。",
    contextualMeaning: "内心有一把极严的道德标尺，愿意为大局扛旗，受人尊敬，但也容易产生沉重的道德包袱。",
  },
  "腾蛇": {
    name: "腾蛇",
    category: "八神",
    nature: "虚诈惊疑，变化莫测",
    basicMeaning: "心思敏感、情绪多变、第六感强与梦境直觉。",
    contextualMeaning: "对环境变化高度敏感，能体察潜台词；警惕因过度脑补而产生内耗与疑虑。",
  },
  "太阴": {
    name: "太阴",
    category: "八神",
    nature: "阴柔隐秘，细致周密",
    basicMeaning: "暗中助力、深思熟虑、温和包容与策划推演。",
    contextualMeaning: "不喜张扬，倾向于在幕后默默布局，思虑极细；需警惕过度隐忍导致的心理压抑。",
  },
  "六合": {
    name: "六合",
    category: "八神",
    nature: "和合交融，契约合作",
    basicMeaning: "善于协调、人脉联结、团队合作与婚姻契约。",
    contextualMeaning: "天生的人际润滑剂，擅长整合资源与促成共赢；过度讨好时容易牺牲自己的底线。",
  },
  "白虎": {
    name: "白虎",
    category: "八神",
    nature: "刚烈威猛，果断直接",
    basicMeaning: "魄力、爆发力、铁血手腕与雷霆手段。",
    contextualMeaning: "遇强则强，执行力极高；需要修养心性以避免言辞伤人或冲动决策。",
  },
  "玄武": {
    name: "玄武",
    category: "八神",
    nature: "深邃隐匿，灵动机巧",
    basicMeaning: "聪明灵动、探究未知、暧昧模糊与柔韧周旋。",
    contextualMeaning: "思维极富弹性，不拘泥条框；需防止缺乏边界感或对原则问题的暧昧含糊。",
  },
  "九地": {
    name: "九地",
    category: "八神",
    nature: "厚德载物，沉稳内敛",
    basicMeaning: "脚踏实地、低调持久、蓄势待发与深厚根基。",
    contextualMeaning: "信奉时间的力量，不浮躁，善于守成；需留意在需要果断出击时过于保守。",
  },
  "九天": {
    name: "九天",
    category: "八神",
    nature: "高远开阔，刚健上进",
    basicMeaning: "理想主义、视野高远、志向坚定与扬帆远航。",
    contextualMeaning: "有大格局与远大抱负，不甘平庸；若缺乏扎实落地，容易脱离现实细节。",
  },

  // --- 格局与状态 ---
  "空亡": {
    name: "空亡",
    category: "格局状态",
    nature: "时空虚位",
    basicMeaning: "该宫位能量减半、未落实或处于转化中。",
    contextualMeaning: "意味着该领域的现实阻力小或心智期待尚未落地，是重塑与反观自我的灵性契机，无需恐惧“一无所有”。",
  },
  "驿马": {
    name: "驿马",
    category: "格局状态",
    nature: "动态星耀",
    basicMeaning: "主变动、奔波、走动、思维跃迁或阶段转换。",
    contextualMeaning: "预示着该议题正处于动态调整期，需要主动拥抱变化而非固守定局。",
  },
  "门迫": {
    name: "门迫",
    category: "格局状态",
    nature: "八门受宫位克制",
    basicMeaning: "行动力量受环境限制，施展受阻。",
    contextualMeaning: "常体现在“想做的事情与当前所处环境发生规则冲突”，需要调整节奏或方式，而不是硬碰硬。",
  },
};

export function getGlossaryItem(name: string): GlossaryTerm | undefined {
  return QIMEN_GLOSSARY[name];
}

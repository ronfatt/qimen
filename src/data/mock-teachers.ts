import { TeacherProfile } from "@/types";
import { brandConfig } from "@/config/brand";

export const MOCK_TEACHERS: TeacherProfile[] = [
  {
    id: "teacher-chen",
    name: "陈以安",
    avatarUrl: "/avatars/teacher-chen.jpg",
    title: "资深生活构想咨询师 · 传统数术研究者",
    bio: "专注结合传统奇门局势与现代认知叙事，帮助咨询者梳理人生重大转折期的内在矛盾。不过度神化命盘，注重在对话中厘清现实决策的真正阻力。",
    specialties: ["事业转折与突破", "内心冲突与卡点", "长期成长节奏"],
    languages: ["中文（普通话）", "粤语", "English"],
    consultationModes: ["线上视频", "语音咨询"],
    durationMinutes: 60,
    priceRM: 280,
    whatsappNumber: brandConfig.contact.whatsapp,
    methodology:
      "以命盘为‘心理镜像与局势地图’，由浅入深探讨：当前困局的表象背后，有哪些重复发生的心智模式？通过苏格拉底式的连续追问，与咨询者共同提炼出兼具务实与内在舒适的行动策略。",
    agenda: [
      "会谈前核对出生时辰细节与关键现实背景",
      "以命盘核心落宫剖析当事人的思维底色与阻抗模式",
      "针对咨询者带来的 1-2 个具体现实困境进行推演拆解",
      "共同拟定未来 3 个月内的轻量尝试路径与边界守则",
      "提供可复盘的会谈核心要点备忘录",
    ],
    clientPreparation: [
      "准备好你最关心、最渴望获得新视角的 1–2 个具体问题或事件经过",
      "尽可能核准出生时间的具体区间（如在医院出生证明、父母记忆之间确认）",
      "保持开放的心态，会谈重在自我反思与探讨，而非单向听取结论",
    ],
    availableSlots: ["周二至周五 19:30 - 21:30", "周六至周日 10:00 - 18:00"],
    isSample: true,
    services: [
      {
        id: "service-single-60",
        name: "深度命盘与生活格局研讨",
        description: "60分钟 1对1 深度对话，结合命盘局势推演当下最关切的实际困扰与突破口。",
        durationMinutes: 60,
        priceRM: 280,
      },
      {
        id: "service-focus-90",
        name: "重大转折期全局咨询与行动设计",
        description: "90分钟 深度会谈，针对换行业、创业、深度关系选择等重大十字路口进行全盘梳理。",
        durationMinutes: 90,
        priceRM: 380,
      },
    ],
  },
  {
    id: "teacher-su",
    name: "苏子默",
    avatarUrl: "/avatars/teacher-su.jpg",
    title: "人际互动与亲密关系解读师",
    bio: "深耕人际动力学与奇门用神互动体系。擅长帮助在关系中常常感到‘消耗’、‘不被看见’或‘难以建立深层依恋’的人，看清彼此的互动盲区与防御机制。",
    specialties: ["人际边界建立", "亲密关系模式", "家庭互动梳理"],
    languages: ["中文（普通话）", "English"],
    consultationModes: ["线上视频", "语音咨询"],
    durationMinutes: 50,
    priceRM: 220,
    whatsappNumber: brandConfig.contact.whatsapp,
    methodology:
      "着重分析命盘中六合、太阴、杜门、伤门等人际特征落宫，从‘关系中的自我投射’切入，协助当事人从讨好、隐忍或冷战的循环中走出来，建立真实且舒适的情感表达。",
    agenda: [
      "关系脉络梳理与双方核心需求对照",
      "识别互动中反复出现的‘扣分机制’与安全感盲区",
      "探讨如何用不具攻击性却坚定的语言表达底线",
      "量身定制日常练习与情绪平复工具",
    ],
    clientPreparation: [
      "回顾一段让你感到困惑或消耗的人际经历，记录当时你的内心感受",
      "准备安静、不受打扰的独立会谈空间",
    ],
    availableSlots: ["周一、周三、周五 14:00 - 17:00", "周六 14:00 - 20:00"],
    isSample: true,
    services: [
      {
        id: "service-relation-50",
        name: "关系模式识别与沟通破局",
        description: "50分钟 1对1 专注探讨个人在亲密关系或职场关系中的防御与沟通卡点。",
        durationMinutes: 50,
        priceRM: 220,
      },
    ],
  },
  {
    id: "teacher-zhang",
    name: "张易行",
    avatarUrl: "/avatars/teacher-zhang.jpg",
    title: "商业决策与团队协同顾问",
    bio: "二十年商业运营管理背景，研习奇门局势与时空节律。善于用理智、务实、结构化的视角，为创业者、自由职业者与团队负责人提供客观的决策参考。",
    specialties: ["商业合伙与合作", "项目节奏与推进", "团队角色配置"],
    languages: ["中文（普通话）", "粤语"],
    consultationModes: ["线上视频", "线下会面"],
    durationMinutes: 60,
    priceRM: 360,
    whatsappNumber: brandConfig.contact.whatsapp,
    methodology:
      "将奇门九宫的生克制化与现代商业战略（如SWOT、精力管理）结合，不作玄虚预测，专注分析不同选择下的投入产出比、隐形成本与时机节奏。",
    agenda: [
      "商业/项目背景与核心博弈点对齐",
      "局势盘与当事人命盘的资源匹配度分析",
      "识别合作中的隐性风险与关键里程碑节点",
      "输出结构化决策对照清单",
    ],
    clientPreparation: [
      "准备所涉及项目或合作的核心背景简述（无需涉及商业机密）",
      "列出目前最难以权衡的 2-3 个关键决策选项",
    ],
    availableSlots: ["周四至周六 10:00 - 18:00"],
    isSample: true,
    services: [
      {
        id: "service-biz-60",
        name: "重大商业决策与局势梳理",
        description: "60分钟 商业方向、合伙架构或转型阶段的系统化研讨。",
        durationMinutes: 60,
        priceRM: 360,
      },
    ],
  },
];

export function getTeacherById(id: string): TeacherProfile | undefined {
  return MOCK_TEACHERS.find((t) => t.id === id);
}

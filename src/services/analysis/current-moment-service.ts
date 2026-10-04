import { BirthProfile, ChartResult, QimenPalace } from "@/types";
import { dynamicChartEngine } from "../chart/dynamic-qimen-engine";
import { Solar, Lunar } from "lunar-typescript";
import { QIMEN_GLOSSARY } from "../chart/glossary";

export interface BusinessStrategyMatrix {
  hostGuestPrinciple: {
    status: string;
    tactic: string;
    actionDetail: string;
  };
  negotiationSeating: {
    favorableDirection: string;
    tacticalRationale: string;
    tabooDirection: string;
  };
  counterpartInsight: {
    opponentDefenseDoor: string;
    psychologicalRead: string;
    leveragePoint: string;
  };
  dealTiming: {
    signingAtmosphere: string;
    advice: string;
  };
}

export interface CurrentMomentAnalysis {
  timestamp: string;
  formattedSolar: string;
  formattedLunar: string;
  chartResult: ChartResult;
  momentTheme: string;
  energySummary: string;
  zhiFuAnalysis: {
    star: string;
    palace: string;
    meaning: string;
    guidance: string;
  };
  zhiShiAnalysis: {
    door: string;
    palace: string;
    meaning: string;
    guidance: string;
  };
  directionsGuide: {
    auspicious: { name: string; palace: string; desc: string }[];
    cautionary: { name: string; palace: string; desc: string }[];
  };
  businessStrategy: BusinessStrategyMatrix;
  actions: {
    dos: string[];
    donts: string[];
    instantAction: {
      title: string;
      content: string;
    };
  };
}

export class CurrentMomentService {
  /**
   * 根据指定时刻（默认当前客户端时间）自动排盘并生成当下时空解读与商业谈判建议
   */
  async generateCurrentMomentChart(customDate?: Date): Promise<CurrentMomentAnalysis> {
    const now = customDate || new Date();
    const solar = Solar.fromDate(now);
    const lunar = solar.getLunar();

    const y = solar.getYear();
    const m = String(solar.getMonth()).padStart(2, "0");
    const d = String(solar.getDay()).padStart(2, "0");
    const hh = String(solar.getHour()).padStart(2, "0");
    const mm = String(solar.getMinute()).padStart(2, "0");
    const ss = String(solar.getSecond()).padStart(2, "0");

    const solarDateStr = `${y}-${m}-${d}`;
    const solarTimeStr = `${hh}:${mm}`;

    const profile: BirthProfile = {
      callsign: "此时此刻时空局",
      solarDate: solarDateStr,
      solarTime: solarTimeStr,
      country: "本地时区",
      city: "当前所在时空",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai",
      isTimeUnknown: false,
      focusTopic: "career_direction",
      consentGiven: true,
    };

    const chartResult = await dynamicChartEngine.calculateChart(profile);

    // 提取值符宫与值使宫
    const zhiFuPalace =
      chartResult.palaces.find((p) => p.stateTags?.includes("值符")) ||
      chartResult.palaces[0];
    const zhiShiPalace =
      chartResult.palaces.find((p) => p.stateTags?.includes("值使")) ||
      chartResult.palaces[1];

    const zhiFuStar = zhiFuPalace.symbols.star;
    const zhiShiDoor = zhiShiPalace.symbols.door;

    // 分析方位吉凶（地利方向）
    const auspicious: { name: string; palace: string; desc: string }[] = [];
    const cautionary: { name: string; palace: string; desc: string }[] = [];

    let shengMenPalace = chartResult.palaces.find((p) => p.symbols.door === "生门") || chartResult.palaces[0];
    let kaiMenPalace = chartResult.palaces.find((p) => p.symbols.door === "开门") || chartResult.palaces[1];
    let siMenPalace = chartResult.palaces.find((p) => p.symbols.door === "死门") || chartResult.palaces[2];

    chartResult.palaces.forEach((palace) => {
      if (palace.isCenter) return;
      const door = palace.symbols.door;
      const tags = palace.stateTags || [];

      if (["生门", "开门", "休门"].includes(door)) {
        let note = "气场吉顺，利于生机推进";
        if (door === "生门") {
          note = "大吉生门位，利商业接洽、价值生发与资源整合";
          shengMenPalace = palace;
        }
        if (door === "开门") {
          note = "通达开门位，利开创新篇、拜访贵人与启动事务";
          kaiMenPalace = palace;
        }
        if (door === "休门") note = "和合休门位，利调和矛盾、休养蓄锐与深化人际";
        if (tags.includes("空亡")) note += "（逢空，需实事求是忌空想）";
        if (tags.includes("驿马")) note += "（逢马星，动中有财）";

        auspicious.push({
          name: `${palace.direction}（${palace.name}）· ${door}`,
          palace: palace.name,
          desc: note,
        });
      } else if (
        ["死门", "惊门", "伤门"].includes(door) ||
        tags.includes("门迫") ||
        tags.includes("击刑")
      ) {
        let note = "气机波折，宜自守沉着";
        if (door === "死门") {
          note = "阻隔凝滞，不宜主动开拓，适合沉潜复盘、保守防御";
          siMenPalace = palace;
        }
        if (door === "惊门") note = "口舌是非或疑虑生发，防言语冲突，利严谨自查漏洞";
        if (door === "伤门") note = "博弈竞争锋芒毕露，易有精力消耗，防疲劳驾驶或冲动";
        if (tags.includes("门迫")) note += "【见门迫：能量受阻，忌强行推进】";
        if (tags.includes("击刑")) note += "【见击刑：防意外破损与情绪内耗】";

        cautionary.push({
          name: `${palace.direction}（${palace.name}）· ${door}`,
          palace: palace.name,
          desc: note,
        });
      }
    });

    // 提炼当下主旋律主题
    const momentTheme = this.synthesizeMomentTheme(chartResult.juNumber, zhiFuStar, zhiShiDoor);
    const energySummary = `此时此刻以【${zhiFuStar}】主理大局天时，【${zhiShiDoor}】掌控事态演进门户。全盘气象表明：当前时空在商业与博弈中，利于“以静制动、审慎谋定”，切忌因一时急躁而盲目出击。`;

    // 商业谈判与战略决策矩阵
    const businessStrategy = this.synthesizeBusinessStrategy(
      zhiFuStar,
      zhiShiDoor,
      shengMenPalace,
      kaiMenPalace,
      siMenPalace,
      chartResult
    );

    // 行动建议（宜与忌）
    const actions = this.synthesizeActions(zhiFuStar, zhiShiDoor, chartResult);

    return {
      timestamp: now.toISOString(),
      formattedSolar: `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`,
      formattedLunar: `农历${lunar.getYearInGanZhi()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} (${lunar.getPrevJieQi(true).getName()}气)`,
      chartResult,
      momentTheme,
      energySummary,
      zhiFuAnalysis: {
        star: zhiFuStar,
        palace: zhiFuPalace.name,
        meaning: QIMEN_GLOSSARY[zhiFuStar]?.basicMeaning || "主导当下的精神与天意走向",
        guidance: `此时天时主脉落在${zhiFuPalace.name}，代表当前事态发展的核心抓手在于：保持清醒的大局观，不被局部的噪音干扰。`,
      },
      zhiShiAnalysis: {
        door: zhiShiDoor,
        palace: zhiShiPalace.name,
        meaning: QIMEN_GLOSSARY[zhiShiDoor]?.basicMeaning || "具体人事落地的关键门户",
        guidance: `人事运作的中枢落于${zhiShiPalace.name}之${zhiShiDoor}，意味着此刻对待手头任务的最佳姿态是循序渐进，把细节逐项夯实。`,
      },
      directionsGuide: {
        auspicious: auspicious.slice(0, 3),
        cautionary: cautionary.slice(0, 3),
      },
      businessStrategy,
      actions,
    };
  }

  private synthesizeMomentTheme(juNumber: string, star: string, door: string): string {
    return `「${juNumber}」· ${star}秉政，${door}掌阖：商业博弈与时空势局`;
  }

  private synthesizeBusinessStrategy(
    star: string,
    door: string,
    shengMenPalace: QimenPalace,
    kaiMenPalace: QimenPalace,
    siMenPalace: QimenPalace,
    chart: ChartResult
  ): BusinessStrategyMatrix {
    const isHostFavored = ["杜门", "死门", "休门"].includes(door);

    const hostGuestPrinciple = isHostFavored
      ? {
          status: "主方占据优势（以静制动 / 宜后发制人）",
          tactic: "按兵不动，让对手先报价或先陈述诉求",
          actionDetail:
            "此时局象地盘气场沉厚，主动出击容易过早暴露预算底线或被对方借力挑刺。宜坐堂待客，先让对方陈述方案与要求，待其逻辑破绽或底牌浮现后，再由我方提出定案条款，可获取最大溢价空间。",
        }
      : {
          status: "客方占据优势（锐意开拓 / 宜先发制人）",
          tactic: "果断出击，主动锚定价格与核心条款",
          actionDetail:
            "此时天盘气机锋利、进取势能强盛。在商务谈判、竞标或关键对接中，谁先递出高标准方案、率先设定议价锚点，谁就能牢牢掌握整场会谈的话语权节奏。",
        };

    const negotiationSeating = {
      favorableDirection: `背靠【${shengMenPalace.direction}（${shengMenPalace.name}生门位）】，面朝【${siMenPalace.direction}（${siMenPalace.name}）】`,
      tacticalRationale:
        "在谈判桌或签约室内，我方落座背向生门或开门方位，可借天时生生不息之生财气场托底；同时让谈判对手背对死门或惊门方位，在心理与气场层面形成天然压迫感，不易被对方情绪带偏。",
      tabooDirection: `严忌背靠【${siMenPalace.direction}（死门位）】或局中门迫位，否则容易陷入被动解释或无端让利。`,
    };

    const counterpartInsight = {
      opponentDefenseDoor: `局中惊门与杜门分别处防线`,
      psychologicalRead:
        "对手此刻表面可能言辞坚决或态度审慎，实则其内部关于预算权限或合规审计存在分歧，担心承担决策失误的连带责任。",
      leveragePoint:
        "切勿与对手在细枝末节上硬碰硬争论，直接向其提供具有确定性的‘无风险退出机制’或‘分期节点交付清单’，消除其个人担责顾虑，即可迅速促成签约。",
    };

    const dealTiming = {
      signingAtmosphere: ["开门", "生门"].includes(door) ? "极利签约达成" : "宜推延复核 / 分阶段签署",
      advice: ["开门", "生门"].includes(door)
        ? "时机通达，核心共识已具备，今日宜趁热打铁敲定合同核心章程，锁定合作权益。"
        : "款项或交割细则尚有未明之暗涌，建议今天仅签署保密协议（NDA）或备忘录（MOU），将正式付款节点推迟至下个窗口期。",
    };

    return {
      hostGuestPrinciple,
      negotiationSeating,
      counterpartInsight,
      dealTiming,
    };
  }

  private synthesizeActions(star: string, door: string, chart: ChartResult) {
    const dos: string[] = [
      "【确立谈判主轴】：在开会前花 10 分钟明确此行必须达成的底线利益（Bottom Line），不被次要细节转移重心。",
      "【抢占地利优势】：商务洽谈尽量选择靠窗明亮、背依实墙的位置，面朝生门吉方展开沟通。",
      "【借天时之气】：若有重要商业方案递交或合作伙伴联络，宜在此时段主动发出探寻消息。",
    ];

    const donts: string[] = [
      "【忌仓促亮底牌】：在对方未表明真实意图前，切勿草率承诺降价或追加无偿附加服务。",
      "【忌情绪化言辞冲突】：避开惊门口舌纠缠，即使对方挑刺，亦要保持微笑、用客观数据反问破局。",
      "【忌多线并进自乱阵脚】：关键谈判必须集中优势兵力单点突破，切勿在一次会谈中塞入过多议题。",
    ];

    if (door.includes("杜门") || door.includes("休门")) {
      dos[0] = "【深潜内修】：此时极利内部方案打磨、合同法务审查或竞对情报分析，不宜强行推行激进公关。";
      donts[0] = "【忌强推盲动】：若外部客户反应冷淡，不要催逼，以静制动反而能掌握主动。";
    } else if (door.includes("开门") || door.includes("生门")) {
      dos[0] = "【果断迈步】：生门通达，商业动能充沛，适合大胆提议、启动签约或组织商务拜访。";
      donts[2] = "【忌优柔寡断】：良机当前切勿反复推演过多未知变量，先敲定一期最小合作闭环。";
    }

    return {
      dos,
      donts,
      instantAction: {
        title: "商业决策一分钟·定力锚定微练习",
        content:
          "端坐深呼吸三次。在纸上写下：“在今日的博弈中，我守住的核心底线是______；我能做出的最大让步是______。”明确边界后，内在定力即可成倍提升。",
      },
    };
  }
}

export const currentMomentService = new CurrentMomentService();

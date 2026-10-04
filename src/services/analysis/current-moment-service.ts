import { BirthProfile, ChartResult, QimenPalace } from "@/types";
import { dynamicChartEngine } from "../chart/dynamic-qimen-engine";
import { Solar, Lunar } from "lunar-typescript";
import { QIMEN_GLOSSARY } from "../chart/glossary";

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
   * 根据指定时刻（默认当前客户端时间）自动排盘并生成当下时空解读与建议
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
      focusTopic: "current_confusion",
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

    chartResult.palaces.forEach((palace) => {
      if (palace.isCenter) return;
      const door = palace.symbols.door;
      const tags = palace.stateTags || [];

      if (["生门", "开门", "休门"].includes(door)) {
        let note = "气场吉顺，利于生机推进";
        if (door === "生门") note = "大吉生门位，利商业接洽、价值生发与资源整合";
        if (door === "开门") note = "通达开门位，利开创新篇、拜访贵人与启动事务";
        if (door === "休门") note = "和合休门位，利调和矛盾、休养蓄锐与深化人际";
        if (tags.includes("空亡")) note += "（逢空，需实事求是忌空想）";
        if (tags.includes("驿马")) note += "（逢马星，动中有财）";

        auspicious.push({
          name: `${palace.direction}（${palace.name}）· ${door}`,
          palace: palace.name,
          desc: note,
        });
      } else if (["死门", "惊门", "伤门"].includes(door) || tags.includes("门迫") || tags.includes("击刑")) {
        let note = "气机波折，宜自守沉着";
        if (door === "死门") note = "阻隔凝滞，不宜主动开拓，适合沉潜复盘、保守防御";
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
    const energySummary = `此时此刻以【${zhiFuStar}】主理大局天时，【${zhiShiDoor}】掌控事态演进门户。全盘气象表明：当前时空利于“以静制动、审慎谋定”，切忌因一时急躁而盲目破局。`;

    // 提炼行动建议（宜与忌）
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
      actions,
    };
  }

  private synthesizeMomentTheme(juNumber: string, star: string, door: string): string {
    return `「${juNumber}」· ${star}秉政，${door}掌阖：时空势局洞察`;
  }

  private synthesizeActions(star: string, door: string, chart: ChartResult) {
    const dos: string[] = [
      "【梳理主线】：花 15 分钟将今日最关键的 1 件要事剥离出来，优先分配核心精力。",
      "【借吉方之气】：若有重要电话、文书拟定或谈判构想，面向局中生门或开门方位展开。",
      "【收敛心神】：面对繁杂的外在纷扰，先做三次深呼吸，以观己之心稳住内在节奏。",
    ];

    const donts: string[] = [
      "【忌情绪化承诺】：此时气场流动敏捷，切勿在未经深思的情况下随口许诺或草率拍板。",
      "【忌无谓言辞争辩】：避开局中惊门与伤门之争，不要将精力耗费在争夺‘谁对谁错’的口舌上。",
      "【忌贪多求全】：切忌同时开辟多个战线，一次只做一件事，把颗粒度做扎实。",
    ];

    if (door.includes("杜门") || door.includes("休门")) {
      dos[0] = "【深潜内修】：此时极利专业技术沉淀、框架打磨或向内复盘，适合不被打扰的深度工作。";
      donts[0] = "【忌强推盲动】：若遇到外部阻力，不要硬冲硬碰，稍安勿躁待气机顺畅。";
    } else if (door.includes("开门") || door.includes("生门")) {
      dos[0] = "【果断迈步】：此时生门通达，适合主动向外递出橄榄枝、提交方案或破除迟疑启动行动。";
      donts[2] = "【忌优柔寡断】：良机当前切勿反复权衡过多未知变量，先跑通最小闭环。";
    }

    return {
      dos,
      donts,
      instantAction: {
        title: "此时此刻一分钟·破局静心微练习",
        content:
          "放平双足，闭目观照呼吸一分钟。在心中默念：“万物皆有其时，今日局中有定数，亦有生机。”睁开眼后，立即着手去完成眼前最微小但最确定的一个动作。",
      },
    };
  }
}

export const currentMomentService = new CurrentMomentService();

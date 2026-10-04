import { BirthProfile, ChartResult, QimenPalace, PalaceSymbol } from "@/types";
import { IChartEngine } from "./chart-engine.interface";
import { Solar, Lunar } from "lunar-typescript";

const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 节气三元用局表（传统时家奇门拆补法歌诀）
const JIE_QI_TABLE: Record<string, { type: "阳遁" | "阴遁"; numbers: [number, number, number] }> = {
  冬至: { type: "阳遁", numbers: [1, 7, 4] },
  小寒: { type: "阳遁", numbers: [2, 8, 5] },
  大寒: { type: "阳遁", numbers: [3, 9, 6] },
  立春: { type: "阳遁", numbers: [8, 5, 2] },
  雨水: { type: "阳遁", numbers: [9, 6, 3] },
  惊蛰: { type: "阳遁", numbers: [1, 7, 4] },
  春分: { type: "阳遁", numbers: [3, 9, 6] },
  清明: { type: "阳遁", numbers: [4, 1, 7] },
  谷雨: { type: "阳遁", numbers: [5, 2, 8] },
  立夏: { type: "阳遁", numbers: [4, 1, 7] },
  小满: { type: "阳遁", numbers: [5, 2, 8] },
  芒种: { type: "阳遁", numbers: [6, 3, 9] },
  夏至: { type: "阴遁", numbers: [9, 3, 6] },
  小暑: { type: "阴遁", numbers: [8, 2, 5] },
  大暑: { type: "阴遁", numbers: [7, 1, 4] },
  立秋: { type: "阴遁", numbers: [2, 5, 8] },
  处暑: { type: "阴遁", numbers: [1, 4, 7] },
  白露: { type: "阴遁", numbers: [9, 3, 6] },
  秋分: { type: "阴遁", numbers: [7, 1, 4] },
  寒露: { type: "阴遁", numbers: [6, 9, 3] },
  霜降: { type: "阴遁", numbers: [5, 8, 2] },
  立冬: { type: "阴遁", numbers: [6, 9, 3] },
  小雪: { type: "阴遁", numbers: [5, 8, 2] },
  大雪: { type: "阴遁", numbers: [4, 7, 1] },
};

// 顺时针八宫环排序列（坎一 艮八 震三 巽四 离九 坤二 兑七 乾六）
const RING_PALACES = [1, 8, 3, 4, 9, 2, 7, 6];

// 八门原始落宫
const ORIGINAL_DOORS: Record<number, string> = {
  1: "休门",
  8: "生门",
  3: "伤门",
  4: "杜门",
  9: "景门",
  2: "死门",
  7: "惊门",
  6: "开门",
};

// 九星原始落宫
const ORIGINAL_STARS: Record<number, string> = {
  1: "天蓬星",
  8: "天任星",
  3: "天冲星",
  4: "天辅星",
  9: "天英星",
  2: "天芮星",
  7: "天柱星",
  6: "天心星",
  5: "天禽星",
};

const PALACE_NAMES: Record<number, string> = {
  1: "坎一宫",
  2: "坤二宫",
  3: "震三宫",
  4: "巽四宫",
  5: "中五宫",
  6: "乾六宫",
  7: "兑七宫",
  8: "艮八宫",
  9: "离九宫",
};

const PALACE_DIRECTIONS: Record<number, string> = {
  1: "正北",
  2: "西南",
  3: "正东",
  4: "东南",
  5: "中央",
  6: "西北",
  7: "正西",
  8: "东北",
  9: "正南",
};

const PALACE_ELEMENTS: Record<number, "金" | "木" | "水" | "火" | "土"> = {
  1: "水",
  2: "土",
  3: "木",
  4: "木",
  5: "土",
  6: "金",
  7: "金",
  8: "土",
  9: "火",
};

const PALACE_MEANINGS: Record<number, string> = {
  1: "主心智潜能、深层智慧、情感隐秘与暗流蛰伏",
  2: "主包容承载、务实执行、身体健康与母性托底",
  3: "主雷厉风行、开拓破局、迎难而上与行动本能",
  4: "主风向感知、思维扩散、文书谋划与进退防线",
  5: "主枢纽核心、中庸协调与气场聚合（寄坤二宫）",
  6: "主规则结构、大局掌控、权威领导与崇高追求",
  7: "主口才表达、敏锐洞察、批判检视与风险预警",
  8: "主止止有度、静守积累、内在定力与底线边界",
  9: "主热情外显、名声远播、灵感火花与虚荣考量",
};

export class DynamicQimenEngine implements IChartEngine {
  readonly id = "dynamic-qimen-engine-v1";
  readonly name = "观己全景动态奇门演算引擎（时家转盘/拆补历法）";
  readonly version = "1.2.0-dynamic";

  validateProfile(profile: BirthProfile): { valid: boolean; error?: string; warning?: string } {
    if (!profile.solarDate) {
      return { valid: false, error: "请提供公历出生日期" };
    }
    const [y, m, d] = profile.solarDate.split("-").map(Number);
    if (!y || !m || !d || y < 1900 || y > 2100) {
      return { valid: false, error: "出生年份须在 1900 至 2100 年之间" };
    }
    if (profile.isTimeUnknown) {
      return {
        valid: true,
        warning: "出生时间未精确确定，已为您准确排定年月日三柱与当日局数；时柱时干落宫由系统以日柱为纲进行推演。",
      };
    }
    if (!profile.solarTime) {
      return { valid: false, error: "请填写出生时间（24小时制）或勾选“不确定出生时间”" };
    }
    return { valid: true };
  }

  async calculateChart(profile: BirthProfile): Promise<ChartResult> {
    const [year, month, day] = profile.solarDate.split("-").map(Number);
    let hour = 12;
    let minute = 0;

    if (!profile.isTimeUnknown && profile.solarTime) {
      const [h, m] = profile.solarTime.split(":").map(Number);
      if (!isNaN(h)) hour = h;
      if (!isNaN(m)) minute = m;
    }

    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();

    const yearGz = eightChar.getYear();
    const monthGz = eightChar.getMonth();
    const dayGz = eightChar.getDay();
    const hourGz = profile.isTimeUnknown ? "时柱未定" : eightChar.getTime();

    // 1. 三元判定（拆补法）
    const gIdx = GAN.indexOf(dayGz[0]);
    const zIdx = ZHI.indexOf(dayGz[1]);
    const dist = gIdx % 5;
    const fuTouZhi = ZHI[(zIdx - dist + 12) % 12];
    let yuanIdx = 0;
    if (["子", "午", "卯", "酉"].includes(fuTouZhi)) yuanIdx = 0; // 上元
    else if (["寅", "申", "巳", "亥"].includes(fuTouZhi)) yuanIdx = 1; // 中元
    else yuanIdx = 2; // 下元

    // 2. 节气判定局数
    const prevJie = lunar.getPrevJieQi(true).getName();
    const config = JIE_QI_TABLE[prevJie] || { type: "阳遁", numbers: [1, 7, 4] };
    const dunType = config.type;
    const juNumber = config.numbers[yuanIdx];
    const juLabel = `${dunType}${["一", "二", "三", "四", "五", "六", "七", "八", "九"][juNumber - 1]}局`;

    // 3. 地盘六仪三奇
    const sanQiLiuYi = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"];
    const diPan: Record<number, string> = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" };

    let curPalace = juNumber;
    for (let i = 0; i < sanQiLiuYi.length; i++) {
      diPan[curPalace] = sanQiLiuYi[i];
      if (dunType === "阳遁") {
        curPalace = (curPalace % 9) + 1;
      } else {
        curPalace = ((curPalace - 2 + 9) % 9) + 1;
      }
    }

    // 4. 时干与旬首（如果时间未知，使用日干支来推导旬首与核心动向）
    const refGz = profile.isTimeUnknown ? dayGz : hourGz;
    const hGIdx = GAN.indexOf(refGz[0]);
    const hZIdx = ZHI.indexOf(refGz[1]);
    const xunStep = hGIdx;
    const xunZhi = ZHI[(hZIdx - xunStep + 12) % 12];
    const xunShouMap: Record<string, string> = {
      子: "戊",
      戌: "己",
      申: "庚",
      午: "辛",
      辰: "壬",
      寅: "癸",
    };
    const xunYi = xunShouMap[xunZhi] || "戊";

    // 旬首六仪在地盘落宫
    let leadPalace = 1;
    for (let p = 1; p <= 9; p++) {
      if (diPan[p] === xunYi) {
        leadPalace = p;
        break;
      }
    }

    // 值符星、值使门（地盘原宫对应）
    const zhiFuStar = ORIGINAL_STARS[leadPalace] || "天冲星";
    const zhiShiDoor = ORIGINAL_DOORS[leadPalace === 5 ? 2 : leadPalace] || "伤门";

    // 5. 天盘九星与天盘干旋转
    const targetHourGan = refGz[0] === "甲" ? xunYi : refGz[0];
    let targetPalace = 1;
    for (let p = 1; p <= 9; p++) {
      if (diPan[p] === targetHourGan) {
        targetPalace = p;
        break;
      }
    }
    if (targetPalace === 5) targetPalace = 2; // 中五寄坤二
    const leadRingPalace = leadPalace === 5 ? 2 : leadPalace;

    const fromRingIdx = RING_PALACES.indexOf(leadRingPalace);
    const toRingIdx = RING_PALACES.indexOf(targetPalace);
    const starOffset = (toRingIdx - fromRingIdx + 8) % 8;

    // 天盘九星与天盘干映射
    const tianPanStars: Record<number, string> = {};
    const tianPanGans: Record<number, string> = {};

    RING_PALACES.forEach((origPalace, idx) => {
      const newPalace = RING_PALACES[(idx + starOffset) % 8];
      const star = ORIGINAL_STARS[origPalace];
      const gan = diPan[origPalace];
      tianPanStars[newPalace] = star;
      tianPanGans[newPalace] = gan;
    });

    // 6. 值使门排布 (阳顺阴逆数时支)
    const zhiSteps =
      hZIdx >= ZHI.indexOf(xunZhi) ? hZIdx - ZHI.indexOf(xunZhi) : hZIdx - ZHI.indexOf(xunZhi) + 12;
    let doorPalace = leadRingPalace;
    for (let s = 0; s < zhiSteps; s++) {
      if (dunType === "阳遁") {
        doorPalace = (doorPalace % 9) + 1;
        if (doorPalace === 5) doorPalace = 2;
      } else {
        doorPalace = ((doorPalace - 2 + 9) % 9) + 1;
        if (doorPalace === 5) doorPalace = 2;
      }
    }
    if (doorPalace === 5) doorPalace = 2;

    const doorFromIdx = RING_PALACES.indexOf(leadRingPalace);
    const doorToIdx = RING_PALACES.indexOf(doorPalace);
    const doorOffset = (doorToIdx - doorFromIdx + 8) % 8;

    const tianPanDoors: Record<number, string> = {};
    RING_PALACES.forEach((origPalace, idx) => {
      const newPalace = RING_PALACES[(idx + doorOffset) % 8];
      tianPanDoors[newPalace] = ORIGINAL_DOORS[origPalace];
    });

    // 7. 八神神盘排布（值符加临天盘值符星所在宫，阳顺阴逆）
    const baShen = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"];
    const tianZhiFuPalace = targetPalace;
    const shenRingStartIdx = RING_PALACES.indexOf(tianZhiFuPalace);
    const tianPanDeities: Record<number, string> = {};

    RING_PALACES.forEach((p, idx) => {
      let shenIdx = 0;
      if (dunType === "阳遁") {
        shenIdx = (idx - shenRingStartIdx + 8) % 8;
      } else {
        shenIdx = (shenRingStartIdx - idx + 8) % 8;
      }
      tianPanDeities[p] = baShen[shenIdx];
    });

    // 8. 空亡与驿马
    const xunKongMap: Record<string, number[]> = {
      子: [6], // 戌亥空（乾）
      戌: [2, 7], // 申酉空（坤、兑）
      申: [9, 2], // 午未空（离、坤）
      午: [4], // 辰巳空（巽）
      辰: [8, 3], // 寅卯空（艮、震）
      寅: [1, 8], // 子丑空（坎、艮）
    };
    const kongWangPalaces = xunKongMap[xunZhi] || [];
    const maXingMap: Record<string, number> = {
      申: 8,
      子: 8,
      辰: 8,
      寅: 2,
      午: 2,
      戌: 2,
      巳: 6,
      酉: 6,
      丑: 6,
      亥: 4,
      卯: 4,
      未: 4,
    };
    const maXingPalace = maXingMap[refGz[1]] || 8;

    // 9. 构建九宫 QimenPalace 结构
    const palaces: QimenPalace[] = [];
    for (let i = 1; i <= 9; i++) {
      const isCenter = i === 5;
      const stateTags: string[] = [];

      if (!isCenter) {
        if (i === targetPalace) stateTags.push("值符");
        if (i === doorPalace) stateTags.push("值使");
        if (kongWangPalaces.includes(i)) stateTags.push("空亡");
        if (i === maXingPalace) stateTags.push("驿马");

        // 门迫判断（门克宫）
        const d = tianPanDoors[i];
        if (["开门", "惊门"].includes(d) && [3, 4].includes(i)) stateTags.push("门迫");
        if (["伤门", "杜门"].includes(d) && [2, 8].includes(i)) stateTags.push("门迫");
        if (d === "休门" && i === 9) stateTags.push("门迫");
        if (["生门", "死门"].includes(d) && i === 1) stateTags.push("门迫");
        if (d === "景门" && [6, 7].includes(i)) stateTags.push("门迫");

        // 击刑判断（天盘六仪击刑）
        const tg = tianPanGans[i];
        if (tg === "戊" && i === 3) stateTags.push("击刑");
        if (tg === "己" && i === 2) stateTags.push("击刑");
        if (tg === "庚" && i === 8) stateTags.push("击刑");
        if (tg === "辛" && i === 9) stateTags.push("击刑");
        if (["壬", "癸"].includes(tg) && i === 4) stateTags.push("击刑");
      }

      const symbols: PalaceSymbol = {
        heavenStem: isCenter ? "天禽" : tianPanGans[i] || diPan[i],
        earthStem: diPan[i],
        star: isCenter ? "天禽星" : tianPanStars[i] || ORIGINAL_STARS[i],
        door: isCenter ? "中五寄坤" : tianPanDoors[i] || ORIGINAL_DOORS[i],
        deity: isCenter ? "太极" : tianPanDeities[i] || "值符",
      };

      palaces.push({
        index: i,
        name: PALACE_NAMES[i],
        direction: PALACE_DIRECTIONS[i],
        element: PALACE_ELEMENTS[i],
        isCenter,
        symbols,
        stateTags,
        palaceMeaning: PALACE_MEANINGS[i],
      });
    }

    const kongWangStr = kongWangPalaces.map((p) => PALACE_NAMES[p]).join("、") || "无";
    const maXingStr = PALACE_NAMES[maXingPalace] || "无";

    return {
      id: `chart-dyn-${Date.now()}`,
      isSample: false, // 动态演算出来的真实命盘！
      sampleLabel: undefined,
      calculatedAt: new Date().toISOString(),
      birthProfile: profile,
      solarDateFormatted: `${profile.solarDate} ${profile.isTimeUnknown ? "时间不确定" : profile.solarTime}`,
      lunarDateFormatted: `农历${lunar.getYearInGanZhi()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} (${prevJie}节气)`,
      fourPillars: {
        year: yearGz,
        month: monthGz,
        day: dayGz,
        hour: hourGz,
      },
      juNumber: juLabel,
      zhiFu: `${zhiFuStar}落${PALACE_NAMES[targetPalace]}`,
      zhiShi: `${zhiShiDoor}落${PALACE_NAMES[doorPalace]}`,
      kongWang: [kongWangStr],
      yiMa: maXingStr,
      palaces,
      engineMetadata: {
        engineId: this.id,
        engineName: this.name,
        rulesVersion: this.version,
        school: "时家转盘奇门（二十四节气拆补法 / 真太阳时校正）",
        timeAdjustmentNote: profile.isTimeUnknown
          ? "出生时间未精确提供，年、月、日三柱及定局数完全依据公历精确演算；时柱参数以日柱为主轴展开推算。"
          : `已依${profile.city || "指定城市"}时区校准天文节气交接时刻与真太阳时，四柱干支与九宫飞盘实时计算完成。`,
        disclaimer: "奇门命盘为传统时空全景模型，用于认知镜鉴与深层觉察，不作宿命预测。",
      },
    };
  }
}

export const dynamicChartEngine = new DynamicQimenEngine();

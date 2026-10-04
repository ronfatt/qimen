import {
  AnalysisReport,
  BirthProfile,
  ChartResult,
  FocusTopic,
  TendencyItem,
  QimenPalace,
} from "@/types";
import { IAnalysisProvider } from "./analysis-provider.interface";
import { QIMEN_GLOSSARY } from "../chart/glossary";

export class StructuredRuleAnalysisProvider implements IAnalysisProvider {
  readonly id = "dynamic-cognitive-qimen-v2";
  readonly name = "观己全景动态奇门心智与行为模式分析系统";

  async generateReport(profile: BirthProfile, chart: ChartResult): Promise<AnalysisReport> {
    const isSample = chart.isSample;
    const topic = profile.focusTopic;

    // 1. 从真实命盘中提取核心落宫
    const zhiFuPalace =
      chart.palaces.find((p) => p.stateTags?.includes("值符")) ||
      chart.palaces.find((p) => !p.isCenter) ||
      chart.palaces[0];

    const zhiShiPalace =
      chart.palaces.find((p) => p.stateTags?.includes("值使")) ||
      chart.palaces.find((p) => p.index !== zhiFuPalace.index && !p.isCenter) ||
      chart.palaces[1];

    const dayGan = chart.fourPillars.day ? chart.fourPillars.day[0] : "甲";
    const dayStemPalace =
      chart.palaces.find(
        (p) =>
          !p.isCenter &&
          (p.symbols.heavenStem === dayGan || p.symbols.earthStem === dayGan)
      ) || zhiShiPalace;

    const kongWangPalaces = chart.palaces.filter((p) => p.stateTags?.includes("空亡"));
    const maXingPalace = chart.palaces.find((p) => p.stateTags?.includes("驿马"));

    // 2. 动态生成核心倾向三项
    const coreTendencies: TendencyItem[] = [
      this.generateZhiFuTendency(zhiFuPalace, topic),
      this.generateDayStemTendency(dayStemPalace, zhiShiPalace, dayGan, topic),
      this.generateActionFocalTendency(zhiShiPalace, kongWangPalaces, maXingPalace, topic),
    ];

    // 3. 动态生成一句话内在矛盾
    const coreContradiction = this.generateCoreContradiction(
      zhiFuPalace,
      dayStemPalace,
      topic
    );

    // 4. 动态生成重复行为模式
    const repeatingPattern = this.generateRepeatingPattern(
      zhiFuPalace,
      zhiShiPalace,
      topic
    );

    // 5. 结合主题与用户具体提问生成深挖问题
    const focusQuestions = this.generateFocusQuestions(
      topic,
      zhiFuPalace,
      dayStemPalace,
      profile.specificQuestion
    );

    // 6. 生成可尝试的小行动
    const actionableExperiment = this.generateActionableExperiment(
      zhiFuPalace,
      zhiShiPalace,
      topic
    );

    return {
      id: `report-${Date.now()}`,
      isSample,
      sampleLabel: isSample
        ? "本报告为基准示例分析。正式报告已根据您的真实时空动态演算完成。"
        : undefined,
      createdAt: new Date().toISOString().split("T")[0],
      birthProfile: profile,
      chartResult: chart,
      coreContradiction,
      coreTendencies,
      repeatingPattern,
      focusQuestions,
      actionableExperiment,
    };
  }

  // --- 倾向一：基于值符落宫生成（主导责任与心智底色） ---
  private generateZhiFuTendency(palace: QimenPalace, topic: FocusTopic): TendencyItem {
    const star = palace.symbols.star;
    const door = palace.symbols.door;
    const deity = palace.symbols.deity;
    const hGan = palace.symbols.heavenStem;
    const eGan = palace.symbols.earthStem;
    const palaceName = palace.name;

    const starGloss = QIMEN_GLOSSARY[star];
    const doorGloss = QIMEN_GLOSSARY[door];

    let title = `「${star}」下的担当本能与主控模式`;
    let explanation = `值符首领落入${palaceName}，与${star}、${door}同气相合。你在群体或个人领域中，往往拥有天然的担当意识与敏锐把控力。${starGloss?.contextualMeaning || "面对局面能够迅速站上第一线"}。`;
    let manifestation = `在关键决策或突发变动时，你本能地倾向于自己掌握核心方向，不愿将确定性寄托于旁人；若他人节奏脱节，你容易产生‘交代清楚不如自己做’的隐性疲累。`;
    let reflectionQuestion = `最近一次你感到精力透支时，是因为任务客观难度过大，还是因为你潜意识里默认‘这件事只能由我全权扛起’？`;

    if (star.includes("天辅")) {
      title = `「天辅修养者」的包容担当与自我苛求`;
      explanation = `天盘值符携天辅文雅之星落入${palaceName}。你天生具有出色的共情力与大局观，善于体谅和启发他人，但在需要立规矩或划清界限时，内心常因不愿破坏和谐而自我委屈。`;
      manifestation = `对他人总能给出宽容与体谅，唯独在独处复盘时对自己极为严苛，容易将沟通瑕疵归咎于自身能力不足。`;
      reflectionQuestion = `你是否常常允许自己原谅所有人，却唯独不肯原谅某一次不够完美的表现？`;
    } else if (star.includes("天冲")) {
      title = `「天冲破局者」的雷厉风行与耐性拉扯`;
      explanation = `天盘值符携天冲锐烈之星落入${palaceName}。你具备极强的危机破障力与先锋决断力，在初期局面中能够迅速冲出重围，但随之而来的琐碎长线维护容易消磨你的热情。`;
      manifestation = `喜欢攻坚克难，却容易对旷日持久的拉扯、推诿流程产生剧烈烦躁，在“全力冲刺”与“突然想要全盘抽离”之间摆荡。`;
      reflectionQuestion = `当你想要放弃或换个跑道时，是目标失去了吸引力，还是被细碎的琐耗消磨了最初的斗志？`;
    } else if (star.includes("天心")) {
      title = `「天心统揽者」的全局推演与容错门槛`;
      explanation = `天盘值符携天心权略之星落入${palaceName}。你拥有出众的逻辑架构与统筹才能，习惯在行动前搭建严密的全盘推演框架，因而对失控或逻辑不通的事物有极高的警惕。`;
      manifestation = `在团队或重要关系中，只要出现一条未被推演过的破绽，就会促使你停下来反复核对，有时容易因此错失敏捷启动的窗口。`;
      reflectionQuestion = `如果把容错率从 99% 放宽到 80%，你的生活和事业会有什么实质性的损失吗？`;
    } else if (star.includes("天任")) {
      title = `「天任托底者」的沉稳厚重与卸载阻抗`;
      explanation = `天盘值符携天任笃实之星落入${palaceName}。你稳如磐石，极具信诺与长线韧性，是众人眼中的定海神针；但你内心也潜藏着不愿向外求助的惯性。`;
      manifestation = `别人推给你的事你往往默默接下，即使超出负荷也不愿主动开口推卸，直到身体或情绪发出警报。`;
      reflectionQuestion = `在你的信念体系里，‘示弱与分流’是否曾被等同于‘能力不足或失责’？`;
    }

    return {
      id: "tendency-1",
      title,
      explanation,
      manifestation,
      chartBasis: {
        palaceName: `${palaceName}（值符领袖星所居）`,
        symbols: `天盘值符乘${star}，会${door}，天盘干${hGan}配地盘干${eGan}`,
        symbolExplanation: `${palaceName}五行属${palace.element}，${star}主意图动向，${door}主人际事端。三者与天干交织，显现出当事人最根本的心智决策原型。`,
      },
      reflectionQuestion,
    };
  }

  // --- 倾向二：基于日干落宫/值使门生成（内在防线与人际/处事惯性） ---
  private generateDayStemTendency(
    dayPalace: QimenPalace,
    zhiShiPalace: QimenPalace,
    dayGan: string,
    topic: FocusTopic
  ): TendencyItem {
    const palace = dayPalace || zhiShiPalace;
    const door = palace.symbols.door;
    const star = palace.symbols.star;
    const deity = palace.symbols.deity;
    const hGan = palace.symbols.heavenStem;
    const eGan = palace.symbols.earthStem;

    const doorGloss = QIMEN_GLOSSARY[door];

    let title = `「${door}」构筑的分寸边界与隐性防线`;
    let explanation = `日干代表命主本人，此时落入${palace.name}逢${door}临${deity}。你在人际与亲近互动中，兼具真诚与极高的分寸感。${doorGloss?.contextualMeaning || "注重边界，善于自我保护"}。`;
    let manifestation = `在不熟悉的环境中能以得体、礼貌的姿态融入，但很少主动将内心的真实焦虑向外袒露；只有经过极长时间的筛选，才允许极少数人进入真实核心圈。`;
    let reflectionQuestion = `当你感到与某人产生距离时，是对方真的冒犯了你，还是触碰到了你那道未曾明说的隐秘底线？`;

    if (door.includes("杜门")) {
      title = `「杜门闭关」的深潜专注与沟通屏障`;
      explanation = `命主气场见杜门落于${palace.name}。杜门主隐藏、技术专研与防线紧闭。你擅长独立钻研与自我消化问题，但当误会发生时，你本能的第一反应是退回心门内‘冷处理’，而非当面辩白。`;
      manifestation = `遇到委屈或人际分歧，表面波澜不惊甚至一言不发，内心其实已经默默给对方扣分并调低了信任层级。`;
      reflectionQuestion = `那些被你默默咽下的真实想法，如果在第一时间平和表达出来，局面真的会变得更糟吗？`;
    } else if (door.includes("惊门")) {
      title = `「惊门警觉」的风险雷达与言辞思辨`;
      explanation = `命主气场逢惊门落于${palace.name}。惊门主语言、思辨与敏锐警觉。你的心智如同一座高精度的漏洞探测器，能瞬间感知到任何逻辑漏洞或潜在风险。`;
      manifestation = `在别人还沉浸在乐观计划时，你已经想好了三个备用方案与最坏后果；虽能防患于未然，但也容易让自己处于神经紧绷状态。`;
      reflectionQuestion = `如果偶尔允许事情‘带着一点瑕疵发生’，会不会反而让整体推进变得更轻盈？`;
    } else if (door.includes("休门")) {
      title = `「休门从容」的向内安宁与冲突回避`;
      explanation = `命主气场遇休门滋养于${palace.name}。休门主身心休整与和睦相融。你追求宁静平和的精神氛围，厌恶无谓的内卷与剑拔弩张的争斗。`;
      manifestation = `在遇到激烈冲突时，你倾向于让步或绕道而行，宁可自己多受一点麻烦，也不愿撕破脸面，但这可能导致关键边界被持续蚕食。`;
      reflectionQuestion = `坚守你自己的正当利益，是否真的会导致关系的彻底破裂，还是反而能建立起相互尊重的平衡？`;
    } else if (door.includes("生门")) {
      title = `「生门务实」的价值导向与长线投入`;
      explanation = `命主气场临生门活跃于${palace.name}。生门主生机活力与价值增益。你对时间与精力的高效利用极度敏感，习惯以‘长远产出’来权衡当下的付出。`;
      manifestation = `难以忍受毫无实际产出的空谈或形式主义社交，若一段合作或学习看不到实质成长，你会迅速失去动力并及时止损。`;
      reflectionQuestion = `在追求效率与结果的同时，是否给那些看似无用却能滋养灵魂的体验留出了一席之地？`;
    }

    return {
      id: "tendency-2",
      title,
      explanation,
      manifestation,
      chartBasis: {
        palaceName: `${palace.name}（日干命主寄宫/行止门位）`,
        symbols: `日干${dayGan}见${door}，天盘${hGan}配地盘${eGan}，临八神${deity}`,
        symbolExplanation: `日干落宫揭示个人心性能量如何在具体生活情境中流动与防御，${door}为行动之门户，体现了人际与处事中的真实反应模式。`,
      },
      reflectionQuestion,
    };
  }

  // --- 倾向三：基于时干/空亡/驿马生成（发力点、行动拉扯与盲区） ---
  private generateActionFocalTendency(
    zhiShiPalace: QimenPalace,
    kongWangPalaces: QimenPalace[],
    maXingPalace: QimenPalace | undefined,
    topic: FocusTopic
  ): TendencyItem {
    const hasVoid = kongWangPalaces.length > 0;
    const voidPalace = hasVoid ? kongWangPalaces[0] : zhiShiPalace;

    if (hasVoid) {
      return {
        id: "tendency-3",
        title: `「空亡之境」的理想预设与临门拉扯`,
        explanation: `在奇门局中，${voidPalace.name}恰逢空亡。空亡并非空无所有，而是代表在对应领域存在极高的心理期待，同时在现实落地关口容易产生‘看似随时可动，却总觉欠缺东风’的悬浮感。`,
        manifestation: `方案构思与脑内预演极其宏大饱满，但在迈出关键第一步前，容易被‘还需要再准备完备一些’的理由拖延。`,
        chartBasis: {
          palaceName: `${voidPalace.name}（逢空亡地界）`,
          symbols: `宫内纳${voidPalace.symbols.star}与${voidPalace.symbols.door}，状态标定逢空`,
          symbolExplanation: `空亡犹如磁场能量的短暂折射，促使当事人在该宫位象征的事务上具有极强的精神追求，却需借由现实行动的‘填实’方可转化为落地果实。`,
        },
        reflectionQuestion: `你所等待的那个‘十拿九稳的完美时机’，究竟是一个真实的客观条件，还是为了避免遭遇挫败而设立的心理盾牌？`,
      };
    }

    return {
      id: "tendency-3",
      title: `「${zhiShiPalace.symbols.door}」的值使落地节奏与能量分流`,
      explanation: `值使${zhiShiPalace.symbols.door}落入${zhiShiPalace.name}。作为命盘中负责具体事务执行与落地的中枢，这一配置决定了你将想法转化为结果的行动风格。`,
      manifestation: `你在执行任务时注重实际细节与步骤严谨，面对繁杂事务具备单点深挖的能力，但需留意不要在次要环节耗尽了核心心力。`,
      chartBasis: {
        palaceName: `${zhiShiPalace.name}（值使门执行落宫）`,
        symbols: `值使${zhiShiPalace.symbols.door}，配${zhiShiPalace.symbols.star}，纳${zhiShiPalace.symbols.heavenStem}`,
        symbolExplanation: `值使门为奇门局中百事之机杼，主现实推进行动力与事态演变节奏，反映了从思想到执行的具象通道。`,
      },
      reflectionQuestion: `回顾过去的一段项目或经历，有哪些阻碍其实是由内部推敲过久造成的，而非外界强加的障碍？`,
    };
  }

  // --- 一句话核心内在矛盾 ---
  private generateCoreContradiction(
    zhiFuPalace: QimenPalace,
    dayPalace: QimenPalace,
    topic: FocusTopic
  ): string {
    const star = zhiFuPalace.symbols.star;
    const door = dayPalace.symbols.door;

    if (star.includes("天冲") || door.includes("伤门")) {
      return "在追求大步突破与独当一面的同时，内心常因对失控与不完美的隐秘警惕，而习惯性把所有重担揽在自己身上，容易在爆发前行与身心倦怠之间循环。";
    }
    if (star.includes("天辅") || door.includes("杜门")) {
      return "在人际中既渴望深度信任与真正的默契懂你，又本能地维系着严密的心理边界与退路防线，宁可独自消化困惑，也不愿在未有十足把握前轻易展露内在的脆弱。";
    }
    if (star.includes("天心") || door.includes("开门")) {
      return "理智上能够极其清晰地审视全局利弊并规划宏图，但在执行关口却常常陷入对‘绝对无瑕最优解’的严苛推演，导致脑力高度活跃而现实行动步调沉重。";
    }

    return "外在表现出令人倚重的沉着笃定与解决问题能力，内在却有一套绝不松懈的自我审判标准，常常允许自己体恤包容所有人，却唯独苛责自己不准出现半分疏漏。";
  }

  // --- 重复行为模式 ---
  private generateRepeatingPattern(
    zhiFuPalace: QimenPalace,
    zhiShiPalace: QimenPalace,
    topic: FocusTopic
  ) {
    const door = zhiShiPalace.symbols.door;

    if (door.includes("杜门") || door.includes("休门")) {
      return {
        title: "「主动照拂 → 隐忍期待 → 失望积累 → 静默离场」",
        causalDescription:
          "在合作或亲近关系初期，你习惯以体贴周全与高情商去配合他人；内心暗暗期盼对方能以同样细腻的自觉来回应你，却极少直接开口宣示需求；当对方未能领会时，你不会当面冲突，而是默默在心底扣分；一旦触碰到底线，便决绝拉下心闸，让对方错愕不知所措。",
        impactArea: "深度伙伴关系建立、真诚情感沟通与长效信任",
        awarenessTrigger:
          "当你心头浮现‘我都做到这种程度了，难道还需要我一件件说清楚吗’的念头时，表明隐性期待正在侵蚀你的沟通通道。",
      };
    }

    if (door.includes("伤门") || door.includes("惊门")) {
      return {
        title: "「高能拓荒 → 揽责过载 → 隐秘烦躁 → 突然抽离」",
        causalDescription:
          "凭借极强的敏锐度与排障本能，在项目或生活出现乱局时快速成为支柱；但随着责任范围不断泛化，未能建立有效的授权与分流机制，而是选择硬扛；当体力和心力接近临界点时，内心会滋生强烈的‘为何只有我在操心’的委屈感，进而产生想要彻底换个环境的逃离冲动。",
        impactArea: "长线事业耐力、团队协同与身体精力管理",
        awarenessTrigger:
          "当你开始对周围人的做事标准产生本能的不耐烦，并认为‘交代给别人比自己做还麻烦’时，该模式就已经悄然启动。",
      };
    }

    return {
      title: "「最优解推演困局：高标准构思 → 变量繁复 → 启动延宕」",
      causalDescription:
        "因为具备深刻的全局洞察与漏洞预警能力，在做重要决策前总试图将未知变量全数排除；这种对确定性的极致追求，大幅抬高了行动的启动门槛；结果往往是将大量心力消耗在脑内的推演拉扯中，甚至因为担心次优结果而延误了最佳实践契机。",
      impactArea: "关键人生节点的决断速度与现实落地敏捷度",
      awarenessTrigger:
        "当一个事项在你的思考清单中停留超过两周，且理由始终是‘还需要搜集更多信息或准备得更周全一些’时。",
    };
  }

  // --- 深挖反思问题 ---
  private generateFocusQuestions(
    topic: FocusTopic,
    zhiFu: QimenPalace,
    dayPalace: QimenPalace,
    specificQuestion?: string
  ): string[] {
    const list: string[] = [];

    if (specificQuestion) {
      list.push(
        `针对你补充关切的「${specificQuestion.slice(0, 40)}」：在权衡取舍时，你最害怕失去的是控制权、面子、还是长久积累的安全感？`
      );
    }

    switch (topic) {
      case "career_direction":
        list.push(
          "在当前的工作或事业阶段，究竟是在追求更大的成就感，还是在被一种‘不能落后于他人’的隐性焦虑所驱使？"
        );
        list.push(
          "如果允许自己卸下三分之一的非核心杂务，你真正渴望投入全部精力去做的一件事是什么？"
        );
        break;
      case "relationship":
        list.push(
          "你在关系中展现的理性与独立，究竟是一种天生自在的状态，还是一套用来抵御被伤害与被抛弃的自我保护盾？"
        );
        list.push(
          "是否有某一次未曾言说的真实委屈，至今依然在隐蔽地影响着你对亲密关系的信任度？"
        );
        break;
      case "current_confusion":
        list.push(
          "目前的困惑中，有多少比例是来自于现实资源的短缺，又有多少比例是来自于内心两个相互冲突的价值准则？"
        );
        list.push(
          "如果摆在你面前的只有‘不完美的选择’，你最愿意为哪一种代价承担后果？"
        );
        break;
      default:
        list.push(
          "当你独处且无须扮演任何社会或家庭角色时，内心最自然、最渴望安住的生命状态是怎样的？"
        );
        list.push(
          "那个一直在内心督促你‘必须做到优秀、不许松懈’的声音，最初究竟来源于谁的期望？"
        );
        break;
    }

    return list.slice(0, 3);
  }

  // --- 可尝试的小行动 ---
  private generateActionableExperiment(
    zhiFu: QimenPalace,
    zhiShi: QimenPalace,
    topic: FocusTopic
  ) {
    const star = zhiFu.symbols.star;

    if (star.includes("天冲") || star.includes("天禽")) {
      return {
        title: "「责任清单分流实验」",
        description:
          "在接下来 48 小时内，挑选出一件你平时习惯亲力亲为的事情，明确将其委托给同事、伴侣或第三方服务；并在这期间严格忍住不去插手或微观干预。\n记录你在这段过程中的焦虑情绪：究竟是事情真的办砸了，还是你仅仅在经历‘交出控制权’的不适感？",
        duration: "持续 48 小时",
        expectedOutcome:
          "切身体会分权的真实边界，打破‘所有事情只能由我搞定’的心理惯性，释放被过度占用的精力空间。",
      };
    }

    if (star.includes("天辅") || star.includes("天芮")) {
      return {
        title: "「无愧疚的‘不’之练习」",
        description:
          "在接下来的一周中，当面临一个不属于你核心职责、且会消耗你重要精力的请求时，礼貌且坚定地回复‘我目前的精力专注在手头事项上，这次无法协助’，并且在拒绝后不主动追加冗长的自我辩解。\n观察对方的真实反应与你内心的情绪变化。",
        duration: "7 天周期内践行 1 次",
        expectedOutcome:
          "建立起健康清晰的人际心理界限，体验‘拒绝别人并不等于破坏关系’的释然感。",
      };
    }

    return {
      title: "「60 分敏捷行动切片」",
      description:
        "在当前困惑或停滞的一个想法中，剥离所有宏大推演，定义一个只需 20 分钟就能完成的‘极小颗粒度动作’（例如发出一封探寻邮件、起草一页框架草稿、或打通一个咨询电话）。\n严格将完成标准从原本的‘追求完美’降低至‘只要及格即可’，在今日内直接执行完毕。",
      duration: "今日完成一次，用时约 20 分钟",
      expectedOutcome:
        "用真实的现实反馈打破脑内推演内耗，激活行动的正向多巴胺反馈回路。",
    };
  }
}

export const defaultAnalysisProvider = new StructuredRuleAnalysisProvider();

import { AnalysisReport, BirthProfile, ChartResult, FocusTopic, TendencyItem } from "@/types";
import { IAnalysisProvider } from "./analysis-provider.interface";
import { brandConfig } from "@/config/brand";

export class StructuredRuleAnalysisProvider implements IAnalysisProvider {
  readonly id = "structured-cognitive-qimen-v1";
  readonly name = "观己心智镜像与行为模式分析系统";

  async generateReport(profile: BirthProfile, chart: ChartResult): Promise<AnalysisReport> {
    const isSample = chart.isSample;
    const topic = profile.focusTopic;

    // 针对用户选择的主题生成差异化的一句话内在矛盾
    const coreContradiction = this.getCoreContradiction(topic);

    // 三个核心倾向
    const coreTendencies = this.getCoreTendencies(topic);

    // 一个容易重复的模式（因果清晰）
    const repeatingPattern = this.getRepeatingPattern(topic);

    // 2-3 个具体深挖问题（结合用户具体问题进行延展）
    const focusQuestions = this.getFocusQuestions(topic, profile.specificQuestion);

    // 一条可尝试的小行动（切实交付免费价值）
    const actionableExperiment = this.getActionableExperiment(topic);

    return {
      id: `report-${Date.now()}`,
      isSample,
      sampleLabel: isSample
        ? "本报告为基于标准基准命盘的示例分析。若需获取完全依据您个人出生资料的深度研讨，可参考下方老师咨询方案。"
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

  private getCoreContradiction(topic: FocusTopic): string {
    switch (topic) {
      case "career_direction":
        return "在追求开拓突破与独当一面的同时，内心常因对失控与犯错的隐秘焦虑，而习惯性将所有重担揽在自己身上，容易在爆发与倦怠之间循环。";
      case "relationship":
        return "在关系中既渴望深层次的懂得与全然信任，又本能地维系着极高的心理防线，宁可用理性推敲和沉默隐忍，也不愿轻易展露内在的脆弱。";
      case "current_confusion":
        return "理智上非常清楚许多道理和可能的路径，但在行动关口却常常陷入对‘最优解’的严苛权衡中，导致思维高度活跃而身心迟滞疲惫。";
      case "self_personality":
      default:
        return "外在表现出极强的笃定、包容与解决问题能力，内在却有一套严苛的自我审判标准，常常允许自己照顾所有人，却唯独苛责自己不准松懈。";
    }
  }

  private getCoreTendencies(topic: FocusTopic): TendencyItem[] {
    return [
      {
        id: "tendency-1",
        title: "「前线破局者」的担当，与难以卸下的托底惯性",
        explanation:
          "你拥有极强的责任感与局势判断力。当团队或家庭出现混乱时，你总是那个本能站出来稳住局面、快速寻找解决方案的人。这种特质让你受人倚重，但也让你过早学会了‘不给别人添麻烦’。",
        manifestation:
          "在工作或生活出现卡点时，你第一反应不是找人分担，而是‘我来想办法’；即便别人主动提出帮忙，你也常常因为觉得‘交代清楚比自己做还累’而婉拒。",
        chartBasis: {
          palaceName: "震三宫（值符落宫）",
          symbols: "值符加天冲星，见伤门，天干癸加乙",
          symbolExplanation:
            "值符为八神之首主主导担当，天冲主锐意开拓与雷厉风行，伤门带有迎难而上的博弈锐气。三者汇聚于震宫，表明此人在群体中天然具备站上第一线的行动本能与护短担当。",
        },
        reflectionQuestion:
          "最近一次你感到身心俱疲的时候，是因为事情本身难以解决，还是因为你默认‘这件事只能由我扛到底’？",
      },
      {
        id: "tendency-2",
        title: "「严谨的漏洞雷达」，对未完成事项的隐性内耗",
        explanation:
          "你的洞察力非常敏锐，无论一份方案、一次对话还是一段关系，你都能以极快的速度捕捉到其中的潜在风险、不一致或未达标准的细节。这种敏锐让你输出高质量，但也让你很难真正享受当下的完成感。",
        manifestation:
          "一件事做到了 90 分，别人都在为你庆祝，但你的眼睛却停留在被扣掉的那 10 分上，甚至在夜深人静时反复推演‘如果当时那样处理会不会更稳妥’。",
        chartBasis: {
          palaceName: "兑七宫（惊门位）与坤二宫（天芮星）",
          symbols: "兑宫惊门见天柱星，坤宫天芮星临死门且逢空亡",
          symbolExplanation:
            "天柱主言辞与批判性思维，惊门主警觉与风险推敲，天芮为病星亦为‘检视之星’。这种配置往往反映出心智层面具备极强的审视本能，对瑕疵具有高敏感度。",
        },
        reflectionQuestion:
          "当你对自己感到不满时，这个苛求的声音究竟来自现在的现实需要，还是来自一种‘只有做到无懈可击我才安全’的深层假设？",
      },
      {
        id: "tendency-3",
        title: "「深藏的审慎边界」，用理性与分寸抵御未知的依赖",
        explanation:
          "你对人真诚且有分寸，善于倾听和体谅他人，但你在真正向外交付信任时极其谨慎。你宁愿把许多感受消化在腹中，也不愿在没有十足把握前让别人看到你的摇摆或窘迫。",
        manifestation:
          "在亲近关系中，遇到让你委屈或不解的事情，你倾向于先退回自己的保护壳里‘冷静分析’，表面波澜不惊，实际上内心已经在权衡这段互动的长远价值。",
        chartBasis: {
          palaceName: "巽四宫（杜门）与坎一宫（太阴休门）",
          symbols: "巽宫天辅杜门临九天，坎宫天蓬休门临太阴",
          symbolExplanation:
            "杜门主深潜保密与防线，太阴主细腻隐匿与深沉思量，休门代表对内在安宁的追求。这意味着你在精神层面有极强的私人领地意识，不愿情绪轻易暴露在无序环境里。",
        },
        reflectionQuestion:
          "是否有一些你从未对任何人吐露过的真实困惑，不是因为无人可说，而是担心一旦说出口就会失去对局面的掌控？",
      },
    ];
  }

  private getRepeatingPattern(topic: FocusTopic) {
    switch (topic) {
      case "career_direction":
        return {
          title: "「高能拓荒 → 揽责过载 → 隐秘倦怠 → 突然抽离」",
          causalDescription:
            "因为天生具备开拓与排障能力，在项目初期往往迅速成为核心支柱；但随着责任边界不断外延，你未能及时建立权力与精力的分流机制，而是选择硬扛；当体力和心力触碰到极限时，内心会滋生强烈的‘不被理解’感与幻灭感，进而产生想要彻底换个环境或突然抽离的冲动。",
          impactArea: "长线事业耐力、团队授权与合伙人关系",
          awarenessTrigger: "当你开始对周围人的‘低标准’产生不耐烦，并觉得自己必须事必躬亲时，这个模式就已经启动了。",
        };
      case "relationship":
        return {
          title: "「主动照拂 → 隐忍期待 → 失望积压 → 冷处理退场」",
          causalDescription:
            "在关系建立之初，你习惯用体贴、周到和高情商去照料对方；你内心暗暗希望对方也能用同样的细腻来感知你的需求，但你却从不直接开口索要；当对方因粗心未能回应时，你不会当场发作，而是默默在心里扣分；等到扣完最后一分，你便决绝地拉下心门，让对方错愕‘怎么突然变了个人’。",
          impactArea: "亲密关系深度、深度信任与真实依恋",
          awarenessTrigger: "当你产生‘我都做到这个份上了，难道还需要我明说吗’的念头时，需警惕隐性期待正在侵蚀关系。",
        };
      default:
        return {
          title: "「自我设限的最优解困局」",
          causalDescription:
            "因为具备极强的全局洞察与漏洞预警能力，你在做选择前本能地试图将所有未知变量推演清楚；这种对‘绝对确定性’的追求，反过来大幅抬高了行动的启动门槛；结果往往是将精力消耗在脑内的多线推演中，甚至因为担心次优结果而延后甚至搁置了最有价值的尝试。",
          impactArea: "人生关键转折点的行动速度与内在自信",
          awarenessTrigger: "当一个决策在你的待办清单里停留超过两周，且理由始终是‘还需要再补充一些信息/准备得更充分一些’时。",
        };
    }
  }

  private getFocusQuestions(topic: FocusTopic, specificQuestion?: string): string[] {
    const list = [
      "如果允许你在当前最困扰的这件事情上只保留 60% 的控制力，剩下 40% 允许不可控，你会优先释放哪一部分？",
      "你在过去人生中最有成就感的时刻，究竟是因为‘解决了多大的难题’，还是因为‘真正表达了真实的自我’？",
    ];

    if (specificQuestion && specificQuestion.trim().length > 0) {
      list.push(
        `针对你补充提到的「${specificQuestion.slice(0, 30)}${specificQuestion.length > 30 ? "..." : ""}」：如果抛开‘怎样做最正确’的理性权衡，你内心深处最渴望发生的哪怕微小的转变是什么？`
      );
    } else {
      list.push("在接下来的一个月里，有哪一段关系或哪一项责任，是你即使现在放下，天也不会塌下来的？");
    }

    return list;
  }

  private getActionableExperiment(topic: FocusTopic) {
    return {
      title: "「48小时不主动托底」微实验",
      description:
        "在未来48小时内，挑选一件并非生死攸关、但日常你习惯立刻介入提醒或代劳的事情（例如团队中某项琐碎跟进，或家庭中的某次细节安排）。\n当看到别人即将遗漏或进展不如你预期时，尝试克制住介入的冲动，深呼吸 3 次，仅仅以温和客观的眼光观察：如果我不出手，实际的最坏结果究竟是什么？",
      duration: "建议执行周期：48 小时",
      expectedOutcome:
        "你会亲自验证一个事实：世界并没有因为你松了一口气而停转，而你省下的精力，正是你重新找回内在从容的第一把钥匙。",
    };
  }
}

export const defaultAnalysisProvider = new StructuredRuleAnalysisProvider();

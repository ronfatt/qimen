"use client";

import React, { useState } from "react";
import {
  X,
  Cpu,
  Layers,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  GitBranch,
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "architecture" | "negotiation" | "pipeline";
}

export default function ArchitectureModal({
  isOpen,
  onClose,
  defaultTab = "architecture",
}: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "negotiation" | "pipeline">(
    defaultTab
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* 模态框主体 */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F2] text-[#131513] rounded-3xl shadow-2xl border border-[#D9CEB2] flex flex-col overflow-hidden">
        {/* 顶部标题栏 */}
        <div className="p-5 sm:p-6 border-b border-[#E8DEC7] bg-[#F2EDE1]/90 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#131513] text-amber-200">
                #09 奇门遁甲
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ● LIVE 线上作品
              </span>
              <span className="text-[10px] font-mono text-[#8C7A58] uppercase flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-[#C92A2A]" />
                <span>AI ENGINE PROTOTYPE</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#131513]">
              系统架构与商业谈判演示逻辑
            </h2>
            <p className="text-xs text-[#52574F] font-serif">
              把九宫八神、九星八门的复杂时空盘，转化为商业谈判与竞争决策的清晰行动指南。
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#D5D4CC] flex items-center justify-center text-[#131513] hover:border-[#C92A2A] hover:text-[#C92A2A] transition flex-shrink-0 shadow-sm"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 导航标签切换 */}
        <div className="flex border-b border-[#E8DEC7] bg-[#EAE3D2]/50 px-4 sm:px-6 text-xs font-serif font-bold">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === "architecture"
                ? "border-[#C92A2A] text-[#C92A2A]"
                : "border-transparent text-[#61685F] hover:text-[#131513]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>系统四层架构 (Architecture)</span>
          </button>

          <button
            onClick={() => setActiveTab("negotiation")}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === "negotiation"
                ? "border-[#C92A2A] text-[#C92A2A]"
                : "border-transparent text-[#61685F] hover:text-[#131513]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>商业谈判演示逻辑 (Strategy)</span>
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === "pipeline"
                ? "border-[#C92A2A] text-[#C92A2A]"
                : "border-transparent text-[#61685F] hover:text-[#131513]"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>数据流与可靠性 (Pipeline)</span>
          </button>
        </div>

        {/* 模态框正文滚动区 */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs text-[#2A2E26] leading-relaxed font-serif">
          {/* TAB 1: 系统四层架构 */}
          {activeTab === "architecture" && (
            <div className="space-y-4 animate-fadeIn">
              {/* 层级 1 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black text-[#C92A2A]">
                    LAYER 01 / ASTRONOMY & EPHEMERIS
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF9F5] text-[#52574F] border border-[#E2E1DA]">
                    天文授时与干支历法层
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm text-[#131513]">
                  高精度定气节气与真太阳时校准
                </h4>
                <p className="text-[11px] text-[#52574F]">
                  引入中国传统二十四节气定气法历法引擎（精确至分秒交接时刻），依据日干支符头（子午卯酉上元、寅申巳亥中元、辰戌丑未下元）与交节严密裁定阴阳遁局数，彻底告别粗放机械计算。
                </p>
              </div>

              {/* 层级 2 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black text-[#0C5A43]">
                    LAYER 02 / HIGH-DIMENSIONAL QIMEN ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF9F5] text-[#52574F] border border-[#E2E1DA]">
                    时家转盘奇门数理演算层
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm text-[#131513]">
                  九宫飞泊、三奇六仪与星门神全盘运转
                </h4>
                <p className="text-[11px] text-[#52574F]">
                  实现地盘戊己庚辛壬癸丁丙乙顺逆飞布、时柱寻旬首索定值符星与值使门；天盘九星随时干顺转八宫，人盘八门数时支环布，八神神盘阳顺阴逆加临；自动计算空亡、驿马、门迫（门克宫）与六仪击刑。
                </p>
              </div>

              {/* 层级 3 */}
              <div className="p-4 rounded-2xl bg-[#131513] text-white border border-[#2D332D] shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black text-amber-300">
                    LAYER 03 / STRATEGIC & COGNITIVE MODEL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#222822] text-amber-200 border border-[#3E473E]">
                    商业战略决策与认知镜像模型
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm text-white">
                  时空势能转化：商业谈判主客战术与心理防线
                </h4>
                <p className="text-[11px] text-[#A8B0A8]">
                  将九宫星门神转化为商业与个人行动策略：提取「主客动向率先发 vs 后发」、「谈判桌优选座次方位」、「对手隐秘软肋识别」与「心智卡点觉察」，将抽象玄学数术降维为清晰理性的决策指导。
                </p>
              </div>

              {/* 层级 4 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black text-[#8C7A58]">
                    LAYER 04 / INTERACTION & EXPERIENCE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF9F5] text-[#52574F] border border-[#E2E1DA]">
                    国际艺术级移动优先界面
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm text-[#131513]">
                  东方金石朱砂浓墨视觉 × 实时时钟起局 × 严密沙箱
                </h4>
                <p className="text-[11px] text-[#52574F]">
                  以 390px 手机屏极致适配为基准，融合洛书九宫、太极罗盘、朱砂印章；支持客户端秒级实时起局与本地隐私单设备安全存储，预留导师咨询双向工作台通道。
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: 商业谈判演示逻辑 */}
          {activeTab === "negotiation" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#EBF5F1] border border-[#BCE1D4] text-[#0C5A43] space-y-2">
                <div className="flex items-center space-x-2 font-serif font-black text-sm">
                  <Compass className="w-4 h-4 text-[#0C5A43]" />
                  <span>商业谈判核心定律：主客动向与先发后发</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#234A39]">
                  奇门首重“主客之机”：<strong>先动者为客，后动者为主；主动出击者为客，以静待变者为主。</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px]">
                  <div className="p-3 rounded-xl bg-white/90 border border-[#CEEADB] space-y-1">
                    <span className="font-bold text-[#0C5A43] block">我方为客（主动出击/提价）</span>
                    <p className="text-[#3A574A]">
                      看天盘值符星与时干落宫。若临生门、开门，且天盘五行克地盘，利于先发制人、主动报价。
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/90 border border-[#CEEADB] space-y-1">
                    <span className="font-bold text-[#0C5A43] block">我方为主（静守谈判/防御）</span>
                    <p className="text-[#3A574A]">
                      看地盘六仪与坐堂之宫。若地盘旺相逢生门或杜门，宜后发制人，待对方先漏底牌再还击。
                    </p>
                  </div>
                </div>
              </div>

              {/* 谈判座次地利 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
                <h4 className="font-serif font-black text-sm text-[#131513]">
                  谈判桌方位与座次地利学
                </h4>
                <ul className="space-y-2 text-[11px] text-[#52574F]">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-[#C92A2A] font-bold">1. 背生向死：</span>
                    <span>
                      我方落座背靠局中【生门】或【开门】方位（吸收生发贵人吉气），使对方正对【死门】或【伤门】方位，从心理与场能上占据主导气场。
                    </span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-[#C92A2A] font-bold">2. 避开门迫刑伤位：</span>
                    <span>
                      若局中某方位出现【门迫】（如开门落震木）或【击刑】，切忌选择该方位作为重要协议签署地或核心谈判桌席位。
                    </span>
                  </li>
                </ul>
              </div>

              {/* 对手心理透视 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
                <h4 className="font-serif font-black text-sm text-[#131513]">
                  对手心理防线与破局抓手
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E4E3DB]">
                    <span className="font-bold text-[#131513] block">对手见【杜门】</span>
                    <p className="text-[#656E63] text-[10px]">
                      对方暗留底牌，不肯坦白真实预算或技术指标。宜用第三方背书打破僵局。
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E4E3DB]">
                    <span className="font-bold text-[#131513] block">对手见【惊门】</span>
                    <p className="text-[#656E63] text-[10px]">
                      对方看似言辞锋利，实则内心焦虑存疑。给出确定性合规保障即可攻克。
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E4E3DB]">
                    <span className="font-bold text-[#131513] block">对手见【空亡】</span>
                    <p className="text-[#656E63] text-[10px]">
                      对方决策人不在场或权力悬空，切忌催促签约，需找准真正拍板人。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 数据流与接口规范 */}
          {activeTab === "pipeline" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-3 font-mono text-[11px]">
                <div className="font-bold text-[#131513] font-serif text-sm">
                  数据流管道（Data Pipeline Flow）
                </div>
                <div className="space-y-2 text-[#434840]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E2E1DA] flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#131513] text-white text-[10px]">1</span>
                    <span>Client Click (Time: ISO-8601) → `CurrentMomentService`</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E2E1DA] flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#131513] text-white text-[10px]">2</span>
                    <span>`DynamicQimenEngine.calculateChart()` → 算定四柱八字、局数、九宫矩阵</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E2E1DA] flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#131513] text-white text-[10px]">3</span>
                    <span>`CurrentMomentService` 综合值符/值使/生门/门迫 → 生成商业策略与行动指引</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E2E1DA] flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#131513] text-white text-[10px]">4</span>
                    <span>UI Layer (`/moment` & `/`) 极速渲染九宫格与决策卡片，支持随时刷新</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2 text-xs">
                <span className="font-serif font-black text-sm text-[#131513] block">
                  严密保密与边缘计算优势
                </span>
                <p className="text-[11px] text-[#52574F] leading-relaxed">
                  商业谈判与个人隐私极度敏感。本系统核心排盘算法与决策分析逻辑全部运行于轻量化客户端/Edge边缘服务，不需要将商业敏感问题上传至中心化未加密数据库，彻底避免泄密隐患。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 底部行动栏 */}
        <div className="p-4 sm:p-5 border-t border-[#E8DEC7] bg-[#F2EDE1]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#6E756B] font-serif">
            正统时家转盘奇门 · 商业博弈与认知决策系统
          </div>

          <button
            onClick={onClose}
            className="btn-cinnabar px-7 py-2.5 text-xs font-serif font-bold shadow-sm"
          >
            返回体验 App
          </button>
        </div>
      </div>
    </div>
  );
}

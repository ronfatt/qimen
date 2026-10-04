"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  currentMomentService,
  CurrentMomentAnalysis,
} from "@/services/analysis/current-moment-service";
import NinePalaceGrid from "@/components/chart/NinePalaceGrid";
import {
  Clock,
  RotateCw,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function CurrentMomentPage() {
  const [analysis, setAnalysis] = useState<CurrentMomentAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMomentChart = async () => {
    setRefreshing(true);
    try {
      const res = await currentMomentService.generateCurrentMomentChart(new Date());
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMomentChart();
  }, []);

  if (loading || !analysis) {
    return (
      <div className="py-28 text-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#131513] border-t-[#C92A2A] animate-spin mx-auto" />
        <p className="text-xs font-mono text-[#767973]">正在演算此刻天地时空局...</p>
      </div>
    );
  }

  const { chartResult } = analysis;

  return (
    <div className="space-y-8 pb-28 max-w-4xl mx-auto">
      {/* 顶部标语与说明 */}
      <div className="space-y-2 border-b border-[#E2E1DA] pb-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2">
            <span className="seal-stamp px-2 py-0.5 text-[10px] font-serif font-black">
              天时即局
            </span>
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#8C7A58] uppercase">
              TEMPORAL ORACULAR MOMENT
            </span>
          </div>

          {/* 重新刷新起局按钮 */}
          <button
            onClick={fetchMomentChart}
            disabled={refreshing}
            className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full border border-[#D5D4CC] bg-white text-xs font-serif font-bold text-[#131513] hover:border-[#C92A2A] hover:text-[#C92A2A] transition disabled:opacity-50 shadow-sm"
          >
            <RotateCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "正在重新起局..." : "刷新此刻起局"}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#131513]">
          当下时空命盘 · 势局与行动指引
        </h1>

        <p className="text-xs text-[#52574F] font-serif leading-relaxed">
          根据您访问的当下一刻，自动捕捉确切时间并推演天地八字与奇门遁甲盘。洞悉当前天时气机，提供此时此刻的吉凶利弊与行动建议。
        </p>
      </div>

      {/* 非个人盘性质说明条 */}
      <div className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] text-xs text-[#454842] flex items-start space-x-3 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-[#C92A2A] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-[11px] leading-relaxed">
          <span className="font-bold text-[#131513] block">
            【非个人出生盘 · 实时时空盘说明】
          </span>
          <p>
            本盘反映的是<strong>此时此刻整个时空的宏观气象</strong>（天时与事态门户），用于日常问事决策、把握当前节奏、选择吉顺方位与避开冲突陷阱。若需查看您终身心智模式，请前往「探索自己」输入出生资料。
          </p>
        </div>
      </div>

      {/* A. 当下时空八字与排盘参数摘要 */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE9E1] pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#C92A2A]" />
            <h2 className="text-lg font-serif font-black text-[#131513]">
              A. 当下时空八字与局象
            </h2>
          </div>
          <span className="text-xs font-serif font-bold text-[#8C7A58]">
            {analysis.formattedSolar}
          </span>
        </div>

        {/* 四柱八字四联卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E4E3DB] text-center">
            <span className="text-[10px] text-[#767973] uppercase block mb-0.5">年柱 (岁运)</span>
            <span className="text-lg font-serif font-black text-[#131513]">
              {chartResult.fourPillars.year}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E4E3DB] text-center">
            <span className="text-[10px] text-[#767973] uppercase block mb-0.5">月柱 (节令)</span>
            <span className="text-lg font-serif font-black text-[#131513]">
              {chartResult.fourPillars.month}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E4E3DB] text-center">
            <span className="text-[10px] text-[#767973] uppercase block mb-0.5">日柱 (天元)</span>
            <span className="text-lg font-serif font-black text-[#C92A2A]">
              {chartResult.fourPillars.day}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E4E3DB] text-center">
            <span className="text-[10px] text-[#767973] uppercase block mb-0.5">时柱 (此刻机锋)</span>
            <span className="text-lg font-serif font-black text-[#131513]">
              {chartResult.fourPillars.hour}
            </span>
          </div>
        </div>

        {/* 奇门局象详细信息 */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE9E1] text-[11px] font-mono text-[#5C6057] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE9E1] pb-2">
            <div className="space-x-2">
              <span className="font-serif font-bold text-[#131513]">
                {chartResult.juNumber}
              </span>
              <span>· {analysis.formattedLunar}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#131513] text-[#FAF8F2] text-xs font-serif font-bold">
              实时正局
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#454942]">
            <div>首领值符：{chartResult.zhiFu}</div>
            <div>执行值使：{chartResult.zhiShi}</div>
            <div>此刻空亡：{chartResult.kongWang?.join("、") || "无"}</div>
            <div>此刻驿马：{chartResult.yiMa || "无"}</div>
          </div>
        </div>
      </section>

      {/* B. 当下时空势局核心气象 (深邃玄墨黑卡) */}
      <section className="bg-[#131513] text-white rounded-3xl p-7 sm:p-9 shadow-2xl space-y-5 border border-[#2D3028] relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-[#C92A2A] text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C92A2A]" />
            <span>B. 当下天时气场概括 / CURRENT MOMENT PULSE</span>
          </div>
          <span className="seal-stamp-filled text-[10px] px-2 py-0.5 font-serif font-bold">
            天机
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-relaxed">
          “{analysis.momentTheme}”
        </h3>

        <p className="text-xs text-[#A8B0A8] font-serif leading-relaxed">
          {analysis.energySummary}
        </p>

        {/* 值符与值使双栏透视 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#262A26] text-xs">
          <div className="p-4 rounded-2xl bg-[#1D211D] border border-[#2E332E] space-y-1">
            <span className="text-[10px] text-amber-300 font-serif font-bold block uppercase">
              天时主脉：{analysis.zhiFuAnalysis.star}（落{analysis.zhiFuAnalysis.palace}）
            </span>
            <p className="text-[11px] text-[#D2D6CC] leading-relaxed">
              {analysis.zhiFuAnalysis.guidance}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1D211D] border border-[#2E332E] space-y-1">
            <span className="text-[10px] text-emerald-300 font-serif font-bold block uppercase">
              人事门户：{analysis.zhiShiAnalysis.door}（落{analysis.zhiShiAnalysis.palace}）
            </span>
            <p className="text-[11px] text-[#D2D6CC] leading-relaxed">
              {analysis.zhiShiAnalysis.guidance}
            </p>
          </div>
        </div>
      </section>

      {/* C. 实时奇门九宫格 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#E2E1DA] pb-2">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-[#C92A2A]" />
            <h2 className="text-lg font-serif font-black text-[#131513]">
              C. 当下奇门九宫全景盘
            </h2>
          </div>
          <span className="text-xs font-serif text-[#767973]">
            点击宫位查看具体星门神与吉凶格局
          </span>
        </div>
        <NinePalaceGrid palaces={chartResult.palaces} />
      </section>

      {/* D. 方位地利吉凶指引 (东方对比双栏) */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white">
        <div className="flex items-center space-x-2 border-b border-[#EAE9E1] pb-3">
          <Compass className="w-4 h-4 text-[#C92A2A]" />
          <h2 className="text-lg font-serif font-black text-[#131513]">
            D. 此刻方位地利与吉凶指引
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 吉顺之方 */}
          <div className="p-5 rounded-2xl bg-[#EBF5F1] border border-[#BCE1D4] space-y-3">
            <div className="flex items-center space-x-2 text-[#0C5A43] font-serif font-black text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#0C5A43]" />
              <span>此刻宜向之吉方（生门 / 开门 / 休门）</span>
            </div>
            <div className="space-y-2">
              {analysis.directionsGuide.auspicious.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/80 border border-[#CEEADB] text-xs space-y-0.5"
                >
                  <span className="font-serif font-bold text-[#0C5A43] block">
                    {item.name}
                  </span>
                  <p className="text-[11px] text-[#334D41] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 慎守之方 */}
          <div className="p-5 rounded-2xl bg-[#FDF2F2] border border-[#F5CACA] space-y-3">
            <div className="flex items-center space-x-2 text-[#C92A2A] font-serif font-black text-sm">
              <AlertTriangle className="w-4 h-4 text-[#C92A2A]" />
              <span>此刻宜避之方（死门 / 惊门 / 门迫刑伤）</span>
            </div>
            <div className="space-y-2">
              {analysis.directionsGuide.cautionary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/80 border border-[#F8D2D2] text-xs space-y-0.5"
                >
                  <span className="font-serif font-bold text-[#C92A2A] block">
                    {item.name}
                  </span>
                  <p className="text-[11px] text-[#5A3333] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E. 当下行动策略与宜忌指南 */}
      <section className="clean-card p-6 sm:p-7 shadow-card space-y-5 bg-white">
        <div className="flex items-center space-x-2 border-b border-[#EAE9E1] pb-3">
          <Zap className="w-4 h-4 text-[#C92A2A]" />
          <h2 className="text-lg font-serif font-black text-[#131513]">
            E. 当下处事策略与行动宜忌
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* 宜 */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-2.5">
            <span className="font-serif font-black text-sm text-[#0C5A43] block">
              【此刻所宜 · 顺天时之动】
            </span>
            <ul className="space-y-2 text-[#2A2E26]">
              {analysis.actions.dos.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start space-x-1.5">
                  <span className="text-[#0C5A43] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 忌 */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-2.5">
            <span className="font-serif font-black text-sm text-[#C92A2A] block">
              【此刻所忌 · 避气机之冲】
            </span>
            <ul className="space-y-2 text-[#2A2E26]">
              {analysis.actions.donts.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start space-x-1.5">
                  <span className="text-[#C92A2A] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 此时此刻一分钟微行动 (松石翠墨底色) */}
        <div className="rounded-2xl p-5 bg-[#0C5A43] text-white border border-[#147053] space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
              1-MINUTE MINDFUL ACTION · 动中生机
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C92A2A] text-white font-bold">
              立即可做
            </span>
          </div>
          <h4 className="font-serif font-black text-base text-[#FAF8F2]">
            {analysis.actions.instantAction.title}
          </h4>
          <p className="text-xs text-[#E0EFEA] font-serif leading-relaxed">
            {analysis.actions.instantAction.content}
          </p>
        </div>
      </section>

      {/* F. 连接个人盘与老师咨询 */}
      <section className="rounded-3xl p-7 sm:p-9 shadow-2xl space-y-5 bg-[#131513] text-white border border-[#2D3028]">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#C92A2A] font-bold uppercase">
            PERSONAL DESTINY VS. TEMPORAL MOMENT
          </span>
          <h3 className="text-2xl font-serif font-black text-white">
            天时有定数，当事在人为
          </h3>
          <p className="text-xs text-[#A8B0A8] font-serif leading-relaxed max-w-xl">
            当下命盘是天地给出的时空背景。如果面临重大人生决策（如换工作、合伙投资、重大谈判），建议结合您本人的终身命盘，与资深老师进行 1 对 1 深入探讨。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href="/assessment"
            className="btn-cinnabar inline-flex items-center justify-center space-x-1.5 px-7 py-3.5 text-xs font-serif font-bold shadow-md"
          >
            <span>测算我的个人终身命盘</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/teachers"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#262824] text-white text-xs font-serif font-bold hover:bg-[#323630] transition border border-[#3E423A]"
          >
            <span>查看咨询老师名录</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

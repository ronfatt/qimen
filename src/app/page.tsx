import React from "react";
import Link from "next/link";
import { Compass, Sparkles, FileText, ArrowRight, ShieldCheck, HeartHandshake, Eye, HelpCircle } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl mx-auto pt-4 sm:pt-10">
        {/* Subtle tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-warm-200/80 border border-warm-300/60 text-xs text-moss-800">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 animate-pulse" />
          <span>现代心智镜像 · 奇门人生罗盘</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-bold text-moss-900 leading-snug tracking-tight">
          看见自己的模式，
          <br className="hidden sm:inline" />
          找到值得深入了解的方向。
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-ink-600 leading-relaxed max-w-xl mx-auto">
          从一份命盘开始，探索你的性格倾向、关系模式与当前关注。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/assessment"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-moss-800 text-warm-50 text-sm font-semibold hover:bg-moss-700 transition shadow-soft group"
          >
            <span>开始免费分析</span>
            <ArrowRight className="w-4 h-4 text-champagne-300 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/report/sample"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-white border border-[#DDD7C8] text-ink-700 text-sm font-medium hover:bg-warm-100 transition shadow-soft"
          >
            <FileText className="w-4 h-4 text-champagne-700" />
            <span>查看示例报告</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-200 text-ink-600">样例</span>
          </Link>
        </div>

        {/* Quiet Trust Note */}
        <p className="text-[11px] text-ink-400">
          无需注册登录 · 充分保护出生隐私 · 不作恐吓式断言
        </p>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-moss-900">
            一份报告能帮你理清什么？
          </h2>
          <p className="text-xs text-ink-500">
            不预测虚无缥缈的未来，专注映射当下真实的自我认知
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E4D7] shadow-soft space-y-3 relative overflow-hidden group hover:border-moss-600 transition">
            <div className="w-10 h-10 rounded-xl bg-moss-50 border border-moss-200 flex items-center justify-center text-moss-800">
              <Compass className="w-5 h-5 text-moss-800" />
            </div>
            <h3 className="font-serif font-bold text-base text-moss-900">
              你如何处理压力与责任
            </h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              剖析在面对混乱与重担时，你是倾向于前线硬扛、退回私人防线，还是在最优解与不确定性间消耗心力。
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E4D7] shadow-soft space-y-3 relative overflow-hidden group hover:border-moss-600 transition">
            <div className="w-10 h-10 rounded-xl bg-champagne-50 border border-champagne-200 flex items-center justify-center text-champagne-700">
              <HeartHandshake className="w-5 h-5 text-champagne-700" />
            </div>
            <h3 className="font-serif font-bold text-base text-moss-900">
              你在关系中的常见模式
            </h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              梳理互动中反复出现的防御、隐秘期待与沟通卡点，协助你理解自己为何在某些时刻会感到疲惫或失望。
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E4D7] shadow-soft space-y-3 relative overflow-hidden group hover:border-moss-600 transition">
            <div className="w-10 h-10 rounded-xl bg-warm-200 border border-warm-300 flex items-center justify-center text-ink-700">
              <HelpCircle className="w-5 h-5 text-moss-800" />
            </div>
            <h3 className="font-serif font-bold text-base text-moss-900">
              你目前值得厘清的问题
            </h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              结合你最关注的实际主题，提炼出 2–3 个具有穿透力的反思提问与一条微实验，交付实实在在的启发。
            </p>
          </div>
        </div>
      </section>

      {/* Human-Centered Consultation Intro */}
      <section className="rounded-2xl p-6 sm:p-8 bg-[#F5F2EB] border border-[#E5E0D0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-lg">
            <span className="text-[11px] font-medium text-champagne-700 uppercase tracking-wider">
              CONSULTATION IN DEPTH
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-moss-900">
              为什么还需要老师深入解读？
            </h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              命盘是一张结构地图，而你的实际经历才是真实的风景。老师的作用不是给你铁口直断，而是结合你的真实经历进一步追问、解释这些模式出现的背景，并探讨切实可行的调整方向。
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/teachers"
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
            >
              <span>浏览咨询老师</span>
              <ArrowRight className="w-3.5 h-3.5 text-champagne-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

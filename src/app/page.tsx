import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Compass } from "lucide-react";
import OrientalCompassMatrix from "@/components/home/OrientalCompassMatrix";
import LiveMomentWidget from "@/components/home/LiveMomentWidget";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section: Left Copy + Right Oriental Qimen Luo Pan Matrix */}
      <section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Micro Label with Red Seal */}
            <div className="inline-flex items-center space-x-2">
              <span className="seal-stamp px-2 py-0.5 text-[10px] font-serif font-black">
                观己正统
              </span>
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#8C7A58] uppercase">
                QIMEN METAPHYSICS · SELF DISCOVERY
              </span>
            </div>

            {/* Massive Bold Headline with Cinnabar Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-black text-[#131513] leading-[1.2] tracking-tight">
              你的下一步，
              <br />
              <span className="oriental-highlight my-1 font-serif">从看懂自己</span>
              <br />
              开始。
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#52574F] max-w-lg font-serif leading-relaxed">
              从奇门命盘出发，探索你的性格倾向、关系模式与当前关注。亦可随时洞悉当下天地气场与行动指南。
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/assessment"
                className="btn-cinnabar inline-flex items-center space-x-1 px-8 py-3.5 text-sm font-serif font-bold tracking-wide"
              >
                <span>开始个人分析</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/moment"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full border border-[#C92A2A] bg-white text-xs sm:text-sm font-serif font-bold text-[#C92A2A] hover:bg-[#FFF5F5] transition shadow-sm"
              >
                <Compass className="w-4 h-4 stroke-[2.5]" />
                <span>解读当下命盘</span>
              </Link>

              <Link
                href="/report/sample"
                className="inline-flex items-center space-x-1 text-xs font-serif font-bold text-[#767973] hover:text-[#C92A2A] transition px-3 py-2"
              >
                <span>查看示例报告</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Micro disclaimer */}
            <div className="text-[11px] font-serif text-[#8C9087]">
              传统文化视角 · 供自我探索参考
            </div>
          </div>

          {/* Right Hero Visual: Authentic Oriental Compass Matrix */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <OrientalCompassMatrix />
          </div>
        </div>
      </section>

      {/* 2. Full-Width Black Ticker Ribbon (东方云纹与格言条) */}
      <section className="-mx-5 sm:-mx-8">
        <div className="bg-[#131513] text-[#FAF8F2] py-3.5 px-6 sm:px-10 flex items-center justify-between overflow-hidden shadow-lg border-y border-[#2E332E]">
          {/* Ticker text */}
          <div className="text-xs sm:text-sm font-serif tracking-[0.2em] text-[#E8DEC7] font-bold truncate">
            天道酬勤 · 地道酬善 · 人道酬诚 · 局有定数 · 动存生机
          </div>

          {/* Traditional cloud & auspicious ornament */}
          <div className="hidden sm:flex items-center space-x-3 text-[#A89260] flex-1 max-w-xs mx-6">
            <div className="h-[1px] bg-[#3B423B] flex-1" />
            <span className="text-xs font-serif font-bold">☯ 观己心鉴 ☯</span>
            <div className="h-[1px] bg-[#3B423B] flex-1" />
          </div>

          {/* Cinnabar Seal Stamp on Ticker */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="seal-stamp-filled text-[10px] px-2 py-0.5 font-serif font-bold">
              吉局
            </span>
          </div>
        </div>
      </section>

      {/* 3. NEW: 当下命盘实时解读卡片 (非个人盘 · 实时秒级天时时空局) */}
      <section>
        <LiveMomentWidget />
      </section>

      {/* 4. Section: "你想先了解哪一面？" (Bold Oriental Cards) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#131513] tracking-tight">
            探索你的个人命盘
          </h2>
          <span className="seal-stamp text-[10px] px-2 py-0.5 font-serif font-bold hidden sm:inline-flex">
            问津之门
          </span>
        </div>

        {/* 3 Bold Oriental Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 01: 自我与性格 (Bold 朱砂丹红底色) */}
          <Link
            href="/assessment?topic=self_personality"
            className="group rounded-3xl p-6 sm:p-7 bg-[#C92A2A] text-white flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-seal"
          >
            {/* Background subtle cloud watermark */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none blur-xl" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-widest text-amber-200">01 / 心性</span>
                <span className="seal-stamp px-1.5 py-0.2 bg-red-900/70 border-amber-300/80 text-amber-200 text-[10px] font-serif font-bold">
                  识心
                </span>
              </div>
              <h3 className="text-2xl font-serif font-black tracking-tight text-white">
                自我与性格
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-serif">
                看见真实的自己，理解你的天赋、情绪与行为模式。
              </p>
            </div>

            {/* Bottom: Traditional Taiji Emblem + Circle Arrow */}
            <div className="flex items-end justify-between relative z-10 pt-4 border-t border-white/20">
              {/* Taiji / Compass Icon */}
              <div className="flex items-center space-x-2 text-white/90">
                <svg className="w-8 h-8 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 0 1-5.66-13.66A4 4 0 0 1 12 10a2 2 0 1 0 2-2 4 4 0 0 1 3.66 6.34A8 8 0 0 1 12 20Z" />
                  <circle cx="12" cy="7" r="1.5" fill="#C92A2A" />
                  <circle cx="12" cy="17" r="1.5" fill="#FDE68A" />
                </svg>
                <span className="text-[11px] font-serif font-bold">明察心性</span>
              </div>

              {/* White Circle Arrow */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C92A2A] shadow-md group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* Card 02: 关系与沟通 (温润宣纸绢白底色) */}
          <Link
            href="/assessment?topic=relationship"
            className="group rounded-3xl p-6 sm:p-7 bg-white text-[#131513] border border-[#E5DEC9] flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-orientalCard"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-widest text-[#8C7A58]">02 / 互动</span>
                <span className="seal-stamp px-1.5 py-0.2 text-[10px] font-serif font-bold">
                  和合
                </span>
              </div>
              <h3 className="text-2xl font-serif font-black tracking-tight text-[#131513]">
                关系与沟通
              </h3>
              <p className="text-xs text-[#52574F] leading-relaxed font-serif">
                看清你与重要他人的互动模式，建立更自在的关系。
              </p>
            </div>

            {/* Bottom: Jade Bi / Interlocking Circles + Circle Arrow */}
            <div className="flex items-end justify-between relative z-10 pt-4 border-t border-[#F0EBE0]">
              <div className="flex items-center space-x-2 text-[#52574F]">
                {/* Intertwined Jade Rings Symbol */}
                <svg className="w-8 h-8 text-[#0C5A43]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="16" r="8" />
                  <circle cx="20" cy="16" r="8" />
                </svg>
                <span className="text-[11px] font-serif font-bold">贵人相契</span>
              </div>

              {/* Border Circle Arrow */}
              <div className="w-10 h-10 rounded-full border border-[#D9CEB2] bg-[#FAF8F2] flex items-center justify-center text-[#131513] group-hover:border-[#C92A2A] group-hover:text-[#C92A2A] transition">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* Card 03: 事业与方向 (苍劲焦墨玄黑底色) */}
          <Link
            href="/assessment?topic=career_direction"
            className="group rounded-3xl p-6 sm:p-7 bg-[#131513] text-white flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-widest text-amber-400">03 / 势局</span>
                <span className="seal-stamp px-1.5 py-0.2 bg-neutral-900 border-amber-400/80 text-amber-300 text-[10px] font-serif font-bold">
                  开山
                </span>
              </div>
              <h3 className="text-2xl font-serif font-black tracking-tight text-white">
                事业与方向
              </h3>
              <p className="text-xs text-[#A8B0A8] leading-relaxed font-serif">
                梳理你的内在驱动力，找到更适合自己的发展路径。
              </p>
            </div>

            {/* Bottom: Misty Mountain Gold Peak + Circle Arrow */}
            <div className="flex items-end justify-between relative z-10 pt-4 border-t border-neutral-800">
              <div className="flex items-center space-x-2 text-amber-300">
                {/* Traditional Mountain Ridge Crest Symbol */}
                <svg className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3 L2 21 L8 21 L12 13 L16 21 L22 21 Z" opacity="0.9" />
                  <path d="M7 14 L12 6 L17 14 Z" opacity="0.6" fill="#FBBF24" />
                </svg>
                <span className="text-[11px] font-serif font-bold">生门破局</span>
              </div>

              {/* Circle Arrow with Gold Sheen */}
              <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center text-amber-300 group-hover:border-amber-400 transition">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Bottom Concierge Banner Card ("有些问题，值得聊深一点。") */}
      <section>
        <div className="oriental-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white border border-[#E5DEC9]">
          <div className="flex items-center space-x-4">
            {/* Left Seal Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#FFF5F5] border border-[#C92A2A] flex items-center justify-center text-[#C92A2A] flex-shrink-0 shadow-sm">
              <span className="font-serif font-black text-xl">问</span>
            </div>

            {/* Center Content */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-base sm:text-lg font-serif font-black text-[#131513]">
                  有些问题，值得聊深一点。
                </h4>
                <span className="seal-stamp text-[9px] px-1.5 py-0.2">导师点拨</span>
              </div>
              <p className="text-xs text-[#636E63] font-serif leading-relaxed">
                连接有经验的老师，从你的命盘出发，获得更个性化的解读与建议。
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0 self-end sm:self-center">
            <Link
              href="/teachers"
              className="btn-ink inline-flex items-center space-x-1.5 px-7 py-3 text-xs font-serif font-bold shadow-md hover:bg-[#C92A2A] transition-colors"
            >
              <span>连接老师</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

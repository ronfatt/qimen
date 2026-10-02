import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import HeroTileMatrix from "@/components/home/HeroTileMatrix";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section (Left Copy + Right 3x3 Ceramic Matrix) */}
      <section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Micro Label */}
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#71746D] uppercase">
              QIMEN · SELF DISCOVERY
            </div>

            {/* Massive Punchy Headline with Highlight Pill */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#111211] leading-[1.18] tracking-tight">
              你的下一步，
              <br />
              <span className="highlight-pill my-1">从看懂自己</span>
              <br />
              开始。
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#52554E] max-w-lg font-medium leading-relaxed">
              从奇门命盘出发，探索你的性格与关系模式。
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/assessment"
                className="btn-lime inline-flex items-center space-x-1 px-8 py-3.5 text-sm font-bold"
              >
                <span>开始免费分析</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/report/sample"
                className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#111211] hover:text-[#52554E] transition px-3 py-2"
              >
                <span>查看示例报告</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro disclaimer */}
            <div className="text-[11px] text-[#868A82]">
              传统文化视角 · 供自我探索参考
            </div>
          </div>

          {/* Right Hero Visual: 3x3 3D Soft Ceramic Matrix */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroTileMatrix />
          </div>
        </div>
      </section>

      {/* 2. Full-Width Black Ticker Ribbon */}
      <section className="-mx-4 sm:-mx-8">
        <div className="ticker-ribbon py-3 px-6 sm:px-10 flex items-center justify-between overflow-hidden shadow-md">
          {/* Ticker text */}
          <div className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#F3F2EC] uppercase font-semibold truncate">
            READ YOUR PATTERNS. OWN YOUR NEXT MOVE.
          </div>

          {/* Star & Line Divider */}
          <div className="hidden sm:flex items-center space-x-3 text-neutral-400 flex-1 max-w-xs mx-6">
            <div className="h-[1px] bg-neutral-700 flex-1" />
            <svg className="w-3 h-3 text-[#D4F53C]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
            </svg>
            <div className="h-[1px] bg-neutral-700 flex-1" />
          </div>

          {/* 3 Status Dots (Lime + White + White) */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4F53C]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* 3. Section: "你想先了解哪一面？" */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111211] tracking-tight">
          你想先了解哪一面？
        </h2>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 01: 自我与性格 (Acid Lime Green Background) */}
          <Link
            href="/assessment?topic=self_personality"
            className="group rounded-3xl p-6 sm:p-7 bg-[#D4F53C] text-[#111211] flex flex-col justify-between space-y-8 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-card"
          >
            <div className="space-y-3 relative z-10">
              <div className="text-sm font-black font-mono">01</div>
              <h3 className="text-2xl font-black tracking-tight">自我与性格</h3>
              <p className="text-xs text-[#2A2E16] leading-relaxed max-w-[200px] font-medium">
                看见真实的自己，理解你的天赋、情绪与行为模式。
              </p>
            </div>

            {/* Graphic + Circular Arrow Button */}
            <div className="flex items-end justify-between relative z-10 pt-4">
              {/* Graphic: Dark Celestial Sphere with Lime Orbit */}
              <div className="relative w-20 h-20 -mb-2">
                <div className="w-16 h-16 rounded-full bg-[#181A18] shadow-md" />
                <div className="absolute top-1 -right-1 w-14 h-14 rounded-full border border-black/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#111211]" />
              </div>

              {/* White Circle Arrow */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#111211] shadow-sm group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 02: 关系与沟通 (Clean White Background) */}
          <Link
            href="/assessment?topic=relationship"
            className="group rounded-3xl p-6 sm:p-7 bg-white text-[#111211] border border-[#E2E1DA] flex flex-col justify-between space-y-8 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-card"
          >
            <div className="space-y-3 relative z-10">
              <div className="text-sm font-black font-mono text-[#8C9087]">02</div>
              <h3 className="text-2xl font-black tracking-tight">关系与沟通</h3>
              <p className="text-xs text-[#5C6057] leading-relaxed max-w-[200px]">
                看清你与重要他人的互动模式，建立更自在的关系。
              </p>
            </div>

            {/* Graphic + Circular Arrow Button */}
            <div className="flex items-end justify-between relative z-10 pt-4">
              {/* Graphic: Translucent Interlocking Circles & Dark Sphere */}
              <div className="relative w-20 h-20 -mb-2">
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-purple-100/80 border border-purple-200/50" />
                <div className="absolute bottom-0 right-2 w-14 h-14 rounded-full bg-[#202220] shadow-md" />
                <div className="absolute top-2 left-6 w-10 h-10 rounded-full border border-gray-400/40" />
              </div>

              {/* Outline Circle Arrow */}
              <div className="w-10 h-10 rounded-full border border-[#D5D4CC] bg-[#F7F6F2] flex items-center justify-center text-[#111211] group-hover:border-[#111211] group-hover:bg-white transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 03: 事业与方向 (Obsidian Dark Background) */}
          <Link
            href="/assessment?topic=career_direction"
            className="group rounded-3xl p-6 sm:p-7 bg-[#1A1C1A] text-white flex flex-col justify-between space-y-8 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-card"
          >
            <div className="space-y-3 relative z-10">
              <div className="text-sm font-black font-mono text-[#767A73]">03</div>
              <h3 className="text-2xl font-black tracking-tight">事业与方向</h3>
              <p className="text-xs text-[#A2A69D] leading-relaxed max-w-[200px]">
                梳理你的内在驱动力，找到更适合自己的发展路径。
              </p>
            </div>

            {/* Graphic + Circular Arrow Button */}
            <div className="flex items-end justify-between relative z-10 pt-4">
              {/* Graphic: Bauhaus Stepped Minimalist Staircase with Floating Orb */}
              <div className="relative w-24 h-20 -mb-2">
                {/* Floating white sphere */}
                <div className="absolute top-0 right-4 w-9 h-9 rounded-full bg-gradient-to-tr from-gray-300 via-gray-100 to-white shadow-lg" />
                {/* Stepped platform */}
                <div className="absolute bottom-0 left-0 w-24 h-12">
                  <div className="absolute bottom-0 left-0 w-8 h-4 bg-[#353935]" />
                  <div className="absolute bottom-0 left-8 w-8 h-8 bg-[#444944]" />
                  <div className="absolute bottom-0 left-16 w-8 h-12 bg-[#555C55]" />
                </div>
              </div>

              {/* Dark Outline Circle Arrow */}
              <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800/80 flex items-center justify-center text-white group-hover:border-white transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Bottom Concierge Banner Card ("有些问题，值得聊深一点。") */}
      <section>
        <div className="clean-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white">
          <div className="flex items-center space-x-4">
            {/* Left Silhouette Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#E5E4DC] flex items-center justify-center flex-shrink-0">
              <svg className="w-9 h-9 text-[#858880]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            {/* Center Content */}
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#111211]">
                有些问题，值得聊深一点。
              </h4>
              <p className="text-xs text-[#6B6E66] leading-relaxed">
                连接有经验的老师，从你的命盘出发，获得更个性化的解读与建议。
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0 self-end sm:self-center">
            <Link
              href="/teachers"
              className="btn-dark inline-flex items-center space-x-1.5 px-6 py-3 text-xs"
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

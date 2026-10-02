import React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles, Eye, ArrowRight } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-12">
      {/* Avant-Garde Hero Section */}
      <section className="relative text-center sm:text-left max-w-4xl mx-auto pt-6 sm:pt-14 space-y-8">
        {/* Curatorial Header Tag */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pb-4 border-b border-canvas-200">
          <div className="inline-flex items-center space-x-2 text-editorial-800">
            <span className="w-2 h-2 rounded-full bg-gold-600 animate-ping" />
            <span className="editorial-tag text-gold-700">
              ORACULAR COGNITION ARCHIVE · ISSUE 01
            </span>
          </div>

          <div className="editorial-tag text-editorial-500 hidden sm:block">
            LAT 3.1390° N · LON 101.6869° E
          </div>
        </div>

        {/* Massive Editorial Headline */}
        <div className="space-y-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-editorial-950 font-normal leading-[1.12] tracking-tight">
            看见自己的模式，
            <br />
            <span className="italic font-serif text-editorial-800 underline decoration-gold-400 decoration-1 underline-offset-8">
              找到值得深入了解的方向。
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-editorial-600 max-w-2xl leading-relaxed pt-2">
            从一份命盘开始，探索你的性格倾向、关系模式与当前关注。
          </p>
        </div>

        {/* Haute Couture Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <Link
            href="/assessment"
            className="btn-haute group flex items-center justify-between sm:justify-center space-x-4 px-8 py-4 rounded-full bg-editorial-950 text-gold-200 text-sm font-semibold tracking-wider uppercase hover:bg-editorial-900 border border-editorial-800 shadow-haute"
          >
            <span>开始免费分析</span>
            <span className="w-6 h-6 rounded-full bg-editorial-800 flex items-center justify-center text-gold-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/report/sample"
            className="group flex items-center justify-between sm:justify-center space-x-3 px-7 py-4 rounded-full bg-white border border-canvas-300 text-editorial-800 text-sm font-medium hover:border-gold-600 transition shadow-gallery"
          >
            <span className="editorial-tag text-gold-700 text-[10px]">EXHIBIT</span>
            <span>查看示例报告</span>
            <span className="w-1.5 h-1.5 rounded-full bg-canvas-400 group-hover:bg-gold-500 transition-colors" />
          </Link>
        </div>

        {/* Quiet Footnote */}
        <div className="pt-2 flex items-center justify-center sm:justify-start space-x-4 text-[11px] font-mono text-editorial-500">
          <span>· 无需注册</span>
          <span>· 严守出生隐私</span>
          <span>· 拒绝恐吓式命理断言</span>
        </div>
      </section>

      {/* 3 Core Value Exhibits (Curated Rooms) */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-canvas-200 pb-4 gap-2">
          <div>
            <span className="editorial-tag text-gold-700">CURATED PERSPECTIVES</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-editorial-950 font-normal mt-1">
              一份报告能帮你理清什么？
            </h2>
          </div>
          <span className="text-xs font-mono text-editorial-500">
            [ 01 / 02 / 03 DIMENSIONS ]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Exhibit 01 */}
          <div className="gallery-card rounded-2xl p-7 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gold-700">ROOM 01</span>
                <span className="text-[10px] font-mono uppercase text-editorial-400">STRESS & DUTY</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-editorial-950 leading-snug">
                你如何处理
                <br />
                压力与责任
              </h3>
              <p className="text-xs text-editorial-600 leading-relaxed">
                剖析在面对混乱与重担时，你是倾向于前线硬扛、退回私人防线，还是在最优解与不确定性间消耗心力。
              </p>
            </div>
            <div className="pt-4 border-t border-canvas-100 flex items-center justify-between text-[11px] font-mono text-editorial-500">
              <span>EXPLORE COPING</span>
              <span>→</span>
            </div>
          </div>

          {/* Exhibit 02 */}
          <div className="gallery-card rounded-2xl p-7 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gold-700">ROOM 02</span>
                <span className="text-[10px] font-mono uppercase text-editorial-400">ATTACHMENT</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-editorial-950 leading-snug">
                你在关系中的
                <br />
                常见模式
              </h3>
              <p className="text-xs text-editorial-600 leading-relaxed">
                梳理互动中反复出现的防御、隐秘期待与沟通卡点，协助你理解自己为何在某些时刻会感到疲惫或失望。
              </p>
            </div>
            <div className="pt-4 border-t border-canvas-100 flex items-center justify-between text-[11px] font-mono text-editorial-500">
              <span>EXPLORE ATTACHMENT</span>
              <span>→</span>
            </div>
          </div>

          {/* Exhibit 03 */}
          <div className="gallery-card rounded-2xl p-7 flex flex-col justify-between space-y-6 relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gold-700">ROOM 03</span>
                <span className="text-[10px] font-mono uppercase text-editorial-400">INQUIRY</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-editorial-950 leading-snug">
                你目前值得
                <br />
                厘清的问题
              </h3>
              <p className="text-xs text-editorial-600 leading-relaxed">
                结合你最关注的实际主题，提炼出 2–3 个具有穿透力的反思提问与一条微实验，交付实实在在的启发。
              </p>
            </div>
            <div className="pt-4 border-t border-canvas-100 flex items-center justify-between text-[11px] font-mono text-editorial-500">
              <span>EXPLORE ACTION</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Dialogue Atelier Banner */}
      <section className="max-w-4xl mx-auto rounded-3xl bg-editorial-950 text-gold-100 p-8 sm:p-12 relative overflow-hidden shadow-haute border border-editorial-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="editorial-tag text-gold-400">
              DIALOGUE ATELIER · 1-ON-1
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-canvas-pure font-normal leading-tight">
              为什么还需要老师深入解读？
            </h3>
            <p className="text-xs sm:text-sm text-canvas-300 leading-relaxed">
              命盘是一张抽象的几何地图，而你的实际经历才是真实的风景。老师的作用不是给你铁口直断，而是结合你的真实经历进一步追问、解释这些模式出现的背景，并探讨切实可行的调整方向。
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/teachers"
              className="btn-haute inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-gold-500 text-editorial-950 text-xs font-bold tracking-wider uppercase hover:bg-gold-400 transition"
            >
              <span>浏览导师名录</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

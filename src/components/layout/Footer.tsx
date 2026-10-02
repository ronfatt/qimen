import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E4D8] bg-[#F4F1E6]/70 mt-20 text-xs text-editorial-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        {/* Top: Large Manifesto Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-canvas-200">
          <div className="space-y-3">
            <span className="editorial-tag text-gold-700">
              PHILOSOPHY & COGNITIVE MIRROR
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-editorial-950 font-normal leading-tight">
              观见模式，厘清边界。
              <br />
              将传统数术作为探索当下的现代透镜。
            </h2>
          </div>

          <div className="flex flex-col sm:items-end text-left sm:text-right space-y-1">
            <span className="font-serif font-bold text-lg text-editorial-950 tracking-wider">
              {brandConfig.name} <span className="text-xs font-mono text-gold-700">EDITION</span>
            </span>
            <span className="editorial-tag text-[10px] text-editorial-500">
              KUALA LUMPUR · SHANGHAI · TOKYO
            </span>
          </div>
        </div>

        {/* Middle: Editorial Grid & Legal Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[11px] leading-relaxed">
          <div className="md:col-span-4 space-y-2">
            <div className="editorial-tag text-editorial-900 font-bold">
              ABOUT ATELIER / 观己愿景
            </div>
            <p className="text-editorial-600">
              {brandConfig.description}
            </p>
          </div>

          <div className="md:col-span-5 space-y-2">
            <div className="editorial-tag text-gold-700 font-bold">
              MANIFESTO / 理性声明
            </div>
            <p className="text-editorial-600">
              {brandConfig.cultureNote}
            </p>
            <p className="text-editorial-500 text-[10px]">
              {brandConfig.disclaimer}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="editorial-tag text-editorial-900 font-bold">
              INDEX / 快速索引
            </div>
            <div className="flex flex-col space-y-1.5 uppercase font-mono text-[10px] text-editorial-700">
              <Link href="/" className="hover:text-gold-700 transition">01. 首页 / Index</Link>
              <Link href="/assessment" className="hover:text-gold-700 transition">02. 命盘演算 / Assessment</Link>
              <Link href="/teachers" className="hover:text-gold-700 transition">03. 导师名录 / Directory</Link>
              <Link href="/my-reports" className="hover:text-gold-700 transition">04. 设备档案 / Archive</Link>
              <Link href="/teacher" className="hover:text-gold-700 transition">05. 策展后台 / Desk</Link>
            </div>
          </div>
        </div>

        {/* Bottom: Monochrome Minimal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-canvas-200 text-[10px] font-mono text-editorial-500">
          <span>© {new Date().getFullYear()} {brandConfig.name} {brandConfig.englishName} ARCHIVE. ALL RIGHTS RESERVED.</span>
          <span className="uppercase tracking-widest text-gold-700">DESIGNED AS AN INTERNATIONAL ART EXHIBIT</span>
        </div>
      </div>
    </footer>
  );
}

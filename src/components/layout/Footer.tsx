import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E1DA] bg-[#EBE9E2]/60 mt-16 text-xs text-[#5C6057]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#D8D7CE]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-[#111211] tracking-tight">
                {brandConfig.name}
              </span>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#868A82]">
                GUANJI
              </span>
            </div>
            <p className="text-xs text-[#6B6E66]">
              {brandConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#111211]">
            <Link href="/" className="hover:text-black transition">首页</Link>
            <Link href="/assessment" className="hover:text-black transition">探索自己</Link>
            <Link href="/my-reports" className="hover:text-black transition">我的报告</Link>
            <Link href="/teachers" className="hover:text-black transition">连接老师</Link>
            <Link href="/teacher" className="hover:text-black transition">演示后台</Link>
          </div>
        </div>

        {/* Culture & Integrity Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed text-[#757870]">
          <p>
            {brandConfig.cultureNote}
          </p>
          <p>
            {brandConfig.disclaimer}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[#D8D7CE] text-[10px] font-mono text-[#8C9087]">
          <span>© {new Date().getFullYear()} {brandConfig.name} (GUANJI). ALL RIGHTS RESERVED.</span>
          <span>MODERN METAPHYSICAL SELF-DISCOVERY WEB APP</span>
        </div>
      </div>
    </footer>
  );
}

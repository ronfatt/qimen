import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DEC9] bg-[#F2EDE1]/70 mt-16 text-xs text-[#52574F]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DFD6BF]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-serif font-black text-[#131513] tracking-tight">
                {brandConfig.name}
              </span>
              <span className="seal-stamp-filled text-[9px] px-1.5 py-0.2 rounded font-serif font-bold">
                遁甲
              </span>
            </div>
            <p className="text-xs text-[#636E63] font-serif">
              {brandConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-serif font-bold text-[#131513]">
            <Link href="/" className="hover:text-[#C92A2A] transition">首页</Link>
            <Link href="/assessment" className="hover:text-[#C92A2A] transition">探索自己</Link>
            <Link href="/my-reports" className="hover:text-[#C92A2A] transition">我的报告</Link>
            <Link href="/teachers" className="hover:text-[#C92A2A] transition">连接老师</Link>
            <Link href="/teacher" className="hover:text-[#C92A2A] transition">演示后台</Link>
          </div>
        </div>

        {/* Culture & Integrity Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-serif leading-relaxed text-[#6E756B]">
          <p className="p-3.5 rounded-2xl bg-white/60 border border-[#E5DEC9]">
            {brandConfig.cultureNote}
          </p>
          <p className="p-3.5 rounded-2xl bg-white/60 border border-[#E5DEC9]">
            {brandConfig.disclaimer}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[#DFD6BF] text-[10px] font-mono text-[#8C9087]">
          <span>© {new Date().getFullYear()} {brandConfig.name} (GUANJI) · 正统奇门数术与心智镜像</span>
          <span>ORIENTAL QIMEN DUN JIA CONSULTATION APP</span>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#EBE7DD] bg-[#F5F2EB]/60 mt-16 text-xs text-ink-600">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Brand statement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-base text-moss-900">
                {brandConfig.name}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-warm-200 text-ink-700">
                个人咨询与认知镜像
              </span>
            </div>
            <p className="text-ink-600 max-w-md">
              {brandConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/" className="hover:text-moss-800 transition">
              首页
            </Link>
            <Link href="/assessment" className="hover:text-moss-800 transition">
              免费分析
            </Link>
            <Link href="/teachers" className="hover:text-moss-800 transition">
              咨询老师
            </Link>
            <Link href="/my-reports" className="hover:text-moss-800 transition">
              设备报告
            </Link>
            <Link href="/teacher" className="hover:text-moss-800 transition">
              演示后台
            </Link>
          </div>
        </div>

        {/* Value & Culture Transparency */}
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E4D8] space-y-2.5">
          <div className="flex items-center space-x-2 text-moss-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-champagne-600 flex-shrink-0" />
            <span>理性与探索声明</span>
          </div>
          <p className="text-ink-600 leading-relaxed text-[11px]">
            {brandConfig.cultureNote}
          </p>
          <p className="text-ink-500 leading-relaxed text-[11px]">
            {brandConfig.disclaimer}
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-warm-200/60 text-[11px] text-ink-400">
          <span>© {new Date().getFullYear()} {brandConfig.name} ({brandConfig.englishName}). 保留所有权利.</span>
          <span>手机优先响应式设计 · 纯净咨询体验</span>
        </div>
      </div>
    </footer>
  );
}

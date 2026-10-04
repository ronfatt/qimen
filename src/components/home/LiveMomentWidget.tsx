"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Solar } from "lunar-typescript";
import { Clock, Compass, ArrowRight, Zap, RefreshCw } from "lucide-react";

export default function LiveMomentWidget() {
  const [timeStr, setTimeStr] = useState("");
  const [baziStr, setBaziStr] = useState("");
  const [jieQiStr, setJieQiStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const solar = Solar.fromDate(now);
        const lunar = solar.getLunar();
        const eightChar = lunar.getEightChar();

        setTimeStr(
          `${solar.getYear()}年${String(solar.getMonth()).padStart(2, "0")}月${String(
            solar.getDay()
          ).padStart(2, "0")}日 ${String(solar.getHour()).padStart(2, "0")}:${String(
            solar.getMinute()
          ).padStart(2, "0")}:${String(solar.getSecond()).padStart(2, "0")}`
        );

        setBaziStr(
          `${eightChar.getYear()}年 ${eightChar.getMonth()}月 ${eightChar.getDay()}日 ${eightChar.getTime()}时`
        );

        setJieQiStr(lunar.getPrevJieQi(true).getName());
      } catch (e) {
        // Fallback
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1C201C] via-[#131513] to-[#0A0C0A] text-white border border-[#2E352E] shadow-2xl relative overflow-hidden">
      {/* 东方水墨与八卦暗纹背景装饰 */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#C92A2A]/10 pointer-events-none blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#D4AF37]/5 pointer-events-none blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* 左侧说明与时钟 */}
        <div className="space-y-4 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="seal-stamp px-2 py-0.5 text-[10px] font-serif font-black bg-red-900/60 border-red-500 text-red-200">
              非个人盘 · 实时时空起局
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ORACULAR TEMPORAL ENGINE</span>
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
              当下命盘 · 实时时空势局解读
            </h2>
            <p className="text-xs sm:text-sm text-[#A8B0A8] font-serif leading-relaxed">
              无需输入个人生辰。系统自动以你<strong>点击的当下日期与秒级时间</strong>实时演算出天地八字、奇门遁甲九宫格局，为你洞察此时此刻的天时势能、吉顺方位与行动宜忌。
            </p>
          </div>

          {/* 实时走动的时空坐标仪表板 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#242924]/80 border border-[#3A423A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-[10px] text-[#8C948C] font-mono uppercase flex items-center space-x-1.5">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>实时捕捉此刻公历：</span>
                <span className="font-mono font-bold text-white text-[11px]">
                  {timeStr || "正在对齐天文授时时钟..."}
                </span>
              </div>
              <div className="text-xs font-serif font-bold text-amber-200">
                此刻八字：{baziStr || "计算中..."}
                {jieQiStr && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#131513] text-emerald-300 ml-2 border border-[#2D332D]">
                    {jieQiStr}气
                  </span>
                )}
              </div>
            </div>

            <div className="text-[10px] text-[#8C948C] sm:text-right">
              时家转盘奇门 · 实时拆补定局
            </div>
          </div>
        </div>

        {/* 右侧主行动区 */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 justify-center">
          <Link
            href="/moment"
            className="btn-cinnabar inline-flex items-center justify-center space-x-2 px-8 py-4 text-xs font-serif font-bold tracking-wide shadow-seal hover:scale-[1.02] transition-transform text-center"
          >
            <Compass className="w-4 h-4 stroke-[2.5]" />
            <span>解读当下命盘</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/moment"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#2A302A] text-white text-xs font-serif font-bold hover:bg-[#343C34] transition border border-[#3E473E] text-center"
          >
            <span>查看此刻九宫势局 &gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

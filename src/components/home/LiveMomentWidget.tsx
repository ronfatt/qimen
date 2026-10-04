"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Solar } from "lunar-typescript";
import {
  Clock,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Play,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ArchitectureModal from "@/components/architecture/ArchitectureModal";

export default function LiveMomentWidget() {
  const [timeStr, setTimeStr] = useState("");
  const [baziStr, setBaziStr] = useState("");
  const [jieQiStr, setJieQiStr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"architecture" | "negotiation" | "pipeline">("architecture");

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

  const openArchitecture = () => {
    setModalTab("architecture");
    setModalOpen(true);
  };

  const openDemoLogic = () => {
    setModalTab("negotiation");
    setModalOpen(true);
  };

  return (
    <>
      {/* 商业谈判与竞争决策作品集卡片 (严格契合作品集 #09 设计规范) */}
      <div className="rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-[#1A1E1A] via-[#131513] to-[#0D0F0D] text-white border border-[#2E352E] shadow-2xl relative overflow-hidden space-y-6">
        {/* 背景金石与朱砂微光 */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#C92A2A]/15 pointer-events-none blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-3xl" />

        {/* 1. Header: #09 奇门遁甲 · LIVE 线上作品 · AI ENGINE PROTOTYPE · 点击看架构 ↗ */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#2A312A] pb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-black bg-[#232823] text-amber-300 border border-[#3E473E] shadow-sm">
              #09 奇门遁甲
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE 线上作品</span>
            </span>
            <span className="text-[11px] font-mono text-[#A8B0A8] uppercase flex items-center space-x-1 tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#C92A2A]" />
              <span>AI ENGINE PROTOTYPE</span>
            </span>
          </div>

          {/* 右上角：点击看架构 ↗ */}
          <button
            onClick={openArchitecture}
            className="group inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-200 text-xs font-serif font-bold hover:bg-amber-400/20 hover:border-amber-400 transition"
          >
            <span>点击看架构</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 2. Middle Content: Title, English Title & Mission Quote */}
        <div className="relative z-10 space-y-3">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight">
              奇门遁甲战略决策助手
            </h2>
            <div className="text-xs sm:text-sm font-mono tracking-widest text-[#9EA89E] uppercase">
              Qi Men Dun Jia Strategic Assistant
            </div>
          </div>

          {/* Slogan Quote */}
          <div className="p-4 rounded-2xl bg-[#1F241F]/80 border-l-4 border-l-[#C92A2A] border-y border-r border-[#2C332C]">
            <p className="text-sm sm:text-base font-serif font-bold text-[#E8EFE8] leading-relaxed">
              “把九宫八神、九星八门的复杂时空盘，转化为商业谈判与竞争决策的清晰行动指南。”
            </p>
          </div>
        </div>

        {/* 3. Live Ticking Astronomical Clock & Bazi Box */}
        <div className="relative z-10 p-4 rounded-2xl bg-[#1A1F1A] border border-[#2D342D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="text-[11px] text-[#8C948C] font-mono flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>当前精准授时：</span>
              <span className="font-mono font-bold text-white text-xs">
                {timeStr || "正在对齐天文授时时钟..."}
              </span>
            </div>
            <div className="text-xs font-serif font-bold text-amber-200 flex items-center space-x-2">
              <span>此刻八字：{baziStr || "计算中..."}</span>
              {jieQiStr && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#131513] text-emerald-300 border border-[#2D332D]">
                  {jieQiStr}气
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] text-[#A8B0A8] font-serif sm:text-right flex items-center sm:justify-end space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>拆补正局 · 实时推演九宫格</span>
          </div>
        </div>

        {/* 4. Strategic Tags */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 text-xs font-serif">
          <span className="px-3 py-1 rounded-full bg-[#242A24] border border-[#343D34] text-[#D8E0D8]">
            时家奇门
          </span>
          <span className="px-3 py-1 rounded-full bg-[#242A24] border border-[#343D34] text-[#D8E0D8]">
            局象自动计算
          </span>
          <span className="px-3 py-1 rounded-full bg-[#242A24] border border-[#343D34] text-[#D8E0D8]">
            商业谈判策略
          </span>
          <span className="px-3 py-1 rounded-full bg-[#242A24] border border-[#343D34] text-[#D8E0D8]">
            主客动向律
          </span>
          <span className="px-3 py-1 rounded-full bg-[#242A24] border border-[#343D34] text-[#D8E0D8]">
            座次地利
          </span>
        </div>

        {/* 5. Bottom Action Buttons: [▶ 演示逻辑] & [进入真实 App ↗] */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 pt-2">
          {/* ▶ 演示逻辑 */}
          <button
            onClick={openDemoLogic}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full border border-neutral-600 bg-neutral-800/80 hover:bg-neutral-700/80 text-white text-xs sm:text-sm font-serif font-bold transition shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>演示逻辑</span>
          </button>

          {/* 进入真实 App ↗ */}
          <a
            href="https://qimen-pi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-[#0B0D0B] hover:bg-[#1A1F1A] text-white text-xs sm:text-sm font-serif font-bold tracking-wide border border-[#3E473E] shadow-seal text-center transition group"
          >
            <span>进入真实 App</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 架构与商业谈判演示逻辑弹窗 */}
      <ArchitectureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </>
  );
}

"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import PalaceDetailModal from "./PalaceDetailModal";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NinePalaceGridProps {
  palaces: QimenPalace[];
  initialExpanded?: boolean;
}

export default function NinePalaceGrid({ palaces, initialExpanded = true }: NinePalaceGridProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [activePalace, setActivePalace] = useState<QimenPalace | null>(null);

  // 奇门九宫标准洛书映射
  const luoshuIndices = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const getPalaceByIndex = (index: number): QimenPalace | undefined => {
    return palaces.find((p) => p.index === index);
  };

  return (
    <div className="clean-card p-5 sm:p-7 shadow-card space-y-5 bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#EAE9E1] pb-4">
        <div className="space-y-1">
          <div className="text-[10px] font-mono tracking-wider font-bold text-[#6D7068] uppercase flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4F53C]" />
            <span>INTERACTIVE CHRONO MATRIX · 奇门九宫</span>
          </div>
          <h3 className="text-xl font-black text-[#111211]">
            互动命盘图谱
          </h3>
          <p className="text-xs text-[#7A7E75]">
            点击任意宫位查阅星、门、神、干之定义
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-[#111211] bg-[#F3F2EC] hover:bg-[#EAE9E1] px-4 py-2 rounded-full transition"
        >
          <span>{isExpanded ? "收起命盘" : "展开命盘"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-fadeIn">
          {/* Coordinates Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7E75] px-1 uppercase tracking-wider">
            <span>排布：上南下北，左东右西</span>
            <span className="text-[#111211] font-semibold">神 · 干 / 星 · 门</span>
          </div>

          {/* 3x3 Ceramic Matrix */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 bg-[#EAE9E1] p-3 rounded-[24px]">
            {luoshuIndices.map((idx) => {
              const palace = getPalaceByIndex(idx);
              if (!palace) return <div key={idx} className="bg-white rounded-2xl aspect-square" />;

              const hasTag = palace.stateTags && palace.stateTags.length > 0;
              const isCenter = palace.isCenter;

              return (
                <div
                  key={palace.index}
                  onClick={() => setActivePalace(palace)}
                  className={`rounded-2xl p-2.5 sm:p-4 aspect-square flex flex-col justify-between text-left transition-all duration-200 cursor-pointer shadow-sm relative group hover:-translate-y-1 hover:shadow-md ${
                    isCenter
                      ? "bg-[#F3F2EC] border border-dashed border-[#D2D1C9]"
                      : "bg-white hover:border-[#111211] border border-transparent"
                  }`}
                >
                  {/* Top: Deity + Heaven Stem */}
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] sm:text-xs font-bold text-[#454842] group-hover:text-black">
                      {palace.symbols.deity}
                    </span>
                    <span className="font-serif font-black text-xs sm:text-sm text-[#111211]">
                      {palace.symbols.heavenStem}
                    </span>
                  </div>

                  {/* Middle: Star + Door */}
                  <div className="my-auto text-center w-full py-0.5">
                    <div className="text-[9px] sm:text-[11px] text-[#7A7E75] font-medium">
                      {palace.symbols.star}
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#111211] group-hover:text-black">
                      {palace.symbols.door}
                    </div>
                  </div>

                  {/* Bottom: Palace Name, Earth Stem & Tag */}
                  <div className="flex items-end justify-between w-full pt-1 border-t border-[#F0EFE9] text-[9px] sm:text-[10px] text-[#868A81]">
                    <span className="font-semibold text-[#545750]">
                      {palace.name.slice(0, 2)}
                    </span>

                    <div className="flex items-center space-x-1">
                      {hasTag && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#D4F53C] text-[#111211] text-[8px] font-bold font-mono">
                          {palace.stateTags![0]}
                        </span>
                      )}
                      <span className="font-serif font-semibold text-[#222421]">
                        {palace.symbols.earthStem}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-[#7A7E75] text-center pt-1">
            点击任意宫位，展开查阅纯净词典与详细符号释义
          </p>
        </div>
      )}

      {/* Modal */}
      <PalaceDetailModal palace={activePalace} onClose={() => setActivePalace(null)} />
    </div>
  );
}

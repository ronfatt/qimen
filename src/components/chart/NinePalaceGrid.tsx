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
    <div className="oriental-card p-5 sm:p-7 shadow-orientalCard space-y-5 bg-white border border-[#E5DEC9]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#EBE3D0] pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="seal-stamp px-1.5 py-0.2 text-[9px] font-serif font-black">
              洛书正局
            </span>
            <span className="text-[10px] font-mono tracking-wider font-bold text-[#8C7A58] uppercase">
              CHRONO MATRIX · 奇门九宫图谱
            </span>
          </div>
          <h3 className="text-xl font-serif font-black text-[#131513]">
            互动奇门命盘（九宫天地盘）
          </h3>
          <p className="text-xs font-serif text-[#636E63]">
            点击宫位可展开查阅星、门、神、干之正统图腾与词典定义
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1.5 text-xs font-serif font-bold text-[#131513] bg-[#F4F0E4] hover:bg-[#ECE5D5] px-4 py-2 rounded-full transition"
        >
          <span>{isExpanded ? "收起命盘" : "展开命盘"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-fadeIn">
          {/* Coordinates Legend */}
          <div className="flex items-center justify-between text-[11px] font-serif text-[#767973] px-1">
            <span>格局排布：上南（离）下北（坎），左东（震）右西（兑）</span>
            <span className="text-[#C92A2A] font-bold">神 · 干 / 星 · 门</span>
          </div>

          {/* 3x3 Traditional Nine Palaces Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 bg-[#EFE9D9] p-3 rounded-2xl border border-[#DFD6BF]">
            {luoshuIndices.map((idx) => {
              const palace = getPalaceByIndex(idx);
              if (!palace) return <div key={idx} className="bg-white rounded-xl aspect-square" />;

              const hasTag = palace.stateTags && palace.stateTags.length > 0;
              const isCenter = palace.isCenter;

              return (
                <div
                  key={palace.index}
                  onClick={() => setActivePalace(palace)}
                  className={`rounded-xl p-2.5 sm:p-4 aspect-square flex flex-col justify-between text-left transition-all duration-200 cursor-pointer shadow-sm relative group hover:-translate-y-1 hover:shadow-md ${
                    isCenter
                      ? "bg-[#FAF3DE] border border-dashed border-[#DEC78A]"
                      : "bg-white hover:border-[#C92A2A] border border-[#E5DEC9]"
                  }`}
                >
                  {/* Top: Deity + Heaven Stem */}
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] sm:text-xs font-serif font-black text-[#52574F] group-hover:text-[#C92A2A]">
                      {palace.symbols.deity}
                    </span>
                    <span className="font-serif font-black text-xs sm:text-sm text-[#C92A2A]">
                      {palace.symbols.heavenStem}
                    </span>
                  </div>

                  {/* Middle: Star + Door */}
                  <div className="my-auto text-center w-full py-0.5">
                    <div className="text-[9px] sm:text-[11px] text-[#767973] font-serif font-medium">
                      {palace.symbols.star}
                    </div>
                    <div className="text-sm sm:text-base font-serif font-black text-[#131513] group-hover:text-black">
                      {palace.symbols.door}
                    </div>
                  </div>

                  {/* Bottom: Palace Name, Earth Stem & Tag */}
                  <div className="flex items-end justify-between w-full pt-1 border-t border-[#F0EBE0] text-[9px] sm:text-[10px] text-[#8C9087]">
                    <span className="font-serif font-bold text-[#545750]">
                      {palace.name.slice(0, 2)}
                    </span>

                    <div className="flex items-center space-x-1">
                      {hasTag && (
                        <span className="px-1.5 py-0.2 rounded bg-[#C92A2A] text-white text-[8px] font-bold font-serif shadow-xs">
                          {palace.stateTags![0]}
                        </span>
                      )}
                      <span className="font-serif font-bold text-[#131513]">
                        {palace.symbols.earthStem}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] font-serif text-[#767973] text-center pt-1">
            点击任意宫位，展开查阅该宫八门、九星、八神之客观词典
          </p>
        </div>
      )}

      {/* Modal */}
      <PalaceDetailModal palace={activePalace} onClose={() => setActivePalace(null)} />
    </div>
  );
}

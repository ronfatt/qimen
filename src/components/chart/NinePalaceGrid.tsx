"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import PalaceDetailModal from "./PalaceDetailModal";
import { Compass, Sparkles, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface NinePalaceGridProps {
  palaces: QimenPalace[];
  initialExpanded?: boolean;
}

export default function NinePalaceGrid({ palaces, initialExpanded = true }: NinePalaceGridProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [activePalace, setActivePalace] = useState<QimenPalace | null>(null);

  // 奇门九宫标准洛书排布映射顺序：
  // 4 (巽四 东南) | 9 (离九 正南) | 2 (坤二 西南)
  // 3 (震三 正东) | 5 (中五 中央) | 7 (兑七 正西)
  // 8 (艮八 东北) | 1 (坎一 正北) | 6 (乾六 西北)
  const luoshuIndices = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const getPalaceByIndex = (index: number): QimenPalace | undefined => {
    return palaces.find((p) => p.index === index);
  };

  return (
    <div className="rounded-2xl border border-[#E5E0D2] bg-white p-4 sm:p-5 shadow-card space-y-4">
      {/* Title & Expand Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-moss-50 border border-moss-200 flex items-center justify-center text-moss-800">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-moss-900">
              互动奇门命盘（九宫局）
            </h3>
            <p className="text-[11px] text-ink-500">
              点击宫格可展开查阅星门神干与词典定义
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-xs text-moss-800 hover:text-moss-900 bg-warm-100 hover:bg-warm-200 px-2.5 py-1.5 rounded-lg transition"
        >
          <span>{isExpanded ? "收起命盘" : "展开命盘"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Grid Content */}
      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          {/* Legend and guidance */}
          <div className="flex items-center justify-between text-[11px] text-ink-500 bg-[#FAF9F5] p-2 rounded-lg border border-warm-200">
            <span>排布：上南下北，左东右西</span>
            <span className="text-champagne-700">神 · 干 / 星 · 门</span>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-[#EBE7DD] p-2 rounded-xl">
            {luoshuIndices.map((idx) => {
              const palace = getPalaceByIndex(idx);
              if (!palace) return <div key={idx} className="bg-warm-50 rounded-lg p-2 aspect-square" />;

              const hasSpecialTag = palace.stateTags && palace.stateTags.length > 0;

              return (
                <button
                  key={palace.index}
                  onClick={() => setActivePalace(palace)}
                  className={`bg-white rounded-lg p-1.5 sm:p-2.5 aspect-square flex flex-col justify-between text-left transition hover:border-moss-700 border hover:shadow-soft active:scale-[0.98] relative ${
                    palace.isCenter ? "bg-warm-50/70 border-dashed border-warm-300" : "border-warm-200"
                  }`}
                >
                  {/* Top: Deity + Heavenly Stem */}
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] sm:text-xs font-medium text-moss-800 truncate">
                      {palace.symbols.deity}
                    </span>
                    <span className="text-[10px] sm:text-xs font-serif font-bold text-champagne-700">
                      {palace.symbols.heavenStem}
                    </span>
                  </div>

                  {/* Middle: Star + Door */}
                  <div className="my-auto text-center w-full py-0.5">
                    <div className="text-[10px] sm:text-xs text-ink-700 font-medium truncate">
                      {palace.symbols.star}
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-bold text-moss-900 truncate">
                      {palace.symbols.door}
                    </div>
                  </div>

                  {/* Bottom: Palace Name + Earth Stem + Tag */}
                  <div className="flex items-end justify-between w-full pt-0.5 border-t border-warm-100 text-[9px] sm:text-[10px] text-ink-400">
                    <span className="truncate">{palace.name.slice(0, 2)}</span>
                    <div className="flex items-center space-x-1">
                      {hasSpecialTag && (
                        <span className="px-1 py-0.2 rounded bg-champagne-100 text-champagne-800 text-[8px] font-medium">
                          {palace.stateTags![0]}
                        </span>
                      )}
                      <span className="text-ink-600 font-serif">{palace.symbols.earthStem}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick instructions */}
          <p className="text-[11px] text-ink-500 text-center">
            点击任意宫位可查看详细神煞组合与纯净词典解析，不带预设偏见。
          </p>
        </div>
      )}

      {/* Modal / Bottom Sheet */}
      <PalaceDetailModal palace={activePalace} onClose={() => setActivePalace(null)} />
    </div>
  );
}

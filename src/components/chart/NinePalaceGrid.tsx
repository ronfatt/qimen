"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import PalaceDetailModal from "./PalaceDetailModal";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

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
    <div className="gallery-card rounded-3xl p-5 sm:p-7 shadow-haute space-y-5 border border-canvas-200">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-canvas-200 pb-4">
        <div className="space-y-1">
          <div className="editorial-tag text-gold-700 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
            <span>INTERACTIVE CELESTIAL MATRIX · 九宫局</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-editorial-950">
            奇门时空命盘交互图谱
          </h3>
          <p className="text-[11px] text-editorial-500 font-mono">
            点击任意宫位查阅星、门、神、干之客观图腾与词典定义
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1.5 text-xs font-mono uppercase text-editorial-800 bg-canvas-100 hover:bg-canvas-200 px-3 py-1.5 rounded-full transition border border-canvas-200"
        >
          <span>{isExpanded ? "COLLAPSE" : "EXPAND"}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-fadeIn">
          {/* Coordinates Bar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-editorial-500 px-1 uppercase tracking-wider">
            <span>AXIS: SOUTH [UP] · NORTH [DOWN]</span>
            <span className="text-gold-700">LUO SHU 3×3 MATRIX</span>
          </div>

          {/* 3x3 Architectural Celestial Grid */}
          <div className="celestial-grid p-1">
            {luoshuIndices.map((idx) => {
              const palace = getPalaceByIndex(idx);
              if (!palace) return <div key={idx} className="bg-canvas-100 aspect-square" />;

              const hasTag = palace.stateTags && palace.stateTags.length > 0;

              return (
                <div
                  key={palace.index}
                  onClick={() => setActivePalace(palace)}
                  className={`celestial-cell group ${
                    palace.isCenter ? "bg-canvas-100/60" : ""
                  }`}
                >
                  {/* Top: Deity (Left) + Heaven Stem (Right Gold) */}
                  <div className="flex items-start justify-between w-full">
                    <span className="font-mono text-[10px] sm:text-xs text-editorial-600 group-hover:text-editorial-950 font-medium">
                      {palace.symbols.deity}
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-gold-700 group-hover:text-gold-600">
                      {palace.symbols.heavenStem}
                    </span>
                  </div>

                  {/* Middle Centerpiece: Star & Door */}
                  <div className="my-auto text-center w-full py-1">
                    <div className="font-mono text-[9px] sm:text-[11px] text-editorial-500 uppercase tracking-tighter">
                      {palace.symbols.star}
                    </div>
                    <div className="font-serif font-bold text-sm sm:text-lg text-editorial-950 group-hover:text-gold-800 transition-colors">
                      {palace.symbols.door}
                    </div>
                  </div>

                  {/* Bottom: Palace Name, Earth Stem & Badges */}
                  <div className="flex items-end justify-between w-full pt-1 border-t border-canvas-200 text-[9px] font-mono text-editorial-400">
                    <span className="truncate uppercase font-medium text-editorial-500">
                      {palace.name.slice(0, 2)}
                    </span>

                    <div className="flex items-center space-x-1">
                      {hasTag && (
                        <span className="px-1 py-0.2 rounded bg-gold-100 text-gold-800 text-[8px] font-mono uppercase font-bold border border-gold-200">
                          {palace.stateTags![0]}
                        </span>
                      )}
                      <span className="font-serif font-semibold text-editorial-700">
                        {palace.symbols.earthStem}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] font-mono text-editorial-500 text-center pt-1">
            [ SELECT ANY SECTOR TO INSPECT SYMBOLS & PHILOSOPHICAL ESSENCE ]
          </p>
        </div>
      )}

      {/* Modernist Modal */}
      <PalaceDetailModal palace={activePalace} onClose={() => setActivePalace(null)} />
    </div>
  );
}

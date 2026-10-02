"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import { getGlossaryItem, GlossaryTerm } from "@/services/chart/glossary";
import { X } from "lucide-react";

interface PalaceDetailModalProps {
  palace: QimenPalace | null;
  onClose: () => void;
}

export default function PalaceDetailModal({ palace, onClose }: PalaceDetailModalProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  if (!palace) return null;

  const { symbols, stateTags, name, direction, element, palaceMeaning } = palace;

  const handleInspectSymbol = (symbolName: string) => {
    const term = getGlossaryItem(symbolName);
    if (term) {
      setSelectedTerm(term);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-xl bg-[#F3F2EC] rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-[#E2E1DA] max-h-[88vh] flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-[#E2E1DA] flex items-center justify-between bg-white">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-wider font-bold text-[#7A7E75] uppercase">
              SECTOR INSPECTOR · 宫位剖析
            </span>
            <h3 className="font-black text-xl text-[#111211]">
              {name} · 方位【{direction}】
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[#D4F53C] text-[#111211] font-bold">
              五行属{element}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3F2EC] flex items-center justify-center text-[#111211] hover:bg-[#EAE9E1] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Palace Meaning Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E1DA] shadow-sm space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#7A7E75] font-bold">
              PHILOSOPHICAL MEANING / 宫位象征
            </span>
            <p className="text-[#353833] text-xs leading-relaxed font-sans">
              {palaceMeaning}
            </p>
          </div>

          {/* Status Badges */}
          {stateTags && stateTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-xs font-semibold text-[#666A61]">特殊状态：</span>
              {stateTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleInspectSymbol(tag)}
                  className="px-3 py-1 rounded-full bg-[#D4F53C] text-[#111211] font-bold text-xs hover:bg-[#C2E42B] transition"
                >
                  {tag} · 点击查看释义 →
                </button>
              ))}
            </div>
          )}

          {/* Symbols Grid */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#111211] uppercase tracking-wide">
              宫内配置符号 (点击查阅客观词典)
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 八神 */}
              <button
                onClick={() => handleInspectSymbol(symbols.deity)}
                className="clean-card p-4 rounded-2xl text-left transition group"
              >
                <div className="text-[10px] font-mono text-[#7A7E75]">八神 / DEITY</div>
                <div className="font-black text-lg text-[#111211] group-hover:text-black mt-0.5">
                  {symbols.deity}
                </div>
                <div className="text-[10px] text-[#5C6057] mt-1 font-medium">查看词典定义 →</div>
              </button>

              {/* 九星 */}
              <button
                onClick={() => handleInspectSymbol(symbols.star)}
                className="clean-card p-4 rounded-2xl text-left transition group"
              >
                <div className="text-[10px] font-mono text-[#7A7E75]">九星 / STAR</div>
                <div className="font-black text-lg text-[#111211] group-hover:text-black mt-0.5">
                  {symbols.star}
                </div>
                <div className="text-[10px] text-[#5C6057] mt-1 font-medium">查看词典定义 →</div>
              </button>

              {/* 八门 */}
              <button
                onClick={() => handleInspectSymbol(symbols.door)}
                className="clean-card p-4 rounded-2xl text-left transition group"
              >
                <div className="text-[10px] font-mono text-[#7A7E75]">八门 / GATE</div>
                <div className="font-black text-lg text-[#111211] group-hover:text-black mt-0.5">
                  {symbols.door}
                </div>
                <div className="text-[10px] text-[#5C6057] mt-1 font-medium">查看词典定义 →</div>
              </button>

              {/* 天干 */}
              <div className="clean-card p-4 rounded-2xl text-left">
                <div className="text-[10px] font-mono text-[#7A7E75]">天干 / STEMS</div>
                <div className="font-black text-lg text-[#111211] mt-0.5">
                  {symbols.heavenStem} / {symbols.earthStem}
                </div>
                {symbols.hiddenStem && (
                  <div className="text-[10px] text-[#7A7E75] mt-1">
                    隐干：{symbols.hiddenStem}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dictionary Specimen Display */}
          {selectedTerm ? (
            <div className="p-5 rounded-2xl bg-[#111211] text-white space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="font-bold text-base text-[#D4F53C]">
                  【{selectedTerm.name}】客观词典条目
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                  {selectedTerm.category} · {selectedTerm.nature}
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">象意本质：</strong>
                {selectedTerm.basicMeaning}
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">心性与生活映射：</strong>
                {selectedTerm.contextualMeaning}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white border border-dashed border-[#D2D1C9] text-center text-xs text-[#7A7E75]">
              💡 点击上方任意卡片，可在此查阅该符号的客观词典解释。
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#E2E1DA] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="btn-dark px-6 py-2.5 text-xs font-semibold"
          >
            完成查阅
          </button>
        </div>
      </div>
    </div>
  );
}

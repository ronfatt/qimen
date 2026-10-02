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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-xl bg-[#FAF8F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-[#DFD6BF] max-h-[88vh] flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-[#E5DEC9] flex items-center justify-between bg-white">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="seal-stamp text-[9px] px-1.5 py-0.2 font-serif font-black">
                宫位象意
              </span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#8C7A58] uppercase">
                SECTOR SPECIMEN
              </span>
            </div>
            <h3 className="font-serif font-black text-xl text-[#131513]">
              {name} · 方位【{direction}】
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <span className="seal-stamp-filled text-xs px-3 py-1 font-serif font-bold">
              五行属{element}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-[#E5DEC9] flex items-center justify-center text-[#131513] hover:bg-[#F4F0E4] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm font-serif">
          {/* Palace Meaning Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-[#8C7A58] uppercase block">
              宫位象征定位与渊源
            </span>
            <p className="text-[#353833] text-xs leading-relaxed">
              {palaceMeaning}
            </p>
          </div>

          {/* Status Badges */}
          {stateTags && stateTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-xs font-bold text-[#666A61]">特殊状态：</span>
              {stateTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleInspectSymbol(tag)}
                  className="seal-stamp-filled px-3 py-1 text-xs font-bold hover:bg-[#DE3434] transition"
                >
                  {tag} · 点击查看释义 →
                </button>
              ))}
            </div>
          )}

          {/* Symbols Grid */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#131513] tracking-wide">
              宫内配置符号（点击查阅客观词典）
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 八神 */}
              <button
                onClick={() => handleInspectSymbol(symbols.deity)}
                className="oriental-card p-4 rounded-2xl text-left transition group bg-white border-[#E5DEC9]"
              >
                <div className="text-[10px] font-mono text-[#8C7A58]">八神 / DEITY</div>
                <div className="font-serif font-black text-lg text-[#131513] group-hover:text-[#C92A2A] mt-0.5">
                  {symbols.deity}
                </div>
                <div className="text-[10px] text-[#C92A2A] mt-1 font-semibold">查看词典释义 →</div>
              </button>

              {/* 九星 */}
              <button
                onClick={() => handleInspectSymbol(symbols.star)}
                className="oriental-card p-4 rounded-2xl text-left transition group bg-white border-[#E5DEC9]"
              >
                <div className="text-[10px] font-mono text-[#8C7A58]">九星 / STAR</div>
                <div className="font-serif font-black text-lg text-[#131513] group-hover:text-[#C92A2A] mt-0.5">
                  {symbols.star}
                </div>
                <div className="text-[10px] text-[#C92A2A] mt-1 font-semibold">查看词典释义 →</div>
              </button>

              {/* 八门 */}
              <button
                onClick={() => handleInspectSymbol(symbols.door)}
                className="oriental-card p-4 rounded-2xl text-left transition group bg-white border-[#E5DEC9]"
              >
                <div className="text-[10px] font-mono text-[#8C7A58]">八门 / GATE</div>
                <div className="font-serif font-black text-lg text-[#131513] group-hover:text-[#C92A2A] mt-0.5">
                  {symbols.door}
                </div>
                <div className="text-[10px] text-[#C92A2A] mt-1 font-semibold">查看词典释义 →</div>
              </button>

              {/* 天干 */}
              <div className="oriental-card p-4 rounded-2xl text-left bg-white border-[#E5DEC9]">
                <div className="text-[10px] font-mono text-[#8C7A58]">天干 / STEMS</div>
                <div className="font-serif font-black text-lg text-[#131513] mt-0.5">
                  天干 {symbols.heavenStem} / 地干 {symbols.earthStem}
                </div>
                {symbols.hiddenStem && (
                  <div className="text-[10px] text-[#71766D] mt-1">
                    隐干：{symbols.hiddenStem}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dictionary Specimen Display */}
          {selectedTerm ? (
            <div className="p-5 rounded-2xl bg-[#131513] text-[#FAF8F2] space-y-2 animate-fadeIn border border-[#2E332E]">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="font-serif font-bold text-base text-amber-300">
                  【{selectedTerm.name}】正统客观词典
                </span>
                <span className="seal-stamp text-[9px] px-2 py-0.5 bg-neutral-900 border-amber-400/80 text-amber-200">
                  {selectedTerm.category} · {selectedTerm.nature}
                </span>
              </div>
              <p className="text-xs text-[#DFD6C1] leading-relaxed font-serif">
                <strong className="text-white">象意本质：</strong>
                {selectedTerm.basicMeaning}
              </p>
              <p className="text-xs text-[#DFD6C1] leading-relaxed font-serif">
                <strong className="text-white">心性与生活映射：</strong>
                {selectedTerm.contextualMeaning}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white border border-dashed border-[#DFD6BF] text-center text-xs text-[#767973] font-serif">
              💡 点击上方任意八神、九星或八门卡片，即可调阅其独立客观的词典条目。
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#E5DEC9] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="btn-ink px-6 py-2.5 text-xs font-serif font-bold"
          >
            完成查阅
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import { getGlossaryItem, GlossaryTerm } from "@/services/chart/glossary";
import { X, Sparkles, ArrowRight } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-editorial-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-xl bg-[#FAF7EE] rounded-t-3xl sm:rounded-3xl shadow-haute border border-canvas-300 max-h-[88vh] flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-canvas-200 flex items-center justify-between bg-canvas-100/70">
          <div className="space-y-0.5">
            <span className="editorial-tag text-gold-700">SECTOR SPECIMEN</span>
            <h3 className="font-serif font-bold text-lg text-editorial-950">
              {name} · 方位【{direction}】
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-editorial-950 text-gold-300 font-medium">
              五行属{element}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-canvas-300 flex items-center justify-center text-editorial-700 hover:bg-canvas-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Palace Meaning Card */}
          <div className="p-4 rounded-2xl bg-white border border-canvas-200 shadow-gallery space-y-1">
            <span className="editorial-tag text-editorial-500">PHILOSOPHICAL AXIS / 宫位象征</span>
            <p className="text-editorial-800 text-xs leading-relaxed font-sans">
              {palaceMeaning}
            </p>
          </div>

          {/* Status Badges */}
          {stateTags && stateTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-mono text-[11px] text-editorial-500 uppercase">SPATIAL FLAGS:</span>
              {stateTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleInspectSymbol(tag)}
                  className="px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-mono text-xs font-semibold hover:bg-gold-200 transition"
                >
                  {tag} · 点击释义 →
                </button>
              ))}
            </div>
          )}

          {/* 4 Quadrants of Symbols */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-editorial-500">
              <span>CONFIGURED SYMBOLS [点击查阅客观词典]</span>
              <span className="text-gold-700">ATELIER ARCHIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 八神 */}
              <button
                onClick={() => handleInspectSymbol(symbols.deity)}
                className="gallery-card p-4 rounded-2xl text-left transition group"
              >
                <div className="editorial-tag text-editorial-400">01. 八神 / DEITY</div>
                <div className="font-serif font-bold text-editorial-950 text-base group-hover:text-gold-700 transition-colors mt-0.5">
                  {symbols.deity}
                </div>
                <div className="font-mono text-[10px] text-gold-700 mt-1">查看独立定义 →</div>
              </button>

              {/* 九星 */}
              <button
                onClick={() => handleInspectSymbol(symbols.star)}
                className="gallery-card p-4 rounded-2xl text-left transition group"
              >
                <div className="editorial-tag text-editorial-400">02. 九星 / STAR</div>
                <div className="font-serif font-bold text-editorial-950 text-base group-hover:text-gold-700 transition-colors mt-0.5">
                  {symbols.star}
                </div>
                <div className="font-mono text-[10px] text-gold-700 mt-1">查看独立定义 →</div>
              </button>

              {/* 八门 */}
              <button
                onClick={() => handleInspectSymbol(symbols.door)}
                className="gallery-card p-4 rounded-2xl text-left transition group"
              >
                <div className="editorial-tag text-editorial-400">03. 八门 / GATE</div>
                <div className="font-serif font-bold text-editorial-950 text-base group-hover:text-gold-700 transition-colors mt-0.5">
                  {symbols.door}
                </div>
                <div className="font-mono text-[10px] text-gold-700 mt-1">查看独立定义 →</div>
              </button>

              {/* 天干 */}
              <div className="gallery-card p-4 rounded-2xl text-left">
                <div className="editorial-tag text-editorial-400">04. 天干 / STEMS</div>
                <div className="font-serif font-bold text-editorial-950 text-base mt-0.5">
                  天干 {symbols.heavenStem} / 地干 {symbols.earthStem}
                </div>
                {symbols.hiddenStem && (
                  <div className="font-mono text-[10px] text-editorial-500 mt-1">
                    隐干：{symbols.hiddenStem}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dictionary Specimen Display */}
          {selectedTerm ? (
            <div className="p-5 rounded-2xl bg-editorial-950 text-gold-100 border border-editorial-800 space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-editorial-800">
                <span className="font-serif font-bold text-base text-canvas-pure">
                  【{selectedTerm.name}】客观词典条目
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-gold-600/30 text-gold-300 border border-gold-500/40">
                  {selectedTerm.category} · {selectedTerm.nature}
                </span>
              </div>
              <p className="text-xs text-canvas-300 leading-relaxed">
                <strong className="text-gold-400">象意本质：</strong>
                {selectedTerm.basicMeaning}
              </p>
              <p className="text-xs text-canvas-300 leading-relaxed">
                <strong className="text-gold-400">心性与生活映射：</strong>
                {selectedTerm.contextualMeaning}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-canvas-300 text-center font-mono text-[11px] text-editorial-500">
              💡 点击上方任意八神、九星或八门卡片，即可调阅其客观词典定义。
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-canvas-200 bg-canvas-100/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono font-semibold uppercase hover:bg-editorial-800 transition"
          >
            完成查阅 / CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

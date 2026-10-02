"use client";

import React, { useState } from "react";
import { QimenPalace } from "@/types";
import { getGlossaryItem, GlossaryTerm } from "@/services/chart/glossary";
import { X, BookOpen, Sparkles, AlertCircle, Compass } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-lg bg-[#FCFAF6] rounded-t-2xl sm:rounded-2xl shadow-floating border border-[#E5E0D2] max-h-[85vh] flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EBE6D8] flex items-center justify-between bg-[#F8F5EE]">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-moss-700" />
            <h3 className="font-serif font-bold text-lg text-moss-900">
              {name} · 方位【{direction}】
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-warm-200 text-ink-700 font-medium">
              五行属{element}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-500 hover:text-ink-800 hover:bg-warm-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Palace summary */}
          <div className="p-3.5 rounded-xl bg-warm-100/70 border border-warm-200">
            <span className="text-xs text-ink-500 block mb-1">宫位象征定位</span>
            <p className="text-ink-800 text-xs leading-relaxed">{palaceMeaning}</p>
          </div>

          {/* Status Badges */}
          {stateTags && stateTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-ink-500">时空特殊状态：</span>
              {stateTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleInspectSymbol(tag)}
                  className="px-2.5 py-1 text-xs rounded-md bg-champagne-100 text-champagne-700 border border-champagne-300 font-medium flex items-center space-x-1 hover:bg-champagne-200 transition"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{tag}（点击查看说明）</span>
                </button>
              ))}
            </div>
          )}

          {/* Four Key Elements in Palace */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
              <span>宫内配置符号（点击任意符号查看客观词典）</span>
              <BookOpen className="w-3.5 h-3.5 text-champagne-600" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* 八神 */}
              <button
                onClick={() => handleInspectSymbol(symbols.deity)}
                className="p-3 rounded-xl border border-warm-200 bg-white hover:border-moss-600 text-left transition group shadow-soft"
              >
                <div className="text-[11px] text-ink-500">八神</div>
                <div className="font-serif font-bold text-moss-900 group-hover:text-moss-700 text-base">
                  {symbols.deity}
                </div>
                <div className="text-[10px] text-champagne-600 mt-0.5">点击查阅释义 →</div>
              </button>

              {/* 九星 */}
              <button
                onClick={() => handleInspectSymbol(symbols.star)}
                className="p-3 rounded-xl border border-warm-200 bg-white hover:border-moss-600 text-left transition group shadow-soft"
              >
                <div className="text-[11px] text-ink-500">九星</div>
                <div className="font-serif font-bold text-moss-900 group-hover:text-moss-700 text-base">
                  {symbols.star}
                </div>
                <div className="text-[10px] text-champagne-600 mt-0.5">点击查阅释义 →</div>
              </button>

              {/* 八门 */}
              <button
                onClick={() => handleInspectSymbol(symbols.door)}
                className="p-3 rounded-xl border border-warm-200 bg-white hover:border-moss-600 text-left transition group shadow-soft"
              >
                <div className="text-[11px] text-ink-500">八门</div>
                <div className="font-serif font-bold text-moss-900 group-hover:text-moss-700 text-base">
                  {symbols.door}
                </div>
                <div className="text-[10px] text-champagne-600 mt-0.5">点击查阅释义 →</div>
              </button>

              {/* 天干配置 */}
              <div className="p-3 rounded-xl border border-warm-200 bg-white text-left shadow-soft">
                <div className="text-[11px] text-ink-500">天盘干 / 地盘干</div>
                <div className="font-serif font-bold text-moss-900 text-base">
                  天干 {symbols.heavenStem} / 地干 {symbols.earthStem}
                </div>
                {symbols.hiddenStem && (
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    暗干：{symbols.hiddenStem}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Glossary Popup / Detail */}
          {selectedTerm ? (
            <div className="p-4 rounded-xl bg-moss-50 border border-moss-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-moss-900 text-base">
                  【{selectedTerm.name}】客观词典
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-moss-200 text-moss-800">
                  {selectedTerm.category} · {selectedTerm.nature}
                </span>
              </div>
              <p className="text-xs text-ink-700 leading-relaxed">
                <strong className="text-ink-900">象意本质：</strong>
                {selectedTerm.basicMeaning}
              </p>
              <p className="text-xs text-ink-700 leading-relaxed">
                <strong className="text-ink-900">心性与生活映射：</strong>
                {selectedTerm.contextualMeaning}
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-warm-100 text-center text-xs text-ink-500">
              💡 提示：点击上方的八门、九星或八神，可在此查看其独立客观的词典说明。
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EBE6D8] bg-[#F8F5EE] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-moss-800 text-warm-50 text-xs font-medium hover:bg-moss-700 transition"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
}

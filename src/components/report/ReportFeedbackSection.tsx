"use client";

import React, { useState } from "react";
import { ReportFeedback } from "@/types";
import { CheckCircle2, Send, MessageSquareHeart } from "lucide-react";

interface ReportFeedbackSectionProps {
  reportId: string;
  initialFeedback?: ReportFeedback;
  onFeedbackSaved?: (feedback: ReportFeedback) => void;
}

export default function ReportFeedbackSection({
  reportId,
  initialFeedback,
  onFeedbackSaved,
}: ReportFeedbackSectionProps) {
  const [closeness, setCloseness] = useState<"close" | "partial" | "far" | null>(
    initialFeedback?.closeness || null
  );
  const [note, setNote] = useState(initialFeedback?.note || "");
  const [submitted, setSubmitted] = useState(!!initialFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!closeness) return;

    const feedbackData: ReportFeedback = {
      closeness,
      note: note.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    setSubmitted(true);
    if (onFeedbackSaved) {
      onFeedbackSaved(feedbackData);
    }
  };

  return (
    <div className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-5 border border-canvas-200">
      <div className="flex items-center justify-between border-b border-canvas-200 pb-3">
        <div className="space-y-0.5">
          <span className="editorial-tag text-gold-700">EXPERIENCE VERIFICATION / 反思核对</span>
          <h3 className="font-serif font-bold text-lg text-editorial-950">
            这份梳理对你有启发吗？
          </h3>
        </div>
        <span className="font-mono text-[10px] text-editorial-400 uppercase">NO FAKE ACCURACY</span>
      </div>

      <p className="text-xs text-editorial-600">
        你的真实体会是反思的起点，我们不计算任何虚假的“命中准确率”。
      </p>

      {submitted ? (
        <div className="p-5 rounded-2xl bg-canvas-100/70 border border-canvas-200 space-y-2 animate-fadeIn text-xs">
          <div className="flex items-center space-x-2 text-editorial-950 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4 text-gold-700" />
            <span>[ 已记录个人核对反馈 ]</span>
          </div>
          <p className="text-editorial-700 leading-relaxed font-sans">
            感谢你的坦诚记录。如果后续在老师深入会谈中探讨此报告，系统将明确标记
            <strong className="text-gold-900 font-bold">「结合你补充的经历」</strong>
            ，绝不会将这些内容伪装为仅凭命盘得到的结论。
          </p>
          <div className="pt-2 text-[11px] font-mono text-editorial-500">
            评价：
            <span className="font-bold text-editorial-950">
              {closeness === "close" ? "很贴近" : closeness === "partial" ? "部分贴近" : "不贴近"}
            </span>
            {note && ` · 备注：${note}`}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "close", label: "很贴近" },
              { key: "partial", label: "部分贴近" },
              { key: "far", label: "不贴近" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => setCloseness(opt.key as any)}
                className={`py-3 px-4 rounded-2xl border text-xs font-mono uppercase font-semibold transition ${
                  closeness === opt.key
                    ? "bg-editorial-950 border-editorial-950 text-gold-200 shadow-gallery"
                    : "border-canvas-300 text-editorial-700 bg-white hover:border-gold-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="（可选）补充你的真实生活经历或感受，帮助后续更聚焦..."
              className="w-full text-xs p-4 rounded-2xl border border-canvas-300 bg-white text-editorial-950 placeholder:text-editorial-400 focus:outline-none focus:border-gold-600 transition"
              maxLength={200}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[10px] text-editorial-400 uppercase">
              LOCAL ENCRYPTION PRESERVED
            </span>
            <button
              type="submit"
              disabled={!closeness}
              className="btn-haute inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-gallery"
            >
              <Send className="w-3 h-3 text-gold-400" />
              <span>SUBMIT / 提交反馈</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

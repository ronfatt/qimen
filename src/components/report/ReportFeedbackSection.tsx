"use client";

import React, { useState } from "react";
import { ReportFeedback } from "@/types";
import { MessageSquareHeart, CheckCircle2, Send } from "lucide-react";

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
    <div className="rounded-2xl border border-[#E5E0D2] bg-white p-5 shadow-card space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-lg bg-champagne-50 border border-champagne-200 flex items-center justify-center text-champagne-700">
          <MessageSquareHeart className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-base text-moss-900">
            这份梳理对你有启发吗？
          </h3>
          <p className="text-[11px] text-ink-500">
            你的真实体会是反思的起点，我们不计算任何虚假的“命中准确率”
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="p-4 rounded-xl bg-moss-50 border border-moss-200 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 text-moss-800 font-medium text-xs">
            <CheckCircle2 className="w-4 h-4 text-moss-700" />
            <span>已记录你的个人核对反馈</span>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            感谢你的坦诚记录。如果后续在老师深度咨询中探讨此报告，系统将明确标记
            <strong className="text-moss-900">「结合你补充的经历」</strong>
            ，绝不会将这些内容伪装为仅凭命盘得到的结论。
          </p>
          <div className="pt-2 text-[11px] text-ink-500">
            你当前的评价：
            <span className="font-medium text-moss-800">
              {closeness === "close" ? "很贴近" : closeness === "partial" ? "部分贴近" : "不贴近"}
            </span>
            {note && ` · 补充文字：${note}`}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "close", label: "很贴近" },
              { key: "partial", label: "部分贴近" },
              { key: "far", label: "不贴近" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => setCloseness(opt.key as any)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                  closeness === opt.key
                    ? "bg-moss-800 border-moss-800 text-warm-50 shadow-soft"
                    : "border-warm-200 text-ink-700 bg-[#FCFAF6] hover:bg-warm-100"
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
              className="w-full text-xs p-3 rounded-xl border border-warm-200 bg-[#FCFAF6] text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-moss-700 transition"
              maxLength={200}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-ink-400">
              仅保存在此报告的当前记录中
            </span>
            <button
              type="submit"
              disabled={!closeness}
              className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-moss-800 text-warm-50 text-xs font-medium hover:bg-moss-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-soft"
            >
              <Send className="w-3 h-3" />
              <span>提交反馈</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

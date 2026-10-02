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
    <div className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-[#D4F53C] flex items-center justify-center text-[#111211]">
          <MessageSquareHeart className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-black text-base text-[#111211]">
            这份梳理对你有启发吗？
          </h3>
          <p className="text-[11px] text-[#767973]">
            你的真实体会是反思的起点，我们不计算任何虚假的“命中准确率”
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] space-y-2 animate-fadeIn text-xs">
          <div className="flex items-center space-x-2 text-[#111211] font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#111211]" />
            <span>已记录你的个人核对反馈</span>
          </div>
          <p className="text-[#454840] leading-relaxed">
            感谢你的坦诚记录。如果后续在老师深度咨询中探讨此报告，系统将明确标记
            <strong className="text-[#111211]">「结合你补充的经历」</strong>
            ，绝不会将这些内容伪装为仅凭命盘得到的结论。
          </p>
          <div className="pt-2 text-[11px] text-[#767973]">
            你的评价：
            <span className="font-bold text-[#111211]">
              {closeness === "close" ? "很贴近" : closeness === "partial" ? "部分贴近" : "不贴近"}
            </span>
            {note && ` · 补充文字：${note}`}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
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
                className={`py-3 px-3 rounded-2xl border text-xs font-bold transition ${
                  closeness === opt.key
                    ? "bg-[#D4F53C] border-[#BFE024] text-[#111211] shadow-sm"
                    : "border-[#E2E1DA] text-[#111211] bg-[#FAF9F5] hover:border-black"
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
              className="w-full text-xs p-3.5 rounded-2xl border border-[#E2E1DA] bg-[#FAF9F5] text-[#111211] placeholder:text-[#8C9087] focus:outline-none focus:border-black transition"
              maxLength={200}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-[#8C9087]">
              仅保存在此报告的当前记录中
            </span>
            <button
              type="submit"
              disabled={!closeness}
              className="btn-dark inline-flex items-center space-x-1.5 px-6 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
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

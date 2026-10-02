"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnalysisReport } from "@/types";
import { LocalReportStore } from "@/services/storage/local-report-store";
import {
  Bookmark,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function MyReportsPage() {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setReports(LocalReportStore.getSavedReports());
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("确定要从此设备删除这份报告吗？此操作不可逆。")) {
      LocalReportStore.deleteReport(id);
      setReports(LocalReportStore.getSavedReports());
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 pb-20">
      <div className="space-y-1 border-b border-[#E2E1DA] pb-4">
        <h1 className="text-3xl font-black text-[#111211]">
          保存在此设备的报告
        </h1>
        <p className="text-xs text-[#6B6E66]">
          无需注册账户，报告仅加密存储于当前浏览器的本地缓存中。
        </p>
      </div>

      {/* Storage Limitation Notice */}
      <div className="p-5 rounded-3xl bg-white border border-[#E2E1DA] text-xs text-[#5C6057] space-y-2 shadow-sm">
        <div className="flex items-center space-x-2 text-[#111211] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#111211]" />
          <span>本地单设备存储机制与隐私说明</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          为最大程度保障您的出生资料隐私，目前报告直接保存在本设备的浏览器本地存储中，未上传至任何云端数据库。这意味着：
        </p>
        <ul className="list-disc list-inside text-[11px] space-y-1 text-[#767973] pl-1">
          <li>清除浏览器缓存或更换设备后，当前记录将无法查看。</li>
          <li>未来正式上线多端账户系统后，将支持登录并实现跨设备安全同步。</li>
          <li>您可以随时在此页面彻底清除本地单份记录。</li>
        </ul>
      </div>

      {/* Reports List */}
      {loaded && reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="clean-card p-6 shadow-card space-y-4 bg-white hover:border-black transition"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-lg text-[#111211]">
                      {report.birthProfile.callsign
                        ? `${report.birthProfile.callsign} 的命盘档案`
                        : "个人命盘分析档案"}
                    </span>
                    {report.isSample && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#5C6057] border border-[#E2E1DA] font-bold">
                        示例
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-[#767973]">
                    <span>公历：{report.birthProfile.solarDate}</span>
                    <span>
                      时间：{report.birthProfile.isTimeUnknown ? "不确定" : report.birthProfile.solarTime}
                    </span>
                    <span>地点：{report.birthProfile.city}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(report.id)}
                  className="w-8 h-8 rounded-full border border-[#E2E1DA] flex items-center justify-center text-[#767973] hover:text-red-600 hover:border-red-300 transition"
                  title="从此设备删除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Core Contradiction Snippet */}
              <p className="text-xs text-[#353833] italic bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E1DA] line-clamp-2">
                “{report.coreContradiction}”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-xs">
                <span className="text-[10px] text-[#767973]">
                  保存时间：{report.createdAt}
                </span>

                <Link
                  href={`/report/${report.id}`}
                  className="inline-flex items-center space-x-1.5 font-bold text-[#111211] hover:text-black transition"
                >
                  <span>阅读完整报告</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : loaded ? (
        <div className="clean-card p-12 text-center space-y-4 bg-white">
          <div className="w-14 h-14 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#767973] mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#111211]">
              当前设备暂无保存的档案
            </h3>
            <p className="text-xs text-[#767973]">
              你可以先开始一份免费分析，或查看平台基准示例报告。
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/assessment"
              className="btn-lime inline-flex items-center space-x-1.5 px-6 py-3 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>开始免费分析</span>
            </Link>
            <Link
              href="/report/sample"
              className="px-6 py-3 rounded-full border border-[#D5D4CC] text-xs font-bold text-[#111211] hover:bg-[#FAF9F5] transition"
            >
              查看示例报告
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

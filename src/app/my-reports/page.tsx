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
  Calendar,
  Clock,
  Compass,
  FileText,
  AlertCircle,
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
    <div className="max-w-2xl mx-auto py-2 space-y-6 pb-16">
      <div className="space-y-1">
        <h1 className="font-serif font-bold text-2xl text-moss-900">
          保存在此设备的报告
        </h1>
        <p className="text-xs text-ink-500">
          无需注册账户，报告仅存储于当前浏览器的本地缓存中。
        </p>
      </div>

      {/* Device Storage Limitation Notice */}
      <div className="p-4 rounded-xl bg-warm-100/80 border border-warm-200 text-xs text-ink-600 space-y-2">
        <div className="flex items-center space-x-2 text-moss-900 font-semibold">
          <ShieldCheck className="w-4 h-4 text-moss-800" />
          <span>本地存储机制与隐私说明</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          为最大程度保障您的出生资料隐私，目前报告直接保存在本设备的浏览器本地存储中，未上传至任何云端数据库。这意味着：
        </p>
        <ul className="list-disc list-inside text-[11px] space-y-1 text-ink-500 pl-1">
          <li>清除浏览器缓存或更换设备后，当前记录将无法查看。</li>
          <li>未来正式上线多端账户系统后，将支持登录并实现跨设备安全同步。</li>
          <li>您可以随时在此页面彻底清除本地单份记录。</li>
        </ul>
      </div>

      {/* Reports List */}
      {loaded && reports.length > 0 ? (
        <div className="space-y-3.5">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3 hover:border-moss-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-base text-moss-900">
                      {report.birthProfile.callsign
                        ? `${report.birthProfile.callsign} 的命盘报告`
                        : "个人命盘分析报告"}
                    </span>
                    {report.isSample && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-200 text-ink-600">
                        示例
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-ink-400">
                    <span>公历：{report.birthProfile.solarDate}</span>
                    <span>
                      时间：
                      {report.birthProfile.isTimeUnknown
                        ? "不确定"
                        : report.birthProfile.solarTime}
                    </span>
                    <span>地点：{report.birthProfile.city}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(report.id)}
                  className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="从此设备删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Core Contradiction Snippet */}
              <p className="text-xs text-ink-700 italic bg-[#FCFAF6] p-3 rounded-xl border border-warm-200 line-clamp-2">
                “{report.coreContradiction}”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-warm-100 text-xs">
                <span className="text-[11px] text-ink-400">
                  保存时间：{report.createdAt}
                </span>

                <Link
                  href={`/report/${report.id}`}
                  className="inline-flex items-center space-x-1 font-semibold text-moss-800 hover:text-moss-900 transition"
                >
                  <span>阅读完整报告</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : loaded ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D2] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center text-ink-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-moss-900">
              当前设备暂无保存的报告
            </h3>
            <p className="text-xs text-ink-500">
              你可以先开始一份免费分析，或查看平台基准示例报告。
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/assessment"
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              <span>开始免费分析</span>
            </Link>
            <Link
              href="/report/sample"
              className="px-4 py-2.5 rounded-xl border border-warm-300 text-xs font-medium text-ink-700 hover:bg-warm-100 transition"
            >
              查看示例报告
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

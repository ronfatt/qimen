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
    <div className="max-w-3xl mx-auto py-6 space-y-8 pb-20">
      <div className="space-y-2 border-b border-canvas-200 pb-4">
        <div className="editorial-tag text-gold-700">LOCAL DEVICE ARCHIVE</div>
        <h1 className="font-serif font-bold text-3xl text-editorial-950">
          保存在此设备的命盘档案
        </h1>
        <p className="text-xs text-editorial-600 font-mono">
          无需注册账户 · 报告仅加密存储于当前浏览器的本地缓存中
        </p>
      </div>

      {/* Storage Limitation Notice */}
      <div className="p-5 rounded-3xl bg-canvas-100/70 border border-canvas-200 text-xs text-editorial-700 space-y-2">
        <div className="flex items-center space-x-2 text-editorial-950 font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-gold-700" />
          <span>[ 本地单设备存储机制与隐私说明 ]</span>
        </div>
        <p className="text-[11px] leading-relaxed font-sans">
          为最大程度保障您的出生资料隐私，目前报告直接保存在本设备的浏览器本地存储中，未上传至任何云端数据库。这意味着：
        </p>
        <ul className="list-disc list-inside text-[11px] space-y-1 text-editorial-500 pl-1 font-mono">
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
              className="gallery-card rounded-3xl p-6 shadow-haute space-y-4 border border-canvas-200 hover:border-gold-500 transition group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-serif font-bold text-lg text-editorial-950 group-hover:text-gold-800 transition-colors">
                      {report.birthProfile.callsign
                        ? `${report.birthProfile.callsign} 的命盘档案`
                        : "个人命盘分析档案"}
                    </span>
                    {report.isSample && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 uppercase font-bold">
                        SAMPLE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] font-mono text-editorial-400">
                    <span>DATE: {report.birthProfile.solarDate}</span>
                    <span>
                      TIME: {report.birthProfile.isTimeUnknown ? "UNKNOWN" : report.birthProfile.solarTime}
                    </span>
                    <span>CITY: {report.birthProfile.city}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(report.id)}
                  className="w-8 h-8 rounded-full border border-canvas-200 flex items-center justify-center text-editorial-400 hover:text-red-600 hover:border-red-300 transition"
                  title="从此设备删除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Core Contradiction Snippet */}
              <p className="text-xs text-editorial-700 italic font-serif bg-canvas-100/60 p-4 rounded-2xl border border-canvas-200 line-clamp-2">
                “{report.coreContradiction}”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-canvas-100 text-xs font-mono">
                <span className="text-[10px] text-editorial-400">
                  ARCHIVED: {report.createdAt}
                </span>

                <Link
                  href={`/report/${report.id}`}
                  className="inline-flex items-center space-x-1.5 font-bold text-editorial-950 hover:text-gold-700 transition"
                >
                  <span>READ DOSSIER</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : loaded ? (
        <div className="gallery-card rounded-3xl p-12 text-center space-y-5 border border-canvas-200">
          <div className="w-14 h-14 rounded-full bg-canvas-100 flex items-center justify-center text-editorial-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-editorial-950">
              当前设备暂无保存的档案
            </h3>
            <p className="text-xs text-editorial-500 font-mono">
              你可以先开始一份免费分析，或查看平台基准示例报告。
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/assessment"
              className="btn-haute inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-editorial-950 text-gold-300 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>开始免费分析</span>
            </Link>
            <Link
              href="/report/sample"
              className="px-6 py-3 rounded-full border border-canvas-300 text-xs font-mono uppercase text-editorial-800 hover:bg-canvas-100 transition"
            >
              查看示例报告
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookingRequest, TeacherNote, AnalysisReport } from "@/types";
import { LocalReportStore } from "@/services/storage/local-report-store";
import { getTeacherById } from "@/data/mock-teachers";
import {
  Users,
  FileText,
  Calendar,
  Clock,
  Lock,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  Send,
  Save,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function TeacherPortalPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [authorizedReport, setAuthorizedReport] = useState<AnalysisReport | null>(null);

  // 笔记编辑状态
  const [privateNotes, setPrivateNotes] = useState("");
  const [clientSummary, setClientSummary] = useState("");
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  useEffect(() => {
    // 加载预约记录（含用户提交的演示记录与预置演示记录）
    const localBookings = LocalReportStore.getDemoBookings();
    
    // 如果无数据，注入一条标准的演示记录方便预览
    if (localBookings.length === 0) {
      const demoDefault: BookingRequest = {
        id: "booking-demo-001",
        teacherId: "teacher-chen",
        serviceId: "service-single-60",
        date: "2026-10-15",
        timeSlot: "19:30 - 20:30",
        clientName: "林先生（演示咨询者）",
        clientContact: "+60 12-345 6789",
        clientTimezone: "Asia/Kuala_Lumpur (UTC+8)",
        shareReportConsent: true,
        reportId: "sample-canonical-report",
        clientQuestion: "面对当前行业变动，是继续深耕原有管理架构，还是联合朋友尝试独立做新方向？",
        status: "pending_confirmation",
        isDemoSubmission: true,
        createdAt: "2026-10-02T10:00:00Z",
      };
      setBookings([demoDefault]);
      setSelectedBooking(demoDefault);
    } else {
      setBookings(localBookings);
      setSelectedBooking(localBookings[0]);
    }
  }, []);

  // 切换选中的预约
  useEffect(() => {
    if (!selectedBooking) return;

    // 加载授权报告
    if (selectedBooking.shareReportConsent && selectedBooking.reportId) {
      const rep = LocalReportStore.getReportById(selectedBooking.reportId);
      setAuthorizedReport(rep);
    } else {
      setAuthorizedReport(null);
    }

    // 加载已有的笔记
    const notesMap = LocalReportStore.getTeacherNotes();
    const existing = notesMap[selectedBooking.id];
    if (existing) {
      setPrivateNotes(existing.privateNotes);
      setClientSummary(existing.clientSummary);
    } else {
      setPrivateNotes("");
      setClientSummary("");
    }
  }, [selectedBooking]);

  const handleUpdateStatus = (newStatus: "pending_confirmation" | "confirmed" | "cancelled") => {
    if (!selectedBooking) return;
    LocalReportStore.updateBookingStatus(selectedBooking.id, newStatus);
    const updated = { ...selectedBooking, status: newStatus };
    setSelectedBooking(updated);
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    const noteRecord: TeacherNote = {
      id: `note-${selectedBooking.id}`,
      bookingId: selectedBooking.id,
      privateNotes,
      clientSummary,
      updatedAt: new Date().toISOString(),
    };

    LocalReportStore.saveTeacherNote(noteRecord);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Demo Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold flex items-center space-x-2">
            <span>【老师演示后台】严格安全隔离说明</span>
            <span className="text-[10px] px-2 py-0.2 rounded bg-amber-200 text-amber-800 font-semibold">
              演示沙箱
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800">
            当前处于演示环境，尚未接入正式角色权限认证（RBAC）。为保护真实咨询者隐私，本后台仅支持展示当前设备填写的本地演示数据与基准样本，严禁通过公开路由调取真实客户云端数据。
          </p>
        </div>
      </div>

      {/* Main Grid: Left Bookings list, Right Detail & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Bookings List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-moss-900">
              预约申请列表 ({bookings.length})
            </h2>
            <span className="text-[10px] text-ink-400">本地演示数据</span>
          </div>

          <div className="space-y-2">
            {bookings.map((item) => {
              const isSelected = selectedBooking?.id === item.id;
              const teacher = getTeacherById(item.teacherId);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedBooking(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col space-y-1.5 ${
                    isSelected
                      ? "bg-white border-moss-700 ring-1 ring-moss-700 shadow-soft"
                      : "bg-[#FCFAF6] border-warm-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-moss-900 truncate">
                      {item.clientName}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        item.status === "confirmed"
                          ? "bg-moss-100 text-moss-800"
                          : item.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-champagne-100 text-champagne-800"
                      }`}
                    >
                      {item.status === "confirmed"
                        ? "已确认"
                        : item.status === "cancelled"
                        ? "已取消"
                        : "待确认"}
                    </span>
                  </div>

                  <div className="text-[11px] text-ink-500">
                    老师：{teacher?.name || item.teacherId}
                  </div>
                  <div className="text-[10px] text-ink-400">
                    期望日期：{item.date} {item.timeSlot}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Booking Details, Authorized Report, Teacher Notes */}
        <div className="md:col-span-2 space-y-5">
          {selectedBooking ? (
            <>
              {/* Selected Booking Info Card */}
              <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                  <div>
                    <h3 className="font-serif font-bold text-base text-moss-900">
                      咨询申请详情
                    </h3>
                    <p className="text-[11px] text-ink-500">
                      申请编号：{selectedBooking.id}
                    </p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleUpdateStatus("confirmed")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        selectedBooking.status === "confirmed"
                          ? "bg-moss-800 text-warm-50"
                          : "border border-warm-200 text-ink-600 hover:bg-warm-100"
                      }`}
                    >
                      标记为已确认
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("pending_confirmation")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        selectedBooking.status === "pending_confirmation"
                          ? "bg-champagne-600 text-white"
                          : "border border-warm-200 text-ink-600 hover:bg-warm-100"
                      }`}
                    >
                      标记为待确认
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("cancelled")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        selectedBooking.status === "cancelled"
                          ? "bg-red-700 text-white"
                          : "border border-warm-200 text-ink-600 hover:bg-warm-100"
                      }`}
                    >
                      取消
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
                    <span className="text-[10px] text-ink-400 block">咨询客户</span>
                    <span className="font-medium text-ink-800">
                      {selectedBooking.clientName}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
                    <span className="text-[10px] text-ink-400 block">联络方式</span>
                    <span className="font-medium text-ink-800">
                      {selectedBooking.clientContact}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
                    <span className="text-[10px] text-ink-400 block">会谈时间与时区</span>
                    <span className="font-medium text-ink-800">
                      {selectedBooking.date} {selectedBooking.timeSlot} ({selectedBooking.clientTimezone})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-warm-100/70 border border-warm-200">
                    <span className="text-[10px] text-ink-400 block">报告授权状态</span>
                    <span
                      className={`font-semibold ${
                        selectedBooking.shareReportConsent
                          ? "text-moss-800"
                          : "text-ink-400"
                      }`}
                    >
                      {selectedBooking.shareReportConsent ? "已主动授权" : "未授权"}
                    </span>
                  </div>
                </div>

                {/* Client Question */}
                {selectedBooking.clientQuestion && (
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-warm-200 space-y-1">
                    <span className="font-semibold text-moss-900 block text-[11px]">
                      客户会前关切问题：
                    </span>
                    <p className="text-ink-700 leading-relaxed">
                      {selectedBooking.clientQuestion}
                    </p>
                  </div>
                )}
              </div>

              {/* Client Authorized Report Section */}
              {selectedBooking.shareReportConsent && (
                <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-warm-200">
                    <div className="flex items-center space-x-2 text-moss-900 font-serif font-bold">
                      <FileText className="w-4 h-4 text-moss-800" />
                      <span>客户授权分享的命盘报告</span>
                    </div>
                    {authorizedReport && (
                      <Link
                        href={`/report/${authorizedReport.id}`}
                        target="_blank"
                        className="text-moss-800 hover:text-moss-900 font-semibold underline text-[11px]"
                      >
                        在新标签页打开完整报告 →
                      </Link>
                    )}
                  </div>

                  {authorizedReport ? (
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-warm-100/70 border border-warm-200">
                        <span className="text-[10px] text-ink-400 block">
                          出生资料与主题
                        </span>
                        <div className="font-medium text-ink-800 pt-0.5">
                          {authorizedReport.birthProfile.solarDate} (
                          {authorizedReport.birthProfile.solarTime}) ·{" "}
                          {authorizedReport.birthProfile.city}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-moss-50 border border-moss-200 space-y-1">
                        <span className="font-semibold text-moss-900 text-[11px]">
                          核心内在矛盾（命盘特征）：
                        </span>
                        <p className="text-ink-700 leading-relaxed italic">
                          “{authorizedReport.coreContradiction}”
                        </p>
                      </div>

                      {authorizedReport.userFeedback && (
                        <div className="p-3 rounded-xl bg-[#FAF9F5] border border-warm-200 space-y-1">
                          <span className="font-semibold text-champagne-800 text-[11px]">
                            客户前期反馈（明确标记：结合补充经历）：
                          </span>
                          <p className="text-ink-700">
                            贴近度：{authorizedReport.userFeedback.closeness === "close" ? "很贴近" : "部分贴近"}
                            {authorizedReport.userFeedback.note && ` · 补充备注：${authorizedReport.userFeedback.note}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-warm-100 text-ink-500 text-center">
                      客户授权了报告，但本地未缓存完整命盘明细（可能在其他设备生成）。
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Notes Form (Strict Separation: Private Notes vs Client Visible Summary) */}
              <form
                onSubmit={handleSaveNotes}
                className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-4 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-warm-200">
                  <h3 className="font-serif font-bold text-base text-moss-900">
                    老师会谈工作台（笔记与摘要）
                  </h3>
                  {noteSavedToast && (
                    <span className="text-[11px] text-moss-700 font-semibold flex items-center space-x-1 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已保存当前工作记录</span>
                    </span>
                  )}
                </div>

                {/* 1. 老师私人笔记（严格私密，客户不可见） */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-red-50/50 border border-red-200/80">
                  <div className="flex items-center space-x-1.5 text-red-800 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-red-700" />
                    <span>老师私人笔记（仅自己可见，客户绝对不可见）</span>
                  </div>
                  <textarea
                    rows={4}
                    value={privateNotes}
                    onChange={(e) => setPrivateNotes(e.target.value)}
                    placeholder="记录当事人的阻抗点、真实防线动机、个人观察直觉、后续随访建议等私密备忘..."
                    className="w-full p-2.5 rounded-lg border border-red-200 bg-white text-ink-800 focus:outline-none focus:border-red-500 leading-relaxed text-xs"
                  />
                  <p className="text-[10px] text-red-600">
                    此区域数据在产品架构中受严格隔离，绝不会通过公开接口或客户报告展示。
                  </p>
                </div>

                {/* 2. 发给客户的解读摘要（客户可见） */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-moss-50/60 border border-moss-200">
                  <div className="flex items-center space-x-1.5 text-moss-900 font-semibold">
                    <Eye className="w-3.5 h-3.5 text-moss-700" />
                    <span>发给客户的解读摘要（会后同步给当事人）</span>
                  </div>
                  <textarea
                    rows={4}
                    value={clientSummary}
                    onChange={(e) => setClientSummary(e.target.value)}
                    placeholder="提炼会谈中达成共识的核心模式、认知调整锚点以及建议尝试的微小行动..."
                    className="w-full p-2.5 rounded-lg border border-moss-200 bg-white text-ink-800 focus:outline-none focus:border-moss-700 leading-relaxed text-xs"
                  />
                  <p className="text-[10px] text-moss-800">
                    此摘要为当事人提供后续复盘支持，内容建议保持温和、客观且富有行动指引。
                  </p>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
                  >
                    <Save className="w-3.5 h-3.5 text-champagne-300" />
                    <span>保存笔记与摘要</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-warm-200 p-8 text-center text-ink-500 text-xs">
              请从左侧列表选择一项预约记录进行查看。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookingRequest, TeacherNote, AnalysisReport } from "@/types";
import { LocalReportStore } from "@/services/storage/local-report-store";
import { getTeacherById } from "@/data/mock-teachers";
import {
  FileText,
  Lock,
  Eye,
  CheckCircle2,
  ShieldAlert,
  Save,
} from "lucide-react";

export default function TeacherPortalPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [authorizedReport, setAuthorizedReport] = useState<AnalysisReport | null>(null);

  const [privateNotes, setPrivateNotes] = useState("");
  const [clientSummary, setClientSummary] = useState("");
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  useEffect(() => {
    const localBookings = LocalReportStore.getDemoBookings();
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

  useEffect(() => {
    if (!selectedBooking) return;

    if (selectedBooking.shareReportConsent && selectedBooking.reportId) {
      const rep = LocalReportStore.getReportById(selectedBooking.reportId);
      setAuthorizedReport(rep);
    } else {
      setAuthorizedReport(null);
    }

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
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Top Demo Banner */}
      <div className="p-5 rounded-3xl bg-gold-50 border border-gold-200 text-xs text-gold-950 flex items-start space-x-3.5 shadow-gallery">
        <ShieldAlert className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold font-mono uppercase flex items-center space-x-2">
            <span>[ 导师工作台 · 严格安全隔离说明 ]</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-200 text-gold-900 font-bold">
              DEMO SANDBOX
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-gold-900 font-sans">
            当前处于演示环境，尚未接入正式角色权限认证（RBAC）。为保护真实咨询者隐私，本后台仅支持展示当前设备填写的本地演示数据与基准样本，严禁通过公开路由调取真实客户云端数据。
          </p>
        </div>
      </div>

      {/* Main Grid: Left Bookings list, Right Detail & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Bookings List */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-canvas-200">
            <h2 className="font-serif font-bold text-lg text-editorial-950">
              预约申请 ({bookings.length})
            </h2>
            <span className="font-mono text-[10px] text-editorial-400">QUEUE</span>
          </div>

          <div className="space-y-2.5">
            {bookings.map((item) => {
              const isSelected = selectedBooking?.id === item.id;
              const teacher = getTeacherById(item.teacherId);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedBooking(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition flex flex-col space-y-1.5 ${
                    isSelected
                      ? "bg-editorial-950 text-gold-100 border-editorial-950 shadow-haute"
                      : "bg-white border-canvas-200 hover:border-canvas-300 text-editorial-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate font-serif">
                      {item.clientName}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                        item.status === "confirmed"
                          ? "bg-moss-100 text-moss-800"
                          : item.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gold-200 text-gold-900"
                      }`}
                    >
                      {item.status === "confirmed"
                        ? "CONFIRMED"
                        : item.status === "cancelled"
                        ? "CANCELLED"
                        : "PENDING"}
                    </span>
                  </div>

                  <div className={`text-[11px] font-mono ${isSelected ? "text-canvas-300" : "text-editorial-500"}`}>
                    ADVISOR: {teacher?.name || item.teacherId}
                  </div>
                  <div className={`text-[10px] font-mono ${isSelected ? "text-canvas-400" : "text-editorial-400"}`}>
                    SLOT: {item.date} {item.timeSlot}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Selected Booking Details, Authorized Report, Teacher Notes */}
        <div className="md:col-span-8 space-y-6">
          {selectedBooking ? (
            <>
              {/* Selected Booking Info Card */}
              <div className="gallery-card rounded-3xl p-6 shadow-haute space-y-4 text-xs border border-canvas-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-canvas-200">
                  <div>
                    <span className="editorial-tag text-gold-700">INQUIRY PROFILE</span>
                    <h3 className="font-serif font-bold text-lg text-editorial-950">
                      咨询申请明细
                    </h3>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                    <button
                      onClick={() => handleUpdateStatus("confirmed")}
                      className={`px-3 py-1.5 rounded-full transition ${
                        selectedBooking.status === "confirmed"
                          ? "bg-editorial-950 text-gold-300 font-bold"
                          : "border border-canvas-300 text-editorial-700 hover:bg-canvas-100"
                      }`}
                    >
                      CONFIRM
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("pending_confirmation")}
                      className={`px-3 py-1.5 rounded-full transition ${
                        selectedBooking.status === "pending_confirmation"
                          ? "bg-gold-600 text-white font-bold"
                          : "border border-canvas-300 text-editorial-700 hover:bg-canvas-100"
                      }`}
                    >
                      PENDING
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("cancelled")}
                      className={`px-3 py-1.5 rounded-full transition ${
                        selectedBooking.status === "cancelled"
                          ? "bg-red-700 text-white font-bold"
                          : "border border-canvas-300 text-editorial-700 hover:bg-canvas-100"
                      }`}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
                    <span className="font-mono text-[10px] text-editorial-400 uppercase block">CLIENT / 客户</span>
                    <span className="font-bold text-editorial-950">
                      {selectedBooking.clientName}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
                    <span className="font-mono text-[10px] text-editorial-400 uppercase block">CONTACT / 联系</span>
                    <span className="font-bold text-editorial-950">
                      {selectedBooking.clientContact}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
                    <span className="font-mono text-[10px] text-editorial-400 uppercase block">SLOT / 时区</span>
                    <span className="text-editorial-900 font-mono text-[11px]">
                      {selectedBooking.date} {selectedBooking.timeSlot} ({selectedBooking.clientTimezone})
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-canvas-100/60 border border-canvas-200">
                    <span className="font-mono text-[10px] text-editorial-400 uppercase block">CONSENT / 授权</span>
                    <span className={`font-mono font-bold ${selectedBooking.shareReportConsent ? "text-gold-700" : "text-editorial-400"}`}>
                      {selectedBooking.shareReportConsent ? "AUTHORIZED" : "NOT AUTHORIZED"}
                    </span>
                  </div>
                </div>

                {/* Client Question */}
                {selectedBooking.clientQuestion && (
                  <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
                    <span className="editorial-tag text-gold-700 block">
                      CLIENT INITIAL INQUIRY / 客户会前关切
                    </span>
                    <p className="text-editorial-800 leading-relaxed font-sans">
                      {selectedBooking.clientQuestion}
                    </p>
                  </div>
                )}
              </div>

              {/* Client Authorized Report Section */}
              {selectedBooking.shareReportConsent && (
                <div className="gallery-card rounded-3xl p-6 shadow-haute space-y-4 text-xs border border-canvas-200">
                  <div className="flex items-center justify-between pb-3 border-b border-canvas-200">
                    <div className="flex items-center space-x-2 text-editorial-950 font-serif font-bold text-base">
                      <FileText className="w-4 h-4 text-gold-700" />
                      <span>客户授权分享的命盘报告</span>
                    </div>
                    {authorizedReport && (
                      <Link
                        href={`/report/${authorizedReport.id}`}
                        target="_blank"
                        className="text-gold-800 hover:text-gold-900 font-mono text-[11px] font-bold underline"
                      >
                        OPEN FULL DOSSIER →
                      </Link>
                    )}
                  </div>

                  {authorizedReport ? (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-canvas-100/60 border border-canvas-200 font-mono text-[11px]">
                        <span className="text-editorial-400 uppercase block mb-0.5">CHRONO:</span>
                        <div className="font-bold text-editorial-950">
                          {authorizedReport.birthProfile.solarDate} ({authorizedReport.birthProfile.solarTime}) · {authorizedReport.birthProfile.city}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
                        <span className="editorial-tag text-gold-700 block">CORE CONTRADICTION / 核心内在矛盾</span>
                        <p className="text-editorial-900 italic font-serif leading-relaxed">
                          “{authorizedReport.coreContradiction}”
                        </p>
                      </div>

                      {authorizedReport.userFeedback && (
                        <div className="p-3.5 rounded-2xl bg-gold-50 border border-gold-200 space-y-1">
                          <span className="font-mono text-[10px] text-gold-800 uppercase font-bold block">
                            CLIENT FEEDBACK (结合你补充的经历):
                          </span>
                          <p className="text-editorial-800 text-[11px]">
                            贴近度：{authorizedReport.userFeedback.closeness === "close" ? "很贴近" : "部分贴近"}
                            {authorizedReport.userFeedback.note && ` · 备注：${authorizedReport.userFeedback.note}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-canvas-100 text-editorial-500 text-center font-mono text-xs">
                      客户授权了报告，但本地未缓存完整命盘明细。
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Notes Form (Strict Separation) */}
              <form
                onSubmit={handleSaveNotes}
                className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-5 text-xs border border-canvas-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-canvas-200">
                  <h3 className="font-serif font-bold text-lg text-editorial-950">
                    导师会谈工作台 (笔记与摘要)
                  </h3>
                  {noteSavedToast && (
                    <span className="font-mono text-[11px] text-gold-700 font-bold flex items-center space-x-1 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                      <span>SAVED SUCCESSFULLY</span>
                    </span>
                  )}
                </div>

                {/* 1. 私人笔记 (严格私密) */}
                <div className="space-y-2 p-4 rounded-2xl bg-red-50/60 border border-red-200">
                  <div className="flex items-center space-x-2 text-red-900 font-bold font-mono text-xs">
                    <Lock className="w-3.5 h-3.5 text-red-700" />
                    <span>PRIVATE ADVISOR NOTES (仅自己可见 · 客户绝对不可见)</span>
                  </div>
                  <textarea
                    rows={4}
                    value={privateNotes}
                    onChange={(e) => setPrivateNotes(e.target.value)}
                    placeholder="记录当事人的阻抗点、真实防线动机、个人观察直觉、后续随访建议等私密备忘..."
                    className="w-full p-3 rounded-xl border border-red-200 bg-white text-editorial-950 focus:outline-none focus:border-red-500 leading-relaxed text-xs"
                  />
                  <p className="text-[10px] font-mono text-red-600">
                    * 严格数据隔离：绝不通过公开 API 或客户报告页面暴露。
                  </p>
                </div>

                {/* 2. 客户可见摘要 */}
                <div className="space-y-2 p-4 rounded-2xl bg-gold-50/60 border border-gold-200">
                  <div className="flex items-center space-x-2 text-gold-950 font-bold font-mono text-xs">
                    <Eye className="w-3.5 h-3.5 text-gold-700" />
                    <span>SYNTHESIS FOR CLIENT (发给客户的解读摘要)</span>
                  </div>
                  <textarea
                    rows={4}
                    value={clientSummary}
                    onChange={(e) => setClientSummary(e.target.value)}
                    placeholder="提炼会谈中达成共识的核心模式、认知调整锚点以及建议尝试的微小行动..."
                    className="w-full p-3 rounded-xl border border-gold-200 bg-white text-editorial-950 focus:outline-none focus:border-gold-600 leading-relaxed text-xs"
                  />
                  <p className="text-[10px] font-mono text-gold-800">
                    * 会谈结束后同步给当事人用于长期复盘。
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="btn-haute inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-editorial-950 text-gold-300 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition shadow-gallery"
                  >
                    <Save className="w-3.5 h-3.5 text-gold-400" />
                    <span>SAVE RECORD / 保存工作记录</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="gallery-card rounded-3xl border border-canvas-200 p-12 text-center text-editorial-500 font-mono text-xs">
              SELECT AN APPOINTMENT ENTRY TO COMMENCE SESSION.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

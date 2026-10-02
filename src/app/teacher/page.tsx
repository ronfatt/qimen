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
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Demo Banner */}
      <div className="p-5 rounded-3xl bg-[#F6F5ED] border border-[#E4E3DB] text-xs text-[#2A2D26] flex items-start space-x-3.5 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-[#111211] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold flex items-center space-x-2">
            <span>【老师演示后台】严格安全隔离说明</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111211] text-[#D4F53C] font-bold">
              演示沙箱
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#5C6057]">
            当前处于演示环境，尚未接入正式角色权限认证（RBAC）。为保护真实咨询者隐私，本后台仅支持展示当前设备填写的本地演示数据与基准样本，严禁通过公开路由调取真实客户云端数据。
          </p>
        </div>
      </div>

      {/* Main Grid: Left Bookings list, Right Detail & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Bookings List */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <h2 className="font-black text-lg text-[#111211]">
              预约申请列表 ({bookings.length})
            </h2>
            <span className="text-[10px] font-mono text-[#767973]">本地数据</span>
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
                      ? "bg-[#111211] text-white border-[#111211] shadow-md"
                      : "bg-white border-[#E2E1DA] hover:border-black text-[#111211]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate">
                      {item.clientName}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                        item.status === "confirmed"
                          ? "bg-[#D4F53C] text-[#111211]"
                          : item.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : isSelected
                          ? "bg-neutral-800 text-white"
                          : "bg-[#F3F2EC] text-[#111211]"
                      }`}
                    >
                      {item.status === "confirmed"
                        ? "已确认"
                        : item.status === "cancelled"
                        ? "已取消"
                        : "待确认"}
                    </span>
                  </div>

                  <div className={`text-[11px] ${isSelected ? "text-neutral-300" : "text-[#767973]"}`}>
                    老师：{teacher?.name || item.teacherId}
                  </div>
                  <div className={`text-[10px] ${isSelected ? "text-neutral-400" : "text-[#8C9087]"}`}>
                    时间：{item.date} {item.timeSlot}
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
              <div className="clean-card p-6 shadow-card space-y-4 text-xs bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE9E1]">
                  <div>
                    <h3 className="font-black text-lg text-[#111211]">
                      咨询申请详情
                    </h3>
                    <p className="text-[10px] text-[#767973]">
                      申请编号：{selectedBooking.id}
                    </p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <button
                      onClick={() => handleUpdateStatus("confirmed")}
                      className={`px-3 py-1.5 rounded-full transition font-semibold ${
                        selectedBooking.status === "confirmed"
                          ? "bg-[#111211] text-[#D4F53C]"
                          : "border border-[#D5D4CC] text-[#111211] hover:bg-[#F3F2EC]"
                      }`}
                    >
                      标记已确认
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("pending_confirmation")}
                      className={`px-3 py-1.5 rounded-full transition font-semibold ${
                        selectedBooking.status === "pending_confirmation"
                          ? "bg-[#D4F53C] text-[#111211]"
                          : "border border-[#D5D4CC] text-[#111211] hover:bg-[#F3F2EC]"
                      }`}
                    >
                      标记待确认
                    </button>
                    <button
                      onClick={() => handleUpdateStatus("cancelled")}
                      className={`px-3 py-1.5 rounded-full transition font-semibold ${
                        selectedBooking.status === "cancelled"
                          ? "bg-red-700 text-white"
                          : "border border-[#D5D4CC] text-[#111211] hover:bg-[#F3F2EC]"
                      }`}
                    >
                      取消
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
                    <span className="text-[10px] text-[#767973] uppercase font-bold block">咨询客户</span>
                    <span className="font-bold text-[#111211]">
                      {selectedBooking.clientName}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
                    <span className="text-[10px] text-[#767973] uppercase font-bold block">联络方式</span>
                    <span className="font-bold text-[#111211]">
                      {selectedBooking.clientContact}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
                    <span className="text-[10px] text-[#767973] uppercase font-bold block">会谈时间</span>
                    <span className="text-[#111211] font-mono text-[11px] font-bold">
                      {selectedBooking.date} {selectedBooking.timeSlot} ({selectedBooking.clientTimezone})
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB]">
                    <span className="text-[10px] text-[#767973] uppercase font-bold block">报告授权</span>
                    <span className={`font-bold ${selectedBooking.shareReportConsent ? "text-[#111211]" : "text-[#767973]"}`}>
                      {selectedBooking.shareReportConsent ? "已主动授权" : "未授权"}
                    </span>
                  </div>
                </div>

                {/* Client Question */}
                {selectedBooking.clientQuestion && (
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
                    <span className="font-bold text-xs text-[#111211] block">
                      客户会前关切问题：
                    </span>
                    <p className="text-[#353833] leading-relaxed">
                      {selectedBooking.clientQuestion}
                    </p>
                  </div>
                )}
              </div>

              {/* Client Authorized Report Section */}
              {selectedBooking.shareReportConsent && (
                <div className="clean-card p-6 shadow-card space-y-4 text-xs bg-white">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE9E1]">
                    <div className="flex items-center space-x-2 text-[#111211] font-bold text-base">
                      <FileText className="w-4 h-4 text-[#111211]" />
                      <span>客户授权分享的命盘报告</span>
                    </div>
                    {authorizedReport && (
                      <Link
                        href={`/report/${authorizedReport.id}`}
                        target="_blank"
                        className="text-[#111211] hover:underline font-bold text-[11px]"
                      >
                        在新标签页打开完整报告 →
                      </Link>
                    )}
                  </div>

                  {authorizedReport ? (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] font-mono text-[11px]">
                        <span className="text-[#767973] uppercase block mb-0.5">出生时空：</span>
                        <div className="font-bold text-[#111211]">
                          {authorizedReport.birthProfile.solarDate} ({authorizedReport.birthProfile.solarTime}) · {authorizedReport.birthProfile.city}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#111211] text-white space-y-1">
                        <span className="text-[10px] text-[#D4F53C] font-bold uppercase block">核心内在矛盾（命盘特征）：</span>
                        <p className="italic leading-relaxed">
                          “{authorizedReport.coreContradiction}”
                        </p>
                      </div>

                      {authorizedReport.userFeedback && (
                        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
                          <span className="font-bold text-[#111211] text-[11px] block">
                            客户反馈（明确标记：结合你补充的经历）:
                          </span>
                          <p className="text-[#353833]">
                            贴近度：{authorizedReport.userFeedback.closeness === "close" ? "很贴近" : "部分贴近"}
                            {authorizedReport.userFeedback.note && ` · 备注：${authorizedReport.userFeedback.note}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-[#FAF9F5] text-[#767973] text-center text-xs">
                      客户授权了报告，但本地未缓存完整命盘明细。
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Notes Form */}
              <form
                onSubmit={handleSaveNotes}
                className="clean-card p-6 shadow-card space-y-5 text-xs bg-white"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE9E1]">
                  <h3 className="font-black text-lg text-[#111211]">
                    老师会谈工作台 (笔记与摘要)
                  </h3>
                  {noteSavedToast && (
                    <span className="text-[11px] text-[#111211] font-bold flex items-center space-x-1 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#111211]" />
                      <span>已保存记录</span>
                    </span>
                  )}
                </div>

                {/* 1. 私人笔记 (严格私密) */}
                <div className="space-y-2 p-4 rounded-2xl bg-red-50 border border-red-200">
                  <div className="flex items-center space-x-2 text-red-900 font-bold text-xs">
                    <Lock className="w-3.5 h-3.5 text-red-700" />
                    <span>老师私人笔记 (仅自己可见 · 客户绝对不可见)</span>
                  </div>
                  <textarea
                    rows={4}
                    value={privateNotes}
                    onChange={(e) => setPrivateNotes(e.target.value)}
                    placeholder="记录当事人的阻抗点、真实防线动机、个人观察直觉、后续随访建议等私密备忘..."
                    className="w-full p-3 rounded-xl border border-red-200 bg-white text-[#111211] focus:outline-none focus:border-red-500 leading-relaxed text-xs"
                  />
                  <p className="text-[10px] text-red-600">
                    * 严格数据隔离：绝不通过公开 API 或客户报告页面暴露。
                  </p>
                </div>

                {/* 2. 客户可见摘要 */}
                <div className="space-y-2 p-4 rounded-2xl bg-[#D4F53C]/20 border border-[#D4F53C]">
                  <div className="flex items-center space-x-2 text-[#111211] font-bold text-xs">
                    <Eye className="w-3.5 h-3.5 text-[#111211]" />
                    <span>发给客户的解读摘要 (会后同步给当事人)</span>
                  </div>
                  <textarea
                    rows={4}
                    value={clientSummary}
                    onChange={(e) => setClientSummary(e.target.value)}
                    placeholder="提炼会谈中达成共识的核心模式、认知调整锚点以及建议尝试的微小行动..."
                    className="w-full p-3 rounded-xl border border-[#C2E42B] bg-white text-[#111211] focus:outline-none focus:border-black leading-relaxed text-xs"
                  />
                  <p className="text-[10px] text-[#44483C]">
                    * 会谈结束后同步给当事人用于长期复盘。
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="btn-dark inline-flex items-center space-x-2 px-7 py-3 text-xs font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>保存工作记录</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="clean-card p-12 text-center text-[#767973] text-xs bg-white">
              请从左侧列表选择一项预约记录进行查看。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getTeacherById } from "@/data/mock-teachers";
import { brandConfig } from "@/config/brand";
import { BookingRequest } from "@/types";
import { LocalReportStore } from "@/services/storage/local-report-store";
import {
  Calendar,
  Clock,
  User,
  AlertCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const teacherId = params?.teacherId as string;
  const initialServiceId = searchParams.get("serviceId");

  const teacher = getTeacherById(teacherId);

  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || teacher?.services[0]?.id || ""
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("19:30 - 20:30");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientTimezone, setClientTimezone] = useState("Asia/Kuala_Lumpur (UTC+8)");
  const [shareReportConsent, setShareReportConsent] = useState(true);
  const [clientQuestion, setClientQuestion] = useState("");

  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    const list = LocalReportStore.getSavedReports();
    setSavedReports(list);
    if (list.length > 0) {
      setSelectedReportId(list[0].id);
    }
  }, []);

  if (!teacher) {
    return (
      <div className="py-24 text-center space-y-3">
        <p className="font-mono text-sm text-editorial-700">ADVISOR PROFILE NOT FOUND</p>
        <Link href="/teachers" className="text-xs text-gold-700 underline font-mono">
          RETURN TO DIRECTORY
        </Link>
      </div>
    );
  }

  const selectedService =
    teacher.services.find((s) => s.id === selectedServiceId) || teacher.services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot || !clientName.trim() || !clientContact.trim()) {
      alert("请填写完整的预约时间、姓名与联系方式");
      return;
    }

    const bookingData: BookingRequest = {
      id: `booking-${Date.now()}`,
      teacherId: teacher.id,
      serviceId: selectedService.id,
      date,
      timeSlot,
      clientName: clientName.trim(),
      clientContact: clientContact.trim(),
      clientTimezone,
      shareReportConsent,
      reportId: shareReportConsent ? selectedReportId || undefined : undefined,
      clientQuestion: clientQuestion.trim() || undefined,
      status: "pending_confirmation",
      isDemoSubmission: true,
      createdAt: new Date().toISOString(),
    };

    LocalReportStore.saveDemoBooking(bookingData);
    setSubmittedBooking(bookingData);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasWhatsapp = !!brandConfig.contact.whatsapp;
  const whatsappBookingText = encodeURIComponent(
    `您好【${brandConfig.name}】，我已提交与【${teacher.name}】老师的预约申请：\n· 姓名：${clientName}\n· 预约服务：${selectedService.name}\n· 日期：${date} ${timeSlot}\n· 费用：RM ${selectedService.priceRM}\n请问如何确认档期？`
  );
  const whatsappManualUrl = hasWhatsapp
    ? `https://wa.me/${brandConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappBookingText}`
    : "#";

  return (
    <div className="max-w-xl mx-auto py-6 space-y-8 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono uppercase text-editorial-500">
        <Link href={`/teachers/${teacher.id}`} className="hover:text-gold-700 transition">
          ← BACK TO {teacher.name}
        </Link>
        <span>/</span>
        <span className="text-editorial-950 font-bold">CONCIERGE BOOKING</span>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Teacher & Service Summary */}
          <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-5 border border-canvas-200">
            <div className="flex items-center justify-between pb-4 border-b border-canvas-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-editorial-950 border border-editorial-800 flex items-center justify-center text-gold-300 font-serif font-bold text-xl shadow-gallery">
                  {teacher.name.slice(0, 1)}
                </div>
                <div>
                  <span className="editorial-tag text-gold-700">APPOINTMENT ATELIER</span>
                  <h2 className="font-serif font-bold text-lg text-editorial-950">
                    预约导师：{teacher.name}
                  </h2>
                </div>
              </div>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 uppercase font-semibold">
                1-ON-1
              </span>
            </div>

            {/* Select Service */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-editorial-700 block">
                选择咨询服务方案 / SERVICE TIER
              </label>
              <div className="space-y-2.5">
                {teacher.services.map((svc) => (
                  <label
                    key={svc.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      selectedServiceId === svc.id
                        ? "bg-editorial-950 text-gold-100 border-editorial-950 shadow-gallery"
                        : "bg-[#FCFAF5] border-canvas-200 hover:border-canvas-300 text-editorial-950"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="service"
                        checked={selectedServiceId === svc.id}
                        onChange={() => setSelectedServiceId(svc.id)}
                        className="text-gold-500 focus:ring-gold-500"
                      />
                      <div>
                        <div className="text-xs font-bold font-serif">
                          {svc.name}
                        </div>
                        <div className={`text-[10px] font-mono ${selectedServiceId === svc.id ? "text-canvas-400" : "text-editorial-500"}`}>
                          EST. {svc.durationMinutes} MINUTES
                        </div>
                      </div>
                    </div>
                    <div className="font-serif font-bold text-sm text-gold-400">
                      RM {svc.priceRM}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Date & Slot */}
          <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-4 border border-canvas-200">
            <h3 className="font-serif font-bold text-base text-editorial-950 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gold-700" />
              <span>选择预约日期与期望时段</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  期望日期 / DATE <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  期望时段 / SLOT <span className="text-red-500">*</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                >
                  <option value="10:00 - 11:00">上午 10:00 - 11:00</option>
                  <option value="14:00 - 15:00">下午 14:00 - 15:00</option>
                  <option value="16:00 - 17:00">下午 16:00 - 17:00</option>
                  <option value="19:30 - 20:30">晚上 19:30 - 20:30</option>
                  <option value="20:30 - 21:30">晚上 20:30 - 21:30</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-editorial-700">
                你的时区 / TIMEZONE
              </label>
              <input
                type="text"
                value={clientTimezone}
                onChange={(e) => setClientTimezone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
              />
            </div>
          </div>

          {/* Card: Client Info & Report Sharing */}
          <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-4 border border-canvas-200">
            <h3 className="font-serif font-bold text-base text-editorial-950 flex items-center space-x-2">
              <User className="w-4 h-4 text-gold-700" />
              <span>联络方式与会前授权</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  姓名 / 称呼 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="例如：林女士"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  WhatsApp 手机号或邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder="+6012... 或 电子邮箱"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                />
              </div>
            </div>

            {/* Share Report Consent */}
            <div className="p-4 rounded-2xl bg-canvas-100/70 border border-canvas-200 space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareReportConsent}
                  onChange={(e) => setShareReportConsent(e.target.checked)}
                  className="mt-0.5 rounded text-editorial-950 focus:ring-gold-500"
                />
                <div className="text-xs text-editorial-800">
                  <span className="font-bold block text-editorial-950">
                    主动授权老师查阅我的命盘分析报告
                  </span>
                  <span className="text-[11px] text-editorial-600 leading-relaxed block mt-0.5 font-sans">
                    勾选后，老师将在会谈前预先查阅你的命盘符号与反思记录，以便把宝贵时间留给针对性的探讨。
                  </span>
                </div>
              </label>

              {shareReportConsent && savedReports.length > 0 && (
                <div className="pt-2 text-xs">
                  <label className="font-mono text-[10px] text-editorial-500 uppercase block mb-1">
                    ASSOCIATED REPORT / 关联分享报告:
                  </label>
                  <select
                    value={selectedReportId}
                    onChange={(e) => setSelectedReportId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-canvas-300 text-xs bg-white text-editorial-900"
                  >
                    {savedReports.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.birthProfile.solarDate} ({r.birthProfile.focusTopic}) - {r.id}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Client Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-editorial-700">
                本次会谈最想聚焦的问题 (可选 / 限200字)
              </label>
              <textarea
                rows={3}
                value={clientQuestion}
                onChange={(e) => setClientQuestion(e.target.value)}
                placeholder="简短描述你最渴望通过本次会谈得到厘清的现实困惑..."
                maxLength={200}
                className="w-full p-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
              />
            </div>
          </div>

          {/* Pricing statement */}
          <div className="p-5 rounded-2xl bg-canvas-100/60 border border-canvas-200 space-y-2 text-xs text-editorial-700">
            <div className="flex justify-between font-serif font-bold text-base text-editorial-950">
              <span>应付咨询费用：</span>
              <span className="text-gold-800">RM {selectedService.priceRM}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-editorial-500 font-mono">
              说明：本平台第一版暂未接入在线支付与自动通知。提交后客服或老师将与您核对具体档期后方才安排支付，绝不在未经双方确认前扣费。
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-haute w-full py-4 rounded-full bg-editorial-950 text-gold-300 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition shadow-haute flex items-center justify-center space-x-2"
          >
            <span>SUBMIT APPOINTMENT / 提交预约申请</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
        </form>
      ) : (
        /* Submission Result Card */
        <div className="gallery-card rounded-3xl p-6 sm:p-10 shadow-haute space-y-6 border border-canvas-200 animate-fadeIn">
          {/* Status Header */}
          <div className="text-center space-y-2 pb-6 border-b border-canvas-200">
            <div className="w-14 h-14 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center text-gold-800 mx-auto">
              <Clock className="w-6 h-6 text-gold-700" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-editorial-950">
              预约申请已提交，等待确认
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-canvas-200 text-xs font-mono text-editorial-700 font-semibold uppercase">
              STATUS: PENDING CONFIRMATION (DEMO SUBMISSION)
            </div>
          </div>

          {/* Notice */}
          <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-xs text-gold-900 space-y-1">
            <div className="flex items-center space-x-2 font-bold font-mono">
              <AlertCircle className="w-4 h-4 text-gold-700 flex-shrink-0" />
              <span>[ 平台环境提示 ]</span>
            </div>
            <p className="text-[11px] leading-relaxed font-sans">
              当前系统处于演示阶段，尚未接入生产级短讯/邮件推送服务。此预约已记录在演示后台（可在导航栏「策展后台」查看），但尚未实际发往外部老师邮箱。
            </p>
          </div>

          {/* Booking Summary */}
          <div className="p-5 rounded-2xl bg-canvas-100/70 border border-canvas-200 text-xs space-y-2.5">
            <div className="flex justify-between py-1 border-b border-canvas-200">
              <span className="font-mono text-editorial-500 uppercase">ADVISOR / 老师</span>
              <span className="font-bold text-editorial-950 font-serif">{teacher.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-canvas-200">
              <span className="font-mono text-editorial-500 uppercase">TIER / 服务方案</span>
              <span className="text-editorial-800">{selectedService.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-canvas-200">
              <span className="font-mono text-editorial-500 uppercase">FEE / 费用时长</span>
              <span className="font-bold text-gold-800 font-serif">
                {selectedService.durationMinutes} 分钟 · RM {selectedService.priceRM}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-canvas-200">
              <span className="font-mono text-editorial-500 uppercase">SLOT / 期望时间</span>
              <span className="text-editorial-800">{date} · {timeSlot} ({clientTimezone})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-canvas-200">
              <span className="font-mono text-editorial-500 uppercase">CLIENT / 联络人</span>
              <span className="text-editorial-800">{clientName} ({clientContact})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-mono text-editorial-500 uppercase">CONSENT / 报告授权</span>
              <span className="text-gold-800 font-bold">
                {shareReportConsent ? "已主动同意授权" : "未授权"}
              </span>
            </div>
          </div>

          {/* WhatsApp Direct */}
          {hasWhatsapp && (
            <div className="space-y-2 pt-2">
              <span className="text-xs text-editorial-600 block font-mono">
                DIRECT CONCIERGE DISPATCH:
              </span>
              <a
                href={whatsappManualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase font-bold hover:bg-[#1EBE5D] transition shadow-gallery"
              >
                <MessageCircle className="w-4 h-4" />
                <span>在 WhatsApp 手动发送预约摘要给老师</span>
              </a>
            </div>
          )}

          {/* Action links */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/teacher"
              className="flex-1 py-3 text-center rounded-full bg-canvas-200 text-editorial-900 text-xs font-mono uppercase font-semibold hover:bg-canvas-300 transition"
            >
              前往演示后台查看记录
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 text-center rounded-full bg-editorial-950 text-gold-200 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition"
            >
              返回首页 / INDEX
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

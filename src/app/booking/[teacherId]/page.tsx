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
        <p className="text-sm font-bold text-[#111211]">未找到指定老师资料</p>
        <Link href="/teachers" className="text-xs text-[#111211] underline">
          返回老师列表
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
    <div className="max-w-xl mx-auto py-4 space-y-6 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-[#767973]">
        <Link href={`/teachers/${teacher.id}`} className="hover:text-black transition">
          ← 返回【{teacher.name}】详情
        </Link>
        <span>/</span>
        <span className="text-[#111211] font-bold">预约深入解读</span>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Teacher & Service Summary */}
          <div className="clean-card p-6 shadow-card space-y-4 bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE9E1]">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#111211] text-[#D4F53C] flex items-center justify-center font-black text-xl shadow-sm">
                  {teacher.name.slice(0, 1)}
                </div>
                <div>
                  <h2 className="font-bold text-base text-[#111211]">
                    预约咨询：{teacher.name}
                  </h2>
                  <p className="text-[11px] text-[#767973]">{teacher.title}</p>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF9F5] text-[#5C6057] font-semibold border border-[#E2E1DA]">
                1对1深入解读
              </span>
            </div>

            {/* Select Service */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#111211] block">
                选择服务方案
              </label>
              <div className="space-y-2">
                {teacher.services.map((svc) => (
                  <label
                    key={svc.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      selectedServiceId === svc.id
                        ? "bg-[#D4F53C]/20 border-[#D4F53C] ring-1 ring-[#D4F53C]"
                        : "bg-[#FAF9F5] border-[#E2E1DA] hover:border-black"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="service"
                        checked={selectedServiceId === svc.id}
                        onChange={() => setSelectedServiceId(svc.id)}
                        className="text-black focus:ring-black"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#111211]">
                          {svc.name}
                        </div>
                        <div className="text-[10px] text-[#767973]">
                          约 {svc.durationMinutes} 分钟
                        </div>
                      </div>
                    </div>
                    <div className="font-black text-sm text-[#111211]">
                      RM {svc.priceRM}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Date & Slot */}
          <div className="clean-card p-6 shadow-card space-y-4 bg-white">
            <h3 className="font-black text-base text-[#111211] flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#111211]" />
              <span>选择预约日期与期望时段</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111211]">
                  期望日期 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111211]">
                  期望时段 <span className="text-red-500">*</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
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
              <label className="block text-xs font-bold text-[#111211]">
                你的时区
              </label>
              <input
                type="text"
                value={clientTimezone}
                onChange={(e) => setClientTimezone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
              />
            </div>
          </div>

          {/* Card: Client Info & Report Sharing */}
          <div className="clean-card p-6 shadow-card space-y-4 bg-white">
            <h3 className="font-black text-base text-[#111211] flex items-center space-x-2">
              <User className="w-4 h-4 text-[#111211]" />
              <span>联络方式与会前授权</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111211]">
                  姓名/称呼 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="例如：林女士"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111211]">
                  WhatsApp 手机号或邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder="+6012... 或 邮箱"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
                />
              </div>
            </div>

            {/* Share Report Consent */}
            <div className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareReportConsent}
                  onChange={(e) => setShareReportConsent(e.target.checked)}
                  className="mt-0.5 rounded text-black focus:ring-black"
                />
                <div className="text-xs text-[#111211]">
                  <span className="font-bold block">
                    主动授权老师查阅我的命盘分析报告
                  </span>
                  <span className="text-[11px] text-[#5C6057] leading-relaxed block mt-0.5">
                    勾选后，老师将在会谈前预先查阅你的命盘符号与反思记录，以便把宝贵时间留给针对性的探讨。
                  </span>
                </div>
              </label>

              {shareReportConsent && savedReports.length > 0 && (
                <div className="pt-2 text-xs">
                  <label className="text-[10px] text-[#767973] uppercase font-bold block mb-1">
                    选择关联分享的报告：
                  </label>
                  <select
                    value={selectedReportId}
                    onChange={(e) => setSelectedReportId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2E1DA] text-xs bg-white text-[#111211]"
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
              <label className="block text-xs font-bold text-[#111211]">
                本次会谈最想聚焦的问题（可选，限200字）
              </label>
              <textarea
                rows={3}
                value={clientQuestion}
                onChange={(e) => setClientQuestion(e.target.value)}
                placeholder="简短描述你最渴望通过本次会谈得到厘清的现实困惑..."
                maxLength={200}
                className="w-full p-3.5 rounded-2xl border border-[#E2E1DA] text-xs text-[#111211] focus:outline-none focus:border-black bg-[#FAF9F5]"
              />
            </div>
          </div>

          {/* Pricing statement */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E1DA] space-y-2 text-xs text-[#5C6057]">
            <div className="flex justify-between font-bold text-base text-[#111211]">
              <span>应付金额：</span>
              <span>RM {selectedService.priceRM}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#767973]">
              说明：本平台第一版暂未接入在线支付与自动通知。提交后客服或老师将与您核对具体档期后方才安排支付，绝不在未经双方确认前扣费。
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="btn-lime w-full py-4 text-xs font-bold uppercase flex items-center justify-center space-x-2"
          >
            <span>提交预约申请</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* Submission Result Card */
        <div className="clean-card p-6 sm:p-10 shadow-card space-y-6 bg-white animate-fadeIn">
          {/* Status Header */}
          <div className="text-center space-y-2 pb-5 border-b border-[#EAE9E1]">
            <div className="w-14 h-14 rounded-full bg-[#D4F53C] flex items-center justify-center text-[#111211] mx-auto">
              <Clock className="w-7 h-7 text-[#111211]" />
            </div>
            <h2 className="text-2xl font-black text-[#111211]">
              预约申请已提交，等待确认
            </h2>
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#F3F2EC] text-xs text-[#111211] font-bold">
              状态：待确认（演示提交，未发送）
            </div>
          </div>

          {/* Notice */}
          <div className="p-4 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] text-xs text-[#3A3D36] space-y-1">
            <div className="flex items-center space-x-2 font-bold text-[#111211]">
              <AlertCircle className="w-4 h-4 text-[#111211] flex-shrink-0" />
              <span>【平台环境提示】</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              当前系统处于演示阶段，尚未接入生产级短讯/邮件推送服务。此预约已记录在演示后台（可在导航栏「演示后台」查看），但尚未实际发往外部老师邮箱。
            </p>
          </div>

          {/* Booking Summary */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] text-xs space-y-2.5">
            <div className="flex justify-between py-1 border-b border-[#EAE9E1]">
              <span className="text-[#767973]">老师：</span>
              <span className="font-bold text-[#111211]">{teacher.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE9E1]">
              <span className="text-[#767973]">服务：</span>
              <span className="text-[#111211]">{selectedService.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE9E1]">
              <span className="text-[#767973]">时长与费用：</span>
              <span className="font-bold text-[#111211]">
                {selectedService.durationMinutes} 分钟 · RM {selectedService.priceRM}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE9E1]">
              <span className="text-[#767973]">期望时间：</span>
              <span className="text-[#111211]">{date} · {timeSlot} ({clientTimezone})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE9E1]">
              <span className="text-[#767973]">联络人：</span>
              <span className="text-[#111211]">{clientName} ({clientContact})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#767973]">报告分享同意：</span>
              <span className="text-[#111211] font-bold">
                {shareReportConsent ? "已主动同意授权" : "未授权"}
              </span>
            </div>
          </div>

          {/* WhatsApp Direct */}
          {hasWhatsapp && (
            <div className="space-y-2 pt-2">
              <span className="text-xs text-[#5C6057] block font-semibold">
                如需快速加速档期确认，可复制信息直接在 WhatsApp 联系：
              </span>
              <a
                href={whatsappManualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition shadow-sm"
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
              className="flex-1 py-3 text-center rounded-full bg-[#F3F2EC] text-[#111211] text-xs font-bold hover:bg-[#EAE9E1] transition"
            >
              前往演示后台查看记录
            </Link>
            <Link
              href="/"
              className="btn-dark flex-1 py-3 text-center text-xs font-bold"
            >
              返回首页
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacherById } from "@/data/mock-teachers";
import { brandConfig } from "@/config/brand";
import {
  Clock,
  Globe2,
  Video,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  FileCheck,
  ArrowUpRight,
} from "lucide-react";

export default function TeacherDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = getTeacherById(params.id);

  if (!teacher) {
    notFound();
  }

  const hasWhatsapp = !!brandConfig.contact.whatsapp;
  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${brandConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `您好，我在【${brandConfig.name}】平台想要咨询【${teacher.name}】老师的命盘深入解读。`
      )}`
    : "#";

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto pb-20">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-[#767973]">
        <Link href="/teachers" className="hover:text-black transition">
          ← 返回老师列表
        </Link>
        <span>/</span>
        <span className="text-[#111211] font-bold">{teacher.name}</span>
      </div>

      {/* Main Profile Card */}
      <div className="clean-card p-6 sm:p-8 shadow-card space-y-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#EAE9E1]">
          <div className="flex items-center space-x-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#111211] text-[#D4F53C] flex items-center justify-center font-black text-3xl shadow-sm flex-shrink-0">
              {teacher.name.slice(0, 1)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl font-black text-[#111211]">
                  {teacher.name}
                </h1>
                {teacher.isSample && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF9F5] text-[#5C6057] border border-[#E2E1DA] font-semibold">
                    平台示例老师
                  </span>
                )}
              </div>
              <p className="text-xs text-[#767973]">{teacher.title}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-[#767973] uppercase font-bold block">单次深度咨询</span>
            <div className="text-3xl font-black text-[#111211]">
              RM {teacher.priceRM}
            </div>
            <span className="text-[11px] text-[#767973]">时长约 {teacher.durationMinutes} 分钟</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1 text-xs text-[#353833] leading-relaxed">
          <h2 className="font-bold text-sm text-[#111211]">老师简介</h2>
          <p>{teacher.bio}</p>
        </div>

        {/* Methodology */}
        <div className="p-5 rounded-2xl bg-[#F6F5ED] border border-[#E4E3DB] space-y-1 text-xs text-[#2A2E26] leading-relaxed">
          <h2 className="font-bold text-sm text-[#111211]">解读方法与理念</h2>
          <p>{teacher.methodology}</p>
        </div>

        {/* Basic Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
            <span className="text-[10px] text-[#767973] font-bold block">咨询语言</span>
            <span className="font-bold text-[#111211]">{teacher.languages.join("、")}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
            <span className="text-[10px] text-[#767973] font-bold block">服务方式</span>
            <span className="font-bold text-[#111211]">{teacher.consultationModes.join(" · ")}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2E1DA] space-y-1">
            <span className="text-[10px] text-[#767973] font-bold block">常态可预约时段</span>
            <span className="font-bold text-[#111211] text-[11px] block">{teacher.availableSlots[0]}</span>
          </div>
        </div>
      </div>

      {/* Agenda & Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 会谈包含什么 */}
        <div className="clean-card p-6 sm:p-7 shadow-card space-y-3.5 bg-white">
          <div className="flex items-center space-x-2 text-[#111211] font-black text-base">
            <CheckCircle2 className="w-4 h-4 text-[#111211]" />
            <h2>会谈包含什么</h2>
          </div>
          <ul className="space-y-2 text-xs text-[#353833]">
            {teacher.agenda.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111211] mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 用户需要准备什么 */}
        <div className="clean-card p-6 sm:p-7 shadow-card space-y-3.5 bg-white">
          <div className="flex items-center space-x-2 text-[#111211] font-black text-base">
            <FileCheck className="w-4 h-4 text-[#111211]" />
            <h2>用户需要准备什么</h2>
          </div>
          <ul className="space-y-2 text-xs text-[#353833]">
            {teacher.clientPreparation.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111211] mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services and Pricing Options */}
      <div className="clean-card p-6 sm:p-7 shadow-card space-y-4 bg-white">
        <h2 className="font-black text-base text-[#111211]">
          可选择的会谈服务方案
        </h2>
        <div className="space-y-3">
          {teacher.services.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-2xl border border-[#E2E1DA] bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base text-[#111211]">
                    {svc.name}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EAE9E1] text-[#111211] font-bold">
                    {svc.durationMinutes} 分钟
                  </span>
                </div>
                <p className="text-xs text-[#6B6E66]">{svc.description}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center">
                <div className="text-xl font-black text-[#111211]">
                  RM {svc.priceRM}
                </div>
                <Link
                  href={`/booking/${teacher.id}?serviceId=${svc.id}`}
                  className="btn-lime px-6 py-2.5 text-xs font-bold"
                >
                  预约此方案
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp & Booking CTA */}
      <div className="rounded-3xl bg-[#111211] text-white p-7 sm:p-9 shadow-2xl space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">
            预约与会前沟通
          </h2>
          <p className="text-xs text-[#A2A69D] leading-relaxed">
            你可以直接通过平台填写预约单申请档期，也可在 WhatsApp 留下你初步关心的问题。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-1">
          <Link
            href={`/booking/${teacher.id}`}
            className="btn-lime flex-1 inline-flex items-center justify-center space-x-2 py-3.5 text-xs font-bold"
          >
            <span>立即提交预约申请</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {hasWhatsapp ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-white text-[#111211] text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>WhatsApp 咨询（人工）</span>
            </a>
          ) : (
            <div className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-800 text-neutral-400 text-xs font-bold cursor-not-allowed">
              <MessageCircle className="w-4 h-4 text-neutral-500" />
              <span>WhatsApp 联系方式待设置</span>
            </div>
          )}
        </div>

        {!hasWhatsapp && (
          <p className="text-[10px] text-[#868A82]">
            * 提示：管理员尚未在配置文件中配置 WhatsApp 号码。系统严格禁止跳转到虚假号码。
          </p>
        )}
      </div>
    </div>
  );
}

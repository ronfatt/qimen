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
    <div className="space-y-10 py-6 max-w-3xl mx-auto pb-20">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono uppercase text-editorial-500">
        <Link href="/teachers" className="hover:text-gold-700 transition">
          ← BACK TO DIRECTORY
        </Link>
        <span>/</span>
        <span className="text-editorial-950 font-bold">{teacher.name}</span>
      </div>

      {/* Main Profile Dossier Card */}
      <div className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-6 border border-canvas-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-canvas-200">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-3xl bg-editorial-950 border border-editorial-800 flex items-center justify-center text-gold-300 font-serif font-bold text-3xl shadow-gallery flex-shrink-0">
              {teacher.name.slice(0, 1)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <h1 className="font-serif font-bold text-2xl text-editorial-950">
                  {teacher.name}
                </h1>
                {teacher.isSample && (
                  <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 uppercase font-semibold">
                    EXHIBIT ADVISOR
                  </span>
                )}
              </div>
              <p className="text-xs text-editorial-500 font-mono">{teacher.title}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-mono text-[10px] uppercase text-editorial-400 block">STANDARD APPOINTMENT</span>
            <div className="font-serif font-bold text-3xl text-editorial-950 text-gold-800">
              RM {teacher.priceRM}
            </div>
            <span className="font-mono text-[11px] text-editorial-500">EST. {teacher.durationMinutes} MINUTES</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2 text-xs text-editorial-700 leading-relaxed">
          <span className="editorial-tag text-gold-700 block">BACKGROUND BIOGRAPHY</span>
          <p>{teacher.bio}</p>
        </div>

        {/* Methodology */}
        <div className="p-5 rounded-2xl bg-canvas-100/70 border border-canvas-200 space-y-2 text-xs text-editorial-800 leading-relaxed">
          <span className="editorial-tag text-gold-700 block">METHODOLOGY & PHILOSOPHY</span>
          <p>{teacher.methodology}</p>
        </div>

        {/* Basic Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block">LANGUAGES</span>
            <span className="font-medium text-editorial-950">{teacher.languages.join("、")}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block">MODE</span>
            <span className="font-medium text-editorial-950">{teacher.consultationModes.join(" · ")}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-canvas-200 space-y-1 shadow-gallery">
            <span className="font-mono text-[10px] text-editorial-400 uppercase block">USUAL SLOTS</span>
            <span className="font-medium text-editorial-950 text-[11px] block">{teacher.availableSlots[0]}</span>
          </div>
        </div>
      </div>

      {/* Agenda & Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 会谈包含什么 */}
        <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-4 border border-canvas-200">
          <div className="flex items-center space-x-2 text-editorial-950 font-serif font-bold text-base">
            <CheckCircle2 className="w-4 h-4 text-gold-700" />
            <h2>会谈包含什么 / AGENDA</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-editorial-700">
            {teacher.agenda.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 用户需要准备什么 */}
        <div className="gallery-card rounded-3xl p-6 sm:p-7 shadow-haute space-y-4 border border-canvas-200">
          <div className="flex items-center space-x-2 text-editorial-950 font-serif font-bold text-base">
            <FileCheck className="w-4 h-4 text-gold-700" />
            <h2>用户需要准备什么 / PREPARATION</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-editorial-700">
            {teacher.clientPreparation.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-editorial-700 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services and Pricing Options */}
      <div className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-4 border border-canvas-200">
        <div className="space-y-0.5 border-b border-canvas-200 pb-3">
          <span className="editorial-tag text-gold-700">CONSULTATION TIERS</span>
          <h2 className="font-serif font-bold text-lg text-editorial-950">
            可选会谈服务方案
          </h2>
        </div>
        <div className="space-y-3">
          {teacher.services.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-2xl border border-canvas-200 bg-[#FCFAF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-base text-editorial-950">
                    {svc.name}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 uppercase font-semibold">
                    {svc.durationMinutes} MINS
                  </span>
                </div>
                <p className="text-xs text-editorial-600">{svc.description}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center">
                <div className="font-serif font-bold text-xl text-editorial-950">
                  RM {svc.priceRM}
                </div>
                <Link
                  href={`/booking/${teacher.id}?serviceId=${svc.id}`}
                  className="btn-haute px-6 py-2.5 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono font-semibold uppercase hover:bg-editorial-900 transition shadow-gallery"
                >
                  预约此方案
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp & Booking CTA */}
      <div className="rounded-3xl bg-editorial-950 text-gold-100 p-8 sm:p-10 shadow-haute space-y-5 border border-editorial-800">
        <div className="space-y-2">
          <span className="editorial-tag text-gold-400">DIRECT CONCIERGE ACCESS</span>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-canvas-pure">
            预约与会前沟通渠道
          </h2>
          <p className="text-xs sm:text-sm text-canvas-300 leading-relaxed">
            你可以直接通过平台填写预约单申请档期，也可在 WhatsApp 留下你初步关心的问题。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href={`/booking/${teacher.id}`}
            className="btn-haute flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-full bg-gold-500 text-editorial-950 text-xs font-mono font-bold uppercase hover:bg-gold-400 transition"
          >
            <span>立即提交预约申请</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {hasWhatsapp ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-white text-editorial-950 text-xs font-mono uppercase font-bold hover:bg-canvas-100 transition shadow-gallery"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>WHATSAPP 人工咨询</span>
            </a>
          ) : (
            <div className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-editorial-900 text-editorial-500 text-xs font-mono uppercase cursor-not-allowed border border-editorial-800">
              <MessageCircle className="w-4 h-4 text-editorial-600" />
              <span>WHATSAPP 联系方式待设置</span>
            </div>
          )}
        </div>

        {!hasWhatsapp && (
          <p className="text-[10px] font-mono text-editorial-400">
            * 提示：管理员尚未在配置文件中配置 WhatsApp 号码。系统严格禁止跳转到虚假号码。
          </p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacherById } from "@/data/mock-teachers";
import { brandConfig } from "@/config/brand";
import {
  User,
  Clock,
  Globe2,
  Video,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  Calendar,
  AlertCircle,
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
    <div className="space-y-8 py-2 max-w-2xl mx-auto pb-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-ink-500">
        <Link href="/teachers" className="hover:text-moss-800 transition">
          ← 返回老师列表
        </Link>
        <span>/</span>
        <span className="text-ink-800 font-medium">{teacher.name}</span>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E5E0D2] p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-moss-50 border border-moss-200 flex items-center justify-center text-moss-800 font-serif font-bold text-2xl shadow-soft">
              {teacher.name.slice(0, 1)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-xl text-moss-900">
                  {teacher.name}
                </h1>
                {teacher.isSample && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-warm-200 text-ink-600">
                    平台示例老师
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-500">{teacher.title}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-ink-400">单次深度咨询</span>
            <div className="font-serif font-bold text-2xl text-moss-900">
              RM {teacher.priceRM}
            </div>
            <span className="text-[11px] text-ink-500">时长约 {teacher.durationMinutes} 分钟</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5 text-xs text-ink-700 leading-relaxed">
          <h2 className="font-semibold text-moss-900">老师简介</h2>
          <p>{teacher.bio}</p>
        </div>

        {/* Methodology */}
        <div className="space-y-1.5 text-xs text-ink-700 leading-relaxed p-4 rounded-xl bg-warm-100/70 border border-warm-200">
          <h2 className="font-semibold text-moss-900">解读方法与理念</h2>
          <p>{teacher.methodology}</p>
        </div>

        {/* Basic Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-[#FCFAF6] border border-warm-200 space-y-1">
            <span className="text-[10px] text-ink-400 block">咨询语言</span>
            <span className="font-medium text-ink-800">{teacher.languages.join("、")}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#FCFAF6] border border-warm-200 space-y-1">
            <span className="text-[10px] text-ink-400 block">服务方式</span>
            <span className="font-medium text-ink-800">{teacher.consultationModes.join(" · ")}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#FCFAF6] border border-warm-200 space-y-1">
            <span className="text-[10px] text-ink-400 block">常态可预约时段</span>
            <span className="font-medium text-ink-800 text-[11px] block">{teacher.availableSlots[0]}</span>
          </div>
        </div>
      </div>

      {/* Agenda & Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 会谈包含什么 */}
        <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-moss-900 font-serif font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-moss-800" />
            <h2>会谈包含什么</h2>
          </div>
          <ul className="space-y-2 text-xs text-ink-700">
            {teacher.agenda.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 用户需要准备什么 */}
        <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3">
          <div className="flex items-center space-x-2 text-moss-900 font-serif font-bold text-sm">
            <FileCheck className="w-4 h-4 text-moss-800" />
            <h2>用户需要准备什么</h2>
          </div>
          <ul className="space-y-2 text-xs text-ink-700">
            {teacher.clientPreparation.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-moss-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services and Pricing Options */}
      <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 shadow-card space-y-3">
        <h2 className="font-serif font-bold text-sm text-moss-900">
          可选择的会谈服务方案
        </h2>
        <div className="space-y-2.5">
          {teacher.services.map((svc) => (
            <div
              key={svc.id}
              className="p-4 rounded-xl border border-warm-200 bg-[#FCFAF6] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-sm text-moss-900">
                    {svc.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-warm-200 text-ink-700">
                    {svc.durationMinutes} 分钟
                  </span>
                </div>
                <p className="text-xs text-ink-500">{svc.description}</p>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                <div className="font-serif font-bold text-base text-moss-900">
                  RM {svc.priceRM}
                </div>
                <Link
                  href={`/booking/${teacher.id}?serviceId=${svc.id}`}
                  className="px-4 py-2 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
                >
                  预约此项
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp & Booking CTA */}
      <div className="bg-[#F5F2EB] rounded-2xl border border-[#E5E0D2] p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif font-bold text-base text-moss-900">
            预约与会前沟通
          </h2>
          <p className="text-xs text-ink-600 leading-relaxed">
            你可以直接通过平台填写预约单申请档期，也可在 WhatsApp 留下你初步关心的问题。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href={`/booking/${teacher.id}`}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
          >
            <span>立即提交预约申请</span>
            <ArrowRight className="w-3.5 h-3.5 text-champagne-300" />
          </Link>

          {hasWhatsapp ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-white border border-warm-300 text-moss-900 text-xs font-medium hover:bg-warm-100 transition shadow-soft"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>WhatsApp 咨询（人工）</span>
            </a>
          ) : (
            <div className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl bg-warm-200 text-ink-500 text-xs cursor-not-allowed">
              <MessageCircle className="w-4 h-4 text-ink-400" />
              <span>WhatsApp 联系方式待设置</span>
            </div>
          )}
        </div>

        {!hasWhatsapp && (
          <p className="text-[10px] text-ink-400">
            * 提示：管理员尚未在配置文件中配置 WhatsApp 号码。系统严格禁止跳转到虚假号码。
          </p>
        )}
      </div>
    </div>
  );
}

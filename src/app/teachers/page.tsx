import React from "react";
import Link from "next/link";
import { MOCK_TEACHERS } from "@/data/mock-teachers";
import { brandConfig } from "@/config/brand";
import {
  User,
  Clock,
  Globe2,
  Video,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

export default function TeachersPage() {
  return (
    <div className="space-y-8 py-2 max-w-2xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-warm-200 text-xs text-moss-800">
          <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
          <span>结合生活经历 · 深度研讨</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-900">
          咨询老师介绍与预约
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed max-w-lg">
          每一位咨询老师均秉持理性探讨与心理觉察视角，结合命盘与你的真实经历，共同寻找务实的行动策略。
        </p>
      </div>

      {/* Honest sample notice */}
      <div className="p-3.5 rounded-xl bg-warm-100 border border-warm-200 text-xs text-ink-600 flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-moss-800 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          【演示说明】当前展示的老师履历与服务为平台示例档案，真实反映服务流程与标准。我们不编造虚假学员评价、不夸大预测准确率。正式合作老师将陆续开放预约。
        </p>
      </div>

      {/* Teachers List */}
      <div className="space-y-4">
        {MOCK_TEACHERS.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl border border-[#E5E0D2] p-5 sm:p-6 shadow-card space-y-4 hover:border-moss-600 transition"
          >
            {/* Top row: Avatar & Identity */}
            <div className="flex items-start space-x-3.5">
              <div className="w-14 h-14 rounded-2xl bg-moss-50 border border-moss-200 flex items-center justify-center text-moss-800 font-serif font-bold text-xl flex-shrink-0 shadow-soft">
                {teacher.name.slice(0, 1)}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif font-bold text-lg text-moss-900">
                      {teacher.name}
                    </h3>
                    {teacher.isSample && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-200 text-ink-600">
                        示例
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-ink-400">会谈单次</span>
                    <div className="font-serif font-bold text-base text-moss-900">
                      RM {teacher.priceRM}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-500">{teacher.title}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-ink-700 leading-relaxed">
              {teacher.bio}
            </p>

            {/* Specialties & Tags */}
            <div className="space-y-2 pt-1 border-t border-warm-100 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-ink-400 text-[11px]">擅长主题：</span>
                {teacher.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 rounded-md bg-warm-100 text-ink-700 text-[11px]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-ink-600">
                <div className="flex items-center space-x-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-moss-700" />
                  <span>语言：{teacher.languages.join(" / ")}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Video className="w-3.5 h-3.5 text-moss-700" />
                  <span>方式：{teacher.consultationModes.join(" · ")}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-moss-700" />
                  <span>单次：{teacher.durationMinutes} 分钟</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-warm-100">
              <Link
                href={`/teachers/${teacher.id}`}
                className="px-4 py-2 rounded-xl border border-warm-200 text-xs font-medium text-ink-700 hover:bg-warm-100 transition"
              >
                查看详情与会谈流程
              </Link>

              <Link
                href={`/booking/${teacher.id}`}
                className="inline-flex items-center space-x-1 px-5 py-2 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
              >
                <span>预约深入解读</span>
                <ArrowRight className="w-3 h-3 text-champagne-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

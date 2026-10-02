import React from "react";
import Link from "next/link";
import { MOCK_TEACHERS } from "@/data/mock-teachers";
import { Globe2, Video, Clock, ArrowRight, ArrowUpRight, Info } from "lucide-react";

export default function TeachersPage() {
  return (
    <div className="space-y-10 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left border-b border-canvas-200 pb-6">
        <div className="editorial-tag text-gold-700">
          CURATED ADVISORS & INQUIRY ATELIER
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-editorial-950 font-normal">
          咨询导师名录与会晤预约
        </h1>
        <p className="text-xs sm:text-sm text-editorial-600 max-w-xl leading-relaxed">
          每一位咨询老师均秉持理性探讨与心理觉察视角，结合命盘与你的真实经历，共同寻找务实的行动策略。
        </p>
      </div>

      {/* Honest sample notice */}
      <div className="p-4 rounded-2xl bg-canvas-100/70 border border-canvas-200 text-xs text-editorial-700 flex items-start space-x-3">
        <Info className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px] font-mono">
          [ 演示说明 ] 当前展示的老师履历与服务为平台示例档案，真实反映服务流程与标准。我们不编造虚假学员评价、不夸大预测准确率。正式合作老师将陆续开放预约。
        </p>
      </div>

      {/* Teachers Directory Cards */}
      <div className="space-y-6">
        {MOCK_TEACHERS.map((teacher, idx) => (
          <div
            key={teacher.id}
            className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-6 border border-canvas-200 group"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-editorial-950 border border-editorial-800 flex items-center justify-center text-gold-300 font-serif font-bold text-2xl shadow-gallery flex-shrink-0">
                  {teacher.name.slice(0, 1)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <h3 className="font-serif font-bold text-xl text-editorial-950 group-hover:text-gold-800 transition-colors">
                      {teacher.name}
                    </h3>
                    {teacher.isSample && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 uppercase font-semibold">
                        EXHIBIT ADVISOR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-editorial-500 font-mono">{teacher.title}</p>
                </div>
              </div>

              <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-canvas-100">
                <span className="font-mono text-[10px] uppercase text-editorial-400 block">SESSION FEE / 会谈单次</span>
                <div className="font-serif font-bold text-2xl text-editorial-950 text-gold-800">
                  RM {teacher.priceRM}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-editorial-700 leading-relaxed font-sans">
              {teacher.bio}
            </p>

            {/* Specialties & Tags */}
            <div className="space-y-3 pt-2 border-t border-canvas-100 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] text-editorial-400 uppercase">FOCUS DOMAINS:</span>
                {teacher.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-full bg-canvas-100 text-editorial-800 text-[11px] font-medium border border-canvas-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px] text-editorial-600">
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-3.5 h-3.5 text-gold-700" />
                  <span>LANG: {teacher.languages.join(" / ")}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Video className="w-3.5 h-3.5 text-gold-700" />
                  <span>MODE: {teacher.consultationModes.join(" · ")}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-gold-700" />
                  <span>DURATION: {teacher.durationMinutes} MINS</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-2 border-t border-canvas-100">
              <Link
                href={`/teachers/${teacher.id}`}
                className="px-6 py-3 rounded-full border border-canvas-300 text-xs font-mono uppercase text-editorial-800 hover:bg-canvas-100 transition text-center"
              >
                查看流程与方法论 / PROFILE
              </Link>

              <Link
                href={`/booking/${teacher.id}`}
                className="btn-haute inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono uppercase font-bold hover:bg-editorial-900 transition shadow-gallery"
              >
                <span>预约深入解读</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { MOCK_TEACHERS } from "@/data/mock-teachers";
import { Globe2, Video, Clock, ArrowRight, ArrowUpRight, Info } from "lucide-react";

export default function TeachersPage() {
  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-left border-b border-[#E2E1DA] pb-6">
        <div className="text-[11px] font-mono tracking-widest font-bold text-[#767973] uppercase">
          CONSULTATION DIRECTORY · 老师预约
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111211]">
          咨询老师介绍与预约
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6057] max-w-xl leading-relaxed">
          每一位咨询老师均秉持理性探讨与心理觉察视角，结合命盘与你的真实经历，共同寻找务实的行动策略。
        </p>
      </div>

      {/* Honest sample notice */}
      <div className="p-4 rounded-3xl bg-white border border-[#E2E1DA] text-xs text-[#5C6057] flex items-start space-x-3 shadow-sm">
        <Info className="w-4 h-4 text-[#111211] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          【演示说明】当前展示的老师履历与服务为平台示例档案，真实反映服务流程与标准。我们不编造虚假学员评价、不夸大预测准确率。正式合作老师将陆续开放预约。
        </p>
      </div>

      {/* Teachers List */}
      <div className="space-y-5">
        {MOCK_TEACHERS.map((teacher) => (
          <div
            key={teacher.id}
            className="clean-card p-6 sm:p-8 shadow-card space-y-5 bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#C92A2A] text-white flex items-center justify-center font-serif font-black text-2xl flex-shrink-0 shadow-md border border-[#9B1C1C]">
                  {teacher.name.slice(0, 1)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <h3 className="text-xl font-black text-[#131513]">
                      {teacher.name}
                    </h3>
                    {teacher.isSample && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#5C6057] border border-[#E2E1DA] font-semibold">
                        示例档案
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#767973]">{teacher.title}</p>
                </div>
              </div>

              <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EFEA]">
                <span className="text-[10px] text-[#767973] block uppercase font-bold">会谈单次</span>
                <div className="text-2xl font-black text-[#131513]">
                  RM {teacher.priceRM}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-[#353833] leading-relaxed">
              {teacher.bio}
            </p>

            {/* Specialties & Tags */}
            <div className="space-y-3 pt-2 border-t border-[#F0EFEA] text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-[#767973]">擅长主题：</span>
                {teacher.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full bg-[#F3F2EC] text-[#131513] text-[11px] font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] text-[#5C6057]">
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-3.5 h-3.5 text-[#131513]" />
                  <span>语言：{teacher.languages.join(" / ")}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Video className="w-3.5 h-3.5 text-[#131513]" />
                  <span>方式：{teacher.consultationModes.join(" · ")}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#131513]" />
                  <span>单次：{teacher.durationMinutes} 分钟</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-2 border-t border-[#F0EFEA]">
              <Link
                href={`/teachers/${teacher.id}`}
                className="px-6 py-3 rounded-full border border-[#D5D4CC] text-xs font-bold text-[#131513] hover:bg-[#FAF9F5] transition text-center"
              >
                查看详情与会谈流程
              </Link>

              <Link
                href={`/booking/${teacher.id}`}
                className="btn-cinnabar inline-flex items-center justify-center space-x-1.5 px-7 py-3 text-xs font-bold"
              >
                <span>预约深入解读</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

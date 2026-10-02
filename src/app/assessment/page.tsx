"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BirthProfile, FocusTopic } from "@/types";
import {
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const TOPIC_OPTIONS: { id: FocusTopic; label: string; code: string; desc: string }[] = [
  {
    id: "self_personality",
    label: "自我与性格",
    code: "心性 · 01",
    desc: "看见真实的自己，理解你的天赋、情绪与行为模式",
  },
  {
    id: "relationship",
    label: "关系与沟通",
    code: "和合 · 02",
    desc: "看清你与重要他人的互动模式，建立更自在的关系",
  },
  {
    id: "career_direction",
    label: "事业与方向",
    code: "势局 · 03",
    desc: "梳理你的内在驱动力，找到更适合自己的发展路径",
  },
  {
    id: "current_confusion",
    label: "当前困惑",
    code: "问津 · 04",
    desc: "针对眼下具体难以决断的现实事件寻找多维思考视角",
  },
];

const TIMEZONE_SUGGESTIONS: Record<string, string> = {
  "中国": "Asia/Shanghai (UTC+8)",
  "马来西亚": "Asia/Kuala_Lumpur (UTC+8)",
  "新加坡": "Asia/Singapore (UTC+8)",
  "中国香港": "Asia/Hong_Kong (UTC+8)",
  "中国台湾": "Asia/Taipei (UTC+8)",
  "日本": "Asia/Tokyo (UTC+9)",
  "澳大利亚": "Australia/Sydney (UTC+10)",
  "英国": "Europe/London (UTC+0)",
  "美国": "America/New_York (UTC-5)",
  "加拿大": "America/Toronto (UTC-5)",
};

function AssessmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") as FocusTopic | null;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [callsign, setCallsign] = useState("");
  const [solarDate, setSolarDate] = useState("");
  const [solarTime, setSolarTime] = useState("");
  const [country, setCountry] = useState("马来西亚");
  const [city, setCity] = useState("吉隆坡");
  const [timezone, setTimezone] = useState("Asia/Kuala_Lumpur (UTC+8)");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [focusTopic, setFocusTopic] = useState<FocusTopic>(initialTopic || "self_personality");
  const [specificQuestion, setSpecificQuestion] = useState("");
  const [consentGiven, setConsentGiven] = useState(true);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("guanji_assessment_draft");
      if (cached) {
        const data = JSON.parse(cached);
        if (data.callsign) setCallsign(data.callsign);
        if (data.solarDate) setSolarDate(data.solarDate);
        if (data.solarTime) setSolarTime(data.solarTime);
        if (data.country) setCountry(data.country);
        if (data.city) setCity(data.city);
        if (data.timezone) setTimezone(data.timezone);
        if (data.isTimeUnknown !== undefined) setIsTimeUnknown(data.isTimeUnknown);
        if (!initialTopic && data.focusTopic) setFocusTopic(data.focusTopic);
        if (data.specificQuestion) setSpecificQuestion(data.specificQuestion);
      }
    } catch (e) {
      // ignore
    }
  }, [initialTopic]);

  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (TIMEZONE_SUGGESTIONS[c]) {
      setTimezone(TIMEZONE_SUGGESTIONS[c]);
    }
  };

  const validateStep1 = (): boolean => {
    const errs: string[] = [];
    if (!solarDate) errs.push("请选择出生日期");
    if (!isTimeUnknown && !solarTime) errs.push("请填写 24 小时制出生时间，或勾选「不确定出生时间」");
    if (!country.trim() || !city.trim()) errs.push("请填写出生国家与城市以辅助经纬度校正");
    setStepErrors(errs);
    return errs.length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: string[] = [];
    if (!focusTopic) errs.push("请选择想要了解的主题");
    if (specificQuestion.length > 300) errs.push("具体补充问题请控制在 300 字以内");
    setStepErrors(errs);
    return errs.length === 0;
  };

  const saveDraft = () => {
    const draft: BirthProfile = {
      callsign,
      solarDate,
      solarTime,
      country,
      city,
      timezone,
      isTimeUnknown,
      focusTopic,
      specificQuestion,
      consentGiven,
    };
    try {
      sessionStorage.setItem("guanji_assessment_draft", JSON.stringify(draft));
    } catch (e) {
      // ignore
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      saveDraft();
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2 && validateStep2()) {
      saveDraft();
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setStepErrors([]);
      setCurrentStep((currentStep - 1) as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setStepErrors(["请确认并同意出生资料用于本次排盘与认知分析"]);
      return;
    }
    saveDraft();
    router.push("/assessment/analyzing");
  };

  return (
    <div className="max-w-xl mx-auto py-4 sm:py-8 space-y-6">
      {/* Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-serif font-bold text-[#8C7A58]">
          <span className={currentStep >= 1 ? "text-[#C92A2A]" : ""}>
            一 · 出生资料
          </span>
          <span className="text-[#D9CEB2]">————</span>
          <span className={currentStep >= 2 ? "text-[#C92A2A]" : ""}>
            二 · 探索主题
          </span>
          <span className="text-[#D9CEB2]">————</span>
          <span className={currentStep >= 3 ? "text-[#C92A2A]" : ""}>
            三 · 资料确认
          </span>
        </div>
        <div className="w-full bg-[#E5DEC9] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#C92A2A] h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Errors Alert */}
      {stepErrors.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1 animate-fadeIn font-serif">
          {stepErrors.map((err, i) => (
            <div key={i} className="flex items-center space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-red-600" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Form Container */}
      <div className="oriental-card p-6 sm:p-8 space-y-6 bg-white shadow-orientalCard border border-[#E5DEC9]">
        {/* Step 1: Birth Profile */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="seal-stamp text-[9px] px-1.5 py-0.2 font-serif font-black">
                  时空基点
                </span>
                <h2 className="text-2xl font-serif font-black text-[#131513]">
                  第一步：出生资料录入
                </h2>
              </div>
              <p className="text-xs font-serif text-[#636E63]">
                奇门遁甲以公历出生时空作为局势推演的基准坐标，请尽量准确填写。
              </p>
            </div>

            {/* Callsign */}
            <div className="space-y-1.5">
              <label className="block text-xs font-serif font-bold text-[#131513]">
                称呼（可选）
              </label>
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="例如：林女士、陈先生、Alex"
                className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
                maxLength={20}
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-serif font-bold text-[#131513]">
                公历出生日期 <span className="text-[#C92A2A]">*</span>
              </label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Birth Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-[#131513]">
                  出生时间（24小时制） {!isTimeUnknown && <span className="text-[#C92A2A]">*</span>}
                </label>
                <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs font-serif font-bold text-[#C92A2A]">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded text-[#C92A2A] focus:ring-[#C92A2A]"
                  />
                  <span>不确定出生时间</span>
                </label>
              </div>

              {!isTimeUnknown ? (
                <div className="space-y-1">
                  <input
                    type="time"
                    value={solarTime}
                    onChange={(e) => setSolarTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
                  />
                  <p className="text-[10px] font-serif text-[#767973]">
                    采用 24 小时制（例如下午 3:45 请输入 15:45），避免上午与下午混淆。
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FFC9C9] text-xs text-[#801515] space-y-1 font-serif">
                  <p className="font-bold">⚠️ 关于未确定出生时间的说明：</p>
                  <p className="text-[11px] leading-relaxed">
                    在奇门中，时辰决定值使门与动态用神落宫。如果时间未知，系统绝不会擅自填入默认时间虚构确定命盘。报告将基于基础局势与心性原象呈现，后续可通过老师结合真实经历进行反推校时。
                  </p>
                </div>
              )}
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-serif font-bold text-[#131513]">
                  出生国家/地区 <span className="text-[#C92A2A]">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  placeholder="例如：马来西亚 / 中国"
                  className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-serif font-bold text-[#131513]">
                  出生城市 <span className="text-[#C92A2A]">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="例如：吉隆坡 / 槟城 / 深圳"
                  className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
                />
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-serif font-bold text-[#131513]">
                时区（依据地点建议，允许修改）
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] transition font-serif"
              />
              <p className="text-[10px] font-serif text-[#767973]">
                用于真太阳时换算及经纬度时差补偿。
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Focus Topic */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="seal-stamp text-[9px] px-1.5 py-0.2 font-serif font-black">
                  问津指引
                </span>
                <h2 className="text-2xl font-serif font-black text-[#131513]">
                  第二步：当前最想了解的主题
                </h2>
              </div>
              <p className="text-xs font-serif text-[#636E63]">
                选择一个切入点，我们将以此为聚焦点，剖析命盘中对应的符号与内在张力。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TOPIC_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFocusTopic(opt.id)}
                  className={`p-5 rounded-3xl border text-left transition flex flex-col justify-between space-y-3 ${
                    focusTopic === opt.id
                      ? "bg-[#C92A2A] text-white border-[#A61E1E] shadow-seal"
                      : "bg-[#FAF8F2] border-[#DFD6BF] hover:border-[#C92A2A] text-[#131513]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-serif text-xs font-black tracking-widest ${focusTopic === opt.id ? "text-amber-200" : "text-[#8C7A58]"}`}>
                      {opt.code}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        focusTopic === opt.id
                          ? "bg-white border-white"
                          : "border-[#C5C4BC]"
                      }`}
                    >
                      {focusTopic === opt.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C92A2A]" />
                      )}
                    </span>
                  </div>
                  <div className="text-lg font-serif font-black tracking-tight">
                    {opt.label}
                  </div>
                  <p className={`text-xs leading-relaxed font-serif ${focusTopic === opt.id ? "text-white/90" : "text-[#52574F]"}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Optional Specific Question */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-[#131513]">
                  补充一个你最关注的具体问题（可选）
                </label>
                <span className="text-[10px] font-mono text-[#767973]">
                  {specificQuestion.length}/300
                </span>
              </div>
              <textarea
                rows={4}
                value={specificQuestion}
                onChange={(e) => setSpecificQuestion(e.target.value)}
                placeholder="例如：目前正在考虑是否要从稳定岗位辞职创业，或是面对合作沟通时总是感到情绪消耗，想了解自己的盲区..."
                maxLength={300}
                className="w-full p-4 rounded-2xl border border-[#DFD6BF] text-xs text-[#131513] focus:outline-none focus:border-[#C92A2A] bg-[#FAF8F2] leading-relaxed transition font-serif"
              />
            </div>
          </div>
        )}

        {/* Step 3: Verification */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="seal-stamp text-[9px] px-1.5 py-0.2 font-serif font-black">
                  契约核准
                </span>
                <h2 className="text-2xl font-serif font-black text-[#131513]">
                  第三步：确认资料与授权
                </h2>
              </div>
              <p className="text-xs font-serif text-[#636E63]">
                请仔细核对以下信息，防止因时间或时区误填导致局势偏差。
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#DFD6BF] space-y-2.5 text-xs font-serif">
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">称呼：</span>
                <span className="font-bold text-[#131513]">{callsign || "未填写（匿名）"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">公历出生日期：</span>
                <span className="font-black text-[#131513]">{solarDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">出生时间（24小时制）：</span>
                <span className="font-black text-[#C92A2A]">
                  {isTimeUnknown ? "不确定（作保守原象分析）" : `${solarTime} (24H)`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">出生地点：</span>
                <span className="text-[#131513]">{country} · {city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">采用时区：</span>
                <span className="text-[#131513]">{timezone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E5DEC9]">
                <span className="text-[#767973]">探索主题：</span>
                <span className="font-bold text-[#C92A2A]">
                  {TOPIC_OPTIONS.find((t) => t.id === focusTopic)?.label}
                </span>
              </div>
              {specificQuestion && (
                <div className="pt-1">
                  <span className="text-[#767973] block mb-1">补充具体问题：</span>
                  <p className="text-[#131513] bg-white p-3 rounded-xl border border-[#DFD6BF] text-[11px] leading-relaxed">
                    {specificQuestion}
                  </p>
                </div>
              )}
            </div>

            {/* Privacy & Consent */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded text-[#C92A2A] focus:ring-[#C92A2A]"
                />
                <span className="text-xs text-[#131513] leading-relaxed font-serif font-bold">
                  我已核对上述出生资料准确无误，并同意仅将这些数据用于本次奇门排盘与认知分析。
                </span>
              </label>

              <div className="p-4 rounded-2xl bg-[#F4F0E4] border border-[#DFD6BF] flex items-start space-x-3 text-[11px] text-[#52574F] font-serif">
                <ShieldCheck className="w-4 h-4 text-[#C92A2A] flex-shrink-0 mt-0.5" />
                <p>
                  承诺保护个人隐私：我们不收集身份证号、具体门牌住址等敏感信息。报告默认仅保存在当前设备浏览器缓存中，不会被公开索引。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-6 border-t border-[#E5DEC9] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center space-x-1.5 px-5 py-3 rounded-full border border-[#DFD6BF] text-xs font-serif font-bold text-[#131513] hover:bg-[#FAF8F2] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>上一步</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-ink inline-flex items-center space-x-2 px-7 py-3 text-xs font-serif font-bold"
            >
              <span>下一步</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-cinnabar inline-flex items-center space-x-2 px-8 py-3.5 text-xs font-serif font-bold"
            >
              <span>确认资料并入盘推演</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-serif text-xs text-[#767973]">正在加载排盘参数...</div>}>
      <AssessmentForm />
    </Suspense>
  );
}

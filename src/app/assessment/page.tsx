"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BirthProfile, FocusTopic } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  User,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const TOPIC_OPTIONS: { id: FocusTopic; label: string; desc: string }[] = [
  {
    id: "self_personality",
    label: "自我与性格",
    desc: "探索内在矛盾、底色倾向与未被察觉的心智优势",
  },
  {
    id: "career_direction",
    label: "事业与方向",
    desc: "梳理工作瓶颈、长线节奏、合伙与突破口",
  },
  {
    id: "relationship",
    label: "人际与关系",
    desc: "看清亲密关系或协作中的防御模式与情绪内耗",
  },
  {
    id: "current_confusion",
    label: "当前困惑",
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

export default function AssessmentPage() {
  const router = useRouter();

  // 当前步骤 1 | 2 | 3
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // 表单状态
  const [callsign, setCallsign] = useState("");
  const [solarDate, setSolarDate] = useState("");
  const [solarTime, setSolarTime] = useState("");
  const [country, setCountry] = useState("马来西亚");
  const [city, setCity] = useState("吉隆坡");
  const [timezone, setTimezone] = useState("Asia/Kuala_Lumpur (UTC+8)");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);

  // 第二步：主题与具体问题
  const [focusTopic, setFocusTopic] = useState<FocusTopic>("self_personality");
  const [specificQuestion, setSpecificQuestion] = useState("");

  // 第三步：同意协议
  const [consentGiven, setConsentGiven] = useState(true);

  // 错误提示
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // 恢复之前保存的临时资料（若存在）
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
        if (data.focusTopic) setFocusTopic(data.focusTopic);
        if (data.specificQuestion) setSpecificQuestion(data.specificQuestion);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // 根据国家变更智能匹配默认时区
  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (TIMEZONE_SUGGESTIONS[c]) {
      setTimezone(TIMEZONE_SUGGESTIONS[c]);
    }
  };

  // 校验步骤 1
  const validateStep1 = (): boolean => {
    const errs: string[] = [];
    if (!solarDate) {
      errs.push("请选择出生日期");
    }
    if (!isTimeUnknown && !solarTime) {
      errs.push("请填写出生时间（24小时制），或勾选「不确定出生时间」");
    }
    if (!country.trim() || !city.trim()) {
      errs.push("请填写出生国家与城市以辅助经纬度校正");
    }
    setStepErrors(errs);
    return errs.length === 0;
  };

  // 校验步骤 2
  const validateStep2 = (): boolean => {
    const errs: string[] = [];
    if (!focusTopic) {
      errs.push("请选择当前最想了解的主题");
    }
    if (specificQuestion.length > 300) {
      errs.push("具体补充问题请控制在 300 字以内");
    }
    setStepErrors(errs);
    return errs.length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        saveDraft();
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        saveDraft();
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setStepErrors([]);
      setCurrentStep((currentStep - 1) as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    <div className="max-w-xl mx-auto py-4 sm:py-6 space-y-6">
      {/* Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
          <span className={currentStep >= 1 ? "text-moss-800 font-bold" : ""}>
            1. 出生资料
          </span>
          <span className="text-warm-300">———</span>
          <span className={currentStep >= 2 ? "text-moss-800 font-bold" : ""}>
            2. 关注主题
          </span>
          <span className="text-warm-300">———</span>
          <span className={currentStep >= 3 ? "text-moss-800 font-bold" : ""}>
            3. 核对确认
          </span>
        </div>
        <div className="w-full bg-warm-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-moss-800 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Errors Alert */}
      {stepErrors.length > 0 && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-1 animate-fadeIn">
          {stepErrors.map((err, i) => (
            <div key={i} className="flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-[#E5E0D2] p-5 sm:p-7 shadow-card">
        {/* Step 1: Birth Profile */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif font-bold text-lg text-moss-900">
                第一步：填写出生资料
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                奇门遁甲以出生时空作为局势推演的基准坐标，请尽量准确填写。
              </p>
            </div>

            {/* Callsign */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink-700">
                如何称呼你（可选）
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  placeholder="例如：陈先生、小林、Sarah"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink-700">
                公历（阳历）出生日期 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={solarDate}
                  onChange={(e) => setSolarDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Birth Time & Unknown toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-ink-700">
                  出生时间（24小时制） {!isTimeUnknown && <span className="text-red-500">*</span>}
                </label>
                <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs text-moss-800">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded text-moss-800 focus:ring-moss-700"
                  />
                  <span>不确定出生时间</span>
                </label>
              </div>

              {!isTimeUnknown ? (
                <div className="relative">
                  <Clock className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                  <input
                    type="time"
                    value={solarTime}
                    onChange={(e) => setSolarTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
                  />
                  <p className="text-[11px] text-ink-400 mt-1">
                    使用 24 小时制（例如下午 3:45 请输入 15:45），避免上午与下午混淆。
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-champagne-50 border border-champagne-200 text-xs text-champagne-800 space-y-1">
                  <p className="font-semibold">⚠️ 关于未确定出生时间的说明：</p>
                  <p className="text-[11px] leading-relaxed">
                    在奇门中，时辰决定值使门与动态用神落宫。如果时间未知，系统绝不会擅自填入默认时间虚构确定命盘。报告将基于基础局势与心性原象呈现，深度咨询时老师可通过你的真实生活关键事件进行反推校时。
                  </p>
                </div>
              )}
            </div>

            {/* Location & Timezone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-ink-700">
                  出生国家/地区 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    placeholder="例如：马来西亚 / 中国"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-ink-700">
                  出生城市 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="例如：吉隆坡 / 槟城 / 深圳"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
                  />
                </div>
              </div>
            </div>

            {/* Timezone (Editable) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink-700">
                时区（依据地点建议，允许修改）
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6]"
              />
              <p className="text-[10px] text-ink-400">
                用于真太阳时换算及经纬度时差补偿。
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Focus Topic & Question */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif font-bold text-lg text-moss-900">
                第二步：当前最想了解的主题
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                选择一个切入点，我们将以此为聚焦点，剖析命盘中对应的符号与内在张力。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPIC_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFocusTopic(opt.id)}
                  className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                    focusTopic === opt.id
                      ? "bg-moss-50/70 border-moss-700 ring-1 ring-moss-700 shadow-soft"
                      : "bg-[#FCFAF6] border-warm-200 hover:border-warm-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-moss-900">
                      {opt.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        focusTopic === opt.id
                          ? "border-moss-700 bg-moss-700"
                          : "border-warm-300"
                      }`}
                    >
                      {focusTopic === opt.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-ink-600 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Optional Specific Question */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-ink-700">
                  补充一个你最关注的具体问题（可选）
                </label>
                <span className="text-[11px] text-ink-400">
                  {specificQuestion.length}/300
                </span>
              </div>
              <textarea
                rows={4}
                value={specificQuestion}
                onChange={(e) => setSpecificQuestion(e.target.value)}
                placeholder="例如：目前正在考虑是否要从稳定岗位辞职创业，或是面对合作沟通时总是感到情绪消耗，想了解自己的盲区..."
                maxLength={300}
                className="w-full p-3 rounded-xl border border-warm-200 text-xs text-ink-800 focus:outline-none focus:border-moss-700 bg-[#FCFAF6] leading-relaxed"
              />
              <p className="text-[10px] text-ink-400">
                不必写出敏感商业或私人信息；提供背景有助于报告针对性生成反思提问。
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation & Consent */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif font-bold text-lg text-moss-900">
                第三步：确认资料与授权
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                请仔细核对以下信息，防止因时间或时区误填导致局势偏差。
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="p-4 rounded-xl bg-warm-100/70 border border-warm-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">称呼：</span>
                <span className="font-medium text-ink-800">{callsign || "未填写（匿名）"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">公历出生日期：</span>
                <span className="font-semibold text-moss-900">{solarDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">出生时间（24小时制）：</span>
                <span className="font-semibold text-moss-900">
                  {isTimeUnknown ? "不确定（将做无时柱保守分析）" : `${solarTime}（24小时制）`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">出生地点：</span>
                <span className="text-ink-800">{country} · {city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">采用时区：</span>
                <span className="text-ink-800">{timezone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-200/60">
                <span className="text-ink-500">切入主题：</span>
                <span className="font-medium text-moss-800">
                  {TOPIC_OPTIONS.find((t) => t.id === focusTopic)?.label}
                </span>
              </div>
              {specificQuestion && (
                <div className="pt-1">
                  <span className="text-ink-500 block mb-0.5">补充具体问题：</span>
                  <p className="text-ink-700 bg-white p-2 rounded-lg border border-warm-200 text-[11px] leading-relaxed">
                    {specificQuestion}
                  </p>
                </div>
              )}
            </div>

            {/* Privacy & Consent statement */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded text-moss-800 focus:ring-moss-700"
                />
                <label htmlFor="consent" className="text-xs text-ink-700 leading-relaxed cursor-pointer">
                  我已核对上述出生资料准确无误，并同意仅将这些数据用于本次奇门排盘与认知分析。
                </label>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-warm-200 flex items-start space-x-2 text-[11px] text-ink-500">
                <ShieldCheck className="w-4 h-4 text-moss-700 flex-shrink-0 mt-0.5" />
                <p>
                  承诺保护个人隐私：我们不收集身份证号、具体门牌住址等敏感信息。报告默认仅保存在当前设备浏览器缓存中，不会被公开索引。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-6 border-t border-warm-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-warm-200 text-xs font-medium text-ink-700 hover:bg-warm-100 transition"
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
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
            >
              <span>下一步</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-moss-800 text-warm-50 text-xs font-semibold hover:bg-moss-700 transition shadow-soft"
            >
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <span>确认资料并生成分析</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

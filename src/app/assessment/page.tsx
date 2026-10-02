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
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const TOPIC_OPTIONS: { id: FocusTopic; label: string; code: string; desc: string }[] = [
  {
    id: "self_personality",
    label: "自我与性格",
    code: "IDENTITY · 01",
    desc: "探索内在矛盾、心性底色与未被充分调用的心理防御惯性",
  },
  {
    id: "career_direction",
    label: "事业与方向",
    code: "HORIZON · 02",
    desc: "梳理长期职业节奏、开拓卡点、合伙博弈与关键突破口",
  },
  {
    id: "relationship",
    label: "人际与关系",
    code: "ATTACHMENT · 03",
    desc: "看清亲密关系或团队协作中的防线、扣分机制与真实依恋",
  },
  {
    id: "current_confusion",
    label: "当前困惑",
    code: "INQUIRY · 04",
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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // 表单状态
  const [callsign, setCallsign] = useState("");
  const [solarDate, setSolarDate] = useState("");
  const [solarTime, setSolarTime] = useState("");
  const [country, setCountry] = useState("马来西亚");
  const [city, setCity] = useState("吉隆坡");
  const [timezone, setTimezone] = useState("Asia/Kuala_Lumpur (UTC+8)");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [focusTopic, setFocusTopic] = useState<FocusTopic>("self_personality");
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
        if (data.focusTopic) setFocusTopic(data.focusTopic);
        if (data.specificQuestion) setSpecificQuestion(data.specificQuestion);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (TIMEZONE_SUGGESTIONS[c]) {
      setTimezone(TIMEZONE_SUGGESTIONS[c]);
    }
  };

  const validateStep1 = (): boolean => {
    const errs: string[] = [];
    if (!solarDate) errs.push("请选择公历出生日期");
    if (!isTimeUnknown && !solarTime) errs.push("请填写 24 小时制出生时间，或勾选「不确定出生时间」");
    if (!country.trim() || !city.trim()) errs.push("请填写出生国家与城市以校准经纬度时差");
    setStepErrors(errs);
    return errs.length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: string[] = [];
    if (!focusTopic) errs.push("请选择切入探索的主题");
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
    <div className="max-w-xl mx-auto py-6 sm:py-10 space-y-8">
      {/* Editorial Stepper Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase text-editorial-500">
          <span className={currentStep >= 1 ? "text-editorial-950 font-bold" : ""}>
            01 / TEMPORAL DATA
          </span>
          <span className="text-canvas-300">————</span>
          <span className={currentStep >= 2 ? "text-editorial-950 font-bold" : ""}>
            02 / INQUIRY FOCUS
          </span>
          <span className="text-canvas-300">————</span>
          <span className={currentStep >= 3 ? "text-editorial-950 font-bold" : ""}>
            03 / VERIFICATION
          </span>
        </div>
        <div className="w-full bg-canvas-200 h-[2px] rounded-full overflow-hidden">
          <div
            className="bg-editorial-950 h-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Alert */}
      {stepErrors.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1 animate-fadeIn">
          {stepErrors.map((err, i) => (
            <div key={i} className="flex items-center space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-red-600" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Haute Couture Questionnaire Card */}
      <div className="gallery-card rounded-3xl p-6 sm:p-8 shadow-haute space-y-6">
        {/* Step 1: Temporal Data */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="editorial-tag text-gold-700">STAGE 01 · CHRONO COORDINATES</div>
              <h2 className="font-serif font-bold text-2xl text-editorial-950">
                出生时空坐标录入
              </h2>
              <p className="text-xs text-editorial-600">
                奇门遁甲以公历出生时空作为局势演化的基准罗盘，请尽可能准确填写。
              </p>
            </div>

            {/* Callsign */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-editorial-700">
                称呼 / CALLSIGN (可选)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  placeholder="例如：林女士、陈先生、Alex"
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-editorial-700">
                公历出生日期 / SOLAR DATE <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={solarDate}
                  onChange={(e) => setSolarDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Birth Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-editorial-700">
                  出生时间 / 24-HOUR TIME {!isTimeUnknown && <span className="text-red-500">*</span>}
                </label>
                <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs text-gold-800 font-medium">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded text-editorial-950 focus:ring-gold-500"
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
                    className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                  />
                  <p className="text-[10px] font-mono text-editorial-500">
                    * 24 小时制（例如下午 3:45 请输入 15:45），杜绝 AM/PM 歧义
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-xs text-gold-900 space-y-1">
                  <p className="font-bold">⚠️ 关于未确定出生时间的严谨说明：</p>
                  <p className="text-[11px] leading-relaxed">
                    在奇门架构中，时辰决定值使门与动态用神落宫。如果时间未知，系统绝不擅自填入默认时间虚构确定命盘。报告将基于基础局势与心性原象呈现，后续会谈时老师可通过关键生活事件反推校时。
                  </p>
                </div>
              )}
            </div>

            {/* Geography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  国家 / COUNTRY <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  placeholder="例如：马来西亚 / 中国"
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-editorial-700">
                  城市 / CITY <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="例如：吉隆坡 / 槟城 / 深圳"
                  className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
                />
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-editorial-700">
                时区 / TIMEZONE (依据地点建议，允许修改)
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] transition"
              />
              <p className="text-[10px] font-mono text-editorial-500">
                用于真太阳时天文校准与经纬度时差补偿。
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Inquiry Focus */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="editorial-tag text-gold-700">STAGE 02 · INQUIRY DOMAIN</div>
              <h2 className="font-serif font-bold text-2xl text-editorial-950">
                当前最想了解的主题
              </h2>
              <p className="text-xs text-editorial-600">
                选择一个切入点，我们将以此为聚焦点，剖析命盘中对应的符号落宫与内在张力。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TOPIC_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFocusTopic(opt.id)}
                  className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                    focusTopic === opt.id
                      ? "bg-editorial-950 text-gold-100 border-editorial-950 shadow-haute"
                      : "bg-[#FCFAF5] border-canvas-200 hover:border-canvas-400 text-editorial-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-gold-500 font-bold">
                      {opt.code}
                    </span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border ${
                        focusTopic === opt.id
                          ? "bg-gold-500 border-gold-500"
                          : "border-canvas-400"
                      }`}
                    />
                  </div>
                  <div className="font-serif font-bold text-base">
                    {opt.label}
                  </div>
                  <p className={`text-xs leading-relaxed ${focusTopic === opt.id ? "text-canvas-300" : "text-editorial-600"}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Optional Specific Question */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-editorial-700">
                  补充一个你最关注的具体问题 (可选 / 最多300字)
                </label>
                <span className="text-[10px] font-mono text-editorial-400">
                  {specificQuestion.length}/300
                </span>
              </div>
              <textarea
                rows={4}
                value={specificQuestion}
                onChange={(e) => setSpecificQuestion(e.target.value)}
                placeholder="例如：目前正在权衡是继续深耕原有管理架构，还是联合合伙人尝试新方向？在关键决策时常感到耗能..."
                maxLength={300}
                className="w-full p-4 rounded-2xl border border-canvas-300 text-xs text-editorial-950 focus:outline-none focus:border-gold-600 bg-[#FCFAF5] leading-relaxed transition"
              />
            </div>
          </div>
        )}

        {/* Step 3: Verification & Consent */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="editorial-tag text-gold-700">STAGE 03 · VERIFICATION</div>
              <h2 className="font-serif font-bold text-2xl text-editorial-950">
                确认资料与授权
              </h2>
              <p className="text-xs text-editorial-600">
                请核对以下参数，防止因时间或时区误填导致局势偏差。
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="p-5 rounded-2xl bg-canvas-100/70 border border-canvas-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">CALLSIGN / 称呼</span>
                <span className="font-medium text-editorial-900">{callsign || "未具名（匿名）"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">SOLAR DATE / 日期</span>
                <span className="font-bold text-editorial-950">{solarDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">TIME (24H) / 时辰</span>
                <span className="font-bold text-editorial-950">
                  {isTimeUnknown ? "不确定（作保守原象分析）" : `${solarTime} (24H)`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">LOCATION / 地点</span>
                <span className="text-editorial-900">{country} · {city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">TIMEZONE / 时区</span>
                <span className="text-editorial-900">{timezone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-canvas-200">
                <span className="font-mono text-editorial-500 uppercase">TOPIC / 主题</span>
                <span className="font-bold text-gold-800">
                  {TOPIC_OPTIONS.find((t) => t.id === focusTopic)?.label}
                </span>
              </div>
              {specificQuestion && (
                <div className="pt-2">
                  <span className="font-mono text-editorial-500 uppercase block mb-1">
                    SPECIFIC INQUIRY / 补充提问
                  </span>
                  <p className="text-editorial-800 bg-white p-3 rounded-xl border border-canvas-200 text-[11px] leading-relaxed">
                    {specificQuestion}
                  </p>
                </div>
              )}
            </div>

            {/* Privacy & Consent */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded text-editorial-950 focus:ring-gold-500"
                />
                <span className="text-xs text-editorial-800 leading-relaxed font-medium">
                  我已核对上述出生资料准确无误，并同意仅将这些数据用于本次奇门排盘与认知分析。
                </span>
              </label>

              <div className="p-4 rounded-2xl bg-white border border-canvas-200 flex items-start space-x-3 text-[11px] text-editorial-600">
                <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p>
                  隐私承诺：我们不收集身份证号、具体门牌住址等任何多余信息。报告默认仅保存在当前设备浏览器缓存中，绝不公开索引。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-6 border-t border-canvas-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center space-x-1.5 px-5 py-3 rounded-full border border-canvas-300 text-xs font-mono uppercase text-editorial-800 hover:bg-canvas-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-haute inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-editorial-950 text-gold-200 text-xs font-mono font-semibold uppercase hover:bg-editorial-900 transition shadow-gallery"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-haute inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-editorial-950 text-gold-300 text-xs font-mono font-bold uppercase hover:bg-editorial-900 transition shadow-haute"
            >
              <span>GENERATE ANALYSIS / 生成报告</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

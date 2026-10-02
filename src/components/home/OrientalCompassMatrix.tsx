"use client";

import React from "react";

export default function OrientalCompassMatrix() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px] mx-auto aspect-square select-none">
      {/* Outer Traditional Celestial Luo Pan Ring (天圆地方：八卦天盘金规刻度) */}
      <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-[#D9CEB2] pointer-events-none flex items-center justify-center opacity-85">
        {/* Subtle Bagua Trigram Glyphs around the ring */}
        <div className="absolute top-1 text-[11px] font-serif text-[#C92A2A] font-bold">☲ 离南</div>
        <div className="absolute bottom-1 text-[11px] font-serif text-[#131513] font-bold">☵ 坎北</div>
        <div className="absolute left-1 text-[11px] font-serif text-[#131513] font-bold">☳ 震东</div>
        <div className="absolute right-1 text-[11px] font-serif text-[#131513] font-bold">☱ 兑西</div>
        <div className="absolute top-6 left-6 text-[10px] font-serif text-[#8C7A58]">☴ 巽</div>
        <div className="absolute top-6 right-6 text-[10px] font-serif text-[#8C7A58]">☷ 坤</div>
        <div className="absolute bottom-6 left-6 text-[10px] font-serif text-[#8C7A58]">☶ 艮</div>
        <div className="absolute bottom-6 right-6 text-[10px] font-serif text-[#8C7A58]">☰ 乾</div>

        {/* Thin concentric brass orbit rings */}
        <div className="w-[94%] h-[94%] rounded-full border border-[#E5DEC9] border-dashed" />
      </div>

      {/* 3×3 正统奇门九宫软磁贴 (Nine Palaces Matrix) */}
      <div className="relative z-10 grid grid-cols-3 gap-3 w-full h-full p-2.5">
        {/* 1. 巽四宫 (东南) - 凝脂白 + 杜门天辅 */}
        <div className="oriental-grid-cell bg-white border-[#E2DBC6] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-[#8C7A58]">☴ 巽四</span>
            <span className="text-[#C92A2A] font-serif font-black">九天</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-[#71766D] font-medium">天辅星</div>
            <div className="text-base sm:text-lg font-serif font-black text-[#131513]">杜门</div>
          </div>
          <div className="text-[9px] text-[#9A9E94] flex justify-between border-t border-[#F0EBE0] pt-0.5">
            <span>木位</span>
            <span className="text-[#131513] font-serif font-bold">天壬·地戊</span>
          </div>
        </div>

        {/* 2. 离九宫 (正南) - 朱砂丹红底色 (Bold Cinnabar Red) */}
        <div className="oriental-grid-cell bg-[#C92A2A] text-white border-[#A61E1E] shadow-seal flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
          <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
            <span>☲ 离九</span>
            <span className="text-amber-200 font-serif font-black">九地</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-white/80 font-medium">天英星</div>
            <div className="text-base sm:text-lg font-serif font-black text-white">景门</div>
          </div>
          <div className="text-[9px] text-white/80 flex justify-between border-t border-white/20 pt-0.5">
            <span>火位</span>
            <span className="font-serif font-black text-amber-200">天乙·地癸</span>
          </div>
        </div>

        {/* 3. 坤二宫 (西南) - 凝脂白 + 死门天芮 */}
        <div className="oriental-grid-cell bg-white border-[#E2DBC6] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-[#8C7A58]">☷ 坤二</span>
            <span className="text-[#131513] font-serif font-black">玄武</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-[#71766D] font-medium">天芮星</div>
            <div className="text-base sm:text-lg font-serif font-black text-[#131513]">死门</div>
          </div>
          <div className="text-[9px] text-[#9A9E94] flex justify-between border-t border-[#F0EBE0] pt-0.5">
            <span>土位·空</span>
            <span className="text-[#131513] font-serif font-bold">天丁·地丙</span>
          </div>
        </div>

        {/* 4. 震三宫 (正东) - 徽墨焦墨底色 (Deep Hui Ink Black) */}
        <div className="oriental-grid-cell bg-[#131513] text-white border-[#2A2E2A] shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
            <span className="text-amber-400">☳ 震三</span>
            <span className="seal-stamp px-1 py-0.2 text-[8px] bg-red-900/60 border-red-500 text-red-200">值符</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-white/70 font-medium">天冲星</div>
            <div className="text-base sm:text-lg font-serif font-black text-amber-400">伤门</div>
          </div>
          <div className="text-[9px] text-white/60 flex justify-between border-t border-white/15 pt-0.5">
            <span>马星·木</span>
            <span className="font-serif font-bold text-white">天癸·地乙</span>
          </div>
        </div>

        {/* 5. 中五宫 (中央) - 尊崇泥金黄 / 太极天心枢纽 */}
        <div className="oriental-grid-cell bg-[#FAF3DE] border-[#DEC78A] shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#8C6D1F]">
            <span>中央中五</span>
            <span className="seal-stamp-filled text-[8px] px-1 py-0.2">极</span>
          </div>
          {/* 太极双鱼图腾 */}
          <div className="my-auto text-center flex flex-col items-center justify-center">
            <svg className="w-6 h-6 text-[#8C6D1F] my-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 0 1-5.66-13.66A4 4 0 0 1 12 10a2 2 0 1 0 2-2 4 4 0 0 1 3.66 6.34A8 8 0 0 1 12 20Z" />
              <circle cx="12" cy="7" r="1.5" fill="#FAF3DE" />
              <circle cx="12" cy="17" r="1.5" fill="#8C6D1F" />
            </svg>
            <div className="text-xs font-serif font-black text-[#131513]">天禽星</div>
          </div>
          <div className="text-[9px] text-[#8C6D1F] flex justify-between border-t border-[#DEC78A]/50 pt-0.5">
            <span>寄坤二宫</span>
            <span className="font-serif font-black">天丁·地己</span>
          </div>
        </div>

        {/* 6. 兑七宫 (正西) - 凝脂白 + 惊门天柱 */}
        <div className="oriental-grid-cell bg-white border-[#E2DBC6] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-[#8C7A58]">☱ 兑七</span>
            <span className="text-[#C92A2A] font-serif font-black">白虎</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-[#71766D] font-medium">天柱星</div>
            <div className="text-base sm:text-lg font-serif font-black text-[#131513]">惊门</div>
          </div>
          <div className="text-[9px] text-[#9A9E94] flex justify-between border-t border-[#F0EBE0] pt-0.5">
            <span>门迫·金</span>
            <span className="text-[#131513] font-serif font-bold">天己·地辛</span>
          </div>
        </div>

        {/* 7. 艮八宫 (东北) - 松石翡翠底色 (Bold Jade Emerald) */}
        <div className="oriental-grid-cell bg-[#0C5A43] text-white border-[#083B2C] shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
            <span className="text-emerald-200">☶ 艮八</span>
            <span className="text-amber-300 font-serif font-black">六合</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-emerald-100/80 font-medium">天任星</div>
            <div className="text-base sm:text-lg font-serif font-black text-white">生门</div>
          </div>
          <div className="text-[9px] text-emerald-200 flex justify-between border-t border-white/20 pt-0.5">
            <span>生机·土</span>
            <span className="font-serif font-bold text-white">天戊·地己</span>
          </div>
        </div>

        {/* 8. 坎一宫 (正北) - 凝脂白 + 休门天蓬 */}
        <div className="oriental-grid-cell bg-white border-[#E2DBC6] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-[#8C7A58]">☵ 坎一</span>
            <span className="text-[#131513] font-serif font-black">太阴</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-[#71766D] font-medium">天蓬星</div>
            <div className="text-base sm:text-lg font-serif font-black text-[#C92A2A]">休门</div>
          </div>
          <div className="text-[9px] text-[#9A9E94] flex justify-between border-t border-[#F0EBE0] pt-0.5">
            <span>水位·养</span>
            <span className="text-[#131513] font-serif font-bold">天丙·地丁</span>
          </div>
        </div>

        {/* 9. 乾六宫 (西北) - 焦墨底色 (Ink Dark) */}
        <div className="oriental-grid-cell bg-[#1E221E] text-white border-[#343B34] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
            <span className="text-amber-400">☰ 乾六</span>
            <span className="text-amber-300 font-serif font-black">腾蛇</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-[10px] text-white/70 font-medium">天心星</div>
            <div className="text-base sm:text-lg font-serif font-black text-white">开门</div>
          </div>
          <div className="text-[9px] text-white/60 flex justify-between border-t border-white/15 pt-0.5">
            <span>金位·拓</span>
            <span className="font-serif font-bold text-white">天辛·地壬</span>
          </div>
        </div>
      </div>

      {/* Floating Classical Cinnabar Seal (朱砂真印章角标) */}
      <div className="absolute -bottom-3 -right-2 z-20 shadow-seal">
        <div className="seal-stamp-filled px-2.5 py-1 text-[11px] tracking-widest font-serif font-black rotate-[-6deg]">
          奇门遁甲·正局
        </div>
      </div>
    </div>
  );
}

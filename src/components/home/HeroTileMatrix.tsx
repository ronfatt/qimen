"use client";

import React from "react";

export default function HeroTileMatrix() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto aspect-square select-none">
      {/* 3x3 Ceramic Tiles Grid */}
      <div className="grid grid-cols-3 gap-3 w-full h-full p-2">
        {/* Tile 1: Cream + 4-Point Star */}
        <div className="tile-block bg-[#EBEAE4] flex items-center justify-center">
          <svg className="w-12 h-12 text-[#181918]" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 0 C24 13.25 13.25 24 0 24 C13.25 24 24 34.75 24 48 C24 34.75 34.75 24 48 24 C34.75 24 24 13.25 24 0 Z" />
          </svg>
        </div>

        {/* Tile 2: Dark Slate + Spherical Gradient */}
        <div className="tile-block bg-[#1E201E] relative overflow-hidden flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-black via-[#2C302C] to-[#4A504A] shadow-inner" />
        </div>

        {/* Tile 3: Vibrant Acid Lime + Organic Arc */}
        <div className="tile-block bg-[#D4F53C] relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#111211]" />
        </div>

        {/* Tile 4: Dark Slate + Deep Moon Crescent */}
        <div className="tile-block bg-[#1B1D1B] relative overflow-hidden flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2E332E] to-black opacity-90 shadow-2xl" />
        </div>

        {/* Tile 5 (Center): Cream + 8-Point Cosmic Star */}
        <div className="tile-block bg-[#EAE8E2] flex items-center justify-center">
          <svg className="w-14 h-14 text-[#111211]" viewBox="0 0 64 64" fill="currentColor">
            {/* 4 Major Points */}
            <path d="M32 0 C32 17.67 17.67 32 0 32 C17.67 32 32 46.33 32 64 C32 46.33 46.33 32 64 32 C46.33 32 32 17.67 32 0 Z" />
            {/* 4 Diagonal Smaller Points */}
            <path d="M32 14 L36 28 L50 32 L36 36 L32 50 L28 36 L14 32 L28 28 Z" opacity="0.8" />
          </svg>
        </div>

        {/* Tile 6: Cream + Dark Celestial Orb */}
        <div className="tile-block bg-[#ECEBE5] relative overflow-hidden flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#181A18] shadow-lg" />
        </div>

        {/* Tile 7: Acid Lime + Geometric Portal / Arch */}
        <div className="tile-block bg-[#D4F53C] flex items-center justify-center relative">
          <div className="w-7 h-12 bg-[#111211] rounded-t-full" />
        </div>

        {/* Tile 8: Ceramic + Misty Ink Mountain Landscape */}
        <div className="tile-block bg-[#E8E6E0] relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8E6E0" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#252825" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Distant Peaks */}
            <path d="M0,70 Q25,45 50,65 T100,50 L100,100 L0,100 Z" fill="#717671" opacity="0.5" />
            {/* Near Peaks */}
            <path d="M-10,85 Q30,55 60,78 T110,65 L110,100 L-10,100 Z" fill="#1C1E1C" />
            {/* Misty Fog Overlay */}
            <rect width="100" height="100" fill="url(#fogGrad)" opacity="0.4" />
          </svg>
        </div>

        {/* Tile 9: Dark Slate + Quarter Circle Texture */}
        <div className="tile-block bg-[#202220] relative overflow-hidden">
          <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-[#353A35] opacity-80" />
        </div>
      </div>

      {/* Orbit Ring with Chrome Spheres (Floating on top of grid) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Slanted elliptical or circular thin metallic ring */}
        <div className="relative w-[78%] h-[78%] rounded-full border border-neutral-400/80 shadow-sm">
          {/* Chrome Orb 1 (Top right) */}
          <div className="absolute -top-1.5 right-[24%] w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-gray-500 via-gray-200 to-white shadow-md border border-gray-300" />
          {/* Chrome Orb 2 (Mid right) */}
          <div className="absolute bottom-[28%] -right-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-gray-500 via-gray-200 to-white shadow-md border border-gray-300" />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/assessment", label: "探索自己" },
    { href: "/my-reports", label: "我的报告" },
    { href: "/teachers", label: "导师名录" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F2]/90 backdrop-blur-md border-b border-[#EBE3D0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo: 观己 + 朱砂印章 */}
        <Link href="/" className="flex items-center space-x-2.5 group select-none">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-serif font-black tracking-tight text-[#131513]">
                {brandConfig.name}
              </span>
              <span className="seal-stamp-filled text-[10px] px-1.5 py-0.2 rounded font-serif font-black">
                局
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#8C7A58] uppercase">
              GUANJI · 奇门心智罗盘
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-serif font-bold transition-colors ${
                  isActive
                    ? "text-[#C92A2A] border-b-2 border-[#C92A2A] pb-1"
                    : "text-[#545A54] hover:text-[#C92A2A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA: 朱砂红药丸按钮 */}
        <div className="hidden md:flex items-center">
          <Link
            href="/assessment"
            className="btn-cinnabar inline-flex items-center space-x-1.5 px-6 py-2.5 text-xs tracking-wide"
          >
            <span>入盘推演</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#131513]"
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#C92A2A]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EBE3D0] bg-[#FAF8F2] px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-serif font-bold text-[#131513] hover:text-[#C92A2A] py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#EBE3D0]">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-cinnabar w-full flex items-center justify-center space-x-1.5 py-3 text-sm"
            >
              <span>开始排盘分析</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

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
    { href: "/teachers", label: "连接老师" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F3F2EC]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo: 观己 GUANJI */}
        <Link href="/" className="flex flex-col group select-none">
          <span className="text-2xl font-black tracking-tight text-[#111211]">
            {brandConfig.name}
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.28em] text-[#111211] uppercase -mt-0.5">
            GUANJI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#111211] font-bold"
                    : "text-[#4A4D48] hover:text-[#111211]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/assessment"
            className="btn-pill-outline inline-flex items-center space-x-1 px-5 py-2 text-xs font-semibold"
          >
            <span>开始测试</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#111211]"
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E1DA] bg-[#F3F2EC] px-6 py-5 space-y-4 shadow-xl animate-fadeIn">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-[#111211] hover:text-black py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E2E1DA]">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-lime w-full flex items-center justify-center space-x-1.5 py-3 text-sm"
            >
              <span>开始免费分析</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

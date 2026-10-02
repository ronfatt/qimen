"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu, X, BookmarkCheck, UserCheck, Sparkles } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/assessment", label: "开始分析" },
    { href: "/teachers", label: "预约老师" },
    { href: "/my-reports", label: "已存报告" },
    { href: "/teacher", label: "演示后台" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#EBE7DD]">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-moss-800 flex items-center justify-center text-champagne-300 shadow-sm group-hover:bg-moss-700 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-moss-900 tracking-wider">
              {brandConfig.name}
            </span>
            <span className="text-[10px] text-ink-500 tracking-tight -mt-1 font-sans">
              命盘与人生对话
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-moss-800 font-semibold border-b-2 border-moss-800"
                    : "text-ink-600 hover:text-moss-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/assessment"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-moss-800 text-warm-50 text-xs font-medium hover:bg-moss-700 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>免费排盘</span>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-ink-700 hover:bg-warm-200 transition"
          aria-label="切换菜单"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EBE7DD] bg-[#FAF9F5] px-4 py-3 space-y-2 shadow-card animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-moss-50 text-moss-800 font-semibold"
                    : "text-ink-700 hover:bg-warm-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-warm-200">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-moss-800 text-warm-50 text-sm font-medium hover:bg-moss-700 transition"
            >
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <span>开始免费分析</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

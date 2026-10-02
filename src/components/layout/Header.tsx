"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandConfig } from "@/config/brand";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "首页 / INDEX" },
    { href: "/assessment", label: "命盘演算 / ORACLE" },
    { href: "/teachers", label: "导师名录 / ATELIER" },
    { href: "/my-reports", label: "档案库 / ARCHIVE" },
    { href: "/teacher", label: "策展后台 / DESK" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7EE]/85 backdrop-blur-xl border-b border-[#E8E4D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Haute Mark */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-full border border-editorial-900 bg-editorial-950 flex items-center justify-center text-gold-300 font-serif text-xs tracking-widest group-hover:border-gold-500 group-hover:scale-105 transition-all duration-300">
            观
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-editorial-950 tracking-widest uppercase">
              {brandConfig.name}
              <span className="text-[10px] ml-1.5 font-mono text-gold-600 font-normal">
                STUDIO
              </span>
            </span>
            <span className="editorial-tag text-[9px] text-editorial-500 -mt-0.5">
              METAPHYSICAL ARCHIVE
            </span>
          </div>
        </Link>

        {/* Desktop Nav: Editorial & Clean */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wider transition-all duration-200 uppercase relative py-1 ${
                  isActive
                    ? "text-editorial-950 font-bold"
                    : "text-editorial-600 hover:text-editorial-950"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-600 rounded-full animate-fadeIn" />
                )}
              </Link>
            );
          })}

          <Link
            href="/assessment"
            className="btn-haute inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-editorial-950 text-gold-200 text-xs font-medium hover:bg-editorial-800 transition-all border border-editorial-800 shadow-gallery"
          >
            <span>开始分析</span>
            <ArrowUpRight className="w-3 h-3 text-gold-400" />
          </Link>
        </nav>

        {/* Mobile Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full border border-canvas-200 flex items-center justify-center text-editorial-900 hover:bg-canvas-100 transition"
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Curtain Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-canvas-200 bg-[#FAF7EE] px-6 py-6 space-y-4 shadow-haute animate-fadeIn">
          <div className="text-[10px] font-mono uppercase text-gold-700 tracking-widest border-b border-canvas-200 pb-2">
            EXHIBITION NAVIGATION
          </div>
          <div className="space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 text-sm tracking-wider uppercase transition ${
                    isActive
                      ? "text-editorial-950 font-bold pl-2 border-l-2 border-gold-600"
                      : "text-editorial-600 hover:text-editorial-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-canvas-200">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-editorial-950 text-gold-300 text-xs font-semibold tracking-wider uppercase hover:bg-editorial-800 transition"
            >
              <span>立即建立你的命盘档案</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

export interface FloatingNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active: boolean;
  icon: LucideIcon;
  badge?: number;
}

interface FloatingBottomNavProps {
  leftItems: FloatingNavItem[];
  centerItem: FloatingNavItem;
  rightItems: FloatingNavItem[];
  ariaLabel?: string;
}

export function FloatingBottomNav({
  leftItems,
  centerItem,
  rightItems,
  ariaLabel = "Navigasi Bawah Mobile dan Tablet",
}: FloatingBottomNavProps) {
  const CenterIcon = centerItem.icon;

  const renderSideItem = (item: FloatingNavItem) => {
    const Icon = item.icon;
    const content = (
      <div className="relative flex flex-col items-center justify-center w-full h-full pt-1.5 pb-1 group">
        <div
          className={`relative flex items-center justify-center transition-all duration-200 group-active:scale-90 ${
            item.active
              ? "text-sigap-primary scale-105"
              : "text-slate-400 hover:text-sigap-secondary"
          }`}
        >
          <Icon className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px]" strokeWidth={item.active ? 2.3 : 1.9} />
          {item.badge !== undefined && item.badge > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 text-white text-[8px] font-bold px-1 shadow-sm">
              {item.badge}
            </span>
          )}
        </div>

        {/* Item Label following Navbar */}
        <span
          className={`mt-1 text-[9px] sm:text-[11px] leading-none tracking-tight truncate max-w-full px-0.5 transition-colors ${
            item.active
              ? "font-bold text-sigap-primary"
              : "font-medium text-slate-400 group-hover:text-slate-600"
          }`}
        >
          {item.label}
        </span>

        {/* Active Dot Indicator (Matches reference image) */}
        <div className="h-2 flex items-center justify-center mt-1">
          {item.active && (
            <motion.span
              layoutId={`navDot-${ariaLabel}`}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-1.5 h-1.5 rounded-full bg-sigap-primary shadow-[0_0_6px_rgba(63,101,147,0.5)]"
            />
          )}
        </div>
      </div>
    );

    if (item.href && !item.onClick) {
      return (
        <Link
          key={item.id}
          href={item.href}
          aria-label={item.label}
          title={item.label}
          className="flex-1 min-w-0 h-full flex items-center justify-center focus-visible:outline-none"
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        onClick={item.onClick}
        aria-label={item.label}
        title={item.label}
        className="flex-1 min-w-0 h-full flex items-center justify-center cursor-pointer focus-visible:outline-none"
      >
        {content}
      </button>
    );
  };

  const centerButtonContent = (
    <div className="relative flex flex-col items-center group">
      {/* Elevated Circular Primary Button inside Notch */}
      <div
        className={`w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-gradient-to-br from-sigap-primary to-sigap-dark text-white flex items-center justify-center shadow-[0_8px_20px_rgba(27,53,84,0.38)] transition-all duration-200 group-active:scale-90 hover:brightness-110 ${
          centerItem.active ? "scale-105 ring-4 ring-sigap-light/70" : ""
        }`}
      >
        <CenterIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />
      </div>
    </div>
  );

  return (
    <nav
      aria-label={ariaLabel}
      className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 lg:hidden px-2.5 sm:px-6 pointer-events-none select-none"
    >
      <div className="relative max-w-[440px] sm:max-w-[540px] md:max-w-[620px] mx-auto pointer-events-auto">
        {/* Elevated Center Circle Button positioned inside the concave cradle */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-7 z-20">
          {centerItem.href && !centerItem.onClick ? (
            <Link
              href={centerItem.href}
              aria-label={centerItem.label}
              title={centerItem.label}
              className="block focus-visible:outline-none"
            >
              {centerButtonContent}
            </Link>
          ) : (
            <button
              type="button"
              onClick={centerItem.onClick}
              aria-label={centerItem.label}
              title={centerItem.label}
              className="block cursor-pointer focus-visible:outline-none"
            >
              {centerButtonContent}
            </button>
          )}
        </div>

        {/* Seamless 3-Part Notched Pill Bar */}
        <div className="flex items-stretch h-[66px] sm:h-[70px] drop-shadow-[0_10px_28px_rgba(0,15,34,0.14)]">
          {/* Left Wing */}
          <div className="flex-1 min-w-0 bg-white rounded-l-[24px] sm:rounded-l-[26px] flex items-center justify-around pl-1.5 sm:pl-3 pr-0.5">
            {leftItems.map(renderSideItem)}
          </div>

          {/* Center Concave Notch SVG (Fixed width so curve never distorts) */}
          <div className="relative w-[84px] sm:w-[102px] h-full shrink-0 -mx-[0.5px]">
            <svg
              viewBox="0 0 106 68"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <path
                d="M 0 0 C 20 0, 24 38, 53 38 C 82 38, 86 0, 106 0 L 106 68 L 0 68 Z"
                fill="#FFFFFF"
              />
            </svg>

            {/* Center Label + Active Dot Indicator below the cradle notch */}
            <div className="absolute inset-x-0 bottom-1.5 flex flex-col items-center justify-end pointer-events-none">
              <span
                className={`text-[9px] sm:text-[10px] leading-none tracking-tight ${
                  centerItem.active
                    ? "font-bold text-sigap-primary"
                    : "font-medium text-slate-400"
                }`}
              >
                {centerItem.label}
              </span>
              <div className="h-2 flex items-center justify-center mt-0.5">
                {centerItem.active && (
                  <motion.span
                    layoutId={`navDot-${ariaLabel}`}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="w-1.5 h-1.5 rounded-full bg-sigap-primary shadow-[0_0_6px_rgba(63,101,147,0.5)]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Wing */}
          <div className="flex-1 min-w-0 bg-white rounded-r-[24px] sm:rounded-r-[26px] flex items-center justify-around pl-0.5 pr-1.5 sm:pr-3">
            {rightItems.map(renderSideItem)}
          </div>
        </div>
      </div>
    </nav>
  );
}

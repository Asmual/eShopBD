import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showSubtitle?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  variant = "dark",
  showSubtitle = true,
}: LogoProps) {
  const iconDimensions = {
    sm: { width: 32, height: 32, textClass: "text-lg", subClass: "text-[9px]" },
    md: { width: 42, height: 42, textClass: "text-2xl", subClass: "text-[10px]" },
    lg: { width: 52, height: 52, textClass: "text-3xl", subClass: "text-xs" },
  }[size];

  const textColor = variant === "light" ? "text-white" : "text-text-main";
  const subColor = variant === "light" ? "text-white/80" : "text-text-muted";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-hidden select-none ${className}`}
      aria-label="eShopBD Homepage"
    >
      {/* Brand Icon Image */}
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-2xs group-hover:shadow-xs transition-transform group-hover:scale-105 duration-200"
        style={{ width: iconDimensions.width, height: iconDimensions.height }}
      >
        <Image
          src="/images/logo/logo-icon.png"
          alt="eShopBD Brand Logo"
          width={iconDimensions.width}
          height={iconDimensions.height}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight ${iconDimensions.textClass} ${textColor} flex items-center`}
        >
          eShop<span className="text-brand">BD</span>
        </span>
        {showSubtitle && (
          <span
            className={`font-bold uppercase tracking-widest ${iconDimensions.subClass} ${subColor} mt-0.5`}
          >
            Multi-Vendor Store
          </span>
        )}
      </div>
    </Link>
  );
}

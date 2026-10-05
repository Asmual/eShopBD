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
  const sizeConfig = {
    sm: {
      container: "w-7 h-7 sm:w-8 sm:h-8",
      imgPx: 32,
      textClass: "text-base sm:text-lg",
      subClass: "text-[8px] tracking-wider",
    },
    md: {
      container: "w-9 h-9 sm:w-10 sm:h-10",
      imgPx: 40,
      textClass: "text-lg sm:text-xl",
      subClass: "text-[9px] tracking-wider",
    },
    lg: {
      container: "w-14 h-14 sm:w-16 sm:h-16",
      imgPx: 64,
      textClass: "text-2xl sm:text-3xl",
      subClass: "text-xs tracking-widest",
    },
  }[size];

  const textColor = variant === "light" ? "text-white" : "text-text-main";
  const subColor = variant === "light" ? "text-white/80" : "text-text-muted";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden select-none ${className}`}
      aria-label="eShopBD Homepage"
    >
      {/* Brand Icon Image (Optimized & Balanced) */}
      <div
        className={`relative shrink-0 ${sizeConfig.container} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}
      >
        <Image
          src="/images/logo/logo-icon.png"
          alt="eShopBD Brand Logo"
          width={sizeConfig.imgPx}
          height={sizeConfig.imgPx}
          className="object-contain w-full h-full drop-shadow-2xs"
          priority
        />
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col leading-none justify-center">
        <span
          className={`font-black tracking-tight ${sizeConfig.textClass} ${textColor} flex items-center leading-tight`}
        >
          eShop<span className="text-brand">BD</span>
        </span>
        {showSubtitle && (
          <span
            className={`font-bold uppercase ${sizeConfig.subClass} ${subColor} mt-0.5 leading-tight`}
          >
            Multi-Vendor Store
          </span>
        )}
      </div>
    </Link>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function PromoOffersDualBanner() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 24,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("FIRST15");
    setCopied(true);
    toast.success("Coupon code FIRST15 copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <section
      aria-label="Promotional Offers & Daily Deals"
      className="w-full bg-white py-4 sm:py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Exclusive Offer For You (15% OFF) */}
          <div className="group relative bg-[#F2EEFD]/75 sm:bg-gradient-to-br sm:from-[#F4F0FE] sm:to-[#ECE6FC] border border-[#DDD4F8] rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden flex items-center justify-between shadow-2xs hover:shadow-sm transition-all duration-300">
            {/* Left Content */}
            <div className="relative z-10 flex flex-col justify-between max-w-[62%] sm:max-w-[64%]">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#6339E0] tracking-tight block mb-1">
                  Exclusive Offer For You!
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#261E47] tracking-tight leading-none mb-1 sm:mb-1.5">
                  Get 15% OFF
                </h3>
                <p className="text-xs sm:text-sm font-medium text-text-muted mb-4 sm:mb-5">
                  On your first order
                </p>
              </div>

              {/* Coupon Code Box */}
              <div>
                <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white px-3 sm:px-3.5 py-1.5 rounded-xl border border-[#DDD4F8] shadow-2xs">
                  <span className="text-[10px] sm:text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    USE CODE:
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-black text-brand tracking-wider">
                    FIRST15
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    aria-label="Copy coupon code FIRST15"
                    className="p-1 rounded-md text-text-muted hover:text-brand transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image: 3D Gift Box */}
            <div className="relative w-28 sm:w-36 lg:w-44 aspect-square shrink-0 flex items-center justify-center">
              <Image
                src="/images/promo/promo-gift-box.jpg"
                alt="15% Off Gift Box"
                fill
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Card 2: Deal Of The Day (Live Countdown + Shop Now) */}
          <div className="group relative bg-[#FFF1EE]/80 sm:bg-gradient-to-br sm:from-[#FFF3F0] sm:to-[#FFEAE5] border border-[#FCD8CF] rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden flex items-center justify-between shadow-2xs hover:shadow-sm transition-all duration-300">
            {/* Left Content */}
            <div className="relative z-10 flex flex-col justify-between max-w-[62%] sm:max-w-[64%]">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#E54848] tracking-tight block mb-1">
                  Deal Of The Day
                </span>
                <p className="text-xs sm:text-sm font-medium text-text-muted mb-3 sm:mb-4">
                  Hurry up! Limited time offer.
                </p>

                {/* Countdown Cards */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  <div className="w-10 sm:w-12 h-11 sm:h-13 bg-white/95 backdrop-blur-xs rounded-xl shadow-2xs border border-white/60 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-black text-text-main leading-none">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-text-muted uppercase mt-0.5">
                      HRS
                    </span>
                  </div>

                  <div className="w-10 sm:w-12 h-11 sm:h-13 bg-white/95 backdrop-blur-xs rounded-xl shadow-2xs border border-white/60 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-black text-text-main leading-none">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-text-muted uppercase mt-0.5">
                      MINS
                    </span>
                  </div>

                  <div className="w-10 sm:w-12 h-11 sm:h-13 bg-white/95 backdrop-blur-xs rounded-xl shadow-2xs border border-white/60 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-black text-text-main leading-none">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-text-muted uppercase mt-0.5">
                      SECS
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button (Website Brand Green Base Theme) */}
              <div>
                <Link
                  href="/mega-deals"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold tracking-wide shadow-xs active:scale-98 transition-all cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Image: 3D Alarm Clock */}
            <div className="relative w-28 sm:w-36 lg:w-44 aspect-square shrink-0 flex items-center justify-center">
              <Image
                src="/images/promo/promo-alarm-clock.jpg"
                alt="Deal Of The Day Clock"
                fill
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

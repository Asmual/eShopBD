"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Flame, Timer, ChevronRight, Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import { ALL_PRODUCTS } from "@/data/products";

export default function FlashSaleSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Live countdown timer (counts down 8 hours, 45 minutes, 20 seconds from mount)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  const deals = useMemo(() => {
    let result = ALL_PRODUCTS.filter(
      (p) => p.isMegaDeal || p.discountPercent >= 22
    );

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result.slice(0, 5);
  }, [selectedCategory]);

  return (
    <section className="w-full py-6 sm:py-8 bg-white border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-border-light">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-current text-orange-600 animate-pulse" />
              <span>Limited Stock Deals</span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-text-main tracking-tight">
              Flash Sale of the Day
            </h2>

            {/* Countdown Clock */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold bg-neutral-900 text-white px-2.5 py-1 rounded-lg shadow-2xs">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] text-neutral-300 font-sans mr-0.5">Ends in:</span>
              <span className="text-amber-400 font-black">{formatNumber(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="text-amber-400 font-black">{formatNumber(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="text-amber-400 font-black">{formatNumber(timeLeft.seconds)}s</span>
            </div>
          </div>

          <Link
            href="/mega-deals"
            className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Mega Deals</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Column Compact Grid with Deal Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {deals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDealProgress={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

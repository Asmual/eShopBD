"use client";

import React from "react";
import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  return (
    <section aria-label="Hero Showcase" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6">
        <div className="flex items-start gap-6">
          {/* Vertical Category Sidebar (Permanently fixed on Desktop) */}
          <div className="hidden lg:block shrink-0 w-64">
            <CategorySidebar />
          </div>

          {/* Hero Banner Carousel (Consistent width & image aspect ratio) */}
          <div className="flex-1 min-w-0 w-full">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";
import { useUIStore } from "@/store/uiStore";

export default function HeroSection() {
  const { isCategorySidebarOpen } = useUIStore();

  return (
    <section aria-label="Hero Showcase" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6">
        <div className="flex items-start gap-6">
          {/* Vertical Category Sidebar (Connected to BottomNavbar toggle) */}
          {isCategorySidebarOpen && (
            <div className="hidden lg:block shrink-0 animate-in fade-in slide-in-from-top-1 duration-200">
              <CategorySidebar />
            </div>
          )}

          {/* Hero Banner Carousel */}
          <div className="flex-1 min-w-0 w-full">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

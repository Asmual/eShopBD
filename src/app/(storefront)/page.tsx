import React from "react";
import HeroSection from "@/features/products/components/HeroSection";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (Category Sidebar + Auto-Sliding Carousel) */}
      <HeroSection />
    </div>
  );
}

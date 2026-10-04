import React from "react";
import HeroSection from "@/features/products/components/HeroSection";
import FeaturesStrip from "@/components/common/FeaturesStrip";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (Category Sidebar + Auto-Sliding Carousel) */}
      <HeroSection />

      {/* Customer Trust & Features Strip */}
      <FeaturesStrip />
    </div>
  );
}

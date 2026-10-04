import React from "react";
import HeroSection from "@/features/products/components/HeroSection";
import FeaturesStrip from "@/components/common/FeaturesStrip";
import ShopByCategory from "@/features/products/components/ShopByCategory";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (Category Sidebar + Auto-Sliding Carousel) */}
      <HeroSection />

      {/* Customer Trust & Features Strip */}
      <FeaturesStrip />

      {/* Shop By Category Circular Showcase (6 Categories) */}
      <ShopByCategory />
    </div>
  );
}

import React from "react";
import HeroSection from "@/features/products/components/HeroSection";
import FeaturesStrip from "@/components/common/FeaturesStrip";
import ShopByCategory from "@/features/products/components/ShopByCategory";
import PromoOffersDualBanner from "@/features/products/components/PromoOffersDualBanner";
import HotDealsSection from "@/features/products/components/HotDealsSection";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (Category Sidebar + Auto-Sliding Carousel) */}
      <HeroSection />

      {/* Customer Trust & Features Strip */}
      <FeaturesStrip />

      {/* Shop By Category Circular Showcase */}
      <ShopByCategory />

      {/* Special Promotional Offers Dual Banner (15% OFF + Deal Of The Day) */}
      <PromoOffersDualBanner />

      {/* Hot Deals Product Grid Showcase */}
      <HotDealsSection />
    </div>
  );
}

import React from "react";
import HeroSection from "@/features/products/components/HeroSection";
import FeaturesStrip from "@/components/common/FeaturesStrip";
import ShopByCategory from "@/features/products/components/ShopByCategory";
import FlashSaleSection from "@/features/products/components/FlashSaleSection";
import PromoOffersDualBanner from "@/features/products/components/PromoOffersDualBanner";
import HotDealsSection from "@/features/products/components/HotDealsSection";
import TrendingShowcaseSection from "@/features/products/components/TrendingShowcaseSection";
import BrandStoresSection from "@/features/products/components/BrandStoresSection";
import CustomerReviewsSection from "@/features/products/components/CustomerReviewsSection";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* 1. Hero Section (Category Sidebar + Auto-Sliding Carousel) */}
      <HeroSection />

      {/* 2. Customer Trust & Guarantees Strip */}
      <FeaturesStrip />

      {/* 3. Shop By Category Circular Showcase */}
      <ShopByCategory />

      {/* 4. Limited Time Flash Sale with Countdown Timer */}
      <FlashSaleSection />

      {/* 5. Special Promotional Dual Banners */}
      <PromoOffersDualBanner />

      {/* 6. Hot Deals Product Grid */}
      <HotDealsSection />

      {/* 7. Trending Products with Category Filter Tabs */}
      <TrendingShowcaseSection />

      {/* 8. Official Brand Stores & Verified Sellers */}
      <BrandStoresSection />

      {/* 9. Verified Customer Reviews & Community Feedback */}
      <CustomerReviewsSection />
    </div>
  );
}

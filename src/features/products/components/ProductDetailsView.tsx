"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Package,
  Layers,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types/products";
import ProductCard from "./ProductCard";

interface ProductDetailsViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsView({
  product,
  relatedProducts,
}: ProductDetailsViewProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Default");
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "shipping">("desc");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Gallery images using product and complementary images
  const galleryImages = [
    product.image,
    "/images/categories/category-electronics.jpg",
    "/images/categories/category-women.jpg",
    "/images/categories/category-men2.jpg",
  ];

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      toast.success("Added to your Wishlist!");
    } else {
      toast("Removed from your Wishlist");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    toast.success(`${quantity}x ${product.name.slice(0, 24)}... added to Cart!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to direct checkout...");
    router.push(`/checkout?productId=${product.id}&qty=${quantity}`);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs text-text-muted mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap scrollbar-none"
        >
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/categories" className="hover:text-brand transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-brand transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-text-main font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-2xl border border-border-light p-4 sm:p-8 shadow-xs mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Image Showcase & Gallery (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square bg-gray-50 rounded-2xl border border-border-light overflow-hidden group">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                {product.discountPercent > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-brand text-white text-xs font-black shadow-xs">
                      {product.discountPercent}% OFF
                    </span>
                  </div>
                )}

                {/* Floating Wishlist & Share Buttons */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    aria-label="Wishlist"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                      isWishlisted
                        ? "bg-red-50 text-red-500"
                        : "bg-white/90 text-text-muted hover:text-red-500 hover:bg-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? "fill-current text-red-500" : ""}`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share product"
                    className="w-9 h-9 rounded-full bg-white/90 text-text-muted hover:text-brand hover:bg-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? "border-brand shadow-xs ring-2 ring-brand/20"
                        : "border-border-light hover:border-brand/40"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Details & Purchasing Options (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Stock Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand-light px-2.5 py-0.5 rounded-md">
                    {product.categoryName}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock (Ready to Ship)</span>
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-text-main tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Ratings & Social Proof */}
                <div className="mt-3 flex items-center gap-3 flex-wrap text-xs pb-4 border-b border-border-light/60">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-current text-amber-400"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-text-main text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-text-muted">
                    ({product.reviewsCount} customer reviews)
                  </span>
                  <span className="text-text-muted">|</span>
                  <span className="text-text-muted">
                    <strong className="text-text-main">{product.soldCount}</strong> units sold
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-4 p-3.5 sm:p-4 rounded-xl bg-brand-light/40 border border-brand/10 flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-brand">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm sm:text-base text-text-muted line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand text-white text-xs font-bold">
                        Save ৳{(product.originalPrice - product.price).toLocaleString()} ({product.discountPercent}%)
                      </span>
                    </>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
                  {product.description ||
                    "Engineered with premium quality standards for exceptional durability and day-to-day excellence. Certified authentic and backed by our comprehensive warranty guarantee."}
                </p>

                {/* Selectors: Color / Option */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-text-main block mb-1.5">
                      Select Option: <span className="text-text-muted font-normal">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {["Default", "Classic Emerald", "Obsidian Black", "Pearl White"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedColor(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedColor === opt
                              ? "border-brand bg-brand text-white shadow-2xs"
                              : "border-border-light bg-white text-text-muted hover:border-brand/40 hover:text-text-main"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div>
                    <label className="text-xs font-bold text-text-main block mb-1.5">
                      Quantity:
                    </label>
                    <div className="inline-flex items-center border border-border-light rounded-xl overflow-hidden bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer text-base font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-xs sm:text-sm font-bold text-text-main">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors cursor-pointer text-base font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="pt-4 border-t border-border-light/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-brand hover:bg-brand-hover text-white active:scale-98"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Buy Now */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-text-main hover:bg-black text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-98 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Delivery & Trust Badges Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-border-light/60">
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <Truck className="w-4 h-4 text-brand shrink-0" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <RotateCcw className="w-4 h-4 text-brand shrink-0" />
                    <span>7 Days Return</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                    <span>100% Authentic</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <Package className="w-4 h-4 text-brand shrink-0" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details (Description, Specs, Reviews, Shipping) */}
        <div className="bg-white rounded-2xl border border-border-light p-4 sm:p-8 shadow-xs mb-12 sm:mb-16">
          {/* Tabs Navigation Header */}
          <div className="flex items-center gap-2 sm:gap-4 border-b border-border-light overflow-x-auto scrollbar-none pb-px mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("desc")}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "desc"
                  ? "border-brand text-brand"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              Description & Highlights
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "specs"
                  ? "border-brand text-brand"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "reviews"
                  ? "border-brand text-brand"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "shipping"
                  ? "border-brand text-brand"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              Delivery & Warranty
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "desc" && (
            <div className="space-y-4 text-xs sm:text-sm text-text-muted leading-relaxed">
              <p>
                The <strong>{product.name}</strong> delivers top-of-the-line craftsmanship tailored specifically for discerning shoppers. Featuring state-of-the-art materials and strict quality inspection standards, this item seamlessly fits into your modern lifestyle.
              </p>
              <h4 className="font-bold text-text-main text-sm sm:text-base pt-2">
                Key Product Highlights:
              </h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>High durability engineering built with verified eco-friendly components.</li>
                <li>Tested for all-day comfort, high performance, and ergonomic ease of use.</li>
                <li>Official manufacturer warranty included inside the packaging box.</li>
                <li>Delivered in protective tamper-evident packaging.</li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border border-border-light rounded-xl overflow-hidden">
                <tbody className="divide-y divide-border-light">
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main w-1/3">Brand / Manufacturer</td>
                    <td className="py-2.5 px-4 text-text-muted">eShopBD Official Vendor</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-text-main">Category</td>
                    <td className="py-2.5 px-4 text-text-muted">{product.categoryName}</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main">Item SKU</td>
                    <td className="py-2.5 px-4 text-text-muted font-mono">{product.id.toUpperCase()}-2026</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-text-main">Warranty Period</td>
                    <td className="py-2.5 px-4 text-text-muted">1 Year Official Service Warranty</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main">Origin & Certification</td>
                    <td className="py-2.5 px-4 text-text-muted">Authentic Grade A Tested</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-brand-light/30 rounded-xl border border-brand/10">
                <div className="text-3xl sm:text-4xl font-black text-brand">
                  {product.rating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    Based on {product.reviewsCount} verified purchases
                  </span>
                </div>
              </div>

              {/* Sample verified review cards */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl border border-border-light bg-gray-50/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-text-main">Tariqul Islam (Verified Buyer)</span>
                    <span className="text-[10px] text-text-muted">2 days ago</span>
                  </div>
                  <div className="flex items-center text-amber-400 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">
                    &quot;Product arrived on time and the build quality exceeded my expectations. Completely satisfied with the purchase!&quot;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border-light bg-gray-50/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-text-main">Nusrat Jahan (Verified Buyer)</span>
                    <span className="text-[10px] text-text-muted">1 week ago</span>
                  </div>
                  <div className="flex items-center text-amber-400 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">
                    &quot;Original product just as shown in photos. Packaging was intact and dispatch was very fast.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3 text-xs sm:text-sm text-text-muted leading-relaxed">
              <p>
                <strong>Inside Dhaka:</strong> Delivery within 24 to 48 hours.
              </p>
              <p>
                <strong>Outside Dhaka:</strong> Delivery within 3 to 5 business days via verified courier services.
              </p>
              <p>
                <strong>Return Policy:</strong> If the product arrives damaged or does not match specifications, initiate a return within 7 calendar days from delivery date.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Showcase (5 columns on desktop) */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-text-main">
                Related Products You May Like
              </h2>
              <p className="text-xs text-text-muted">
                Handpicked items similar to this selection
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs font-bold text-brand hover:underline"
            >
              Explore Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {relatedProducts.slice(0, 5).map((relProd, idx) => (
              <ProductCard
                key={relProd.id}
                product={relProd}
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
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
  ChevronLeft,
  Package,
  Layers,
  Award,
  ZoomIn,
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

  // Dynamic category-aware gallery images
  const galleryImages = useMemo(() => {
    const list = [product.image];
    // Pick complementary verified images from the same category
    const sameCategoryItems = relatedProducts.filter(
      (p) => p.category === product.category && p.image !== product.image
    );
    sameCategoryItems.slice(0, 3).forEach((p) => {
      if (!list.includes(p.image)) list.push(p.image);
    });

    // Fallbacks if single item in category
    if (list.length < 4) {
      relatedProducts.forEach((p) => {
        if (list.length < 4 && !list.includes(p.image)) {
          list.push(p.image);
        }
      });
    }
    return list.slice(0, 4);
  }, [product, relatedProducts]);

  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");

  const deliveryFee = selectedDistrict === "Dhaka" ? "৳60" : selectedDistrict === "Gazipur" ? "৳100" : "৳120";
  const deliveryTime = selectedDistrict === "Dhaka" ? "24–48 Hours" : selectedDistrict === "Gazipur" ? "48–72 Hours" : "3–5 Days";

  // Category specific variants
  const isFashion = product.category === "women" || product.category === "men";
  const isToys = product.category === "toys-games" || product.category === "kids";

  const colorOptions = isFashion
    ? ["Crimson Red", "Emerald Green", "Midnight Blue", "Classic Black"]
    : isToys
    ? ["Standard Edition", "STEM Deluxe Set", "Family Gift Bundle"]
    : ["Matte Black", "Forest Green", "Silver Metal", "Glacier White"];

  const sizeOptions = isFashion ? ["S (38)", "M (40)", "L (42)", "XL (44)", "XXL (46)"] : null;

  // Interactive Reviews State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewsList, setReviewsList] = useState([
    {
      id: "r-1",
      author: "Tariqul Islam",
      verified: true,
      rating: 5,
      date: "2 days ago",
      text: "Product arrived on time and the build quality exceeded my expectations. Completely satisfied with the purchase!",
      helpful: 8,
    },
    {
      id: "r-2",
      author: "Nusrat Jahan",
      verified: true,
      rating: 5,
      date: "1 week ago",
      text: "Original product just as shown in photos. Packaging was intact and dispatch was very fast.",
      helpful: 5,
    },
    {
      id: "r-3",
      author: "Kabir Hossain",
      verified: true,
      rating: 4,
      date: "2 weeks ago",
      text: "Good product. Finish is great. Sound and battery performance matches the description.",
      helpful: 3,
    },
  ]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please enter your name and comment.");
      return;
    }
    const newRev = {
      id: `r-${Date.now()}`,
      author: reviewName.trim(),
      verified: true,
      rating: userRating,
      date: "Just now",
      text: reviewComment.trim(),
      helpful: 0,
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewName("");
    setReviewComment("");
    setShowReviewForm(false);
    toast.success("Thank you! Your verified review has been published.");
  };

  const handlePrevImage = () => {
    const nextIdx = (currentImageIdx - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx]);
  };

  const handleNextImage = () => {
    const nextIdx = (currentImageIdx + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx]);
  };

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

                {/* Image Counter Pill */}
                <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
                  {currentImageIdx + 1} / {galleryImages.length}
                </div>

                {/* Left/Right Quick Switch Arrows on Image Hover */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-text-main flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-text-main flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
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

                {/* Selectors: Options, Sizes & Quantity */}
                <div className="space-y-3.5 mb-5">
                  {/* Color / Variant */}
                  <div>
                    <label className="text-xs font-bold text-text-main block mb-1">
                      {isFashion ? "Select Color:" : isToys ? "Select Pack:" : "Select Model / Color:"}{" "}
                      <span className="text-brand font-semibold">
                        {selectedColor === "Default" ? colorOptions[0] : selectedColor}
                      </span>
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {colorOptions.map((opt) => {
                        const isSel = selectedColor === opt || (selectedColor === "Default" && opt === colorOptions[0]);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedColor(opt)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isSel
                                ? "border-brand bg-brand text-white shadow-2xs"
                                : "border-border-light bg-white text-text-muted hover:border-brand/40 hover:text-text-main"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector for Fashion */}
                  {sizeOptions && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-text-main block">
                          Select Size: <span className="text-brand font-semibold">{selectedSize}</span>
                        </label>
                        <Link href="/size-guide" className="text-[11px] text-brand hover:underline font-semibold">
                          Size Guide →
                        </Link>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {sizeOptions.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              selectedSize === sz
                                ? "border-brand bg-brand text-white shadow-2xs"
                                : "border-border-light bg-white text-text-muted hover:border-brand/40"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Counter */}
                  <div>
                    <label className="text-xs font-bold text-text-main block mb-1">
                      Quantity:
                    </label>
                    <div className="inline-flex items-center border border-border-light rounded-xl overflow-hidden bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-text-main">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors cursor-pointer text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Interactive Delivery Estimator Box */}
                  <div className="p-3 rounded-xl bg-brand-surface/70 border border-border-light text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-main flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-brand" />
                        <span>Delivery Destination</span>
                      </span>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="px-2 py-0.5 text-[11px] rounded-md border border-border-light bg-white text-text-main font-semibold focus:outline-hidden focus:border-brand"
                      >
                        <option value="Dhaka">Dhaka City</option>
                        <option value="Gazipur">Gazipur / Suburbs</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barishal">Barishal</option>
                        <option value="Rangpur">Rangpur</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-text-muted pt-0.5">
                      <span>Fee: <strong className="text-text-main">{deliveryFee}</strong> ({deliveryTime})</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                        Cash on Delivery Available
                      </span>
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
                    <td className="py-2.5 px-4 font-bold text-text-main w-1/3">Product Name</td>
                    <td className="py-2.5 px-4 text-text-main font-semibold">{product.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-text-main">Category / Department</td>
                    <td className="py-2.5 px-4 text-text-muted">{product.categoryName}</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main">Item SKU & Barcode</td>
                    <td className="py-2.5 px-4 text-text-muted font-mono">{product.id.toUpperCase()}-BD-2026</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-text-main">Authenticity Guarantee</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-semibold">100% Genuine Certified Supplier</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main">Warranty Coverage</td>
                    <td className="py-2.5 px-4 text-text-muted">1 Year Official Service Warranty</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-text-main">Return & Exchange Window</td>
                    <td className="py-2.5 px-4 text-text-muted">7 Days Hassle-Free Replacement Policy</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-2.5 px-4 font-bold text-text-main">Package Contents</td>
                    <td className="py-2.5 px-4 text-text-muted">1x Main Product, User Manual, Official Warranty Card, Security Sealed Box</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-5">
              {/* Review Score Summary Box */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 bg-brand-light/40 rounded-xl border border-brand/10">
                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl font-black text-brand leading-none">
                    {product.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-text-muted">
                      Based on {product.reviewsCount} verified purchases
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewForm((prev) => !prev)}
                  className="px-4 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  {showReviewForm ? "Cancel Review" : "Write a Verified Review"}
                </button>
              </div>

              {/* Interactive Write Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 rounded-xl border border-brand/30 bg-brand-surface/50 space-y-3 animate-in fade-in duration-200"
                >
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">
                    Submit Your Customer Feedback
                  </h4>

                  {/* Rating Selector */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-main block mb-1">
                      Your Rating (1 to 5 Stars):
                    </label>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= userRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-text-main block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shakib Ahmed"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full h-8 px-3 text-xs rounded-lg border border-border-light bg-white focus:outline-hidden focus:border-brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-text-main block mb-1">
                      Your Review Experience *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share details about delivery speed, build quality, and usability..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border border-border-light bg-white focus:outline-hidden focus:border-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              )}

              {/* Verified Reviews Cards List */}
              <div className="space-y-3 pt-1">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl border border-border-light bg-gray-50/50 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-main">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-text-muted">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 mb-1.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
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

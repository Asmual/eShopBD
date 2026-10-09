"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, ShoppingCart, Zap, Check } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  showDealProgress?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  product,
  showDealProgress = false,
  priority = false,
}: ProductCardProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      toast.success(`${product.name.slice(0, 20)}... added to Wishlist!`);
    } else {
      toast(`${product.name.slice(0, 20)}... removed from Wishlist`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    toast.success(`${product.name.slice(0, 20)}... added to Cart!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Checking out ${product.name.slice(0, 18)}...`);
    router.push(`/checkout?productId=${product.id}`);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-border-light hover:border-brand/40 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Product Image Area - Compact aspect-ratio so the card is not overly tall */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[1.15/1] bg-gray-50/90 overflow-hidden flex items-center justify-center">
        <Link href={`/products/${product.slug}`} className="w-full h-full block relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top-Right Badge: Discount percentage */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand text-white flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-black leading-none shadow-xs border border-white/40">
              <span>{product.discountPercent}%</span>
              <span className="text-[6.5px] uppercase font-bold tracking-tighter">OFF</span>
            </span>
          </div>
        )}

        {/* Top-Left Status / Category Badge (e.g. HOT, NEW, BEST SELLER) */}
        {product.badge && product.discountPercent === 0 && (
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded-md bg-brand text-white text-[9px] font-bold uppercase tracking-wider shadow-2xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Icon Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 left-2 z-10 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-all shadow-2xs cursor-pointer ${
            isWishlisted
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-white/90 text-text-muted hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
        </button>
      </div>

      {/* Content Section - Compact and Proportional */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category Tag */}
          <span className="text-[9px] sm:text-[10px] font-bold text-text-muted uppercase tracking-wider block truncate">
            {product.categoryName}
          </span>

          {/* Product Title */}
          <Link
            href={`/products/${product.slug}`}
            className="mt-0.5 block text-xs sm:text-[13px] font-bold text-text-main line-clamp-1 hover:text-brand transition-colors leading-tight"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Ratings & Count */}
          <div className="mt-1 flex items-center gap-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-current text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-text-main">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-text-muted">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Deal Progress (For Mega Deals / Flash Sales) */}
          {showDealProgress && product.claimedPercent && (
            <div className="mt-1.5">
              <div className="flex items-center justify-between text-[9px] font-semibold text-text-muted mb-0.5">
                <span>Sold: {product.soldCount}</span>
                <span className="text-brand font-bold">{product.claimedPercent}%</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand rounded-full"
                  style={{ width: `${product.claimedPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Pricing Row */}
          <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm lg:text-[15px] font-black text-brand">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-[11px] text-text-muted line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="pt-2 border-t border-border-light/60 grid grid-cols-2 gap-1.5">
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-brand hover:bg-brand-hover text-white active:scale-98"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 shrink-0" />
                <span className="truncate">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3 shrink-0" />
                <span className="truncate">Add to Cart</span>
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            aria-label={`Buy ${product.name} now`}
            className="flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg bg-text-main hover:bg-black text-white text-[10px] sm:text-[11px] font-bold transition-all active:scale-98 cursor-pointer shadow-2xs"
          >
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

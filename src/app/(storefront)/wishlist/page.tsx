"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import EmptyState from "@/components/common/EmptyState";

interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "w-1",
    name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
    slug: "sony-srs-xb13-extra-bass-wireless-compact-speaker",
    category: "Electronics",
    image: "/images/all products/electronics/electronics-8.jpg",
    price: 4950,
    originalPrice: 6200,
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
  },
  {
    id: "w-2",
    name: "30,000mAh Ultra-Fast PD 65W Power Bank with Digital Display",
    slug: "30000mah-ultra-fast-pd-65w-power-bank-with-digital-display",
    category: "Electronics",
    image: "/images/all products/electronics/electronics-2.jpg",
    price: 2850,
    originalPrice: 3800,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
  },
  {
    id: "w-3",
    name: "Montessori Wooden Counting & Shape Sorting Board",
    slug: "montessori-wooden-counting-shape-sorting-board",
    category: "Toys & Games",
    image: "/images/all products/toys/Toys- (1).jpg",
    price: 1450,
    originalPrice: 1950,
    rating: 4.7,
    reviewsCount: 88,
    inStock: true,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);

  const handleRemove = (id: string, name: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Removed "${name}" from your wishlist.`);
  };

  const handleMoveToCart = (item: WishlistItem) => {
    toast.success(`Moved "${item.name}" to your cart!`);
    handleRemove(item.id, item.name);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Wishlist</span>
        </div>

        {/* Moderate Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>My Saved Items ({items.length})</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Review your favorite products, monitor price drops, and add items directly to cart.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setItems([]);
                toast("Wishlist cleared");
              }}
              className="text-xs text-text-muted hover:text-red-500 transition-colors font-medium cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Category */}
                  <div className="relative aspect-square w-full rounded-lg bg-gray-50 overflow-hidden mb-2.5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-text-main text-[10px] font-bold">
                      {item.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-text-muted mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-text-main">{item.rating}</span>
                    <span>({item.reviewsCount})</span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-xs sm:text-sm font-bold text-text-main hover:text-brand transition-colors line-clamp-2 leading-snug mb-2 block"
                  >
                    {item.name}
                  </Link>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm font-bold text-brand">৳{item.price.toLocaleString()}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-text-muted line-through">
                        ৳{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-border-light flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id, item.name)}
                    className="p-1.5 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your Wishlist is Empty"
            description="You haven't saved any items to your wishlist yet. Explore our curated collections to find your favorites."
            actionText="Start Shopping"
            actionHref="/products"
          />
        )}
      </div>
    </div>
  );
}

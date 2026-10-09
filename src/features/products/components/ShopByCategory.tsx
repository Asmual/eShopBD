"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryShowcaseItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
}

const CATEGORIES_SHOWCASE: CategoryShowcaseItem[] = [
  {
    id: "cat-women",
    name: "Women",
    slug: "women",
    image: "/images/categories/category-women.jpg",
    href: "/products?category=women",
  },
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    image: "/images/categories/category-men2.jpg",
    href: "/products?category=men",
  },
  {
    id: "cat-kids",
    name: "Kids",
    slug: "kids",
    image: "/images/categories/category-kids.jpg",
    href: "/products?category=kids",
  },
  {
    id: "cat-toys",
    name: "Toys & Games",
    slug: "toys-games",
    image: "/images/categories/category-Toys.jpg",
    href: "/products?category=toys-games",
  },
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    image: "/images/products/electronics/electronics-8.jpg",
    href: "/electronics",
  },
];

export default function ShopByCategory() {
  return (
    <section aria-label="Shop By Category Showcase" className="w-full bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Decorative Dashed Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <span
            className="hidden sm:inline-block w-12 md:w-20 border-t border-dashed border-text-muted/40"
            aria-hidden="true"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-main tracking-tight text-center">
            Shop By Category
          </h2>
          <span
            className="hidden sm:inline-block w-12 md:w-20 border-t border-dashed border-text-muted/40"
            aria-hidden="true"
          />
        </div>

        {/* 5 Circular Categories Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto">
          {CATEGORIES_SHOWCASE.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col items-center text-center focus:outline-hidden"
              aria-label={`Shop ${item.name} category`}
            >
              {/* Circular Image Container */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-brand-surface shadow-2xs group-hover:shadow-md border-2 border-transparent group-hover:border-brand/30 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={`${item.name} collection`}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-300"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Category Name */}
              <h3 className="mt-3.5 text-base sm:text-lg font-bold text-text-main group-hover:text-brand transition-colors">
                {item.name}
              </h3>

              {/* Shop Now CTA Button with Brand Hover */}
              <div className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand group-hover:text-brand-hover transition-colors">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

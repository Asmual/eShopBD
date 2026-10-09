"use client";

import React from "react";
import Link from "next/link";
import {
  Baby,
  Sparkles,
  BookOpen,
  Tv,
  Shirt,
  ShoppingBasket,
  HeartPulse,
  Home,
  Gem,
  Dumbbell,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import { CategoryItem } from "../types";

const CATEGORIES: CategoryItem[] = [
  { id: "1", name: "Baby & Kids", slug: "baby-kids", icon: Baby },
  { id: "2", name: "Beauty", slug: "beauty", icon: Sparkles },
  { id: "3", name: "Books", slug: "books", icon: BookOpen },
  { id: "4", name: "Electronics", slug: "electronics", icon: Tv },
  { id: "5", name: "Fashion", slug: "fashion", icon: Shirt },
  { id: "6", name: "Grocery", slug: "grocery", icon: ShoppingBasket },
  { id: "7", name: "Health & Fitness", slug: "health-fitness", icon: HeartPulse },
  { id: "8", name: "Home & Kitchen", slug: "home-kitchen", icon: Home },
  { id: "9", name: "Jewelry", slug: "jewelry", icon: Gem },
  { id: "10", name: "Sports", slug: "sports", icon: Dumbbell },
  { id: "11", name: "All Products", slug: "all-products", icon: LayoutGrid },
];

export default function CategorySidebar() {
  return (
    <aside
      aria-label="Product Categories Sidebar"
      className="w-64 shrink-0 bg-white border-x border-b border-border-light rounded-b-xl shadow-xs overflow-hidden"
    >
      <ul className="divide-y divide-border-light/50">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <li key={category.id}>
              <Link
                href={category.slug === "electronics" ? "/electronics" : `/products?category=${category.slug}`}
                className="flex items-center justify-between px-4 py-2 text-xs sm:text-[13px] font-medium text-text-main hover:bg-brand-light hover:text-brand transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors" />
                  <span>{category.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

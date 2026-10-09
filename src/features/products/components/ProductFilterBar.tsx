"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown, Search, X } from "lucide-react";

interface ProductFilterBarProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export default function ProductFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalCount,
}: ProductFilterBarProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-border-light p-4 sm:p-5 shadow-2xs mb-6 sm:mb-8 space-y-4">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search input inside catalog */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search within this collection..."
            className="w-full h-10 pl-9 pr-9 text-xs sm:text-sm text-text-main bg-gray-50 border border-border-light rounded-xl focus:outline-hidden focus:border-brand focus:bg-white transition-all placeholder:text-text-muted"
          />
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Info & Sort dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs font-semibold text-text-muted">
            <span className="text-text-main font-bold">{totalCount}</span> products
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-text-muted" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-10 pl-2.5 pr-8 text-xs sm:text-sm font-medium text-text-main bg-gray-50 border border-border-light rounded-xl focus:outline-hidden focus:border-brand cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-border-light/60">
        <span className="text-xs font-bold text-text-muted shrink-0 flex items-center gap-1.5 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Category:</span>
        </span>

        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-brand text-white shadow-xs"
              : "bg-gray-100 text-text-muted hover:bg-gray-200 hover:text-text-main"
          }`}
        >
          All
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-brand text-white shadow-xs"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200 hover:text-text-main"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

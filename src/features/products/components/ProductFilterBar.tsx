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
    <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-border-light p-2.5 sm:p-3.5 shadow-2xs mb-4 sm:mb-5 space-y-2.5">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Search input inside catalog */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search within this collection..."
            className="w-full h-8.5 sm:h-9 pl-8 pr-8 text-xs text-text-main bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand focus:bg-white transition-all placeholder:text-text-muted"
          />
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Info & Sort dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold text-text-muted">
            <span className="text-text-main font-bold">{totalCount}</span> products
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-8.5 sm:h-9 pl-2 pr-7 text-xs font-medium text-text-main bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand cursor-pointer"
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none pt-2 border-t border-border-light/60">
        <span className="text-[11px] font-bold text-text-muted shrink-0 flex items-center gap-1 mr-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>Category:</span>
        </span>

        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-brand text-white shadow-2xs"
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
              className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-brand text-white shadow-2xs"
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

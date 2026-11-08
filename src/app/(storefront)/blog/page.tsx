"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";

interface Article {
  id: string;
  category: "electronics" | "fashion" | "kids" | "shopping-tips";
  categoryLabel: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: "art-1",
    category: "electronics",
    categoryLabel: "Electronics & Audio",
    title: "Best Bluetooth Speakers & Fast Chargers for Bangladeshi Users in 2026",
    summary:
      "A practical comparison of genuine high-output power banks, Bluetooth 5.3 portable speakers, and durability benchmarks under tropical climate conditions.",
    readTime: "4 min read",
    date: "Oct 15, 2026",
    author: "eShopBD Tech Desk",
  },
  {
    id: "art-2",
    category: "fashion",
    categoryLabel: "Fashion & Style",
    title: "Festive Fabrics: Cotton vs Silk Kurti & Panjabi Styling Guide",
    summary:
      "Understand thread counts, embroidery care, and breathability for warm weather everyday wear and festive celebrations.",
    readTime: "5 min read",
    date: "Oct 12, 2026",
    author: "Lifestyle Team",
  },
  {
    id: "art-3",
    category: "kids",
    categoryLabel: "Parenting & Toys",
    title: "Top STEM & Montessori Educational Toys for Early Cognitive Development",
    summary:
      "How interactive flashcards, robotic block sets, and safe wooden puzzles stimulate critical thinking in children ages 2 to 7.",
    readTime: "3 min read",
    date: "Oct 08, 2026",
    author: "Child Development Review",
  },
  {
    id: "art-4",
    category: "shopping-tips",
    categoryLabel: "Smart Buying",
    title: "How to Avoid Counterfeit Gadgets: 5 Verification Checks Before Buying",
    summary:
      "Inspect serial barcodes, holographic security stickers, official distributor warranty cards, and verify IMEI databases safely.",
    readTime: "4 min read",
    date: "Sep 29, 2026",
    author: "Consumer Safety Desk",
  },
  {
    id: "art-5",
    category: "shopping-tips",
    categoryLabel: "Smart Buying",
    title: "Maximizing Coupon Codes and Flash Deals During Mega Sale Campaigns",
    summary:
      "Discover stacking techniques with cart vouchers like WELCOME10, mobile banking cashback offers, and express shipping windows.",
    readTime: "3 min read",
    date: "Sep 22, 2026",
    author: "Deals & Promotions Team",
  },
  {
    id: "art-6",
    category: "electronics",
    categoryLabel: "Electronics & Audio",
    title: "True Wireless Earbuds Buying Guide: ANC, Battery Life & Mic Quality",
    summary:
      "Evaluate latency for mobile gaming, environmental noise cancellation (ENC) for outdoor calls, and water-resistance ratings.",
    readTime: "5 min read",
    date: "Sep 14, 2026",
    author: "Gadget Analysis Lab",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Insights" },
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion & Style" },
  { id: "kids", label: "Kids & Toys" },
  { id: "shopping-tips", label: "Shopping Tips" },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchesCategory =
        selectedCategory === "all" || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Blog & Guides</span>
        </div>

        {/* Moderate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3.5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand" />
              <span>Shopping Insights & Buyer Guides</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Expert advice on verified electronics, authentic apparel, and savvy online shopping tips.
            </p>
          </div>

          {/* Compact Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-white border border-border-light focus:outline-hidden focus:border-brand"
            />
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Compact Topic Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-brand text-white shadow-2xs"
                  : "bg-white text-text-muted hover:text-text-main border border-border-light"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Compact High-Density Article Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-border-light p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand font-bold uppercase tracking-wider">
                    {article.categoryLabel}
                  </span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xs sm:text-sm font-bold text-text-main hover:text-brand transition-colors line-clamp-2 leading-snug mb-1.5">
                  {article.title}
                </h2>

                {/* Summary */}
                <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed line-clamp-3 mb-3">
                  {article.summary}
                </p>
              </div>

              {/* Bottom Info Bar */}
              <div className="pt-2.5 border-t border-border-light/60 flex items-center justify-between text-[11px] text-text-muted">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-text-muted/80" />
                  <span>{article.date}</span>
                </span>
                <span className="text-brand font-semibold hover:underline inline-flex items-center gap-0.5 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup (Compact) */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-text-main">Subscribe to Deals & Weekly Insights</h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Receive curated buying guides and secret coupon codes directly in your inbox.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-8 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand w-full sm:w-56"
            />
            <button
              type="button"
              className="px-3.5 h-8 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

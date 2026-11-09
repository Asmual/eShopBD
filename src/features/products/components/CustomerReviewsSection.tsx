"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface CustomerReview {
  id: string;
  name: string;
  city: string;
  avatarBg: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  category: "all" | "electronics" | "fashion" | "delivery";
  helpfulCount: number;
}

const REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Farhan Chowdhury",
    city: "Dhanmondi, Dhaka",
    avatarBg: "bg-emerald-600",
    rating: 5,
    date: "2 days ago",
    productName: "Sony SRS-XB13 Extra Bass Speaker",
    comment:
      "100% authentic product! Verified serial barcode on Sony's official portal. Extra bass is deep and clear, battery lasted two full days. Delivered in just 26 hours.",
    category: "electronics",
    helpfulCount: 24,
  },
  {
    id: "rev-2",
    name: "Nusrat Jahan",
    city: "GEC Circle, Chittagong",
    avatarBg: "bg-purple-600",
    rating: 5,
    date: "3 days ago",
    productName: "Premium Embroidered Traditional Kurti Set",
    comment:
      "Fabric quality is remarkably soft breathable combed cotton. The embroidery work is identical to the pictures. Arrived neatly packaged in a tamper-proof box.",
    category: "fashion",
    helpfulCount: 19,
  },
  {
    id: "rev-3",
    name: "Tanvir Hasan",
    city: "Uttara, Dhaka",
    avatarBg: "bg-blue-600",
    rating: 5,
    date: "4 days ago",
    productName: "30,000mAh Ultra-Fast PD 65W Power Bank",
    comment:
      "Charges my laptop and phone at full 65W simultaneously without overheating. Digital display is very accurate. Excellent value for money on eShopBD.",
    category: "electronics",
    helpfulCount: 31,
  },
  {
    id: "rev-4",
    name: "Sabrina Rahman",
    city: "Zindabazar, Sylhet",
    avatarBg: "bg-rose-600",
    rating: 5,
    date: "5 days ago",
    productName: "Kids STEM Interactive Building Robotics Kit",
    comment:
      "My 7-year-old son is hooked! All motor parts and gears snap together smoothly. Packaging was sturdy and courier rider was very courteous.",
    category: "delivery",
    helpfulCount: 15,
  },
  {
    id: "rev-5",
    name: "Mahmudul Alam",
    city: "Rajshahi Sadar",
    avatarBg: "bg-amber-600",
    rating: 5,
    date: "1 week ago",
    productName: "Men's Classic Slim-Fit Oxford Shirt",
    comment:
      "Accurate size according to their size guide table. Stitching is clean and fabric doesn't shrink after washing. Will definitely buy again.",
    category: "fashion",
    helpfulCount: 12,
  },
  {
    id: "rev-6",
    name: "Kazi Ashikur",
    city: "Mirpur-10, Dhaka",
    avatarBg: "bg-teal-600",
    rating: 5,
    date: "1 week ago",
    productName: "Zebronics 2.1 BT Multimedia Home Theater",
    comment:
      "Ordered with Cash on Delivery. Rider allowed me to check the seal before payment. Sound output fills my 200 sqft living room easily.",
    category: "delivery",
    helpfulCount: 22,
  },
];

export default function CustomerReviewsSection() {
  const [filter, setFilter] = useState<"all" | "electronics" | "fashion" | "delivery">("all");
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  const filteredReviews = REVIEWS.filter(
    (rev) => filter === "all" || rev.category === filter
  );

  const toggleHelpful = (id: string) => {
    setHelpfulVoted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full py-8 sm:py-10 bg-brand-surface/50 border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Moderate Title & Live Stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Real Shopper Feedback</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-text-main tracking-tight">
              Verified Customer Reviews
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Read transparent experiences from verified buyers across 64 districts in Bangladesh.
            </p>
          </div>

          {/* Social Proof Metric Pill */}
          <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-border-light shadow-2xs self-start md:self-auto">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold text-text-main">4.9 / 5.0</span>
              <span className="text-text-muted ml-1.5">(12,400+ reviews)</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            All Reviews
          </button>
          <button
            type="button"
            onClick={() => setFilter("electronics")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === "electronics"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Electronics
          </button>
          <button
            type="button"
            onClick={() => setFilter("fashion")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === "fashion"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Fashion & Apparel
          </button>
          <button
            type="button"
            onClick={() => setFilter("delivery")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === "delivery"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Fast Delivery & Packing
          </button>
        </div>

        {/* Reviews Grid (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredReviews.map((review) => {
            const hasVoted = !!helpfulVoted[review.id];
            return (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-border-light p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: User Avatar & Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${review.avatarBg} text-white flex items-center justify-center text-xs font-black uppercase`}
                      >
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-text-main leading-none">
                          {review.name}
                        </h3>
                        <p className="text-[10px] text-text-muted mt-0.5">{review.city}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <div className="flex items-center text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-text-muted">{review.date}</span>
                  </div>

                  {/* Product Tag */}
                  <div className="mb-2">
                    <span className="text-[10px] font-semibold text-brand bg-brand-light px-2 py-0.5 rounded-md inline-block truncate max-w-full">
                      {review.productName}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {/* Helpful Button */}
                <div className="pt-3 mt-3 border-t border-border-light/60 flex items-center justify-between text-[11px] text-text-muted">
                  <span>Helpful review?</span>
                  <button
                    type="button"
                    onClick={() => toggleHelpful(review.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      hasVoted
                        ? "bg-brand-light text-brand font-bold"
                        : "hover:bg-gray-100 text-text-muted"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.helpfulCount + (hasVoted ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

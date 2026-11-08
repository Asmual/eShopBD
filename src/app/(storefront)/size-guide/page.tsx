"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Ruler, CheckCircle2 } from "lucide-react";

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"men" | "women" | "kids" | "shoes">("men");

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Size Guide</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <Ruler className="w-5 h-5 text-brand" />
            <span>Apparel & Footwear Size Chart</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Accurate body measurement standards in inches and centimeters for clothing and shoes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-3.5">
          <button
            type="button"
            onClick={() => setActiveTab("men")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "men"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Men&apos;s Panjabi & Shirts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("women")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "women"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Women&apos;s Kurtis & Dresses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kids")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "kids"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Kids & Baby Clothing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("shoes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "shoes"
                ? "bg-brand text-white shadow-2xs"
                : "bg-white text-text-muted hover:text-text-main border border-border-light"
            }`}
          >
            Footwear (EU / UK)
          </button>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs mb-4">
          {activeTab === "men" && (
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-text-main mb-2.5">
                Men&apos;s Panjabi & Casual Shirts (Inches)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border-light bg-brand-surface/60 font-bold text-text-main">
                      <th className="py-2 px-3">Size Label</th>
                      <th className="py-2 px-3">Chest (Inches)</th>
                      <th className="py-2 px-3">Length (Inches)</th>
                      <th className="py-2 px-3">Shoulder (Inches)</th>
                      <th className="py-2 px-3">Sleeve Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-text-muted">
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">S (38)</td>
                      <td className="py-2 px-3">38&quot; – 39&quot;</td>
                      <td className="py-2 px-3">38&quot;</td>
                      <td className="py-2 px-3">17.0&quot;</td>
                      <td className="py-2 px-3">24.0&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">M (40)</td>
                      <td className="py-2 px-3">40&quot; – 41&quot;</td>
                      <td className="py-2 px-3">40&quot;</td>
                      <td className="py-2 px-3">17.5&quot;</td>
                      <td className="py-2 px-3">24.5&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">L (42)</td>
                      <td className="py-2 px-3">42&quot; – 43&quot;</td>
                      <td className="py-2 px-3">42&quot;</td>
                      <td className="py-2 px-3">18.0&quot;</td>
                      <td className="py-2 px-3">25.0&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">XL (44)</td>
                      <td className="py-2 px-3">44&quot; – 45&quot;</td>
                      <td className="py-2 px-3">44&quot;</td>
                      <td className="py-2 px-3">18.5&quot;</td>
                      <td className="py-2 px-3">25.5&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">XXL (46)</td>
                      <td className="py-2 px-3">46&quot; – 47&quot;</td>
                      <td className="py-2 px-3">45&quot;</td>
                      <td className="py-2 px-3">19.0&quot;</td>
                      <td className="py-2 px-3">26.0&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "women" && (
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-text-main mb-2.5">
                Women&apos;s Kurtis, Kamiz & Tops (Inches)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border-light bg-brand-surface/60 font-bold text-text-main">
                      <th className="py-2 px-3">Size Label</th>
                      <th className="py-2 px-3">Bust (Inches)</th>
                      <th className="py-2 px-3">Waist (Inches)</th>
                      <th className="py-2 px-3">Hip (Inches)</th>
                      <th className="py-2 px-3">Standard Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-text-muted">
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">36 (S)</td>
                      <td className="py-2 px-3">36&quot;</td>
                      <td className="py-2 px-3">32&quot;</td>
                      <td className="py-2 px-3">38&quot;</td>
                      <td className="py-2 px-3">42&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">38 (M)</td>
                      <td className="py-2 px-3">38&quot;</td>
                      <td className="py-2 px-3">34&quot;</td>
                      <td className="py-2 px-3">40&quot;</td>
                      <td className="py-2 px-3">43&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">40 (L)</td>
                      <td className="py-2 px-3">40&quot;</td>
                      <td className="py-2 px-3">36&quot;</td>
                      <td className="py-2 px-3">42&quot;</td>
                      <td className="py-2 px-3">44&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">42 (XL)</td>
                      <td className="py-2 px-3">42&quot;</td>
                      <td className="py-2 px-3">38&quot;</td>
                      <td className="py-2 px-3">44&quot;</td>
                      <td className="py-2 px-3">44&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">44 (XXL)</td>
                      <td className="py-2 px-3">44&quot;</td>
                      <td className="py-2 px-3">40&quot;</td>
                      <td className="py-2 px-3">46&quot;</td>
                      <td className="py-2 px-3">45&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "kids" && (
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-text-main mb-2.5">
                Kids & Baby Apparel Sizing
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border-light bg-brand-surface/60 font-bold text-text-main">
                      <th className="py-2 px-3">Age Bracket</th>
                      <th className="py-2 px-3">Child Height (cm)</th>
                      <th className="py-2 px-3">Chest (Inches)</th>
                      <th className="py-2 px-3">Waist (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-text-muted">
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">0 – 6 Months</td>
                      <td className="py-2 px-3">60 – 68 cm</td>
                      <td className="py-2 px-3">17&quot; – 18&quot;</td>
                      <td className="py-2 px-3">17.5&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">6 – 12 Months</td>
                      <td className="py-2 px-3">68 – 80 cm</td>
                      <td className="py-2 px-3">19&quot; – 20&quot;</td>
                      <td className="py-2 px-3">18.5&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">1 – 2 Years</td>
                      <td className="py-2 px-3">80 – 92 cm</td>
                      <td className="py-2 px-3">20&quot; – 21&quot;</td>
                      <td className="py-2 px-3">19.5&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">3 – 4 Years</td>
                      <td className="py-2 px-3">98 – 104 cm</td>
                      <td className="py-2 px-3">22&quot; – 23&quot;</td>
                      <td className="py-2 px-3">21.0&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">5 – 6 Years</td>
                      <td className="py-2 px-3">110 – 116 cm</td>
                      <td className="py-2 px-3">24&quot; – 25&quot;</td>
                      <td className="py-2 px-3">22.5&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "shoes" && (
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-text-main mb-2.5">
                Footwear Conversion Chart
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border-light bg-brand-surface/60 font-bold text-text-main">
                      <th className="py-2 px-3">Bangladesh / EU</th>
                      <th className="py-2 px-3">UK Size</th>
                      <th className="py-2 px-3">US Size</th>
                      <th className="py-2 px-3">Foot Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-text-muted">
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 39</td>
                      <td className="py-2 px-3">UK 5.5</td>
                      <td className="py-2 px-3">US 6.5</td>
                      <td className="py-2 px-3">24.5 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 40</td>
                      <td className="py-2 px-3">UK 6.0</td>
                      <td className="py-2 px-3">US 7.0</td>
                      <td className="py-2 px-3">25.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 41</td>
                      <td className="py-2 px-3">UK 7.0</td>
                      <td className="py-2 px-3">US 8.0</td>
                      <td className="py-2 px-3">26.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 42</td>
                      <td className="py-2 px-3">UK 8.0</td>
                      <td className="py-2 px-3">US 8.5</td>
                      <td className="py-2 px-3">26.5 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 43</td>
                      <td className="py-2 px-3">UK 9.0</td>
                      <td className="py-2 px-3">US 9.5</td>
                      <td className="py-2 px-3">27.5 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-text-main">EU 44</td>
                      <td className="py-2 px-3">UK 9.5</td>
                      <td className="py-2 px-3">US 10.0</td>
                      <td className="py-2 px-3">28.0 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Measuring Tip Card */}
        <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs text-xs text-text-muted">
          <h3 className="font-bold text-text-main text-xs mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
            <span>How to Measure Your Chest & Bust</span>
          </h3>
          <p className="leading-relaxed">
            Wrap a flexible measuring tape comfortably under your armpits across the fullest part of your chest or bust, keeping the tape level parallel to the floor. If your measurement falls between two sizes, we recommend ordering the larger size for a relaxed comfortable fit.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Users,
  Award,
  ChevronRight,
  Store,
  Clock,
  Headphones,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">About Us</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight">
            About eShopBD
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            A trusted multi-vendor eCommerce ecosystem committed to authentic products, buyer security, and nationwide fulfillment.
          </p>
        </div>

        {/* Compact Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <span className="text-brand font-black text-lg sm:text-xl block">100%</span>
            <span className="text-xs font-bold text-text-main mt-0.5 block">Authentic Items</span>
            <span className="text-[11px] text-text-muted">Direct from verified suppliers</span>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <span className="text-brand font-black text-lg sm:text-xl block">64</span>
            <span className="text-xs font-bold text-text-main mt-0.5 block">Districts Covered</span>
            <span className="text-[11px] text-text-muted">Nationwide door-to-door delivery</span>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <span className="text-brand font-black text-lg sm:text-xl block">500+</span>
            <span className="text-xs font-bold text-text-main mt-0.5 block">Verified Merchants</span>
            <span className="text-[11px] text-text-muted">Strict KYC & quality checks</span>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <span className="text-brand font-black text-lg sm:text-xl block">24/7</span>
            <span className="text-xs font-bold text-text-main mt-0.5 block">Customer Support</span>
            <span className="text-[11px] text-text-muted">Dedicated resolution team</span>
          </div>
        </div>

        {/* Mission & What Sets Us Apart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand mb-1.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand" />
              <span>Our Mission</span>
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              At eShopBD, our mission is to eliminate online shopping friction in Bangladesh by establishing genuine consumer trust. We connect discerning shoppers with vetted local manufacturers, official gadget distributors, and artisanal brands through a transparent, high-speed platform.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Buyer Protection Guarantee</span>
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Every purchase on eShopBD comes with a 7-day hassle-free return window, insured shipping against transit damages, and multi-factor transaction validation. If a delivered item does not match its exact specifications, our support team initiates instant replacements or refunds.
            </p>
          </div>
        </div>

        {/* Core Pillars (4 Cards) */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-text-main uppercase tracking-wider mb-2.5">
            Core Service Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-text-main mb-1">Fast Nationwide Delivery</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                24-48 hour delivery inside Dhaka metro, and 3-5 days across all 64 districts with live tracking.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center mb-2">
                <Store className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-text-main mb-1">Empowering Local Sellers</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Offering fair commissions, automated payouts, and comprehensive dashboard analytics to merchants.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-text-main mb-1">7-Day Easy Returns</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Seamless return request submission with door-to-door courier pickups for verified defects.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center mb-2">
                <Headphones className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-text-main mb-1">Dedicated Helpdesk</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Multilingual customer support representatives ready to answer calls, tickets, and emails daily.
              </p>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-white rounded-xl border border-border-light p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div>
            <h3 className="text-xs font-bold text-text-main">Are you a merchant or brand owner?</h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Join eShopBD marketplace today and expand your sales footprint to hundreds of thousands of active shoppers.
            </p>
          </div>
          <Link
            href="/become-seller"
            className="shrink-0 px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
}

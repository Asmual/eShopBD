"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
} from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Return & Refund Policy</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand" />
            <span>7-Day Return & Refund Policy</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Clear, hassle-free replacement and refund guidelines for all eShopBD orders.
          </p>
        </div>

        {/* 4-Step Return Process Cards */}
        <div className="mb-4">
          <h2 className="text-xs font-bold text-text-main uppercase tracking-wider mb-2.5">
            How The Return Process Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-white rounded-xl border border-border-light p-3 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-1.5">
                1
              </span>
              <h3 className="text-xs font-bold text-text-main mb-0.5">Submit Request</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Submit an online return claim within 7 days of parcel delivery with photos/video.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-1.5">
                2
              </span>
              <h3 className="text-xs font-bold text-text-main mb-0.5">KYC Verification</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Our support team reviews your claim and approves courier pickup within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-1.5">
                3
              </span>
              <h3 className="text-xs font-bold text-text-main mb-0.5">Doorstep Pickup</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Our logistics rider collects the package from your delivery address free of charge.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border-light p-3 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-1.5">
                4
              </span>
              <h3 className="text-xs font-bold text-text-main mb-0.5">Refund / Replace</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Receive an instant replacement or full monetary refund via bKash, Nagad, or Card.
              </p>
            </div>
          </div>
        </div>

        {/* Eligible vs Ineligible Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
          <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-2xs">
            <h3 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Eligible for Return / Replacement</span>
            </h3>
            <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
              <li>Item delivered in physically damaged or fractured condition.</li>
              <li>Defective electronic hardware or dead-on-arrival gadgets.</li>
              <li>Mismatched item, color, or apparel size differing from invoice.</li>
              <li>Missing accessories, chargers, or components listed in package.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-red-200 p-4 shadow-2xs">
            <h3 className="text-xs font-bold text-red-800 flex items-center gap-1.5 mb-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Non-Eligible for Return</span>
            </h3>
            <ul className="text-xs text-text-muted space-y-1.5 list-disc list-inside">
              <li>Items returned after the 7-day delivery window expires.</li>
              <li>Used apparel with tags removed or washed clothing.</li>
              <li>Personal hygiene products, undergarments, or opened cosmetics.</li>
              <li>Items damaged due to electrical surge, misuse, or physical dropping.</li>
            </ul>
          </div>
        </div>

        {/* Refund Timeline Matrix */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs mb-4">
          <h3 className="text-xs sm:text-sm font-bold text-text-main mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand" />
            <span>Refund Timelines by Payment Method</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-brand-surface/60 border border-border-light">
              <span className="font-bold text-text-main block">bKash & Nagad</span>
              <span className="text-brand font-black text-sm block mt-0.5">24 – 48 Hours</span>
              <span className="text-[11px] text-text-muted">Instant mobile wallet transfer</span>
            </div>
            <div className="p-3 rounded-lg bg-brand-surface/60 border border-border-light">
              <span className="font-bold text-text-main block">Cash on Delivery (COD)</span>
              <span className="text-brand font-black text-sm block mt-0.5">24 Hours</span>
              <span className="text-[11px] text-text-muted">Transferred via bKash/Nagad or bank</span>
            </div>
            <div className="p-3 rounded-lg bg-brand-surface/60 border border-border-light">
              <span className="font-bold text-text-main block">Credit / Debit Cards</span>
              <span className="text-brand font-black text-sm block mt-0.5">5 – 7 Business Days</span>
              <span className="text-[11px] text-text-muted">Subject to issuing bank schedules</span>
            </div>
          </div>
        </div>

        {/* Submit Return CTA */}
        <div className="bg-white rounded-xl border border-border-light p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div>
            <h4 className="text-xs font-bold text-text-main">Ready to file an order return?</h4>
            <p className="text-[11px] text-text-muted mt-0.5">
              Have your Order ID and photos of the package ready to initiate your request.
            </p>
          </div>
          <Link
            href="/returns"
            className="shrink-0 px-4 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            Start Return Request →
          </Link>
        </div>
      </div>
    </div>
  );
}

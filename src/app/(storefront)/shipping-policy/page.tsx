"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Shipping Policy</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand" />
            <span>Shipping & Delivery Policy</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Transparent shipping fees, delivery timelines, and courier standards across Bangladesh.
          </p>
        </div>

        {/* Delivery Rates & Timelines Table Card */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs mb-4">
          <h2 className="text-xs sm:text-sm font-bold text-text-main mb-3">
            Nationwide Delivery Schedule & Rates
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border-light bg-brand-surface/60 text-text-main">
                  <th className="py-2 px-3 font-bold">Coverage Zone</th>
                  <th className="py-2 px-3 font-bold">Standard Fee</th>
                  <th className="py-2 px-3 font-bold">Estimated Delivery Time</th>
                  <th className="py-2 px-3 font-bold">Payment Methods</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-text-muted">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-text-main">
                    Inside Dhaka City
                  </td>
                  <td className="py-2.5 px-3 font-bold text-brand">৳60</td>
                  <td className="py-2.5 px-3">24 to 48 Hours</td>
                  <td className="py-2.5 px-3">COD, bKash, Nagad, Cards</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-text-main">
                    Dhaka Suburbs (Gazipur, Savar, Narayanganj, Keraniganj)
                  </td>
                  <td className="py-2.5 px-3 font-bold text-brand">৳100</td>
                  <td className="py-2.5 px-3">48 to 72 Hours</td>
                  <td className="py-2.5 px-3">COD, bKash, Nagad, Cards</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-text-main">
                    Outside Dhaka (All 64 Districts)
                  </td>
                  <td className="py-2.5 px-3 font-bold text-brand">৳120</td>
                  <td className="py-2.5 px-3">3 to 5 Business Days</td>
                  <td className="py-2.5 px-3">COD, bKash, Nagad, Cards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Essential Delivery Rules (Compact Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <Clock className="w-4 h-4 text-brand mb-1.5" />
            <h3 className="text-xs font-bold text-text-main mb-1">Same-Day Dispatch</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Orders confirmed before 2:00 PM are processed and handed over to logistics partners the very same afternoon.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <MapPin className="w-4 h-4 text-brand mb-1.5" />
            <h3 className="text-xs font-bold text-text-main mb-1">Live Parcel Tracking</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Track parcel location, rider assignment, and estimated delivery milestones via SMS or our online tracking tool.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-brand mb-1.5" />
            <h3 className="text-xs font-bold text-text-main mb-1">Tamper-Proof Seals</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              All delicate electronics and fashion items are wrapped in multi-layer bubble wrap with official eShopBD security tape.
            </p>
          </div>
        </div>

        {/* Courier Partners & Order Inspection */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs space-y-2 text-xs text-text-muted leading-relaxed">
          <h3 className="font-bold text-text-main text-xs sm:text-sm">
            Parcel Acceptance & Open-Box Verification
          </h3>
          <p>
            We advise all customers to inspect the outer shipping package before signing the delivery receipt. If the outer carton is visibly punctured, crushed, or unsealed, please record an unboxing video or notify the rider immediately. For any issues, contact our support line at 09678 123 456.
          </p>
        </div>

        {/* Quick Link to Track Order */}
        <div className="mt-4 p-3 bg-brand-light/50 border border-brand/20 rounded-xl text-xs flex items-center justify-between">
          <span className="text-text-muted">Already placed an order? Track its journey:</span>
          <Link href="/track-order" className="font-bold text-brand hover:underline">
            Go to Track Order →
          </Link>
        </div>
      </div>
    </div>
  );
}

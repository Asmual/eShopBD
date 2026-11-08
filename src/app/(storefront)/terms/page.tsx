"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Terms & Conditions</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand" />
            <span>Terms and Conditions</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Effective Date: October 2026 • Please read these terms carefully before using eShopBD.
          </p>
        </div>

        {/* Structured Legal Content Cards */}
        <div className="space-y-3 text-xs text-text-muted leading-relaxed">
          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, registering, or placing an order on eShopBD (referred to as "we", "our", or "the Platform"), you agree to be legally bound by these Terms and Conditions, our Privacy Policy, and our Return Policy. If you do not accept these terms, please discontinue using the platform.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              2. User Account & Security
            </h2>
            <p>
              You must provide accurate and verifiable information during registration. You are solely responsible for maintaining the confidentiality of your account credentials and one-time verification codes (OTP). Any activity originating from your registered account is deemed your responsibility.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              3. Pricing, Product Accuracy & Inventory
            </h2>
            <p>
              While eShopBD and its verified vendors strive to provide precise descriptions, specifications, and pricing, technical errors may occasionally occur. In the rare event of a pricing typographical discrepancy, we reserve the right to cancel or revise the affected order prior to dispatch with immediate customer notification.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              4. Payment & Order Processing
            </h2>
            <p>
              We support Cash on Delivery (COD), Mobile Financial Services (bKash, Nagad), and debit/credit cards. For Cash on Delivery orders, customers agree to inspect the external shipping package and pay the delivery rider the exact invoiced amount upon parcel receipt.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              5. Shipping, Delivery & Inspection
            </h2>
            <p>
              Parcels are dispatched through verified logistics carriers. Standard delivery times are 24–48 hours in Dhaka metro and 3–5 days nationwide. Risk of loss passes to the customer once the package is delivered and accepted at the designated destination.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              6. Marketplace Vendor Operations
            </h2>
            <p>
              eShopBD operates as a curated multi-vendor marketplace connecting consumers with vetted suppliers. While all merchants sign quality assurance charters, individual warranties on electronic goods are honored by the respective authorized service centers as detailed on product warranty cards.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-text-main mb-1.5">
              7. Governing Law & Dispute Resolution
            </h2>
            <p>
              These terms are governed by and construed in accordance with the Laws of the People&apos;s Republic of Bangladesh. Any dispute arising out of or in connection with the platform shall be settled amicably through eShopBD customer grievance channels or through the competent courts of Dhaka.
            </p>
          </div>
        </div>

        {/* Footer Support Prompt */}
        <div className="mt-4 p-3 bg-brand-light/50 border border-brand/20 rounded-xl text-xs text-text-muted flex items-center justify-between">
          <span>Questions regarding these legal terms?</span>
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Contact Legal Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}

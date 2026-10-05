import React from "react";
import SellerOnboardingForm from "@/features/seller/components/SellerOnboardingForm";

export default function BecomeSellerPage() {
  return (
    <div className="w-full py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <span className="px-3.5 py-1 bg-brand-light text-brand text-xs font-bold rounded-full uppercase tracking-wider">
          Marketplace Partner Program
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-3 tracking-tight">
          Sell to Millions of Customers on eShopBD
        </h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl mx-auto">
          Start your multi-vendor ecommerce journey with transparent commission rates,
          automated order splitting, and rapid bi-weekly bank payouts.
        </p>
      </div>

      <SellerOnboardingForm />
    </div>
  );
}

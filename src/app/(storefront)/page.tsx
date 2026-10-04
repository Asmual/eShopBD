import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-surface p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-border-light p-6 space-y-4 text-center">
        <div className="inline-block px-3 py-1 bg-brand-light text-brand text-xs font-semibold rounded-full">
          Theme Verification
        </div>

        <h1 className="text-2xl font-bold text-text-main">
          eShopBD Color System
        </h1>

        <p className="text-sm text-text-muted">
          Deep Emerald Green primary color paired with soft warm beige banner backgrounds.
        </p>

        <div className="p-4 bg-brand-banner rounded-xl text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-main">Banner Surface</span>
            <span className="px-2 py-0.5 bg-brand-accent text-white text-[11px] font-semibold rounded">
              30% OFF
            </span>
          </div>
          <p className="text-xs text-text-muted">
            Warm beige background container for hero promotions.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Shop Now
          </button>
          <button
            type="button"
            className="px-5 py-2.5 border border-border-light text-text-main hover:bg-brand-light hover:text-brand text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

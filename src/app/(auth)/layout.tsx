import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-surface relative flex flex-col justify-between overflow-x-hidden">
      {/* Ambient background decoration */}
      <div
        className="absolute top-0 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-40 w-96 h-96 bg-brand-banner/70 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-hidden"
          aria-label="Back to eShopBD Home"
        >
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-xs group-hover:bg-brand-hover transition-colors">
            <svg
              className="w-5 h-5 transform transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-text-main flex items-center leading-none">
              eShop<span className="text-brand">BD</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mt-0.5">
              Secure Auth
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-brand bg-white border border-border-light rounded-lg shadow-2xs hover:border-brand/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Bottom Footer Copyright */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-text-muted border-t border-border-light/60 bg-white/50 backdrop-blur-xs">
        <p>&copy; {new Date().getFullYear()} eShopBD Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/common/Logo";

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
        <Logo size="md" />

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

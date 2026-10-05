"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthMode } from "../types";

interface AuthCardProps {
  initialMode?: AuthMode;
}

export default function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const router = useRouter();

  const handleSwitchToRegister = () => {
    setMode("register");
    window.history.replaceState(null, "", "/register");
  };

  const handleSwitchToLogin = () => {
    setMode("login");
    window.history.replaceState(null, "", "/login");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mobile Mode Switcher (Visible on small screens) */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-white border border-border-light rounded-2xl mb-4 max-w-xs mx-auto shadow-2xs">
        <button
          type="button"
          onClick={handleSwitchToLogin}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            mode === "login"
              ? "bg-brand text-white shadow-xs"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={handleSwitchToRegister}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            mode === "register"
              ? "bg-brand text-white shadow-xs"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          Register
        </button>
      </div>

      {/* Main Sliding Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] bg-white rounded-3xl shadow-xl border border-border-light overflow-hidden">
        {/* Desktop Sliding Split Panels */}
        <div className="hidden lg:grid grid-cols-2 h-full min-h-[640px]">
          {/* Left Form Area (Always renders RegisterForm when mode is register) */}
          <div
            className={`h-full flex items-center justify-center transition-opacity duration-500 ${
              mode === "register" ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
          </div>

          {/* Right Form Area (Always renders LoginForm when mode is login) */}
          <div
            className={`h-full flex items-center justify-center transition-opacity duration-500 ${
              mode === "login" ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <LoginForm onSwitchToRegister={handleSwitchToRegister} />
          </div>
        </div>

        {/* Sliding Visual Banner Overlay (Desktop) */}
        <div
          className={`hidden lg:block absolute top-0 bottom-0 w-1/2 transition-transform duration-700 ease-in-out z-20 ${
            mode === "login"
              ? "translate-x-0 left-0"
              : "translate-x-full left-0"
          }`}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl">
            {/* Background Image */}
            <Image
              src={
                mode === "login"
                  ? "/images/auth/auth-banner.jpg"
                  : "/images/auth/auth-banner-signup.jpg"
              }
              alt="eShopBD Shopping Experience"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transform scale-105 transition-transform duration-700"
              priority
            />

            {/* Gradient Overlay Matching Brand Emerald Green */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/90 via-brand/80 to-brand-hover/95 backdrop-blur-[1px]" />

            {/* Overlay Content */}
            <div className="relative z-10 h-full p-10 flex flex-col justify-between text-white select-none">
              {/* Top Brand Sparkle */}
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/15 rounded-lg backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-white/90">
                  eShopBD Experience
                </span>
              </div>

              {/* Middle Dynamic Content based on Active Mode */}
              <div className="space-y-4 my-auto">
                {mode === "login" ? (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-3">
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs">
                      Exclusive Deals & Fast Shipping
                    </span>
                    <h3 className="text-3xl font-black tracking-tight leading-tight">
                      New to eShopBD?
                    </h3>
                    <p className="text-sm text-white/85 leading-relaxed font-normal max-w-sm">
                      Create an account today to discover millions of authentic items,
                      track multi-vendor deliveries, and claim exclusive vouchers.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSwitchToRegister}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-brand transition-all cursor-pointer shadow-md hover:gap-3"
                      >
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-3">
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs">
                      Welcome Back Shopper
                    </span>
                    <h3 className="text-3xl font-black tracking-tight leading-tight">
                      Already a Member?
                    </h3>
                    <p className="text-sm text-white/85 leading-relaxed font-normal max-w-sm">
                      Sign in with your verified credentials to access your saved cart,
                      vendor communications, and recent order history.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSwitchToLogin}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-brand transition-all cursor-pointer shadow-md hover:gap-3"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Sign In</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Trust Indicators */}
              <div className="pt-6 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>100% Secure Payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-300" />
                  <span>Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Active Form (Renders whichever is active) */}
        <div className="lg:hidden p-2 sm:p-4">
          {mode === "login" ? (
            <LoginForm onSwitchToRegister={handleSwitchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

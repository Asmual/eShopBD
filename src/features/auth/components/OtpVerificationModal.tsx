"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, ArrowRight, RefreshCw, X, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  name: string;
  onSuccess: () => void;
  onCancel: () => void;
  onResendOtp: () => Promise<boolean>;
  onVerifyOtp: (otp: string) => Promise<boolean>;
}

export default function OtpVerificationModal({
  isOpen,
  email,
  name,
  onSuccess,
  onCancel,
  onResendOtp,
  onVerifyOtp,
}: OtpVerificationModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setDigits(["", "", "", "", "", ""]);
      setCountdown(60);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Countdown timer for resending
  useEffect(() => {
    if (!isOpen || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  const handleChange = (index: number, val: string) => {
    // Only allow digits
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Single digit input
    const char = cleaned.slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);

    // Auto-focus next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const next = [...digits];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || "";
    }
    setDigits(next);

    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otp = digits.join("");
    if (otp.length < 6) {
      toast.error("অনুগ্রহ করে ৬ ডিজিটের সম্পূর্ণ ওটিপি কোডটি লিখুন।");
      return;
    }

    setIsVerifying(true);
    try {
      const success = await onVerifyOtp(otp);
      if (success) {
        onSuccess();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);
    try {
      const sent = await onResendOtp();
      if (sent) {
        setCountdown(60);
        setDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border-light overflow-hidden p-6 sm:p-7 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand mb-4 shadow-xs">
          <Mail className="w-7 h-7" />
        </div>

        {/* Title & Email */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ইমেইল ভেরিফিকেশন</span>
        </div>
        <h3 className="text-xl font-bold text-text-main tracking-tight">
          ভেরিফিকেশন কোড লিখুন
        </h3>
        <p className="text-xs text-text-muted mt-1.5 leading-relaxed px-2">
          প্রিয় <strong className="text-text-main">{name || "সম্মানিত গ্রাহক"}</strong>, আমরা একটি ৬ ডিজিটের ভেরিফিকেশন কোড পাঠিয়েছি:
        </p>
        <p className="text-xs font-semibold text-brand mt-0.5 break-all">
          {email}
        </p>

        {/* 6 Digit Inputs */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center gap-2 sm:gap-2.5 mb-5">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border bg-gray-50/50 text-text-main focus:bg-white focus:outline-hidden transition-all shadow-2xs ${
                  digit
                    ? "border-brand ring-1 ring-brand bg-white"
                    : "border-border-light focus:border-brand focus:ring-1 focus:ring-brand"
                }`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying || digits.join("").length < 6}
            className="w-full py-3 px-4 bg-brand hover:bg-brand-hover text-white rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>ভেরিফাই ও সম্পন্ন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Resend & Timer */}
        <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between text-xs text-text-muted">
          <button
            type="button"
            onClick={onCancel}
            className="hover:text-text-main cursor-pointer"
          >
            ইমেইল ভুল? পরিবর্তন করুন
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
            className={`font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors ${
              countdown > 0
                ? "text-text-muted cursor-not-allowed opacity-60"
                : "text-brand hover:underline"
            }`}
          >
            {isResending ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : null}
            <span>
              {countdown > 0 ? `পুনরায় পাঠান (${countdown}s)` : "কোড পাননি? পুনরায় পাঠান"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

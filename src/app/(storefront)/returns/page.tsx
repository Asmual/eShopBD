"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ReturnsPage() {
  const [formData, setFormData] = useState({
    orderId: "",
    phone: "",
    email: "",
    reason: "Defective or damaged product",
    preferredResolution: "Replacement",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orderId.trim() || !formData.phone.trim() || !formData.details.trim()) {
      toast.error("Please fill in Order ID, Phone number, and Details.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = "RET-" + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket(ticketId);
      toast.success(`Return request submitted! Ticket #${ticketId}`);
    }, 700);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/return-policy" className="hover:text-brand transition-colors">
            Return Policy
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Order Returns</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand" />
            <span>Submit a Return or Replacement Request</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Eligible within 7 days of package delivery for damaged, defective, or incorrect items.
          </p>
        </div>

        {submittedTicket ? (
          <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-2xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-text-main">
              Return Request Received Successfully
            </h2>
            <div className="p-3 bg-brand-surface/60 rounded-xl max-w-sm mx-auto text-xs space-y-1">
              <p className="text-text-muted">Reference Return Ticket ID:</p>
              <p className="font-mono text-sm font-black text-brand">{submittedTicket}</p>
              <p className="text-[11px] text-text-muted">Order ID: {formData.orderId}</p>
            </div>
            <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
              Our quality verification team will review your claim and reach out via phone ({formData.phone}) within 24 hours to schedule rider pickup.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-text-main text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
              <Link
                href="/customer/orders"
                className="px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-colors"
              >
                View My Orders
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Order ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BD-98241"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Registered Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01711223344"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Reason for Return *
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand bg-white"
                  >
                    <option>Defective or damaged product</option>
                    <option>Wrong item or color delivered</option>
                    <option>Incorrect size / fit issue</option>
                    <option>Missing parts or accessories</option>
                    <option>Product significantly not as described</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-text-main mb-1">
                  Preferred Resolution
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border-light cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="resolution"
                      value="Replacement"
                      checked={formData.preferredResolution === "Replacement"}
                      onChange={(e) => setFormData({ ...formData, preferredResolution: e.target.value })}
                      className="text-brand focus:ring-brand"
                    />
                    <span className="font-medium text-text-main">Direct Replacement</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border-light cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="resolution"
                      value="Refund"
                      checked={formData.preferredResolution === "Refund"}
                      onChange={(e) => setFormData({ ...formData, preferredResolution: e.target.value })}
                      className="text-brand focus:ring-brand"
                    />
                    <span className="font-medium text-text-main">Full Monetary Refund</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-text-main mb-1">
                  Describe Issue Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain exactly what is wrong or damaged with the product..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand"
                />
              </div>

              <div className="p-3 bg-brand-surface/70 rounded-lg border border-border-light flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-brand" />
                  <span>Attach unboxing photos / video proof via WhatsApp after submission</span>
                </span>
                <span className="text-[11px] text-brand font-bold">09678 123 456</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Return Claim"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Status & Tracking",
    orderId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your inquiry has been submitted. Ticket ID #BD-" + Math.floor(10000 + Math.random() * 90000));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Order Status & Tracking",
        orderId: "",
        message: "",
      });
    }, 700);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Contact Us</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight">
            Contact Support & Inquiries
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Reach out for customer assistance, delivery inquiries, or merchant partnership questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Contact Details Cards (Span 4) */}
          <div className="lg:col-span-4 space-y-2.5">
            {/* Phone */}
            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-main">Phone Support</h3>
                  <a
                    href="tel:+8809678123456"
                    className="text-xs font-semibold text-brand hover:underline mt-0.5 block"
                  >
                    09678 123 456
                  </a>
                  <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> 9:00 AM – 10:00 PM (Daily)
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-main">Email Support</h3>
                  <a
                    href="mailto:support@eshopbd.com"
                    className="text-xs font-semibold text-brand hover:underline mt-0.5 block"
                  >
                    support@eshopbd.com
                  </a>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Replies within 24 business hours
                  </p>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-main">Corporate Headquarters</h3>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    House-23, Road-12, Dhanmondi, Dhaka-1209, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Help Center Quick Links */}
            <div className="bg-brand-light/60 rounded-xl border border-brand/20 p-3.5">
              <h3 className="text-xs font-bold text-text-main flex items-center gap-1.5 mb-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-brand" />
                <span>Quick Self-Help</span>
              </h3>
              <ul className="text-xs space-y-1 text-text-muted">
                <li>
                  <Link href="/track-order" className="hover:text-brand font-medium">
                    → Track your active parcel
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-brand font-medium">
                    → Return & refund guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-brand font-medium">
                    → Frequently asked questions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form Card (Span 8) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 shadow-2xs">
              <h2 className="text-sm font-bold text-text-main mb-3">
                Send Us a Direct Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-text-main mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-text-main mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-text-main mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 01711223344"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-text-main mb-1">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BD-98241"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-8.5 px-3 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand bg-white"
                  >
                    <option>Order Status & Tracking</option>
                    <option>Return & Refund Request</option>
                    <option>Product Inquiries & Availability</option>
                    <option>Payment & Invoicing Issue</option>
                    <option>Merchant & Seller Partnership</option>
                    <option>Other Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-main mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry clearly so our support team can assist you quickly..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

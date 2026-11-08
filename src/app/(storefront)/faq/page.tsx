"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Search,
  HelpCircle,
  Phone,
  Mail,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "orders" | "shipping" | "payments" | "returns" | "account";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "f-1",
    category: "orders",
    question: "How do I place an order on eShopBD?",
    answer:
      "Simply browse or search for your desired product, select any size/color variant, and click 'Add to Cart' or 'Buy Now'. Proceed to checkout, specify your delivery address and payment preference (Cash on Delivery, bKash, Nagad, or Card), and confirm the order.",
  },
  {
    id: "f-2",
    category: "orders",
    question: "Can I modify or cancel an order after placing it?",
    answer:
      "You can cancel your order before it changes to 'Processing' or 'Dispatched' status directly from your Customer Orders dashboard or by calling our support hotline at 09678 123 456.",
  },
  {
    id: "f-3",
    category: "shipping",
    question: "What are your delivery charges and delivery times?",
    answer:
      "Delivery inside Dhaka city is ৳60 (typically delivered in 24–48 hours). Delivery to Dhaka suburbs is ৳100 (48–72 hours), and outside Dhaka across all 64 districts is ৳120 (3–5 business days).",
  },
  {
    id: "f-4",
    category: "shipping",
    question: "How can I track my shipment in real-time?",
    answer:
      "Visit our 'Track Order' page from the top navigation and enter your Order ID (e.g. BD-98241) or phone number to view real-time parcel updates.",
  },
  {
    id: "f-5",
    category: "payments",
    question: "What payment methods are supported?",
    answer:
      "We support Cash on Delivery (COD) across all 64 districts, Mobile Financial Services including bKash and Nagad, as well as Visa, Mastercard, and Amex credit/debit cards.",
  },
  {
    id: "f-6",
    category: "payments",
    question: "Is online payment on eShopBD secure?",
    answer:
      "Yes. All payment transactions are encrypted using 256-bit SSL protocols and processed through licensed Bangladesh Bank authorized payment gateways. We never store your full card number or PIN.",
  },
  {
    id: "f-7",
    category: "returns",
    question: "What is the return and refund policy?",
    answer:
      "We provide a 7-day hassle-free return window for any defective, damaged, or mismatched products. Submit a return request from the 'Order Returns' page, and our courier will collect the item.",
  },
  {
    id: "f-8",
    category: "returns",
    question: "How long does it take to receive a refund?",
    answer:
      "Once the returned item passes quality verification at our fulfillment hub, bKash/Nagad refunds are processed within 24–48 hours. Card refunds typically take 5–7 business days depending on your bank.",
  },
  {
    id: "f-9",
    category: "account",
    question: "Do I need an account to make a purchase?",
    answer:
      "While you can browse freely, creating an account helps you track parcel shipments, access exclusive coupons, and manage saved delivery addresses.",
  },
  {
    id: "f-10",
    category: "account",
    question: "How does the 6-digit email OTP verification work?",
    answer:
      "When signing up or resetting your password, eShopBD dispatches a one-time 6-digit verification code to your email inbox via Resend. Enter this code within 10 minutes to verify your identity.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "orders", label: "Orders" },
  { id: "shipping", label: "Shipping & Delivery" },
  { id: "payments", label: "Payments" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "account", label: "Account & Security" },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("f-1");

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">FAQ</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Find answers to common questions about orders, payments, delivery, and returns.
          </p>
        </div>

        {/* Compact Search & Category Pills */}
        <div className="space-y-2.5 mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. delivery, bKash, return, OTP)..."
              className="w-full h-9 pl-9 pr-3.5 text-xs rounded-xl bg-white border border-border-light focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand shadow-2xs"
            />
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand text-white shadow-2xs"
                    : "bg-white text-text-muted hover:text-text-main border border-border-light"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2 mb-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-border-light shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-gray-50/60 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-[13px] font-bold text-text-main">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 pt-0 border-t border-border-light/40 text-xs text-text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-border-light p-6 text-center shadow-2xs">
              <HelpCircle className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-60" />
              <p className="text-xs font-semibold text-text-main">No questions found</p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Try searching with different terms or select 'All Questions'.
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help Compact Card */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-text-main">Still have unanswered questions?</h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Our customer happiness team is available daily from 9:00 AM to 10:00 PM.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+8809678123456"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light text-brand text-xs font-semibold rounded-lg hover:bg-brand hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-hover transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

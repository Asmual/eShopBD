"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ChevronRight,
  MapPin,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const CHECKOUT_ITEMS = [
  {
    id: "item-1",
    name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
    price: 4950,
    quantity: 1,
    image: "/images/products/electronics/electronics-8.jpg",
    variant: "Forest Green",
  },
  {
    id: "item-2",
    name: "Premium Embroidered Traditional Kurti Set",
    price: 2150,
    quantity: 2,
    image: "/images/categories/category-women.jpg",
    variant: "Size: L | Red",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliverySpeed, setDeliverySpeed] = useState("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Mohammad Rahman",
    phone: "01712345678",
    email: "mohammad.rahman@example.com",
    city: "Dhaka",
    address: "House 42, Road 11, Banani, Dhaka-1213",
    notes: "Please call before arrival.",
  });

  const subtotal = CHECKOUT_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = deliverySpeed === "express" ? 120 : 60;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill in all required delivery fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      toast.success("Order #BD-98241 placed successfully!");
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="w-full bg-brand-surface/40 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl border border-border-light p-6 sm:p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-brand-light text-brand flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-3 py-1 rounded-full bg-brand-light inline-block mb-2">
            Order Confirmed
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-text-main mb-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs text-text-muted mb-4 leading-relaxed">
            Your order <strong className="text-text-main font-mono">#BD-98241</strong> has been successfully placed. We&apos;ve sent a confirmation SMS to <span className="font-semibold">{formData.phone}</span>.
          </p>

          <div className="bg-gray-50 rounded-xl p-3.5 border border-border-light/70 text-left text-xs space-y-1.5 mb-6">
            <div className="flex justify-between">
              <span className="text-text-muted">Payment:</span>
              <span className="font-bold text-text-main uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Amount Due:</span>
              <span className="font-bold text-brand">৳{grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Delivery Address:</span>
              <span className="font-medium text-text-main text-right truncate max-w-[200px]">
                {formData.address}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href="/track-order"
              className="w-full h-11 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Track Your Order</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-text-main text-xs font-bold flex items-center justify-center transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb Header */}
        <div className="flex items-center justify-between py-1.5 mb-4 border-b border-border-light">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-text-muted"
          >
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/cart" className="hover:text-brand transition-colors">
              Cart
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-text-main font-semibold">Secure Checkout</span>
          </nav>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>256-Bit SSL Encrypted</span>
          </span>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left 8 Cols: Delivery & Payment Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Section 1: Delivery Address */}
              <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-text-main mb-4 pb-2 border-b border-border-light">
                  <MapPin className="w-4 h-4 text-brand" />
                  <span>1. Shipping & Delivery Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-text-main block mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-main block mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-main block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-main block mb-1">
                      City / Division <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                    >
                      <option value="Dhaka">Dhaka Division</option>
                      <option value="Chattogram">Chattogram Division</option>
                      <option value="Sylhet">Sylhet Division</option>
                      <option value="Rajshahi">Rajshahi Division</option>
                      <option value="Khulna">Khulna Division</option>
                      <option value="Barishal">Barishal Division</option>
                      <option value="Rangpur">Rangpur Division</option>
                      <option value="Mymensingh">Mymensingh Division</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-text-main block mb-1">
                      Street Address & Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="House, Road, Block, Thana"
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-text-main block mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="e.g. Special delivery timing instructions"
                      className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Speed Option */}
              <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-text-main mb-4 pb-2 border-b border-border-light">
                  <Truck className="w-4 h-4 text-brand" />
                  <span>2. Delivery Speed Options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliverySpeed === "standard"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={deliverySpeed === "standard"}
                        onChange={() => setDeliverySpeed("standard")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block">
                          Standard Delivery
                        </span>
                        <span className="text-[11px] text-text-muted block">
                          2 - 3 business days
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand">৳60</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliverySpeed === "express"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={deliverySpeed === "express"}
                        onChange={() => setDeliverySpeed("express")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block flex items-center gap-1">
                          <span>Express Delivery</span>
                          <span className="text-[9px] bg-brand text-white px-1 py-0.2 rounded font-black">FAST</span>
                        </span>
                        <span className="text-[11px] text-text-muted block">
                          24 - 48 hours (Inside Dhaka)
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand">৳120</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Payment Method Selector */}
              <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-text-main mb-4 pb-2 border-b border-border-light">
                  <CreditCard className="w-4 h-4 text-brand" />
                  <span>3. Payment Method</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block flex items-center gap-1.5">
                          <Banknote className="w-3.5 h-3.5 text-brand" />
                          Cash On Delivery (COD)
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Pay cash upon receiving products
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* bKash */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "bkash"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block">
                          bKash Instant Gateway
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Fast & secure mobile payment
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                      bKash
                    </span>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "nagad"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "nagad"}
                        onChange={() => setPaymentMethod("nagad")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block">
                          Nagad Payment
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Official Nagad checkout
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                      Nagad
                    </span>
                  </label>

                  {/* Cards */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-brand bg-brand-light/30 ring-1 ring-brand"
                        : "border-border-light hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-brand focus:ring-brand"
                      />
                      <div>
                        <span className="text-xs font-bold text-text-main block">
                          Debit / Credit Card
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Visa, Mastercard, AMEX
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      Cards
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Review & Confirmation */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
                <h2 className="text-base font-bold text-text-main border-b border-border-light pb-3 mb-4">
                  Order Review ({CHECKOUT_ITEMS.length} Items)
                </h2>

                {/* Items Summary */}
                <div className="divide-y divide-border-light/60 mb-4">
                  {CHECKOUT_ITEMS.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-border-light">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-text-main truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-text-muted block">
                          Qty: {item.quantity} • {item.variant}
                        </span>
                      </div>
                      <span className="text-xs font-black text-text-main">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Calculation */}
                <div className="space-y-2 text-xs text-text-muted border-t border-border-light/60 pt-3">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-text-main">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge ({deliverySpeed})</span>
                    <span className="font-bold text-text-main">
                      ৳{shippingFee}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border-light mt-4 pt-3.5 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-text-main">Grand Total</span>
                  <span className="text-xl font-black text-brand">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 w-full h-11 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Place Order Now</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-text-muted text-center mt-3">
                  By clicking Place Order, you agree to our Terms and Return Policy.
                </p>
              </div>

              {/* Guarantees */}
              <div className="bg-white rounded-2xl border border-border-light p-4 space-y-2.5 text-xs text-text-muted shadow-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <span>100% Guaranteed Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand shrink-0" />
                  <span>Trackable Parcel via SMS & Web</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

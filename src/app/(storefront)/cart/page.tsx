"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Tag,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  variant?: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "cart-1",
    name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
    category: "Electronics",
    image: "/images/products/electronics/electronics-8.jpg",
    price: 4950,
    originalPrice: 6200,
    quantity: 1,
    variant: "Forest Green",
  },
  {
    id: "cart-2",
    name: "Premium Embroidered Traditional Kurti Set",
    category: "Women's Fashion",
    image: "/images/categories/category-women.jpg",
    price: 2150,
    originalPrice: 2850,
    quantity: 2,
    variant: "Size: L | Red Embroidered",
  },
  {
    id: "cart-3",
    name: "45W Super Fast PD Type-C Wall Charger with 3M Cable",
    category: "Electronics",
    image: "/images/products/electronics/electronics-4.jpg",
    price: 1150,
    originalPrice: 1650,
    quantity: 1,
    variant: "Matte Black (3 Meter)",
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemove = (id: string, name: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`${name.slice(0, 20)} removed from cart`);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "FIRST15") {
      setAppliedDiscount(15);
      toast.success("Coupon 'FIRST15' applied! (15% OFF)");
    } else if (couponCode.toUpperCase() === "ESHOPBD20") {
      setAppliedDiscount(20);
      toast.success("Coupon 'ESHOPBD20' applied! (20% OFF)");
    } else {
      toast.error("Invalid coupon code. Try 'FIRST15' or 'ESHOPBD20'");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shippingFee = subtotal > 3000 || items.length === 0 ? 0 : 80;
  const grandTotal = subtotal - discountAmount + shippingFee;

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
            <span className="text-text-main font-semibold">Shopping Cart</span>
          </nav>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand">
            {items.length} {items.length === 1 ? "Item" : "Items"} in Cart
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left 8 Cols: Cart Items List */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-2xs">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50/80 border-b border-border-light text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-border-light/60">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:px-5 sm:py-4 flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="w-full sm:col-span-6 flex items-center gap-3">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-border-light/70">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block truncate">
                            {item.category}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-text-main line-clamp-2 leading-snug">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <span className="text-[11px] text-text-muted block mt-0.5">
                              {item.variant}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id, item.name)}
                            className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 font-semibold mt-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="w-full sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <span className="sm:hidden text-xs text-text-muted">Unit Price:</span>
                        <div className="text-right sm:text-center">
                          <span className="text-xs sm:text-sm font-bold text-text-main block">
                            ৳{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-[10px] text-text-muted line-through block">
                              ৳{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="w-full sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <span className="sm:hidden text-xs text-text-muted">Quantity:</span>
                        <div className="inline-flex items-center rounded-lg border border-border-light bg-gray-50/70 p-0.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-text-main">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Line Subtotal */}
                      <div className="w-full sm:col-span-2 flex justify-between sm:justify-end items-center">
                        <span className="sm:hidden text-xs text-text-muted">Total:</span>
                        <span className="text-sm font-black text-brand">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping Button */}
              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/products"
                  className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1"
                >
                  <span>← Continue Shopping</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setItems([]);
                    toast.success("Cart cleared");
                  }}
                  className="text-xs text-text-muted hover:text-red-500 font-semibold cursor-pointer"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Checkout Drawer */}
            <div className="lg:col-span-4 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
                <h2 className="text-base font-bold text-text-main border-b border-border-light pb-3 mb-4">
                  Order Summary
                </h2>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="mb-4">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1.5">
                    Have a coupon code?
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. FIRST15"
                        className="w-full h-9 pl-8 pr-3 text-xs bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand uppercase placeholder:normal-case font-mono"
                      />
                      <Tag className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="h-9 px-4 rounded-lg bg-text-main hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedDiscount > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
                      ✓ {appliedDiscount}% discount applied!
                    </span>
                  )}
                </form>

                {/* Calculation Rows */}
                <div className="space-y-2.5 text-xs text-text-muted border-t border-border-light/60 pt-3.5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-text-main">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({appliedDiscount}%)</span>
                      <span className="font-bold">
                        -৳{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-text-main">
                      {shippingFee === 0 ? (
                        <span className="text-brand font-black">FREE</span>
                      ) : (
                        `৳${shippingFee}`
                      )}
                    </span>
                  </div>

                  {subtotal < 3000 && (
                    <p className="text-[10px] text-text-muted bg-gray-50 p-2 rounded-lg border border-border-light/50">
                      Add ৳{(3000 - subtotal).toLocaleString()} more to qualify for Free Shipping!
                    </p>
                  )}
                </div>

                {/* Grand Total */}
                <div className="border-t border-border-light mt-4 pt-4 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-text-main">Grand Total</span>
                  <span className="text-xl font-black text-brand">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="mt-5 w-full h-11 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl border border-border-light p-4 space-y-3 text-xs text-text-muted shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <span>100% Secure Checkout Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-brand shrink-0" />
                  <span>Fast Dispatch across all 64 districts</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-brand shrink-0" />
                  <span>7-Day Hassle-Free Replacement Policy</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl border border-border-light p-10 sm:p-16 text-center max-w-lg mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-brand-light text-brand flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-text-main mb-1">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-xs text-text-muted mb-6">
              Looks like you haven&apos;t added any items to your cart yet. Explore thousands of verified products from top categories!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

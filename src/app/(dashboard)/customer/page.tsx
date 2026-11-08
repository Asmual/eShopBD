"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Truck,
  Heart,
  RotateCcw,
  MapPin,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Mail,
  Phone,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function CustomerProfilePage() {
  const { data: session } = useSession();

  const userDisplayName = session?.user?.name || "Valued Shopper";
  const userEmail = session?.user?.email || "customer@eshopbd.com";

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-3 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">My Account</span>
        </div>

        {/* Profile Card Header (Moderate Title & Density) */}
        <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-light text-brand flex items-center justify-center font-black text-lg uppercase shadow-2xs">
              {userDisplayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-text-main">
                  {userDisplayName}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 flex items-center gap-2">
                <span>{userEmail}</span>
                <span>•</span>
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <Link
              href="/customer/orders"
              className="px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-hover transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>My Orders</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="p-1.5 text-text-muted hover:text-red-500 rounded-lg border border-border-light hover:bg-red-50 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Account Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <Link
            href="/customer/orders"
            className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs hover:border-brand/40 transition-colors"
          >
            <span className="text-[11px] font-bold text-text-muted uppercase block">
              Total Purchases
            </span>
            <span className="text-lg sm:text-xl font-bold text-text-main mt-0.5 block">
              3 Orders
            </span>
            <span className="text-[11px] text-brand font-semibold flex items-center gap-1 mt-1">
              View History →
            </span>
          </Link>

          <Link
            href="/track-order"
            className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs hover:border-brand/40 transition-colors"
          >
            <span className="text-[11px] font-bold text-text-muted uppercase block">
              Active Shipments
            </span>
            <span className="text-lg sm:text-xl font-bold text-emerald-700 mt-0.5 block">
              1 In Transit
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              Track Parcel →
            </span>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs hover:border-brand/40 transition-colors"
          >
            <span className="text-[11px] font-bold text-text-muted uppercase block">
              Saved Items
            </span>
            <span className="text-lg sm:text-xl font-bold text-text-main mt-0.5 block">
              3 Products
            </span>
            <span className="text-[11px] text-brand font-semibold flex items-center gap-1 mt-1">
              View Wishlist →
            </span>
          </Link>

          <Link
            href="/returns"
            className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs hover:border-brand/40 transition-colors"
          >
            <span className="text-[11px] font-bold text-text-muted uppercase block">
              Returns & Claims
            </span>
            <span className="text-lg sm:text-xl font-bold text-text-main mt-0.5 block">
              0 Active
            </span>
            <span className="text-[11px] text-text-muted font-semibold flex items-center gap-1 mt-1">
              Request Return →
            </span>
          </Link>
        </div>

        {/* 2 Information Cards: Delivery Address & Recent Order Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Default Shipping Address */}
          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                <span>Primary Delivery Address</span>
              </h2>
              <span className="px-2 py-0.5 rounded bg-brand-light text-brand text-[10px] font-bold">
                Default
              </span>
            </div>

            <div className="text-xs text-text-muted space-y-1">
              <p className="font-bold text-text-main">{userDisplayName}</p>
              <p>House-23, Road-12, Dhanmondi</p>
              <p>Dhaka-1209, Bangladesh</p>
              <p className="pt-1 flex items-center gap-1.5 text-text-main">
                <Phone className="w-3.5 h-3.5 text-brand" />
                <span>+880 1711 223344</span>
              </p>
            </div>
          </div>

          {/* Active Order Snapshot */}
          <div className="bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand" />
                <span>Active Delivery In Progress</span>
              </h2>
              <span className="font-mono text-xs font-bold text-brand">BD-98241</span>
            </div>

            <div className="text-xs text-text-muted space-y-2">
              <p className="text-text-main font-semibold">
                Sony SRS-XB13 Extra Bass Wireless Compact Speaker + 1 other item
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                  Out for Delivery
                </span>
                <Link
                  href="/track-order"
                  className="font-bold text-brand hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Live Track</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

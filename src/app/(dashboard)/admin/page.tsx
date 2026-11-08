"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  CreditCard,
  TrendingUp,
  Package,
  Store,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function AdminOverviewPage() {
  const KPIS = [
    {
      title: "Total Platform Sales",
      value: "৳1,845,000",
      change: "+18.4% this month",
      trend: "up",
    },
    {
      title: "Active Marketplace Vendors",
      value: "128 Sellers",
      change: "4 pending verification",
      trend: "neutral",
    },
    {
      title: "Total Customer Orders",
      value: "3,420 Orders",
      change: "98.2% on-time dispatch",
      trend: "up",
    },
    {
      title: "Platform Net Commission",
      value: "৳147,600",
      change: "Avg. 8.0% take-rate",
      trend: "up",
    },
  ];

  const RECENT_VENDORS = [
    {
      id: "VND-104",
      name: "Apex Tech Gadgets Ltd.",
      owner: "Mohammad Tanvir",
      category: "Electronics",
      date: "Oct 10, 2026",
      status: "Verified",
    },
    {
      id: "VND-128",
      name: "Dhaka Craft Leather Works",
      owner: "Kabir Hossain",
      category: "Fashion Accessories",
      date: "Oct 08, 2026",
      status: "Pending KYC",
    },
    {
      id: "VND-082",
      name: "Heritage Silk & Cotton Mills",
      owner: "Farhana Yasmin",
      category: "Women's Fashion",
      date: "Oct 04, 2026",
      status: "Verified",
    },
  ];

  const RECENT_ORDERS = [
    {
      id: "BD-98241",
      customer: "Farhan Chowdhury",
      items: "2 items",
      amount: "৳7,160",
      status: "Out for Delivery",
      method: "COD",
    },
    {
      id: "BD-94105",
      customer: "Nusrat Jahan",
      items: "1 item",
      amount: "৳2,850",
      status: "Delivered",
      method: "bKash",
    },
    {
      id: "BD-91820",
      customer: "Shahadat Hossain",
      items: "1 item",
      amount: "৳4,200",
      status: "Delivered",
      method: "Visa Card",
    },
  ];

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-3 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Admin Central</span>
        </div>

        {/* Moderate Header & Quick Portal Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand" />
              <span>Platform Administration Console</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Live marketplace health, vendor governance, settlement oversight, and catalog performance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/vendors"
              className="px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-hover transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Vendor Directory</span>
            </Link>
            <Link
              href="/admin/payouts"
              className="px-3 py-1.5 bg-white border border-border-light text-text-main hover:text-brand text-xs font-semibold rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payout Approvals</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {KPIS.map((kpi) => (
            <div
              key={kpi.title}
              className="bg-white rounded-xl border border-border-light p-3.5 shadow-2xs"
            >
              <span className="text-[11px] font-bold text-text-muted uppercase block">
                {kpi.title}
              </span>
              <span className="text-lg sm:text-xl font-bold text-text-main mt-0.5 block">
                {kpi.value}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>{kpi.change}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Columns: Vendors & Orders Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Recent Merchant Registrations (Span 6) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <Store className="w-4 h-4 text-brand" />
                <span>Recent Merchant Registrations</span>
              </h2>
              <Link
                href="/admin/vendors"
                className="text-xs text-brand hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {RECENT_VENDORS.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border-light hover:bg-gray-50/70 transition-colors text-xs"
                >
                  <div>
                    <h3 className="font-bold text-text-main">{v.name}</h3>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {v.owner} • {v.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        v.status === "Verified"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {v.status}
                    </span>
                    <p className="text-[10px] text-text-muted mt-0.5">{v.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Platform Orders (Span 6) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <Package className="w-4 h-4 text-brand" />
                <span>Live Marketplace Orders</span>
              </h2>
              <Link
                href="/track-order"
                className="text-xs text-brand hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>Audit Shipments</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {RECENT_ORDERS.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border-light hover:bg-gray-50/70 transition-colors text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-text-main">{o.id}</span>
                      <span className="text-[11px] text-text-muted">({o.customer})</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {o.items} • {o.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-brand block">{o.amount}</span>
                    <span className="text-[10px] text-text-muted">{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

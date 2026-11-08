"use client";

import React from "react";
import Link from "next/link";
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Settings,
  ChevronRight,
  Plus,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function SellerOverviewPage() {
  const KPIS = [
    {
      title: "Today's Gross Sales",
      value: "৳18,450",
      change: "+12.5% vs yesterday",
    },
    {
      title: "Pending Fulfillment",
      value: "6 Orders",
      change: "2 require urgent dispatch",
    },
    {
      title: "Active Catalog",
      value: "24 Products",
      change: "3 items low in stock",
    },
    {
      title: "Customer Rating",
      value: "4.8 ★",
      change: "Based on 320 reviews",
    },
  ];

  const QUICK_ORDERS = [
    {
      id: "BD-98241",
      customer: "Farhan Chowdhury",
      product: "Sony SRS-XB13 Extra Bass Speaker",
      amount: "৳4,950",
      status: "Ready for Pickup",
    },
    {
      id: "BD-97620",
      customer: "Tanvir Hasan",
      product: "30,000mAh PD 65W Power Bank",
      amount: "৳2,850",
      status: "Processing",
    },
    {
      id: "BD-96114",
      customer: "Sadia Rahman",
      product: "Wireless ANC Bluetooth Headset",
      amount: "৳3,600",
      status: "Processing",
    },
  ];

  const LOW_STOCK_ITEMS = [
    { name: "30,000mAh Ultra-Fast PD Power Bank", stock: 5, sku: "SKU-EL-204" },
    { name: "Fast Wireless Charging Stand 15W", stock: 3, sku: "SKU-EL-119" },
    { name: "Braided USB-C to Lightning Cable", stock: 4, sku: "SKU-EL-402" },
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
          <span className="text-text-main font-semibold">Seller Central</span>
        </div>

        {/* Moderate Header with Store Branding & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight">
                Apex Tech Gadgets Ltd.
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Verified Seller
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Manage your merchant storefront, dispatch orders, and monitor business metrics.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/seller/products"
              className="px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-hover transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products ({24})</span>
            </Link>
            <Link
              href="/seller/orders"
              className="px-3 py-1.5 bg-white border border-border-light text-text-main hover:text-brand text-xs font-semibold rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders ({6})</span>
            </Link>
            <Link
              href="/seller/settings"
              className="px-3 py-1.5 bg-white border border-border-light text-text-main hover:text-brand text-xs font-semibold rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
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
              <span className="text-[11px] text-text-muted mt-1 block">
                {kpi.change}
              </span>
            </div>
          ))}
        </div>

        {/* 2 Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Orders Requiring Dispatch (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand" />
                <span>Orders Awaiting Fulfillment</span>
              </h2>
              <Link
                href="/seller/orders"
                className="text-xs text-brand hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>Manage Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {QUICK_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="p-2.5 rounded-lg border border-border-light hover:bg-gray-50/70 transition-colors text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-text-main">{order.id}</span>
                      <span className="text-[11px] text-text-muted">({order.customer})</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">
                      {order.product}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-brand block">{order.amount}</span>
                    <span className="text-[10px] text-amber-600 font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-border-light p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light">
              <h2 className="text-xs sm:text-sm font-bold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Inventory Low-Stock Alerts</span>
              </h2>
              <Link
                href="/seller/products"
                className="text-xs text-brand hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>Restock</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {LOW_STOCK_ITEMS.map((item) => (
                <div
                  key={item.sku}
                  className="p-2.5 rounded-lg border border-amber-100 bg-amber-50/30 text-xs flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-text-main line-clamp-1">{item.name}</h3>
                    <span className="font-mono text-[10px] text-text-muted">{item.sku}</span>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-md font-bold text-[10px]">
                      {item.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-border-light/60 flex items-center justify-between text-xs">
              <span className="text-text-muted">Need to expand your catalog?</span>
              <Link
                href="/seller/products"
                className="text-brand font-bold hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

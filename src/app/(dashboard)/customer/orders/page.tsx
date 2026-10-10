"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  variant?: string;
}

interface CustomerOrder {
  id: string;
  date: string;
  status: "processing" | "dispatched" | "delivered" | "cancelled";
  statusLabel: string;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  items: OrderItem[];
}

const DEMO_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: "BD-98241",
    date: "Oct 08, 2026",
    status: "dispatched",
    statusLabel: "Out for Delivery",
    total: 7160,
    itemsCount: 2,
    paymentMethod: "Cash on Delivery",
    items: [
      {
        id: "i-1",
        name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
        image: "/images/products/electronics/electronics-8.jpg",
        quantity: 1,
        price: 4950,
        variant: "Forest Green",
      },
      {
        id: "i-2",
        name: "Premium Embroidered Traditional Kurti Set",
        image: "/images/categories/category-women.jpg",
        quantity: 1,
        price: 2150,
        variant: "Size: L",
      },
    ],
  },
  {
    id: "BD-94105",
    date: "Sep 28, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    total: 2850,
    itemsCount: 1,
    paymentMethod: "bKash Online",
    items: [
      {
        id: "i-3",
        name: "30,000mAh Ultra-Fast PD 65W Power Bank with Digital Display",
        image: "/images/products/electronics/electronics-2.jpg",
        quantity: 1,
        price: 2850,
        variant: "Matte Black",
      },
    ],
  },
  {
    id: "BD-91820",
    date: "Sep 15, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    total: 4200,
    itemsCount: 1,
    paymentMethod: "Visa Card",
    items: [
      {
        id: "i-4",
        name: "JBL Tune 510BT Pure Bass Wireless Bluetooth Headphones",
        image: "/images/products/electronics/electronics-9.jpg",
        quantity: 1,
        price: 4200,
        variant: "Midnight Black",
      },
    ],
  },
];

export default function CustomerOrdersPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = DEMO_CUSTOMER_ORDERS.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusBadge = (status: CustomerOrder["status"], label: string) => {
    switch (status) {
      case "dispatched":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Truck className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-50 text-gray-700">
            {label}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-4 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-text-muted mb-4"
        >
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">My Orders</span>
        </nav>

        {/* Page Header & Stats Strip */}
        <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand" />
                <span>My Order History</span>
              </h1>
              <p className="text-xs text-text-muted mt-1">
                Manage, track, and view invoices for all your marketplace purchases.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-gray-50 p-2.5 rounded-xl border border-border-light/70 text-xs">
              <div className="text-center px-2">
                <span className="text-text-muted block text-[10px] uppercase font-bold">Total Orders</span>
                <span className="font-black text-text-main text-sm">3</span>
              </div>
              <div className="h-6 w-px bg-border-light" />
              <div className="text-center px-2">
                <span className="text-text-muted block text-[10px] uppercase font-bold">In Transit</span>
                <span className="font-black text-amber-600 text-sm">1</span>
              </div>
              <div className="h-6 w-px bg-border-light" />
              <div className="text-center px-2">
                <span className="text-text-muted block text-[10px] uppercase font-bold">Delivered</span>
                <span className="font-black text-brand text-sm">2</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border-light/70 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Orders (3)" },
              { id: "dispatched", label: "In Transit (1)" },
              { id: "delivered", label: "Completed (2)" },
              { id: "processing", label: "Processing (0)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  filter === tab.id
                    ? "bg-brand text-white shadow-2xs"
                    : "bg-gray-100 text-text-muted hover:text-text-main hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-border-light shadow-2xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-gray-50/80 px-5 py-3.5 border-b border-border-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-bold text-text-main text-sm">
                      #{order.id}
                    </span>
                    <span className="text-border-light">|</span>
                    <span className="text-text-muted">Placed on {order.date}</span>
                    <span className="text-border-light">|</span>
                    <span className="text-text-muted font-medium">
                      Paid via {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status, order.statusLabel)}
                    <span className="font-black text-text-main text-sm">
                      ৳{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-5 divide-y divide-border-light/60">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-border-light">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-text-main truncate max-w-md">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-text-muted block mt-0.5">
                            Qty: {item.quantity} {item.variant && `• ${item.variant}`}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-black text-text-main block">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-text-muted">
                          ৳{item.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div className="bg-gray-50/50 px-5 py-3 border-t border-border-light flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-[11px] text-text-muted flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-brand" />
                    <span>Total {order.itemsCount} products packaged</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === "dispatched" && (
                      <Link
                        href="/track-order"
                        className="px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Live Parcel</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        toast.success(`Downloading tax invoice for #${order.id}`)
                      }
                      className="px-3 py-1.5 rounded-lg bg-white border border-border-light hover:bg-gray-100 text-text-main text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toast.success(`Items from #${order.id} added to cart!`)
                      }
                      className="px-3 py-1.5 rounded-lg bg-white border border-border-light hover:bg-gray-100 text-text-main text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Buy Again</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-border-light p-10 text-center text-xs text-text-muted">
              No orders found in this filter category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

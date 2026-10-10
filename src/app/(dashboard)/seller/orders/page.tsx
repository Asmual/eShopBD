"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  Printer,
  CheckCircle2,
  Clock,
  Eye,
  AlertCircle,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

interface SellerOrder {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  date: string;
  productName: string;
  productImage: string;
  quantity: number;
  totalAmount: number;
  sellerEarnings: number;
  courier: string;
  status: "pending" | "ready_to_ship" | "shipped" | "delivered";
  statusLabel: string;
}

const DEMO_SELLER_ORDERS: SellerOrder[] = [
  {
    id: "ORD-98241",
    customerName: "Mohammad Rahman",
    phone: "01712-345678",
    city: "Banani, Dhaka",
    date: "Oct 10, 2026 - 10:15 AM",
    productName: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
    productImage: "/images/products/electronics/electronics-8.jpg",
    quantity: 1,
    totalAmount: 4950,
    sellerEarnings: 4700,
    courier: "Steadfast Express",
    status: "ready_to_ship",
    statusLabel: "Ready for Pickup",
  },
  {
    id: "ORD-98192",
    customerName: "Sadia Sultana",
    phone: "01822-998877",
    city: "Nasirabad, Chattogram",
    date: "Oct 09, 2026 - 04:30 PM",
    productName: "30,000mAh Ultra-Fast PD 65W Power Bank",
    productImage: "/images/products/electronics/electronics-2.jpg",
    quantity: 2,
    totalAmount: 5700,
    sellerEarnings: 5415,
    courier: "RedX Logistics",
    status: "pending",
    statusLabel: "Needs Packaging",
  },
  {
    id: "ORD-97840",
    customerName: "Arif Chowdhury",
    phone: "01911-554433",
    city: "Zindabazar, Sylhet",
    date: "Oct 08, 2026 - 01:20 PM",
    productName: "JBL Tune 510BT Pure Bass Wireless Bluetooth Headphones",
    productImage: "/images/products/electronics/electronics-9.jpg",
    quantity: 1,
    totalAmount: 4200,
    sellerEarnings: 3990,
    courier: "Pathao Courier",
    status: "shipped",
    statusLabel: "In Transit",
  },
  {
    id: "ORD-96420",
    customerName: "Nusrat Jahan",
    phone: "01633-112233",
    city: "Dhanmondi, Dhaka",
    date: "Oct 05, 2026 - 11:00 AM",
    productName: "TWS True Wireless Stereo Earbuds with Dual LED Display",
    productImage: "/images/products/electronics/electronics-10.jpg",
    quantity: 1,
    totalAmount: 1650,
    sellerEarnings: 1565,
    courier: "Steadfast Express",
    status: "delivered",
    statusLabel: "Delivered",
  },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>(DEMO_SELLER_ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filter === "all" || o.status === filter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleMarkShipped = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: "shipped", statusLabel: "In Transit" }
          : o
      )
    );
    toast.success(`Order ${id} marked as In Transit with courier.`);
  };

  const getStatusBadge = (status: SellerOrder["status"], label: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case "ready_to_ship":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Truck className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-brand" />
              <span>Merchant Order Fulfillment</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Review received orders, print shipping labels, and hand over parcels to riders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success("Batch invoice labels exported (PDF)")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-border-light hover:bg-gray-100 text-xs font-bold text-text-main shadow-2xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Batch Print Labels</span>
            </button>
          </div>
        </div>

        {/* Fulfillment Pipeline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase block">Needs Packing</span>
            <span className="text-xl font-black text-amber-700 mt-1 block">
              {orders.filter((o) => o.status === "pending").length} Orders
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-blue-600 uppercase block">Ready for Pickup</span>
            <span className="text-xl font-black text-blue-700 mt-1 block">
              {orders.filter((o) => o.status === "ready_to_ship").length} Orders
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-purple-600 uppercase block">In Transit</span>
            <span className="text-xl font-black text-purple-700 mt-1 block">
              {orders.filter((o) => o.status === "shipped").length} Orders
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase block">Completed</span>
            <span className="text-xl font-black text-emerald-700 mt-1 block">
              {orders.filter((o) => o.status === "delivered").length} Orders
            </span>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="bg-white rounded-2xl border border-border-light p-3.5 sm:p-4 shadow-2xs mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All (4)" },
              { id: "pending", label: "Pending (1)" },
              { id: "ready_to_ship", label: "Ready (1)" },
              { id: "shipped", label: "In Transit (1)" },
              { id: "delivered", label: "Delivered (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  filter === tab.id
                    ? "bg-brand text-white shadow-2xs"
                    : "bg-gray-100 text-text-muted hover:text-text-main"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID..."
              className="w-full sm:w-60 h-9 pl-8 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl font-mono focus:outline-hidden focus:border-brand"
            />
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-border-light shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-border-light text-[11px] font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product Ordered</th>
                  <th className="py-3 px-4">Net Earning</th>
                  <th className="py-3 px-4">Courier</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/60">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-text-main block">
                        #{order.id}
                      </span>
                      <span className="text-[10px] text-text-muted">{order.date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-text-main block">
                        {order.customerName}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {order.city} • {order.phone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-border-light">
                          <Image src={order.productImage} alt={order.productName} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <span className="font-bold text-text-main truncate block">
                            {order.productName}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            Qty: {order.quantity} • ৳{order.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand text-xs">
                      ৳{order.sellerEarnings.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-text-main">
                      {order.courier}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status, order.statusLabel)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {order.status === "ready_to_ship" && (
                          <button
                            type="button"
                            onClick={() => handleMarkShipped(order.id)}
                            className="px-2.5 py-1 rounded-lg bg-brand hover:bg-brand-hover text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Mark Shipped
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toast.success(`Packing slip printed for #${order.id}`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                          title="Print Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

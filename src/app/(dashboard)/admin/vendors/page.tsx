"use client";

import React, { useState } from "react";
import {
  Users,
  Store,
  ShieldCheck,
  AlertCircle,
  Search,
  CheckCircle2,
  Ban,
  Eye,
  SlidersHorizontal,
  Star,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface Vendor {
  id: string;
  storeName: string;
  ownerName: string;
  phone: string;
  category: string;
  joinedDate: string;
  productsCount: number;
  totalSales: number;
  rating: number;
  commission: string;
  status: "verified" | "pending" | "suspended";
}

const DEMO_VENDORS: Vendor[] = [
  {
    id: "VND-104",
    storeName: "Apex Tech Gadgets Ltd.",
    ownerName: "Mohammad Tanvir",
    phone: "01711-223344",
    category: "Electronics",
    joinedDate: "Jan 12, 2026",
    productsCount: 10,
    totalSales: 485000,
    rating: 4.8,
    commission: "7.5%",
    status: "verified",
  },
  {
    id: "VND-082",
    storeName: "Heritage Silk & Cotton Mills",
    ownerName: "Farhana Yasmin",
    phone: "01819-887766",
    category: "Women's Fashion",
    joinedDate: "Feb 04, 2026",
    productsCount: 34,
    totalSales: 720000,
    rating: 4.9,
    commission: "8.0%",
    status: "verified",
  },
  {
    id: "VND-128",
    storeName: "Dhaka Craft Leather Works",
    ownerName: "Kabir Hossain",
    phone: "01912-334455",
    category: "Accessories",
    joinedDate: "Oct 08, 2026",
    productsCount: 8,
    totalSales: 42000,
    rating: 4.7,
    commission: "7.5%",
    status: "pending",
  },
  {
    id: "VND-067",
    storeName: "Urban Fit Menswear",
    ownerName: "Zubair Al-Mamun",
    phone: "01622-445566",
    category: "Men's Fashion",
    joinedDate: "Mar 18, 2026",
    productsCount: 22,
    totalSales: 310000,
    rating: 4.6,
    commission: "7.5%",
    status: "verified",
  },
  {
    id: "VND-031",
    storeName: "QuickGadget Clone Hub",
    ownerName: "Imran Khan",
    phone: "01511-778899",
    category: "Electronics",
    joinedDate: "May 20, 2026",
    productsCount: 4,
    totalSales: 18000,
    rating: 3.2,
    commission: "10.0%",
    status: "suspended",
  },
];

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(DEMO_VENDORS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredVendors = vendors.filter((v) => {
    const matchesFilter = filter === "all" || v.status === filter;
    const matchesSearch =
      v.storeName.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (id: string, name: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "verified" } : v))
    );
    toast.success(`Vendor "${name}" KYC verification approved.`);
  };

  const handleToggleSuspend = (id: string, name: string, current: string) => {
    const nextStatus = current === "suspended" ? "verified" : "suspended";
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: nextStatus as any } : v))
    );
    toast(
      nextStatus === "suspended"
        ? `Vendor "${name}" suspended.`
        : `Vendor "${name}" reactivated.`
    );
  };

  const getStatusBadge = (status: Vendor["status"]) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" />
            <span>Pending KYC</span>
          </span>
        );
      case "suspended":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
            <Ban className="w-3 h-3" />
            <span>Suspended</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <Users className="w-6 h-6 text-brand" />
              <span>Multi-Vendor Merchant Directory</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Review seller applications, verify trade licenses, configure commission rates, and audit vendor performance.
            </p>
          </div>

          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-border-light shadow-2xs">
            Marketplace Sellers: <span className="text-brand font-black">{vendors.length} Total</span>
          </div>
        </div>

        {/* Directory KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-text-muted uppercase block">Total Registered</span>
            <span className="text-xl font-black text-text-main mt-1 block">
              {vendors.length} Vendors
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase block">Active & Verified</span>
            <span className="text-xl font-black text-emerald-700 mt-1 block">
              {vendors.filter((v) => v.status === "verified").length}
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase block">Pending Review</span>
            <span className="text-xl font-black text-amber-700 mt-1 block">
              {vendors.filter((v) => v.status === "pending").length}
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-red-600 uppercase block">Suspended Stores</span>
            <span className="text-xl font-black text-red-700 mt-1 block">
              {vendors.filter((v) => v.status === "suspended").length}
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-border-light p-3.5 sm:p-4 shadow-2xs mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Vendors (5)" },
              { id: "verified", label: "Verified (3)" },
              { id: "pending", label: "Pending (1)" },
              { id: "suspended", label: "Suspended (1)" },
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
              placeholder="Search store, owner, ID..."
              className="w-full sm:w-60 h-9 pl-8 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl focus:outline-hidden focus:border-brand"
            />
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Vendors Directory Table */}
        <div className="bg-white rounded-2xl border border-border-light shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-border-light text-[11px] font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Vendor & Store</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Products</th>
                  <th className="py-3 px-4">Total GMV</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Commission</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/60">
                {filteredVendors.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-text-main block">{v.storeName}</span>
                      <span className="text-[10px] text-text-muted">
                        {v.id} • Joined {v.joinedDate}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-text-main block">{v.ownerName}</span>
                      <span className="text-[10px] text-text-muted font-mono">{v.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-text-main">
                      {v.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-text-main">
                      {v.productsCount} items
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand text-xs">
                      ৳{v.totalSales.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-bold text-text-main">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{v.rating}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-text-muted">
                      {v.commission}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(v.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {v.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleApprove(v.id, v.storeName)}
                            className="px-2.5 py-1 rounded-lg bg-brand hover:bg-brand-hover text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Verify</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleSuspend(v.id, v.storeName, v.status)
                          }
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            v.status === "suspended"
                              ? "hover:bg-emerald-50 text-emerald-600"
                              : "hover:bg-red-50 text-text-muted hover:text-red-500"
                          }`}
                          title={
                            v.status === "suspended"
                              ? "Reactivate Store"
                              : "Suspend Store"
                          }
                        >
                          <Ban className="w-3.5 h-3.5" />
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

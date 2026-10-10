"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  HelpCircle,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface Milestone {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

const DEMO_MILESTONES: Milestone[] = [
  {
    id: "m-1",
    title: "Order Placed & Confirmed",
    description: "Order received and verified by eShopBD system.",
    timestamp: "Oct 08, 2026 - 10:30 AM",
    isCompleted: true,
    isCurrent: false,
  },
  {
    id: "m-2",
    title: "Quality Checked & Packaged",
    description: "Merchant packaged items with seal protection.",
    timestamp: "Oct 08, 2026 - 04:15 PM",
    isCompleted: true,
    isCurrent: false,
  },
  {
    id: "m-3",
    title: "Handed to Courier Partner",
    description: "Sorted at Dhaka Central Hub (Steadfast Express).",
    timestamp: "Oct 09, 2026 - 09:45 AM",
    isCompleted: true,
    isCurrent: false,
  },
  {
    id: "m-4",
    title: "Out for Delivery",
    description: "Delivery executive is on the way to your address.",
    timestamp: "Oct 10, 2026 - 11:20 AM",
    isCompleted: true,
    isCurrent: true,
  },
  {
    id: "m-5",
    title: "Delivered to Customer",
    description: "Parcel successfully delivered and verified.",
    timestamp: "Estimated: Today by 6:00 PM",
    isCompleted: false,
    isCurrent: false,
  },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("BD-98241");
  const [phone, setPhone] = useState("01712345678");
  const [isSearching, setIsSearching] = useState(false);
  const [hasResult, setHasResult] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast.error("Please enter your Order ID.");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasResult(true);
      toast.success(`Tracking details loaded for ${orderNumber}`);
    }, 600);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-text-main font-semibold">Track Order</span>
          </nav>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand">
            Live Parcel Tracker
          </span>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-7 shadow-2xs mb-6">
          <div className="max-w-xl mx-auto text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-text-main mb-1.5">
              Track Your Shipment in Real-Time
            </h1>
            <p className="text-xs text-text-muted">
              Enter your Order Number and registered phone number to check current dispatch location and delivery status.
            </p>
          </div>

          <form
            onSubmit={handleTrack}
            className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3"
          >
            <div className="sm:col-span-5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
                Order Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. BD-98241"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl font-mono focus:outline-hidden focus:border-brand"
                />
                <Package className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl font-mono focus:outline-hidden focus:border-brand"
                />
                <Phone className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full h-10 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-70"
              >
                {isSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Parcel</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Result View */}
        {hasResult && (
          <div className="space-y-6">
            {/* Status Summary Banner */}
            <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-text-muted">Order ID:</span>
                  <span className="font-mono text-sm font-black text-text-main">
                    {orderNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                    Out for Delivery
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Courier: <strong className="text-text-main">Steadfast Express</strong> • Consignment: <span className="font-mono text-text-main">SF-BD-8891240</span>
                </p>
              </div>

              <div className="flex items-center gap-3 bg-brand-light/40 border border-brand/20 p-3 rounded-xl shrink-0">
                <Clock className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-text-muted uppercase block">
                    Estimated Delivery
                  </span>
                  <span className="text-xs font-bold text-brand">
                    Today, before 6:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Progress */}
            <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-7 shadow-2xs">
              <h2 className="text-sm font-bold text-text-main mb-6 pb-2.5 border-b border-border-light flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand" />
                <span>Delivery Milestone Timeline</span>
              </h2>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light">
                {DEMO_MILESTONES.map((m) => (
                  <div key={m.id} className="relative">
                    {/* Milestone Icon Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                        m.isCurrent
                          ? "border-brand ring-4 ring-brand-light text-brand"
                          : m.isCompleted
                          ? "border-brand bg-brand text-white"
                          : "border-gray-300 text-gray-300"
                      }`}
                    >
                      {m.isCompleted ? (
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            m.isCurrent ? "text-brand" : "text-white"
                          }`}
                        />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      )}
                    </div>

                    {/* Milestone Content */}
                    <div className="ml-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            m.isCurrent
                              ? "text-brand"
                              : m.isCompleted
                              ? "text-text-main"
                              : "text-text-muted"
                          }`}
                        >
                          {m.title}
                          {m.isCurrent && (
                            <span className="ml-2 text-[10px] font-bold bg-brand text-white px-1.5 py-0.2 rounded-xs uppercase">
                              Current Status
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] font-medium text-text-muted">
                          {m.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rider Contact & Destination Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-border-light p-4.5 shadow-2xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-muted uppercase block">
                    Delivery Rider
                  </span>
                  <h4 className="text-xs font-bold text-text-main">
                    Tanvir Hasan • 01811-987654
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Assigned for Banani & Gulshan zone
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border-light p-4.5 shadow-2xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-muted uppercase block">
                    Destination Address
                  </span>
                  <h4 className="text-xs font-bold text-text-main truncate max-w-[260px]">
                    House 42, Road 11, Banani, Dhaka-1213
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Contact: Mohammad Rahman (01712-345678)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

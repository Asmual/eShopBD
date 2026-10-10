"use client";

import React, { useState } from "react";
import {
  Store,
  Building,
  CreditCard,
  ShieldCheck,
  Save,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SellerSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const [storeData, setStoreData] = useState({
    storeName: "Apex Tech Gadgets Ltd.",
    storeSlug: "apex-tech-gadgets",
    tagline: "Official distributor of authentic audio and charging peripherals in Bangladesh.",
    email: "support@apextech.bd",
    phone: "01711-223344",
    warehouseAddress: "Plot 12, Block B, Tejgaon Industrial Area, Dhaka-1208",
    tradeLicense: "TRAD/DNCC/082142/2026",
    bankName: "City Bank Limited",
    bankBranch: "Gulshan Corporate Branch",
    accountTitle: "Apex Tech Gadgets Ltd.",
    accountNumber: "1102938475001",
    routingNumber: "225271890",
    payoutSchedule: "biweekly",
    returnWindow: "7",
    dispatchCutoff: "14:00",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Store profile and payout settings saved successfully!");
    }, 800);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-4 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <Store className="w-6 h-6 text-brand" />
              <span>Store Profile & Settings</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Update your merchant profile, warehouse dispatch location, and financial payout account.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Official Merchant</span>
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Store Information */}
          <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
            <h2 className="text-sm sm:text-base font-bold text-text-main mb-4 pb-2 border-b border-border-light flex items-center gap-2">
              <Building className="w-4 h-4 text-brand" />
              <span>1. Store Identity & Public Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-text-main block mb-1">
                  Store Display Name
                </label>
                <input
                  type="text"
                  value={storeData.storeName}
                  onChange={(e) =>
                    setStoreData({ ...storeData, storeName: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Store Slug (Web URL)
                </label>
                <div className="flex items-center">
                  <span className="h-9.5 px-2.5 bg-gray-100 border border-r-0 border-border-light rounded-l-lg text-text-muted font-mono flex items-center text-[11px]">
                    eshopbd.com/
                  </span>
                  <input
                    type="text"
                    disabled
                    value={storeData.storeSlug}
                    className="w-full h-9.5 px-3 bg-gray-100 border border-border-light rounded-r-lg font-mono text-text-muted"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-text-main block mb-1">
                  Store Bio / Description
                </label>
                <textarea
                  rows={2}
                  value={storeData.tagline}
                  onChange={(e) =>
                    setStoreData({ ...storeData, tagline: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Support Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={storeData.email}
                    onChange={(e) =>
                      setStoreData({ ...storeData, email: e.target.value })
                    }
                    className="w-full h-9.5 pl-8 pr-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                  />
                  <Mail className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Official Hotline Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={storeData.phone}
                    onChange={(e) =>
                      setStoreData({ ...storeData, phone: e.target.value })
                    }
                    className="w-full h-9.5 pl-8 pr-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand font-mono"
                  />
                  <Phone className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-text-main block mb-1">
                  Warehouse & Dispatch Address (For Courier Pickup)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={storeData.warehouseAddress}
                    onChange={(e) =>
                      setStoreData({
                        ...storeData,
                        warehouseAddress: e.target.value,
                      })
                    }
                    className="w-full h-9.5 pl-8 pr-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                  />
                  <MapPin className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Bank Payout Settlement Details */}
          <div className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-2xs">
            <h2 className="text-sm sm:text-base font-bold text-text-main mb-4 pb-2 border-b border-border-light flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand" />
              <span>2. Bank Account Details (For Direct Revenue Payouts)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-text-main block mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={storeData.bankName}
                  onChange={(e) =>
                    setStoreData({ ...storeData, bankName: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={storeData.bankBranch}
                  onChange={(e) =>
                    setStoreData({ ...storeData, bankBranch: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Bank Account Title
                </label>
                <input
                  type="text"
                  value={storeData.accountTitle}
                  onChange={(e) =>
                    setStoreData({ ...storeData, accountTitle: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  value={storeData.accountNumber}
                  onChange={(e) =>
                    setStoreData({ ...storeData, accountNumber: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg font-mono focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Routing Number (9 Digits)
                </label>
                <input
                  type="text"
                  value={storeData.routingNumber}
                  onChange={(e) =>
                    setStoreData({ ...storeData, routingNumber: e.target.value })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg font-mono focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="font-bold text-text-main block mb-1">
                  Payout Schedule
                </label>
                <select
                  value={storeData.payoutSchedule}
                  onChange={(e) =>
                    setStoreData({
                      ...storeData,
                      payoutSchedule: e.target.value,
                    })
                  }
                  className="w-full h-9.5 px-3 bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand"
                >
                  <option value="weekly">Weekly (Every Thursday)</option>
                  <option value="biweekly">Bi-weekly (1st & 15th of month)</option>
                  <option value="monthly">Monthly (End of month)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving Settings..." : "Save Store Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

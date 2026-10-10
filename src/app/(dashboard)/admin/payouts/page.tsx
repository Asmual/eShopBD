"use client";

import React, { useState } from "react";
import {
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  Search,
  Check,
  X,
  FileText,
  Building,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

interface PayoutRequest {
  id: string;
  vendorName: string;
  vendorId: string;
  date: string;
  grossSales: number;
  commission: number;
  netPayable: number;
  bankInfo: string;
  status: "pending" | "processing" | "completed" | "rejected";
  statusLabel: string;
}

const DEMO_PAYOUTS: PayoutRequest[] = [
  {
    id: "PAY-2026-904",
    vendorName: "Apex Tech Gadgets Ltd.",
    vendorId: "VND-104",
    date: "Oct 10, 2026",
    grossSales: 54000,
    commission: 4050,
    netPayable: 49950,
    bankInfo: "City Bank (Acc: ***5001)",
    status: "pending",
    statusLabel: "Pending Approval",
  },
  {
    id: "PAY-2026-899",
    vendorName: "Heritage Silk & Cotton Mills",
    vendorId: "VND-082",
    date: "Oct 09, 2026",
    grossSales: 82500,
    commission: 6180,
    netPayable: 76320,
    bankInfo: "BRAC Bank (Acc: ***4120)",
    status: "pending",
    statusLabel: "Pending Approval",
  },
  {
    id: "PAY-2026-874",
    vendorName: "RoboKids Educational Toys",
    vendorId: "VND-115",
    date: "Oct 06, 2026",
    grossSales: 38900,
    commission: 2910,
    netPayable: 35990,
    bankInfo: "bKash Merchant (01799***)",
    status: "completed",
    statusLabel: "Disbursed",
  },
  {
    id: "PAY-2026-850",
    vendorName: "Urban Fit Menswear",
    vendorId: "VND-067",
    date: "Oct 02, 2026",
    grossSales: 64200,
    commission: 4815,
    netPayable: 59385,
    bankInfo: "Dutch-Bangla Bank (Acc: ***8821)",
    status: "completed",
    statusLabel: "Disbursed",
  },
];

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(DEMO_PAYOUTS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredPayouts = payouts.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      p.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (id: string, name: string, amount: number) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "completed", statusLabel: "Disbursed" }
          : p
      )
    );
    toast.success(`Disbursed ৳${amount.toLocaleString()} to ${name}`);
  };

  const handleReject = (id: string, name: string) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "rejected", statusLabel: "Rejected" }
          : p
      )
    );
    toast.error(`Payout ${id} for ${name} rejected.`);
  };

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-brand" />
              <span>Admin Vendor Payout Settlements</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Review escrow balances, calculate commission deductions, and approve merchant bank wires.
            </p>
          </div>

          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-border-light shadow-2xs">
            Escrow Reserve: <span className="text-brand font-black">৳4,250,000</span>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase block">Pending Approvals</span>
            <span className="text-xl font-black text-amber-700 mt-1 block">
              ৳126,270
            </span>
            <span className="text-[10px] text-text-muted">2 requests queued</span>
          </div>

          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase block">Disbursed This Month</span>
            <span className="text-xl font-black text-emerald-700 mt-1 block">
              ৳1,890,400
            </span>
            <span className="text-[10px] text-text-muted">38 completed transfers</span>
          </div>

          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-brand uppercase block">Platform Commission</span>
            <span className="text-xl font-black text-brand mt-1 block">
              ৳142,500
            </span>
            <span className="text-[10px] text-text-muted">Avg 7.5% fee margin</span>
          </div>

          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-text-muted uppercase block">Active Merchants</span>
            <span className="text-xl font-black text-text-main mt-1 block">
              64 Sellers
            </span>
            <span className="text-[10px] text-text-muted">100% verified KYC</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-border-light p-3.5 sm:p-4 shadow-2xs mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Settlements (4)" },
              { id: "pending", label: "Pending Review (2)" },
              { id: "completed", label: "Disbursed (2)" },
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
              placeholder="Search vendor or ref..."
              className="w-full sm:w-60 h-9 pl-8 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl focus:outline-hidden focus:border-brand"
            />
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Settlements Table */}
        <div className="bg-white rounded-2xl border border-border-light shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-border-light text-[11px] font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Payout Ref</th>
                  <th className="py-3 px-4">Vendor Partner</th>
                  <th className="py-3 px-4">Gross Sales</th>
                  <th className="py-3 px-4">Platform Fee (7.5%)</th>
                  <th className="py-3 px-4">Net Transfer</th>
                  <th className="py-3 px-4">Bank Account</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/60">
                {filteredPayouts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-text-muted text-[11px]">
                      {p.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-text-main block">{p.vendorName}</span>
                      <span className="text-[10px] text-text-muted">{p.vendorId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-text-main">
                      ৳{p.grossSales.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-red-500">
                      -৳{p.commission.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand text-xs">
                      ৳{p.netPayable.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-text-muted text-[11px]">
                      {p.bankInfo}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{p.statusLabel}</span>
                        </span>
                      ) : p.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                          <span>{p.statusLabel}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>{p.statusLabel}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === "pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              handleApprove(p.id, p.vendorName, p.netPayable)
                            }
                            className="px-2.5 py-1 rounded-lg bg-brand hover:bg-brand-hover text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(p.id, p.vendorName)}
                            className="p-1 rounded-lg hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            toast.success(`Ledger receipt generated for ${p.id}`)
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                          title="View Ledger"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      )}
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

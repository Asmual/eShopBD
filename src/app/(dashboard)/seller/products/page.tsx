"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import toast from "react-hot-toast";

interface SellerProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  status: "active" | "low_stock" | "out_of_stock";
}

const DEMO_SELLER_PRODUCTS: SellerProduct[] = [
  {
    id: "sp-1",
    sku: "SKU-EL-881",
    name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker",
    category: "Electronics",
    price: 4950,
    stock: 24,
    sold: 142,
    image: "/images/products/electronics/electronics-8.jpg",
    status: "active",
  },
  {
    id: "sp-2",
    sku: "SKU-EL-204",
    name: "30,000mAh Ultra-Fast PD 65W Power Bank",
    category: "Electronics",
    price: 2850,
    stock: 5,
    sold: 380,
    image: "/images/products/electronics/electronics-2.jpg",
    status: "low_stock",
  },
  {
    id: "sp-3",
    sku: "SKU-EL-510",
    name: "JBL Tune 510BT Pure Bass Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 4200,
    stock: 18,
    sold: 215,
    image: "/images/products/electronics/electronics-9.jpg",
    status: "active",
  },
  {
    id: "sp-4",
    sku: "SKU-EL-045",
    name: "45W Super Fast PD Type-C Wall Charger with 3M Cable",
    category: "Electronics",
    price: 1150,
    stock: 0,
    sold: 510,
    image: "/images/products/electronics/electronics-4.jpg",
    status: "out_of_stock",
  },
  {
    id: "sp-5",
    sku: "SKU-EL-910",
    name: "TWS True Wireless Stereo Earbuds with Dual LED Display",
    category: "Electronics",
    price: 1650,
    stock: 35,
    sold: 430,
    image: "/images/products/electronics/electronics-10.jpg",
    status: "active",
  },
];

export default function SellerProductsPage() {
  const [products, setProducts] = useState<SellerProduct[]>(DEMO_SELLER_PRODUCTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success(`Product "${name.slice(0, 20)}" removed.`);
  };

  const getStatusBadge = (status: SellerProduct["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Active</span>
          </span>
        );
      case "low_stock":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            <span>Low Stock</span>
          </span>
        );
      case "out_of_stock":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
            <span>Out of Stock</span>
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
              <Package className="w-6 h-6 text-brand" />
              <span>Seller Inventory & Products</span>
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Manage your catalog listings, track inventory units, and update prices.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toast.success("New product creation modal opened")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Inventory KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-text-muted uppercase block">Total Catalog</span>
            <span className="text-xl font-black text-text-main mt-1 block">{products.length} Items</span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase block">Active In Stock</span>
            <span className="text-xl font-black text-emerald-700 mt-1 block">
              {products.filter((p) => p.status === "active").length}
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase block">Low Stock Alert</span>
            <span className="text-xl font-black text-amber-700 mt-1 block">
              {products.filter((p) => p.status === "low_stock").length}
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-border-light p-4 shadow-2xs">
            <span className="text-[11px] font-bold text-red-600 uppercase block">Out of Stock</span>
            <span className="text-xl font-black text-red-700 mt-1 block">
              {products.filter((p) => p.status === "out_of_stock").length}
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-border-light p-3.5 sm:p-4 shadow-2xs mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or SKU..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-gray-50 border border-border-light rounded-xl focus:outline-hidden focus:border-brand"
            />
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-text-muted" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 px-3 text-xs bg-gray-50 border border-border-light rounded-xl font-medium text-text-main focus:outline-hidden focus:border-brand cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="toys">Toys & Games</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-border-light shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-border-light text-[11px] font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock Units</th>
                  <th className="py-3 px-4">Sold</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-border-light">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <h4 className="font-bold text-text-main truncate">{p.name}</h4>
                          <span className="text-[10px] text-text-muted">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-text-muted text-[11px]">
                      {p.sku}
                    </td>
                    <td className="py-3.5 px-4 font-black text-text-main">
                      ৳{p.price.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-text-main">
                      {p.stock} pcs
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-text-muted">
                      {p.sold}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(p.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => toast.success(`Viewing ${p.name.slice(0, 15)}...`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toast.success(`Editing ${p.name.slice(0, 15)}...`)}
                          className="p-1.5 rounded-lg hover:bg-brand-light text-text-muted hover:text-brand transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

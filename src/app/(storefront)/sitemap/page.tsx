"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Map,
  ShoppingBag,
  Layers,
  HelpCircle,
  ShieldCheck,
  User,
  Store,
} from "lucide-react";

export default function SitemapPage() {
  const SITEMAP_SECTIONS = [
    {
      title: "Storefront & Discovery",
      icon: ShoppingBag,
      links: [
        { label: "Home Page", href: "/" },
        { label: "All Products Directory", href: "/products" },
        { label: "New Arrivals", href: "/new-arrivals" },
        { label: "Best Sellers", href: "/best-sellers" },
        { label: "Mega Deals (Flash Sale)", href: "/mega-deals" },
        { label: "Active Offers & Coupons", href: "/offers" },
        { label: "Electronics & Gadgets", href: "/electronics" },
        { label: "Toys & Kids Collection", href: "/toys" },
      ],
    },
    {
      title: "Browse By Categories",
      icon: Layers,
      links: [
        { label: "All Categories Overview", href: "/categories" },
        { label: "Electronics & Gadgets", href: "/electronics" },
        { label: "Toys & Baby Care", href: "/toys" },
        { label: "Women's Fashion", href: "/products?category=women" },
        { label: "Men's Fashion", href: "/products?category=men" },
        { label: "Kids & Babies", href: "/products?category=kids" },
      ],
    },
    {
      title: "Orders, Shopping & Account",
      icon: User,
      links: [
        { label: "Shopping Cart", href: "/cart" },
        { label: "Checkout & Payment", href: "/checkout" },
        { label: "Track Active Order", href: "/track-order" },
        { label: "Customer Orders Dashboard", href: "/customer/orders" },
        { label: "Customer Account Profile", href: "/customer" },
        { label: "My Wishlist", href: "/wishlist" },
        { label: "Login & Sign Up", href: "/login" },
        { label: "Create New Account", href: "/register" },
      ],
    },
    {
      title: "Customer Service & Legal Policies",
      icon: ShieldCheck,
      links: [
        { label: "Contact Customer Support", href: "/contact" },
        { label: "About eShopBD", href: "/about" },
        { label: "Frequently Asked Questions", href: "/faq" },
        { label: "Shipping & Delivery Policy", href: "/shipping-policy" },
        { label: "7-Day Return & Refund Policy", href: "/return-policy" },
        { label: "Submit Return Request", href: "/returns" },
        { label: "Size & Measurement Guide", href: "/size-guide" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms and Conditions", href: "/terms" },
        { label: "Shopping Blog & Insights", href: "/blog" },
      ],
    },
    {
      title: "Merchant & Partner Portals",
      icon: Store,
      links: [
        { label: "Become a Seller Registration", href: "/become-seller" },
        { label: "Seller Central Overview", href: "/seller" },
        { label: "Seller Product Management", href: "/seller/products" },
        { label: "Seller Order Fulfillment", href: "/seller/orders" },
        { label: "Seller Store Settings & Payouts", href: "/seller/settings" },
        { label: "Admin Platform Overview", href: "/admin" },
        { label: "Admin Vendor KYC Directory", href: "/admin/vendors" },
        { label: "Admin Merchant Payouts", href: "/admin/payouts" },
      ],
    },
  ];

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs */}
        <div className="flex items-center gap-1.5 py-1.5 mb-3 border-b border-border-light text-xs text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">Site Map</span>
        </div>

        {/* Moderate Header */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight flex items-center gap-2">
            <Map className="w-5 h-5 text-brand" />
            <span>eShopBD Platform Directory & Site Map</span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Complete navigation index of all marketplace categories, customer tools, and merchant portals.
          </p>
        </div>

        {/* Multi-Column Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {SITEMAP_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-xl border border-border-light p-4 shadow-2xs"
              >
                <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-border-light">
                  <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-text-main">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-xs text-text-muted hover:text-brand transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-text-muted/60 group-hover:text-brand group-hover:translate-x-0.5 transition-all mr-1" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

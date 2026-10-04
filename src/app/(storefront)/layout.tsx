import React from "react";
import Header from "@/components/common/Header";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="storefront-layout min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}

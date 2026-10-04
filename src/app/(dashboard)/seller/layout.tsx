import React from "react";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="seller-dashboard min-h-screen">
      {children}
    </div>
  );
}

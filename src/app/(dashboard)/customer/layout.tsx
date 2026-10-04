import React from "react";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="customer-dashboard min-h-screen">
      {children}
    </div>
  );
}

import React from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-dashboard min-h-screen">
      {children}
    </div>
  );
}

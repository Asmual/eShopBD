"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        className: "text-sm font-medium",
        style: {
          background: "#1C2430",
          color: "#FFFFFF",
          fontSize: "14px",
          borderRadius: "10px",
          padding: "12px 16px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#156B48",
            secondary: "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
}

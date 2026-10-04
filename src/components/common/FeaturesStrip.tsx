import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

interface FeatureItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: "free-shipping",
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On all orders over $50",
  },
  {
    id: "easy-returns",
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "30 days return policy",
  },
  {
    id: "secure-payment",
    icon: ShieldCheck,
    title: "100% Secure",
    subtitle: "Secure payment guarantee",
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "We are here for you",
  },
];

export default function FeaturesStrip() {
  return (
    <section aria-label="Customer Benefits and Trust Services" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-brand-surface/70 border border-border-light rounded-xl shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/80"
                >
                  <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center shrink-0 text-brand">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-text-main leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

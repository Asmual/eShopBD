import React from "react";
import Link from "next/link";
import { PackageOpen, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onReset?: () => void;
}

export default function EmptyState({
  title = "No Products Found",
  description = "We couldn't find any items matching your selected criteria. Try adjusting your filters or search terms.",
  actionText = "Reset Filters",
  onReset,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-4 bg-white rounded-2xl border border-dashed border-border-light text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand mb-4">
        <PackageOpen className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-text-main mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-text-muted max-w-md mb-6">{description}</p>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : null}
    </div>
  );
}

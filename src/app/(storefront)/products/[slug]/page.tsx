import React from "react";
import { ALL_PRODUCTS } from "@/data/products";
import ProductDetailsView from "@/features/products/components/ProductDetailsView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  // Find product by slug or fallback to first product
  const product =
    ALL_PRODUCTS.find((p) => p.slug === slug) || ALL_PRODUCTS[0];

  // Get related products from same category or catalog
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <ProductDetailsView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

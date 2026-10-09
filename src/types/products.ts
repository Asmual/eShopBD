import { ComponentType } from "react";
import { LucideProps } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: ComponentType<LucideProps>;
}

export interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  badgeText: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  soldCount: number;
  isMegaDeal?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  claimedPercent?: number;
  dealEndTime?: string;
  description?: string;
}

export interface CouponOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  minSpend: number;
  expiresAt: string;
  tag: string;
  category: string;
}

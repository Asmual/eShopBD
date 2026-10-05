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

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HeroSlide } from "../types";

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero-banner-1.jpg",
    tag: "LIMITED TIME ONLY",
    title: "Mega Sale",
    highlight: "Up to 50% Off",
    subtitle: "Great Deals on Top Products",
    buttonText: "Shop Now",
    buttonLink: "/products?filter=mega-sale",
    badgeText: "50% OFF",
  },
  {
    id: "slide-2",
    image: "/images/hero-banner-2.jpg",
    tag: "EXCLUSIVE OFFERS 2026",
    title: "Flash Deals",
    highlight: "Save Big Today",
    subtitle: "Trending Styles & Premium Gadgets",
    buttonText: "Shop Now",
    buttonLink: "/products?filter=flash-deals",
    badgeText: "40% OFF",
  },
  {
    id: "slide-3",
    image: "/images/hero-banner-3.jpg",
    tag: "NEW SEASON ARRIVALS",
    title: "Summer Collection",
    highlight: "Up to 35% Off",
    subtitle: "Fresh Wardrobe Essentials & Trends",
    buttonText: "Shop Now",
    buttonLink: "/products?filter=summer-collection",
    badgeText: "35% OFF",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic sliding every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <div
      className="relative w-full h-[180px] min-[400px]:h-[200px] min-[520px]:h-[230px] sm:h-[280px] md:h-[350px] lg:h-[415px] rounded-xl sm:rounded-2xl overflow-hidden bg-brand-banner select-none shadow-xs group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Promotional Hero Carousel"
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
                className="object-cover object-right md:object-center"
              />

              {/* Gradient overlay on the left for crisp text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-banner/95 via-brand-banner/70 to-transparent w-3/4 sm:w-3/5 pointer-events-none" />
            </div>

            {/* Left Content Overlay (Scaled down proportionally on mobile) */}
            <div className="relative h-full flex flex-col justify-center pl-7 sm:pl-14 md:pl-20 pr-2 max-w-[66%] sm:max-w-md lg:max-w-lg z-20">
              <span className="text-[8px] min-[400px]:text-[9px] sm:text-xs font-bold uppercase tracking-wider text-text-muted">
                {slide.tag}
              </span>

              <h2 className="mt-0.5 sm:mt-1 text-sm min-[400px]:text-base sm:text-3xl lg:text-4xl font-black text-text-main tracking-tight leading-tight">
                {slide.title}
              </h2>

              <p className="text-xs min-[400px]:text-sm sm:text-2xl lg:text-3xl font-extrabold text-brand leading-snug">
                {slide.highlight}
              </p>

              <p className="hidden min-[440px]:block mt-0.5 sm:mt-1.5 text-[9px] min-[400px]:text-[11px] sm:text-sm text-text-muted font-medium line-clamp-1 sm:line-clamp-2">
                {slide.subtitle}
              </p>

              <div className="mt-2 min-[400px]:mt-2.5 sm:mt-5">
                <Link
                  href={slide.buttonLink}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1 sm:py-2.5 rounded-full bg-brand hover:bg-brand-hover text-white text-[9px] min-[400px]:text-[11px] sm:text-sm font-semibold shadow-xs transition-all hover:gap-3 cursor-pointer"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </Link>
              </div>
            </div>

            {/* Floating Circular Discount Badge */}
            <div className="hidden min-[480px]:flex absolute top-2 right-2 sm:top-6 sm:right-10 md:top-8 md:right-16 lg:right-24 z-20">
              <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-brand text-white flex flex-col items-center justify-center shadow-lg border-2 border-white/60 transform rotate-12 transition-transform hover:rotate-0">
                <span className="text-xs sm:text-lg md:text-xl font-black leading-none">
                  {slide.badgeText.split(" ")[0]}
                </span>
                <span className="text-[7px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider leading-none mt-0.5">
                  {slide.badgeText.split(" ")[1] || "OFF"}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous promotional slide"
        className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-text-main shadow-md flex items-center justify-center transition-all hover:scale-110 z-30 cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-main" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next promotional slide"
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-text-main shadow-md flex items-center justify-center transition-all hover:scale-110 z-30 cursor-pointer"
      >
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-main" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 z-30">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all rounded-full cursor-pointer ${
              index === currentIndex
                ? "w-4 sm:w-6 h-1 sm:h-2 bg-brand"
                : "w-1.5 sm:w-2 h-1 sm:h-2 bg-white/80 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

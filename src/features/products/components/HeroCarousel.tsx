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
      className="relative w-full h-[460px] sm:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden bg-brand-banner select-none shadow-xs group"
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
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-right md:object-center"
              />

              {/* Gradient overlay for optimal text contrast on left */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-banner/90 via-brand-banner/50 to-transparent w-full md:w-3/4 pointer-events-none" />
            </div>

            {/* Left Content Overlay */}
            <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 max-w-lg z-20">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-text-muted">
                {slide.tag}
              </span>

              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-text-main tracking-tight leading-tight">
                {slide.title}
              </h2>

              <p className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand leading-snug">
                {slide.highlight}
              </p>

              <p className="mt-2 text-sm sm:text-base text-text-muted font-medium">
                {slide.subtitle}
              </p>

              <div className="mt-6">
                <Link
                  href={slide.buttonLink}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand hover:bg-brand-hover text-white text-sm sm:text-base font-semibold shadow-sm transition-all hover:gap-3 cursor-pointer"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Floating Circular Discount Badge (Positioned as shown in design reference) */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-12 md:top-10 md:right-20 lg:right-28 z-20">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-brand text-white flex flex-col items-center justify-center shadow-lg border-2 border-white/60 transform rotate-12 transition-transform hover:rotate-0">
                <span className="text-lg sm:text-xl font-black leading-none">
                  {slide.badgeText.split(" ")[0]}
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-none mt-0.5">
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
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-text-main shadow-md flex items-center justify-center transition-all hover:scale-110 z-30 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 text-text-main" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next promotional slide"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-text-main shadow-md flex items-center justify-center transition-all hover:scale-110 z-30 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 text-text-main" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all rounded-full cursor-pointer ${
              index === currentIndex
                ? "w-7 h-2 bg-brand"
                : "w-2 h-2 bg-white/80 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

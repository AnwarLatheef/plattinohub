"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { HeroBanner } from "@/types/banner";

import styles from "./Hero.module.css";

interface HeroCarouselProps {
  banners: HeroBanner[];
}

const SLIDE_DURATION = 8000;

export default function HeroCarousel({
  banners,
}: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => {
        return (currentSlide + 1) % banners.length;
      });
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.slides}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`${styles.slide} ${
              index === activeSlide ? styles.active : ""
            }`}
            aria-hidden={index !== activeSlide}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={banner.mobileImage}
              />

              <Image
                src={banner.desktopImage}
                alt={banner.altText}
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </picture>
          </div>
        ))}
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <Link
          href={banners[activeSlide].ctaLink}
          className={styles.shopButton}
        >
          {banners[activeSlide].ctaLabel}
        </Link>
      </div>

      {banners.length > 1 && (
        <div className={styles.indicators}>
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              className={`${styles.indicator} ${
                index === activeSlide
                  ? styles.indicatorActive
                  : ""
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide}
            />
          ))}
        </div>
      )}
    </>
  );
}
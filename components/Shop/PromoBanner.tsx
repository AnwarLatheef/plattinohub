"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Promotion } from "@/types/promotion";

import styles from "./PromoBanner.module.css";

interface PromoBannerProps {
  promotions: Promotion[];
}

export default function PromoBanner({
  promotions,
}: PromoBannerProps) {
  const activePromotions = promotions.filter(
    (promotion) => promotion.isActive,
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPromotions = activePromotions.length;

  useEffect(() => {
    if (totalPromotions <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((current) =>
        (current + 1) % totalPromotions,
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [totalPromotions]);

  if (totalPromotions === 0) {
    return null;
  }

  function goToPrevious() {
    setCurrentIndex((current) =>
      current === 0
        ? totalPromotions - 1
        : current - 1,
    );
  }

  function goToNext() {
    setCurrentIndex(
      (current) => (current + 1) % totalPromotions,
    );
  }

  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  return (
    <section
      className={styles.banner}
      aria-label="Featured offers"
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {activePromotions.map((promotion, index) => (
            <div
              key={promotion.id}
              className={styles.slide}
              aria-hidden={index !== currentIndex}
            >
              <Link
                href={promotion.href}
                className={styles.slideLink}
                aria-label={promotion.title}
                tabIndex={index === currentIndex ? 0 : -1}
              >
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={promotion.mobileImage}
                  />

                  <Image
                    src={promotion.desktopImage}
                    alt={promotion.alt}
                    width={1440}
                    height={300}
                    priority={index === 0}
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>

        {totalPromotions > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.previous}`}
              onClick={goToPrevious}
              aria-label="Previous banner"
            >
              ‹
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              onClick={goToNext}
              aria-label="Next banner"
            >
              ›
            </button>

            <div
              className={styles.dots}
              aria-label="Banner navigation"
            >
              {activePromotions.map((promotion, index) => (
                <button
                  key={promotion.id}
                  type="button"
                  className={`${styles.dot} ${
                    index === currentIndex
                      ? styles.activeDot
                      : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to banner ${index + 1}`}
                  aria-current={
                    index === currentIndex
                      ? "true"
                      : undefined
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
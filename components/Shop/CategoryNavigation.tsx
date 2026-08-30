"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { ShopCategory } from "@/types/category";

import styles from "./CategoryNavigation.module.css";

interface CategoryNavigationProps {
  categories: ShopCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNavigation({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavigationProps) {
  const desktopScrollRef =
    useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

    const mobileScrollRef =
    useRef<HTMLDivElement>(null);

    const [canScrollMobileLeft, setCanScrollMobileLeft] =
    useState(false);

    const [canScrollMobileRight, setCanScrollMobileRight] =
    useState(false);

    

  function updateScrollState() {
    const container = desktopScrollRef.current;

    if (!container) {
      return;
    }

    setCanScrollLeft(container.scrollLeft > 0);

    setCanScrollRight(
      container.scrollLeft + container.clientWidth <
        container.scrollWidth - 1,
    );
  }

 useEffect(() => {
  function updateMobileScrollState() {
    const container = mobileScrollRef.current;

    if (!container) {
      return;
    }

    setCanScrollMobileLeft(
      container.scrollLeft > 1,
    );

    setCanScrollMobileRight(
      container.scrollLeft + container.clientWidth <
        container.scrollWidth - 1,
    );
  }

  updateMobileScrollState();

  const container = mobileScrollRef.current;

  if (!container) {
    return;
  }

  container.addEventListener(
    "scroll",
    updateMobileScrollState,
  );

  const observer = new ResizeObserver(
    updateMobileScrollState,
  );

  observer.observe(container);

  return () => {
    container.removeEventListener(
      "scroll",
      updateMobileScrollState,
    );

    observer.disconnect();
  };
}, [categories]);

  

  useEffect(() => {
    updateScrollState();

    const container = desktopScrollRef.current;

    if (!container) {
      return;
    }

    container.addEventListener(
      "scroll",
      updateScrollState,
    );

    const observer = new ResizeObserver(
      updateScrollState,
    );

    observer.observe(container);

    return () => {
      container.removeEventListener(
        "scroll",
        updateScrollState,
      );

      observer.disconnect();
    };
  }, [categories]);

  function scrollCategories(
    direction: "left" | "right",
  ) {
    const container = desktopScrollRef.current;

    if (!container) {
      return;
    }

    const amount = container.clientWidth * 0.7;

    container.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  }

  function handleCategoryChange(
    categoryId: string,
  ) {
    onCategoryChange(categoryId);

    const container = desktopScrollRef.current;

    if (!container) {
      return;
    }

    const activeButton = container.querySelector(
      `[data-category-id="${categoryId}"]`,
    );

    if (activeButton instanceof HTMLElement) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  return (
    <nav
      className={styles.navigation}
      aria-label="Product categories"
    >
      {/* Desktop */}
      <div className={styles.desktopWrapper}>
        {canScrollLeft && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={() =>
              scrollCategories("left")
            }
            aria-label="Previous categories"
          >
            ‹
          </button>
        )}

        <div
          ref={desktopScrollRef}
          className={styles.desktopNavigation}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              data-category-id={category.id}
              className={`${styles.category} ${
                activeCategory === category.id
                  ? styles.active
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange(category.id)
              }
              aria-current={
                activeCategory === category.id
                  ? "page"
                  : undefined
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={() =>
              scrollCategories("right")
            }
            aria-label="Next categories"
          >
            ›
          </button>
        )}
      </div>

      {/* Mobile */}
      <div className={styles.mobileWrapper}>
  {canScrollMobileLeft && (
    <span
      className={`${styles.mobileHint} ${styles.mobileHintLeft}`}
      aria-hidden="true"
    >
      ‹
    </span>
  )}

  <div
    ref={mobileScrollRef}
    className={styles.mobileRail}
  >
    {categories.map((category) => (
      <button
        key={category.id}
        type="button"
        className={`${styles.category} ${
          activeCategory === category.id
            ? styles.active
            : ""
        }`}
        onClick={() =>
          onCategoryChange(category.id)
        }
        aria-current={
          activeCategory === category.id
            ? "page"
            : undefined
        }
      >
        {category.name}
      </button>
    ))}
  </div>

  {canScrollMobileRight && (
    <span
      className={`${styles.mobileHint} ${styles.mobileHintRight}`}
      aria-hidden="true"
    >
      ›
    </span>
  )}
</div>
    </nav>
  );
}
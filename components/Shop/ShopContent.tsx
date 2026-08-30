"use client";

import { useMemo, useState } from "react";

import type { ShopCategory } from "@/types/category";
import type { ShopProduct } from "@/types/product";

import CategoryNavigation from "./CategoryNavigation";
import ProductGrid from "./ProductGrid";

import styles from "./ShopContent.module.css";

interface ShopContentProps {
  categories: ShopCategory[];
  products: ShopProduct[];
}

export default function ShopContent({
  categories,
  products,
}: ShopContentProps) {
  const [activeCategory, setActiveCategory] =
    useState("offers");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "offers") {
      return products.filter(
        (product) => product.isOffer === true,
      );
    }

    if (activeCategory === "redeem") {
      return products.filter(
        (product) =>
          product.isRedeemable === true,
      );
    }

    return products.filter(
      (product) =>
        product.categoryId === activeCategory,
    );
  }, [products, activeCategory]);

  return (
    <div className={styles.content}>
      <CategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className={styles.products}>
    <ProductGrid products={filteredProducts} />
    </section>
    </div>
  );
}
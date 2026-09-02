"use client";

import { useMemo, useState } from "react";

import type { ShopCategory } from "@/types/category";
import type { ShopProduct } from "@/types/product";
import type { Rewards } from "@/types/reward";

import CategoryNavigation from "./CategoryNavigation";
import ProductGrid from "./ProductGrid";
import RewardsSection from "./RewardsSection";

import styles from "./ShopContent.module.css";

interface ShopContentProps {
  categories: ShopCategory[];
  products: ShopProduct[];
  rewards: Rewards[];
}

export default function ShopContent({
  categories,
  products,
  rewards,
}: ShopContentProps) {

    
  const [activeCategory, setActiveCategory] =
    useState("offers");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "offers") {
      return products.filter(
        (product) => product.isOffer === true,
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

      {activeCategory === "redeem" ? (
  <RewardsSection
    products={products}
    rewards={rewards}
    onKeepEarning={setActiveCategory}
  />
) : (
  <section className={styles.products}>
    <ProductGrid products={filteredProducts} />
  </section>
)}
    </div>
  );
}
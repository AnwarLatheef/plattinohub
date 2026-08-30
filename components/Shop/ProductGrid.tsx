import type { ShopProduct } from "@/types/product";

import ProductCard from "./ProductCard";

import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: ShopProduct[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
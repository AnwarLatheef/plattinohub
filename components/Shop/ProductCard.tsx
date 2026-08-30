import Image from "next/image";

import type { ShopProduct } from "@/types/product";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: ShopProduct;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>
          {product.name}
        </h2>

        <p className={styles.description}>
          {product.description}
        </p>

        <div className={styles.footer}>
          <span className={styles.price}>
            ₹{product.price}
          </span>

          <button
            type="button"
            className={styles.addButton}
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? "ADD" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
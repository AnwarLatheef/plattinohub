"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./ShopNavigation.module.css";

export default function ShopNavigation() {
  return (
    <header className={styles.navigation}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Plattino Hub home"
        >
          <Image
            src="/images/logo/plattino-hub-logo.svg"
            alt="Plattino Hub"
            width={110}
            height={93}
            priority
          />
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            aria-label="Search products"
          >
            <span aria-hidden="true">⌕</span>
          </button>

          <button
            type="button"
            className={styles.actionButton}
            aria-label="Shopping cart"
          >
            <span aria-hidden="true">🛒</span>

            <span className={styles.cartCount}>
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
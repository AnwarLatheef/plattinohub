"use client";

import { useRouter } from "next/navigation";

import type { OrderMode } from "@/types/order";

import styles from "./OrderModeGate.module.css";

const modes: {
  id: OrderMode;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "dine_in",
    title: "Dine-in",
    description: "Enjoy your meal at Plattino Hub.",
    icon: "🍽️",
  },
  {
    id: "takeaway",
    title: "Takeaway",
    description: "Order ahead and pick it up.",
    icon: "🥡",
  },
  {
    id: "delivery",
    title: "Delivery",
    description: "Get your favourites delivered.",
    icon: "🛵",
  },
];

export default function OrderModeGate() {
  const router = useRouter();

  const handleSelect = (mode: OrderMode) => {
    router.push(`/order?mode=${mode}`);
  };

  return (
    <div className={styles.overlay}>
      <section
        className={styles.card}
        aria-labelledby="order-mode-title"
      >
        <p className={styles.eyebrow}>PLATTINO HUB</p>

        <h1 id="order-mode-title" className={styles.title}>
          How would you like to order?
        </h1>

        <p className={styles.subtitle}>
          Choose your order mode to continue.
        </p>

        <div className={styles.options}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={styles.option}
              onClick={() => handleSelect(mode.id)}
            >
              <span className={styles.icon} aria-hidden="true">
                {mode.icon}
              </span>

              <span className={styles.details}>
                <span className={styles.optionTitle}>
                  {mode.title}
                </span>

                <span className={styles.description}>
                  {mode.description}
                </span>
              </span>

              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
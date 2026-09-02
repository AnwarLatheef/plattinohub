import Image from "next/image";

import type { Rewards } from "@/types/reward";
import type { ShopProduct } from "@/types/product";

import styles from "./RewardCard.module.css";

interface RewardCardProps {
  product: ShopProduct;
  reward: Rewards;
  onKeepEarning: (categoryId: string) => void;
}

export default function RewardCard({
  product,
  reward,
  onKeepEarning,
}: RewardCardProps) {
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

        <div className={styles.requiredPoints}>
          <span>🎁</span>
          <span>{reward.requiredPoints} ⭐</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progress}
            style={{
              width: `${reward.progress}%`,
            }}
          />
        </div>

        <p className={styles.message}>
          {reward.message}
        </p>

        {reward.remainingPoints > 0 && (
          <p className={styles.remaining}>
            {reward.remainingPoints} points to go
          </p>
        )}

        {reward.canRedeem ? (
          <button
            type="button"
            className={styles.button}
          >
            REDEEM
          </button>
        ) : (
          <button
            type="button"
            className={styles.button}
            onClick={() =>
              onKeepEarning(product.categoryId)
            }
          >
            KEEP EARNING
          </button>
        )}
      </div>
    </article>
  );
}
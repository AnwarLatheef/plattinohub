import type { Rewards } from "@/types/reward";
import type { ShopProduct } from "@/types/product";

import RewardCard from "./RewardCard";
import styles from "./RewardsSection.module.css";

interface RewardsSectionProps {
  products: ShopProduct[];
  rewards: Rewards[];
  onKeepEarning: (categoryId: string) => void;
}

export default function RewardsSection({
  products,
  rewards,
  onKeepEarning,
}: RewardsSectionProps) {
  const rewardProducts = rewards
    .map((reward) => {
      const product = products.find(
        (product) => product.id === reward.productId
      );

      if (!product) {
        return null;
      }

      return {
        product,
        reward,
      };
    })
    .filter(
      (
        item
      ): item is {
        product: ShopProduct;
        reward: Rewards;
      } => item !== null
    );

  if (rewardProducts.length === 0) {
    return (
      <section className={styles.section}>
        <p className={styles.empty}>
          No rewards available.
        </p>
      </section>
    );
  }

  const currentPoints =
    rewardProducts[0].reward.currentPoints;

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          🎁 PLATTINO REWARDS
        </p>

        <h1 className={styles.title}>
          Your Points
        </h1>

        <p className={styles.points}>
          ⭐ {currentPoints}
        </p>

        <p className={styles.subtitle}>
          Keep enjoying Plattino and unlock more rewards.
        </p>
      </header>

      <div className={styles.grid}>
        {rewardProducts.map(({ product, reward }) => (
          <RewardCard
            key={reward.productId}
            product={product}
            reward={reward}
            onKeepEarning={onKeepEarning}
          />
        ))}
      </div>
    </section>
  );
}
import {
  getProducts,
  getPromotions,
  getRewards,
  getShopCategories,
} from "@/services/api";

import PromoBanner from "./PromoBanner";
import ShopContent from "./ShopContent";
import ShopNavigation from "./ShopNavigation";

export default async function ShopPage() {
  const [promotions, categories, products, rewards] =
    await Promise.all([
      getPromotions(),
      getShopCategories(),
      getProducts(),
      getRewards(),
    ]);

  return (
    <div>
      <ShopNavigation />

      <main>
        <PromoBanner promotions={promotions} />

        <ShopContent
          categories={categories}
          products={products}
          rewards={rewards}
        />
      </main>
    </div>
  );
}
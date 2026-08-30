import {
  getProducts,
  getPromotions,
  getShopCategories,
} from "@/services/api";

import PromoBanner from "./PromoBanner";
import ShopContent from "./ShopContent";
import ShopNavigation from "./ShopNavigation";

export default async function ShopPage() {
  const [promotions, categories, products] =
    await Promise.all([
      getPromotions(),
      getShopCategories(),
      getProducts(),
    ]);

  return (
    <div>
      <ShopNavigation />

      <main>
        <PromoBanner promotions={promotions} />

        <ShopContent
          categories={categories}
          products={products}
        />
      </main>
    </div>
  );
}
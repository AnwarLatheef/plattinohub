import {

  getBranchMenu,
  getProducts,
  getPromotions,
  getRewards,
  getShopCategories,
} from "@/services/api";

import PromoBanner from "./PromoBanner";
import ShopContent from "./ShopContent";
import ShopNavigation from "./ShopNavigation";

interface ShopPageProps {
  branchId?: string;
}

export default async function ShopPage({
  branchId,
}: ShopPageProps) {
  const [promotions, menu, rewards] =
    await Promise.all([
      getPromotions(),

      branchId
        ? getBranchMenu(branchId)
        : Promise.all([
            getShopCategories(),
            getProducts(),
          ]).then(
            ([categories, products]) => ({
              categories,
              products,
            }),
          ),

      getRewards(),
    ]);

  return (
    <div>
      <ShopNavigation />

      <main>
        <PromoBanner promotions={promotions} />

        <ShopContent
          categories={menu.categories}
          products={menu.products}
          rewards={rewards}
        />
      </main>
    </div>
  );
}
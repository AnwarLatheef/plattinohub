import type { ShopCategory } from "@/types/category";
import type { ShopProduct } from "@/types/product";

export interface BranchMenu {
  categories: ShopCategory[];
  products: ShopProduct[];
}
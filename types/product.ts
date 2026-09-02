export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  isAvailable: boolean;
  isOffer?: boolean;
  isRedeemable?: boolean;
}
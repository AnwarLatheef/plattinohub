import type { Campaign } from "@/types/campaign";
import type { ShopProduct } from "@/types/product";

export interface CampaignResult {
  product: ShopProduct;
  campaign?: Campaign;
}

function isCampaignActive(
  campaign: Campaign,
  now: Date,
): boolean {
  const startsAt = new Date(campaign.startsAt);
  const endsAt = new Date(campaign.endsAt);

  return now >= startsAt && now <= endsAt;
}

function campaignMatchesProduct(
  campaign: Campaign,
  product: ShopProduct,
  branchId: string,
): boolean {
  if (
    campaign.branchIds &&
    !campaign.branchIds.includes(branchId)
  ) {
    return false;
  }

  if (
    campaign.productIds &&
    !campaign.productIds.includes(product.id)
  ) {
    return false;
  }

  if (
    campaign.categoryIds &&
    !campaign.categoryIds.includes(
      product.categoryId,
    )
  ) {
    return false;
  }

  return true;
}

function calculateCampaignPrice(
  price: number,
  campaign: Campaign,
): number {
  switch (campaign.type) {
    case "percentage":
      return price - price * (campaign.value / 100);

    case "fixed":
      return price - campaign.value;

    case "fixed_price":
      return campaign.value;

    default:
      return price;
  }
}

export function resolveCampaign(
  product: ShopProduct,
  branchId: string,
  campaigns: Campaign[],
  now: Date = new Date(),
): CampaignResult {
  const applicableCampaigns = campaigns
    .filter((campaign) =>
      isCampaignActive(campaign, now),
    )
    .filter((campaign) =>
      campaignMatchesProduct(
        campaign,
        product,
        branchId,
      ),
    )
    .sort(
      (a, b) => b.priority - a.priority,
    );

  const winningCampaign =
    applicableCampaigns[0];

  if (!winningCampaign) {
    return {
      product,
    };
  }

  const finalPrice = calculateCampaignPrice(
    product.price,
    winningCampaign,
  );

  return {
    product: {
      ...product,
      originalPrice: product.price,
      price: Math.max(0, finalPrice),
      isOffer: true,
    },
    campaign: winningCampaign,
  };
}
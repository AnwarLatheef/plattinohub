
import bannerData from '@/mock/banners.json';
import aboutData from '@/mock/about.json';
import servicesData from "@/mock/services.json";
import storesData from "@/mock/stores.json";
import footerData from "@/mock/footer.json";

import promotionsData from "@/mock/promotions.json";
import categoriesData from "@/mock/categories.json";
import productsData from "@/mock/products.json";
import rewardsData from "@/mock/rewards.json";
import branchProductsData from "@/mock/branch-products.json";
import branchCategoriesData from "@/mock/branch-categories.json";


import campaignData from "@/mock/campaigns.json"



import {env} from "@/config/env";

import api from "@/services/axios";


import type {HeroBanner} from "@/types/banner";
import type { AboutContent } from "@/types/about";
import type{ ServiceCategory } from '@/types/service';
import type{ Store } from '@/types/store';
import type{ FooterContent } from '@/types/footer';


import type { Promotion } from "@/types/promotion";
import type { ShopCategory } from "@/types/category";
import type { ShopProduct } from "@/types/product";
import type { Rewards } from "@/types/reward";
import type { BranchProduct } from "@/types/branchProduct";
import type { BranchCategory } from "@/types/branchCategory";
import type { BranchMenu } from "@/types/branchMenu";


import type {Campaign} from "@/types/campaign";

import {resolveCampaign} from "@/services/campaigns"

import type {
  ContactMessage,
  ContactResponse,
} from "@/types/contact";



export async function getHeroBanners(): Promise<HeroBanner[]> {
    if (env.useMockApi){
        return bannerData as HeroBanner[];
    }

    const response = await api.get<HeroBanner[]>("/banners");
    return response.data;
}

export async function getAbout(): Promise<AboutContent> {
    if (env.useMockApi){
        return aboutData as AboutContent;
    }

    const response = await api.get<AboutContent>("/about");
    return response.data;
    
}

export async function getServices(): Promise<ServiceCategory[]> {

    if (env.useMockApi){
        return servicesData as ServiceCategory[];
    }

    const response = await api.get<ServiceCategory[]>("/services");
    return response.data;
    
}

export async function getStores(): Promise<Store[]> {

    if (env.useMockApi){
        return storesData as Store[];
    }

    const response = await api.get<Store[]>("/stores");
    return response.data;
    
}


export async function  getFooter(): Promise<FooterContent> {

    if (env.useMockApi){
        return footerData as FooterContent;
    }

    const response = await api.get<FooterContent>("/footer");
    return response.data;
    
}


export async function submitContactMessage(
    data: ContactMessage,
): Promise<ContactResponse> {
    if (env.useMockApi){
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });

        console.log("Mock contact submission: ", data);

        return{
            success:true,
            message: "Your message has been sent successfully.",
        };

    }

    const response = await api.post<ContactResponse>("/contact/messages", data,);

    return response.data;
}



export async function getPromotions(): Promise<Promotion[]> {
  if (env.useMockApi) {
    return promotionsData as Promotion[];
  }

  const response = await api.get<Promotion[]>("/promotions");
  return response.data;
}


export async function getShopCategories(): Promise<ShopCategory[]> {
  if (env.useMockApi) {
    return categoriesData as ShopCategory[];
  }

  const response = await api.get<ShopCategory[]>("/categories");

  return response.data;
}

export async function getProducts(): Promise<ShopProduct[]> {
  if (env.useMockApi) {
    return productsData as ShopProduct[];
  }

  const response = await api.get<ShopProduct[]>("/products");

  return response.data;
}

export async function getBranchProducts(
  branchId: string,
): Promise<ShopProduct[]> {
  if (env.useMockApi) {
    const branchProducts =
      (branchProductsData as BranchProduct[]).filter(
        (branchProduct) =>
          branchProduct.branchId === branchId,
      );

    const products = productsData as ShopProduct[];

    return products
      .map((product) => {
        const branchProduct = branchProducts.find(
          (item) => item.productId === product.id,
        );

        if (!branchProduct) {
          return null;
        }

        return {
          ...product,
          price: branchProduct.price,
          isAvailable: branchProduct.isAvailable,
        };
      })
      .filter(
        (product): product is ShopProduct =>
          product !== null,
      );
  }

  const response = await api.get<ShopProduct[]>(
    `/branches/${branchId}/products`,
  );

  return response.data;
}

export async function getRewards(): Promise<Rewards[]> {
  if (env.useMockApi) {
    return rewardsData as Rewards[];
  }

  const response = await api.get<Rewards[]>("/rewards/available");

  return response.data;
}

export async function getBranchCategories(
  branchId: string,
): Promise<BranchCategory[]> {
  if (env.useMockApi) {
    return (
      branchCategoriesData as BranchCategory[]
    ).filter(
      (branchCategory) =>
        branchCategory.branchId === branchId,
    );
  }

  const response = await api.get<BranchCategory[]>(
    `/branches/${branchId}/categories`,
  );

  return response.data;
}



// export async function getBranchMenuCategories(
//   branchId: string,
// ): Promise<ShopCategory[]> {
//   const [categories, branchCategories, products] =
//     await Promise.all([
//       getShopCategories(),
//       getBranchCategories(branchId),
//       getBranchProducts(branchId),
//     ]);

//   const branchCategoryMap = new Map(
//     branchCategories.map((category) => [
//       category.categoryId,
//       category,
//     ]),
//   );

//   const availableCategoryIds = new Set(
//     products
//       .filter((product) => product.isAvailable)
//       .map((product) => product.categoryId),
//   );

//   return categories
//     .filter((category) => {
//       // Offers and Redeem are special Shop sections,
//       // not branch-configured product categories.
//       if (
//         category.id === "offers" ||
//         category.id === "redeem"
//       ) {
//         return true;
//       }

//       const branchCategory =
//         branchCategoryMap.get(category.id);

//       if (!branchCategory?.isEnabled) {
//         return false;
//       }

//       return availableCategoryIds.has(category.id);
//     })
//     .sort((a, b) => {
//       const orderA =
//         branchCategoryMap.get(a.id)?.displayOrder ??
//         Number.MAX_SAFE_INTEGER;

//       const orderB =
//         branchCategoryMap.get(b.id)?.displayOrder ??
//         Number.MAX_SAFE_INTEGER;

//       return orderA - orderB;
//     });
// }


export async function getBranchMenu(
  branchId: string,
): Promise<BranchMenu> {
  const [
    categories,
    branchCategories,
    products,
    campaigns,
  ] = await Promise.all([
    getShopCategories(),
    getBranchCategories(branchId),
    getBranchProducts(branchId),
    getCampaigns(),
  ]);

  const resolvedProducts = products.map(
    (product) =>
      resolveCampaign(
        product,
        branchId,
        campaigns,
      ).product,
  );

  const branchCategoryMap = new Map(
    branchCategories.map((category) => [
      category.categoryId,
      category,
    ]),
  );

  const availableCategoryIds = new Set(
    resolvedProducts
      .filter((product) => product.isAvailable)
      .map((product) => product.categoryId),
  );

  const offersCategory = categories.find(
    (category) => category.id === "offers",
  );

  const redeemCategory = categories.find(
    (category) => category.id === "redeem",
  );

  const productCategories = categories
    .filter(
      (category) =>
        category.id !== "offers" &&
        category.id !== "redeem",
    )
    .filter((category) => {
      const branchCategory =
        branchCategoryMap.get(category.id);

      if (!branchCategory?.isEnabled) {
        return false;
      }

      return availableCategoryIds.has(
        category.id,
      );
    })
    .sort((a, b) => {
      const orderA =
        branchCategoryMap.get(a.id)
          ?.displayOrder ??
        Number.MAX_SAFE_INTEGER;

      const orderB =
        branchCategoryMap.get(b.id)
          ?.displayOrder ??
        Number.MAX_SAFE_INTEGER;

      return orderA - orderB;
    });

  const effectiveCategories = [
    ...(offersCategory
      ? [offersCategory]
      : []),
    ...productCategories,
    ...(redeemCategory
      ? [redeemCategory]
      : []),
  ];

  return {
    categories: effectiveCategories,
    products: resolvedProducts,
  };
}


export async function getCampaigns(): Promise<Campaign[]> {
    if (env.useMockApi) {
        return campaignData as Campaign[];
    }

    const response = await api.get<Campaign[]>("/campaigns");

    return response.data;
}
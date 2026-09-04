export type CampaignType = 
     | "percentage"
     | "fixed"
     | "fixed_price";


export interface Campaign {
    id: string;
    name: string;
    label: string;

    type: CampaignType;
    value: number;

    priority: number;

    startsAt: string;
    endsAt: string;

    branchIds?: string[];
    productIds?: string[];
    categoryIds?: string[];
}
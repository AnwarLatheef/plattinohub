
import bannerData from '@/mock/banners.json';
import aboutData from '@/mock/about.json';
import servicesData from "@/mock/services.json";
import storesData from "@/mock/stores.json";
import footerData from "@/mock/footer.json";

import {env} from "@/config/env";

import api from "@/services/axios";

import type {HeroBanner} from "@/types/banner";
import type { AboutContent } from "@/types/about";
import type{ ServiceCategory } from '@/types/service';
import type{ Store } from '@/types/store';
import type{ FooterContent } from '@/types/footer';

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


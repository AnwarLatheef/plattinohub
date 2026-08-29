export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  label: string;
  href: string;
}

export interface FooterContent {
  brandDescription: string;
  navigation: FooterLink[];
  socialLinks: FooterSocial[];
  copyright: string;
  legalLinks: FooterLink[];
  isActive: boolean;
}
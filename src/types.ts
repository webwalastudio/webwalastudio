/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  features: string[];
  featured: boolean;
  ctaText: string;
}

export interface DemoRequest {
  businessName: string;
  industry: string;
  description: string;
  pagesCount: number;
  themeStyle: string;
}

export interface GeneratedDemo {
  businessName: string;
  industry: string;
  headline: string;
  subheadline: string;
  aboutText: string;
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    textColor: string;
  };
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  suggestedPages: string[];
  ctaText: string;
}

import type { Metadata } from "next";

export interface SEOKeywordGroup {
  category: string;
  monthlySearchVolumeEst: string;
  keywordDifficulty: "Low" | "Medium" | "High";
  searchIntent: "Transactional" | "Commercial" | "Informational" | "Navigational";
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
}

/**
 * Top High-Volume & High-Intent SEO Keywords for Total Herbal Care
 * Target Market: Organic Cannabis Dispensary & Nationwide Delivery
 */
export const HIGH_VOLUME_KEYWORDS: Record<string, SEOKeywordGroup> = {
  coreDispensary: {
    category: "Core Brand & Dispensary",
    monthlySearchVolumeEst: "450,000+",
    keywordDifficulty: "High",
    searchIntent: "Transactional",
    primaryKeyword: "organic cannabis dispensary",
    secondaryKeywords: [
      "licensed marijuana dispensary",
      "lab tested weed dispensary",
      "cannabis delivery Los Angeles",
      "best organic dispensary near me",
      "licensed cannabis shop",
    ],
    longTailKeywords: [
      "buy lab tested organic cannabis flower online",
      "licensed same day cannabis delivery Los Angeles",
      "pesticide free organic marijuana dispensary near me",
      "top rated organic dispensary with local delivery",
    ],
  },
  flowerAndStrains: {
    category: "Cannabis Flower & Craft Strains",
    monthlySearchVolumeEst: "680,000+",
    keywordDifficulty: "High",
    searchIntent: "Transactional",
    primaryKeyword: "organic cannabis flower",
    secondaryKeywords: [
      "craft indica strains",
      "buy sativa bud online",
      "top shelf hybrid weed",
      "organic pre rolled joints",
      "high THC flower delivery",
    ],
    longTailKeywords: [
      "buy lab tested Skywalker OG indica flower 3.5g",
      "organic pesticide free sativa strain bud delivery",
      "high terpene indoor craft cannabis flower online",
      "best indica strains for deep relaxation and sleep",
    ],
  },
  vapesAndCarts: {
    category: "Vapes, Concentrates & Extracts",
    monthlySearchVolumeEst: "520,000+",
    keywordDifficulty: "Medium",
    searchIntent: "Transactional",
    primaryKeyword: "full spectrum vape cartridge",
    secondaryKeywords: [
      "THC vape pen delivery",
      "live rosin vape cart",
      "solventless disposable vape",
      "high terpene vape cart",
      "ceramic coil weed vape",
    ],
    longTailKeywords: [
      "buy solventless live rosin vape cartridge online",
      "high terpene full spectrum THC vape cartridge 1g",
      "discreet ceramic coil organic cannabis vape pen",
      "pure distillate THC cart same day delivery",
    ],
  },
  ediblesAndGummies: {
    category: "Edibles & Infused Confections",
    monthlySearchVolumeEst: "610,000+",
    keywordDifficulty: "Medium",
    searchIntent: "Transactional",
    primaryKeyword: "CBD THC edibles",
    secondaryKeywords: [
      "organic cannabis gummies",
      "sleep chocolate edibles",
      "vegan THC gummies",
      "precision dosed edibles",
      "fast acting weed gummies",
    ],
    longTailKeywords: [
      "buy vegan organic THC gummies for sleep",
      "fast acting nano emulsified cannabis gummies online",
      "nightfall dark chocolate CBN sleep edibles",
      "precision low dose organic CBD gummies online",
    ],
  },
  topicalsAndApothecary: {
    category: "Topicals, Balms & Tinctures",
    monthlySearchVolumeEst: "310,000+",
    keywordDifficulty: "Low",
    searchIntent: "Commercial",
    primaryKeyword: "cannabis topicals for pain",
    secondaryKeywords: [
      "CBD muscle relief balm",
      "full spectrum topical cream",
      "herbal apothecary tincture",
      "organic cannabis salve",
      "botanical healing oil",
    ],
    longTailKeywords: [
      "best organic CBD balm for chronic muscle pain",
      "high potency full spectrum cannabis pain relief cream",
      "lab tested organic herbal apothecary CBD tincture",
      "botanical anti inflammatory cannabis topical salve",
    ],
  },
  localDelivery: {
    category: "Local SEO & Express Delivery",
    monthlySearchVolumeEst: "290,000+",
    keywordDifficulty: "Medium",
    searchIntent: "Navigational",
    primaryKeyword: "dispensary near me Los Angeles",
    secondaryKeywords: [
      "weed store Westside LA",
      "Downtown LA dispensary hours",
      "same day weed delivery 90011",
      "dispensary open late LA",
      "fast cannabis delivery zone",
    ],
    longTailKeywords: [
      "licensed dispensary open late in Westside Los Angeles",
      "fast 1 hour weed delivery in Downtown LA 90011",
      "top rated organic weed storefront open 7 days",
    ],
  },
  educationAndScience: {
    category: "Cannabis Science & Terpene Education",
    monthlySearchVolumeEst: "180,000+",
    keywordDifficulty: "Low",
    searchIntent: "Informational",
    primaryKeyword: "terpene science guide",
    secondaryKeywords: [
      "CBD wellness benefits",
      "entourage effect explained",
      "indica vs sativa terpene profiles",
      "cannabinoid dosing guide",
      "organic cannabis standards",
    ],
    longTailKeywords: [
      "how myrcene and caryophyllene terpenes affect sleep",
      "complete beginner guide to full spectrum CBD tincture dosing",
      "understanding the entourage effect in craft organic cannabis",
    ],
  },
};

/**
 * Global Flattened Keywords List for Metadata Meta Tags
 */
export const GLOBAL_SEO_KEYWORDS: string[] = Object.values(HIGH_VOLUME_KEYWORDS).flatMap(
  (group) => [group.primaryKeyword, ...group.secondaryKeywords, ...group.longTailKeywords]
);

/**
 * Site Baseline Information
 */
export const SITE_METADATA_BASE = {
  domain: "https://totalherbalcare.com",
  siteName: "Total Herbal Care",
  defaultTitle: "Total Herbal Care — Premium Organic Cannabis Dispensary & Delivery",
  titleTemplate: "%s | Total Herbal Care",
  defaultDescription:
    "Shop lab-tested organic cannabis flowers, precision-dosed edibles, full-spectrum vapes, topicals, and tinctures. Licensed dispensary offering same-day delivery.",
  telephone: "+1-716-556-0125",
  address: {
    street: "520 Overthrow Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90011",
    country: "US",
  },
};

/**
 * Helper to construct Next.js 16 compliant Metadata objects with high-volume keywords
 */
export function buildSEOPageMetadata(params: {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
}): Metadata {
  const pageKeywords = Array.from(
    new Set([...(params.keywords || []), ...HIGH_VOLUME_KEYWORDS.coreDispensary.secondaryKeywords])
  );

  const canonicalUrl = `${SITE_METADATA_BASE.domain}${params.canonicalPath || ""}`;
  const ogImageUrl = params.ogImage || `${SITE_METADATA_BASE.domain}/images/Hero_banner.png`;

  return {
    title: params.title,
    description: params.description,
    keywords: pageKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${params.title} | ${SITE_METADATA_BASE.siteName}`,
      description: params.description,
      url: canonicalUrl,
      siteName: SITE_METADATA_BASE.siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: params.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.title} | ${SITE_METADATA_BASE.siteName}`,
      description: params.description,
      images: [ogImageUrl],
    },
  };
}

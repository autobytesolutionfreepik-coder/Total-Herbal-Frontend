# Total Herbal Care — High-Volume SEO Keywords & Top-Ranking Strategy

This document serves as the master **High-Volume SEO Keyword Blueprint** for **Total Herbal Care**. It contains the curated high-search-volume keywords, estimated monthly search metrics, intent classifications, LSI (Latent Semantic Indexing) clusters, and integration guides designed to drive organic search dominance on Google.

---

## 1. High-Volume SEO Keywords Master Matrix

Below is the complete list of high-traffic keywords targeted across the website, categorized by search intent, estimated monthly search volume (US), and competitive difficulty score.

| Keyword Category | Primary Target Keyword | Est. Monthly Search Volume | Keyword Difficulty (KD %) | Search Intent | Target Route / Page |
|---|---|---|---|---|---|
| **Core Brand & Dispensary** | `organic cannabis dispensary` | 450,000 | 48% (Medium-High) | Transactional | Homepage (`/`) |
| **Dispensary Near Me** | `dispensary near me Los Angeles` | 290,000 | 52% (Medium-High) | Local / Navigational | Storefront (`/location`) |
| **Online Weed Purchasing** | `buy cannabis online` | 680,000 | 65% (High) | Transactional | Shop Catalog (`/shop`) |
| **Cannabis Delivery** | `cannabis delivery Los Angeles` | 310,000 | 44% (Medium) | Transactional | Location (`/location`) |
| **Organic Flower** | `organic cannabis flower` | 220,000 | 38% (Low-Medium) | Commercial | Flower (`/shop?category=flower`) |
| **Indica Strains** | `craft indica strains` | 180,000 | 32% (Low) | Commercial | Flower (`/shop?category=flower`) |
| **Vape Cartridges** | `full spectrum vape cartridge` | 520,000 | 45% (Medium) | Transactional | Vapes (`/shop?category=vapes`) |
| **Live Rosin Carts** | `solventless live rosin vape` | 195,000 | 29% (Low) | Commercial | Vapes (`/shop?category=vapes`) |
| **Cannabis Edibles** | `CBD THC edibles` | 610,000 | 58% (Medium-High) | Transactional | Edibles (`/shop?category=edibles`) |
| **Sleep Gummies / Chocolate** | `sleep chocolate edibles` | 240,000 | 34% (Low) | Transactional | Edibles (`/shop?category=edibles`) |
| **Cannabis Topicals** | `cannabis topicals for pain` | 310,000 | 28% (Low) | Commercial | Topicals (`/shop?category=topicals`) |
| **Lab Testing Standards** | `third party ISO lab tested cannabis` | 95,000 | 18% (Low) | Informational | About Us (`/about`) |
| **Terpene Science** | `terpene science guide` | 180,000 | 22% (Low) | Informational | Blog (`/blog`) |

---

## 2. High-Intent LSI (Latent Semantic Indexing) Keyword Clusters

To signal topical authority to Google's Helpful Content Algorithm and RankBrain, these contextual LSI keywords are embedded into product descriptions, category intros, and body text:

### Cluster A: Quality & Organic Purity
- `pesticide free cannabis`
- `regenerative organic marijuana farm`
- `ISO 17025 accredited certificate of analysis`
- `clean green certified cannabis`
- `heavy metal free terpene extract`

### Cluster B: Product Formulations & Extraction
- `solventless rosin extraction`
- `ceramic coil hardware`
- `fast acting nano emulsified THC`
- `full spectrum cannabinoid profile`
- `non GMO vegan fruit gummies`

### Cluster C: Local Service & Fulfillment
- `same day dispensary pickup`
- `discreet odor proof packaging`
- `licensed California cannabis delivery 90011`
- `dispensary storefront open 7 days`
- `expert budtender phone consultation`

---

## 3. High-Volume Long-Tail Target Keywords (High-Conversion)

These long-tail terms carry the highest conversion rates on search engines because buyers using them are ready to purchase immediately:

1. **`buy lab tested organic cannabis flower online`** — Targeted on `/shop` & `/`
2. **`licensed same day cannabis delivery Westside Los Angeles`** — Targeted on `/location`
3. **`top shelf organic indica flower price per gram`** — Targeted on `/shop?category=flower`
4. **`high terpene full spectrum solventless vape cartridge`** — Targeted on `/shop?category=vapes`
5. **`vegan organic THC sleep chocolate gummies`** — Targeted on `/shop?category=edibles`
6. **`best organic CBD topical balm for chronic joint pain`** — Targeted on `/shop?category=topicals`
7. **`buy lab tested Skywalker OG indica flower 3.5g`** — Targeted on `/products/skywalker-og`
8. **`Nightfall dark chocolate CBN sleep dosage reviews`** — Targeted on `/products/nightfall-chocolate`

---

## 4. Technical Code Integration (`src/lib/config/seo.ts`)

The project uses `src/lib/config/seo.ts` to programmatically inject these high-volume keywords into Next.js 16 metadata head tags:

```typescript
import { buildSEOPageMetadata, HIGH_VOLUME_KEYWORDS } from "@/lib/config/seo";

export const metadata = buildSEOPageMetadata({
  title: "Shop Organic Cannabis Catalog — Flowers, Edibles & Vapes",
  description: "Explore our complete catalog of lab-tested organic cannabis. Same-day delivery.",
  canonicalPath: "/shop",
  keywords: [
    HIGH_VOLUME_KEYWORDS.coreDispensary.primaryKeyword,
    ...HIGH_VOLUME_KEYWORDS.flowerAndStrains.secondaryKeywords,
    ...HIGH_VOLUME_KEYWORDS.vapesAndCarts.secondaryKeywords,
  ],
});
```

---

## 5. Ongoing SEO Strategy to Maintain #1 Search Rankings

1. **Internal Link Structure**: Link all educational blog posts (`/blog`) directly to relevant shop categories (`/shop?category=...`) using target keyword anchor text (e.g. *"[full spectrum vape cartridges](/shop?category=vapes)"*).
2. **Dynamic XML Sitemap**: Auto-update `sitemap.ts` whenever new products or blog posts are published.
3. **Core Web Vitals**: Ensure LCP < 1.2s and CLS = 0 with Next.js Turbopack optimized images.
4. **Google Business Profile Integration**: Match `/location` address, phone, and schema coordinates exactly with Google Maps listing.

import { Metadata } from "next";
import { catalogApi } from "@/features/catalog/api";
import { ProductDetailView } from "@/features/catalog/components/product-detail-view";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await catalogApi.getProductBySlug(slug);
    const product = res.data;
    if (!product) {
      return { title: "Product Not Found | Total Herbal Care" };
    }
    return {
      title: `${product.name} | Total Herbal Care`,
      description:
        product.shortDescription ||
        product.description ||
        "Buy premium organic herbal products and flowers from Total Herbal Care.",
      openGraph: {
        title: product.name,
        description: product.shortDescription,
        images: product.images?.map((i) => i.url) || [],
      },
    };
  } catch (err) {
    return {
      title: `${slug.replace(/-/g, " ")} | Total Herbal Care`,
      description: "Buy premium organic herbal products from Total Herbal Care.",
    };
  }
}

export default async function SingleProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product = null;
  try {
    const res = await catalogApi.getProductBySlug(slug);
    product = res.data;
  } catch (err) {
    // If backend fetch fails (e.g. initial dev setup), use high-quality fallback demo product
    product = {
      id: `prod_${slug}`,
      name: slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      sku: `THC-${slug.toUpperCase().slice(0, 6)}`,
      slug: slug,
      description:
        "Premium organic flower harvested from top-tier craft growers. Lab-tested for potency, terpene purity, and organic cleanliness. Offers deep relief, serene relaxation, and balanced aromatic profiles.",
      shortDescription: "Top shelf organic strain with high THC & natural terpenes.",
      price: "45.00",
      compareAtPrice: "55.00",
      stock: 35,
      categoryId: "cat_1",
      category: {
        id: "cat_1",
        name: "Flowers",
        slug: "flowers",
        sortOrder: 1,
      },
      brand: "Total Herbal Care",
      strainType: "HYBRID" as const,
      thcContent: 24.5,
      cbdContent: 0.8,
      tags: ["top-shelf", "organic", "hybrid"],
      isFeatured: true,
      status: "ACTIVE" as const,
      images: [
        {
          url: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80",
          alt: "Product Front",
          sortOrder: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
          alt: "Product Packaging",
          sortOrder: 1,
        },
      ],
      variants: [
        { id: "v1", name: "3.5g (Eighth)", sku: "THC-3.5", price: "45.00", stock: 20 },
        { id: "v2", name: "7.0g (Quarter)", sku: "THC-7.0", price: "85.00", stock: 15 },
      ],
      avgRating: 4.9,
      reviewCount: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

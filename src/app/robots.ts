import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/account/",
        "/cart",
        "/checkout",
        "/login",
        "/sign-in",
        "/sign-up",
        "/api/",
      ],
    },
    sitemap: "https://totalherbalcare.com/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://lealdistribuidora.com.br";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/empresa`, lastModified: new Date() },
    { url: `${baseUrl}/catalogo`, lastModified: new Date() },
    { url: `${baseUrl}/contato`, lastModified: new Date() },
  ];

  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("active", true);

    const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((product) => ({
      url: `${baseUrl}/catalogo/${product.slug}`,
      lastModified: new Date(product.updated_at),
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}

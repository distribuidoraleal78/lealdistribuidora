import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getFeaturedProducts } from "@/services/products.service";
import { ProductCard } from "./ProductCard";

export async function FeaturedProducts() {
  const supabase = await createClient();
  const products = await getFeaturedProducts(supabase, 8);

  if (products.length === 0) return null;

  return (
    <section className="container-page py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Produtos em destaque</h2>
        <Link href="/catalogo" className="text-sm text-brand-200 hover:underline">
          Ver catálogo completo
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getPublicProducts, getFilterOptions } from "@/services/products.service";
import { CatalogFilters } from "@/components/public/CatalogFilters";
import { ProductCard } from "@/components/public/ProductCard";
import type { ProductSortOption } from "@/types/product";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Consulte nosso catálogo de produtos e monte seu pedido.",
};

interface CatalogoPageProps {
  searchParams: {
    search?: string;
    brand?: string;
    category?: string;
    packaging?: string;
    sort?: string;
  };
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const supabase = createClient();

  const [products, filterOptions] = await Promise.all([
    getPublicProducts(supabase, {
      search: searchParams.search,
      brand: searchParams.brand,
      category: searchParams.category,
      packaging: searchParams.packaging,
      sort: (searchParams.sort as ProductSortOption) ?? "name",
    }),
    getFilterOptions(supabase),
  ]);

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-white">Catálogo</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Encontre os produtos e adicione ao seu pedido.
      </p>

      <div className="mt-6">
        <CatalogFilters
          brands={filterOptions.brands}
          categories={filterOptions.categories}
          packagings={filterOptions.packagings}
        />
      </div>

      {products.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <PackageSearch className="text-ink-border" size={40} aria-hidden="true" />
          <p className="text-sm text-ink-muted">
            Nenhum produto encontrado com esses filtros.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/services/products.service";
import { AddToCartButton } from "@/components/public/AddToCartButton";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = createClient();
  const product = await getProductBySlug(supabase, params.slug);

  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: product.description ?? `${product.name} — ${product.brand ?? ""}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = createClient();
  const product = await getProductBySlug(supabase, params.slug);

  if (!product) notFound();

  // Contagem de visualização — não bloqueia a renderização se falhar.
  supabase.rpc("increment_product_views", { product_id: product.id }).then(() => {});

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-card border border-ink-border bg-ink-soft">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={320}
              height={320}
              className="h-full w-full object-contain p-6"
            />
          ) : (
            <Package className="text-ink-border" size={64} aria-hidden="true" />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          {product.brand && (
            <p className="mt-1 text-sm text-brand-200">{product.brand}</p>
          )}

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {product.description}
            </p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {product.code && (
              <div>
                <dt className="text-ink-muted">Código</dt>
                <dd className="text-white">{product.code}</dd>
              </div>
            )}
            {product.category && (
              <div>
                <dt className="text-ink-muted">Categoria</dt>
                <dd className="text-white">{product.category}</dd>
              </div>
            )}
            {product.packaging && (
              <div>
                <dt className="text-ink-muted">Embalagem</dt>
                <dd className="text-white">{product.packaging}</dd>
              </div>
            )}
            {product.weight && (
              <div>
                <dt className="text-ink-muted">Peso</dt>
                <dd className="text-white">{product.weight}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

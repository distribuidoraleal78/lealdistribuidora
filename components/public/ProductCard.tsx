"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col rounded-card border border-ink-border bg-ink-soft p-3">
      <Link href={`/catalogo/${product.slug}`} className="block">
        <div className="flex h-32 items-center justify-center rounded-md bg-ink-900">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={160}
              height={128}
              className="h-32 w-full object-contain p-2"
            />
          ) : (
            <Package className="text-ink-border" size={32} aria-hidden="true" />
          )}
        </div>
        <p className="mt-3 line-clamp-2 text-sm font-medium text-white">{product.name}</p>
        <p className="mt-1 text-xs text-ink-muted">
          {product.code ? `Cód. ${product.code}` : ""}
          {product.code && product.brand ? " · " : ""}
          {product.brand ?? ""}
        </p>
      </Link>
      <button
        type="button"
        onClick={() => {
          addItem(product);
          toast.success(`${product.name} adicionado ao pedido`);
        }}
        className="mt-3 flex items-center justify-center gap-1 rounded-md bg-brand-400 py-2 text-xs font-semibold text-ink-900 hover:opacity-90"
      >
        <Plus size={14} aria-hidden="true" />
        Adicionar ao pedido
      </button>
    </div>
  );
}

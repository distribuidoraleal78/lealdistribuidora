"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Edit, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteProductAction,
  toggleActiveAction,
  duplicateProductAction,
} from "@/app/actions/products.actions";
import type { Product } from "@/types/product";

export function ProductRowActions({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleActive = () => {
    startTransition(async () => {
      await toggleActiveAction(product.id, !product.active);
      toast.success(product.active ? "Produto desativado" : "Produto ativado");
    });
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      await duplicateProductAction(product.id);
      toast.success("Produto duplicado");
    });
  };

  const handleDelete = () => {
    if (!confirm(`Excluir "${product.name}" definitivamente? Essa ação não pode ser desfeita.`)) {
      return;
    }
    startTransition(async () => {
      await deleteProductAction(product.id, product.image_url);
      toast.success("Produto excluído");
    });
  };

  return (
    <div className="flex items-center gap-3 text-ink-muted">
      <button
        type="button"
        onClick={handleToggleActive}
        disabled={isPending}
        className="text-xs hover:text-white"
      >
        {product.active ? "Desativar" : "Ativar"}
      </button>
      <Link
        href={`/admin/produtos/${product.id}/editar`}
        className="hover:text-white"
        aria-label="Editar"
      >
        <Edit size={16} />
      </Link>
      <button type="button" onClick={handleDuplicate} disabled={isPending} className="hover:text-white" aria-label="Duplicar">
        <Copy size={16} />
      </button>
      <button type="button" onClick={handleDelete} disabled={isPending} className="hover:text-red-400" aria-label="Excluir">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

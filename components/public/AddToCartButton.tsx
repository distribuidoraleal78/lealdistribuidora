"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border border-ink-border">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center text-white hover:bg-ink-soft"
          aria-label="Diminuir quantidade"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center text-sm text-white">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-10 w-10 items-center justify-center text-white hover:bg-ink-soft"
          aria-label="Aumentar quantidade"
        >
          <Plus size={16} />
        </button>
      </div>

      <Button
        onClick={() => {
          addItem(product, quantity);
          toast.success(`${product.name} adicionado ao pedido`);
        }}
      >
        Adicionar ao pedido
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types/product";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : label}
    </Button>
  );
}

interface ProductFormProps {
  action: (formData: FormData) => void;
  product?: Product;
  submitLabel: string;
}

export function ProductForm({ action, product, submitLabel }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null);
  const [removeImage, setRemoveImage] = useState(false);

  return (
    <form action={action} className="max-w-2xl space-y-5">
      {product && (
        <input type="hidden" name="currentImageUrl" value={product.image_url ?? ""} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-ink-muted">
            Nome
          </label>
          <Input id="name" name="name" defaultValue={product?.name} required />
        </div>
        <div>
          <label htmlFor="code" className="mb-1 block text-sm text-ink-muted">
            Código
          </label>
          <Input id="code" name="code" defaultValue={product?.code ?? ""} />
        </div>
        <div>
          <label htmlFor="brand" className="mb-1 block text-sm text-ink-muted">
            Marca
          </label>
          <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-sm text-ink-muted">
            Categoria
          </label>
          <Input id="category" name="category" defaultValue={product?.category ?? ""} />
        </div>
        <div>
          <label htmlFor="packaging" className="mb-1 block text-sm text-ink-muted">
            Embalagem
          </label>
          <Input id="packaging" name="packaging" defaultValue={product?.packaging ?? ""} />
        </div>
        <div>
          <label htmlFor="weight" className="mb-1 block text-sm text-ink-muted">
            Peso
          </label>
          <Input id="weight" name="weight" defaultValue={product?.weight ?? ""} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm text-ink-muted">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-ink-muted">Foto</label>
        {imagePreview && !removeImage && (
          <div className="mb-3 flex items-center gap-3">
            <Image
              src={imagePreview}
              alt="Prévia"
              width={64}
              height={64}
              className="h-16 w-16 rounded-md border border-ink-border object-contain"
            />
            {product?.image_url && (
              <label className="flex items-center gap-2 text-xs text-ink-muted">
                <input
                  type="checkbox"
                  name="removeImage"
                  checked={removeImage}
                  onChange={(e) => setRemoveImage(e.target.checked)}
                  className="w-auto"
                />
                Remover foto atual
              </label>
            )}
          </div>
        )}
        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center gap-2 rounded-card border border-dashed border-ink-border p-6 text-center text-sm text-ink-muted hover:border-brand-400"
        >
          <Upload size={20} aria-hidden="true" />
          Arraste a imagem ou clique para enviar
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
                setRemoveImage(false);
              }
            }}
          />
        </label>
      </div>

      <div className="flex items-center gap-6 text-sm text-ink-muted">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product?.active ?? true}
            className="w-auto"
          />
          Ativo
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="w-auto"
          />
          Produto em destaque
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="order">Ordem</label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={product?.order ?? 0}
            className="w-20"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}

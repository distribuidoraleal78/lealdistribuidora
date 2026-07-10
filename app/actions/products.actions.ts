"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  duplicateProduct,
} from "@/services/products.service";
import { uploadProductImage, deleteProductImage, buildImageKey } from "@/lib/r2";
import { slugify } from "@/lib/utils";
import type { ProductInput } from "@/types/product";

function parseProductForm(formData: FormData): Omit<ProductInput, "image_url" | "slug"> & {
  slug: string;
} {
  const name = String(formData.get("name") ?? "").trim();

  return {
    name,
    slug: slugify(name),
    description: (formData.get("description") as string) || null,
    brand: (formData.get("brand") as string) || null,
    category: (formData.get("category") as string) || null,
    code: (formData.get("code") as string) || null,
    packaging: (formData.get("packaging") as string) || null,
    weight: (formData.get("weight") as string) || null,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    order: Number(formData.get("order") ?? 0),
  };
}

async function handleImageUpload(formData: FormData, productCode: string): Promise<string | null> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = buildImageKey(productCode, file.name);
  return uploadProductImage(key, buffer, file.type);
}

export async function createProductAction(formData: FormData) {
  const supabase = createClient();
  const fields = parseProductForm(formData);

  let imageUrl: string | null = null;
  const uploaded = await handleImageUpload(formData, fields.code ?? fields.slug);
  if (uploaded) imageUrl = uploaded;

  await createProduct(supabase, { ...fields, image_url: imageUrl });

  revalidatePath("/admin");
  revalidatePath("/catalogo");
  redirect("/admin");
}

export async function updateProductAction(productId: string, formData: FormData) {
  const supabase = createClient();
  const fields = parseProductForm(formData);

  const removeImage = formData.get("removeImage") === "on";
  const uploaded = await handleImageUpload(formData, fields.code ?? fields.slug);

  const update: Partial<ProductInput> = { ...fields };

  if (uploaded) {
    const currentImage = String(formData.get("currentImageUrl") ?? "");
    if (currentImage) await deleteProductImage(currentImage);
    update.image_url = uploaded;
  } else if (removeImage) {
    const currentImage = String(formData.get("currentImageUrl") ?? "");
    if (currentImage) await deleteProductImage(currentImage);
    update.image_url = null;
  }

  await updateProduct(supabase, productId, update);

  revalidatePath("/admin");
  revalidatePath("/catalogo");
  redirect("/admin");
}

export async function deleteProductAction(productId: string, imageUrl: string | null) {
  const supabase = createClient();
  if (imageUrl) await deleteProductImage(imageUrl);
  await deleteProduct(supabase, productId);
  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

export async function toggleActiveAction(productId: string, active: boolean) {
  const supabase = createClient();
  await toggleProductActive(supabase, productId, active);
  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

export async function duplicateProductAction(productId: string) {
  const supabase = createClient();
  await duplicateProduct(supabase, productId);
  revalidatePath("/admin");
}

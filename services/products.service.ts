// Camada única de acesso à tabela `products` — usada tanto pelo site público
// quanto pelas Server Actions do admin. Mantém as queries num lugar só.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Product, ProductFilters, ProductInput } from "@/types/product";

export async function getPublicProducts(
  supabase: SupabaseClient,
  filters: ProductFilters = {}
): Promise<Product[]> {
  let query = supabase.from("products").select("*").eq("active", true);

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,code.ilike.%${filters.search}%`);
  }
  if (filters.brand) query = query.eq("brand", filters.brand);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.packaging) query = query.eq("packaging", filters.packaging);

  switch (filters.sort) {
    case "recent":
      query = query.order("created_at", { ascending: false });
      break;
    case "most_viewed":
      query = query.order("views_count", { ascending: false });
      break;
    default:
      query = query.order("name", { ascending: true });
  }

  const { data, error } = await query;
  if (error) throw new Error(`Erro ao buscar produtos: ${error.message}`);
  return data ?? [];
}

export async function getProductBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw new Error(`Erro ao buscar produto: ${error.message}`);
  return data;
}

export async function getFeaturedProducts(
  supabase: SupabaseClient,
  limit = 8
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("order", { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Erro ao buscar destaques: ${error.message}`);
  return data ?? [];
}

/** Valores distintos de marca/categoria/embalagem já cadastrados — alimenta os filtros do catálogo. */
export async function getFilterOptions(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("products")
    .select("brand, category, packaging")
    .eq("active", true);

  if (error) throw new Error(`Erro ao buscar filtros: ${error.message}`);

  const unique = (values: (string | null)[]) =>
    Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();

  return {
    brands: unique((data ?? []).map((p) => p.brand)),
    categories: unique((data ?? []).map((p) => p.category)),
    packagings: unique((data ?? []).map((p) => p.packaging)),
  };
}

// ---- Admin (todas exigem usuário autenticado — garantido pela RLS + middleware) ----

export async function getAllProductsAdmin(
  supabase: SupabaseClient,
  search?: string
): Promise<Product[]> {
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (search) {
    query = query.or(`name.ilike.%${search}%,code.ilike.%${search}%`);
  }
  const { data, error } = await query;
  if (error) throw new Error(`Erro ao buscar produtos: ${error.message}`);
  return data ?? [];
}

export async function createProduct(
  supabase: SupabaseClient,
  input: ProductInput
): Promise<Product> {
  const { data, error } = await supabase.from("products").insert(input).select().single();
  if (error) throw new Error(`Erro ao criar produto: ${error.message}`);
  return data;
}

export async function updateProduct(
  supabase: SupabaseClient,
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Erro ao atualizar produto: ${error.message}`);
  return data;
}

export async function deleteProduct(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(`Erro ao excluir produto: ${error.message}`);
}

export async function toggleProductActive(
  supabase: SupabaseClient,
  id: string,
  active: boolean
): Promise<void> {
  const { error } = await supabase.from("products").update({ active }).eq("id", id);
  if (error) throw new Error(`Erro ao atualizar status: ${error.message}`);
}

export async function duplicateProduct(
  supabase: SupabaseClient,
  id: string
): Promise<Product> {
  const { data: original, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (fetchError) throw new Error(`Erro ao buscar produto original: ${fetchError.message}`);

  const { id: _id, created_at, updated_at, views_count, ...rest } = original;
  const copy = {
    ...rest,
    name: `${rest.name} (cópia)`,
    slug: `${rest.slug}-copia-${Date.now()}`,
    active: false,
  };

  const { data, error } = await supabase.from("products").insert(copy).select().single();
  if (error) throw new Error(`Erro ao duplicar produto: ${error.message}`);
  return data;
}

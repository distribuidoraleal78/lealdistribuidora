// Tipo espelha exatamente a tabela `products` criada pelo database/schema.sql

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  category: string | null;
  code: string | null;
  packaging: string | null;
  weight: string | null;
  image_url: string | null;
  featured: boolean;
  active: boolean;
  order: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

/** Campos que o formulário de cadastro/edição envia — sem os gerados automaticamente. */
export type ProductInput = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "views_count"
>;

export type ProductSortOption = "name" | "recent" | "most_viewed";

export interface ProductFilters {
  search?: string;
  brand?: string;
  category?: string;
  packaging?: string;
  sort?: ProductSortOption;
}

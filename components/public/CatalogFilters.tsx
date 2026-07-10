"use client";

// Barra de busca/filtro do catálogo. Atualiza a URL (searchParams) — a página em si
// (Server Component) reage à mudança e refaz a consulta no Supabase.

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useDebounce } from "@/hooks/useDebounce";

interface CatalogFiltersProps {
  brands: string[];
  categories: string[];
  packagings: string[];
}

export function CatalogFilters({ brands, categories, packagings }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateParam("search", debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative lg:col-span-2">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou código"
          className="pl-9"
          aria-label="Buscar produto"
        />
      </div>

      <Select
        defaultValue={searchParams.get("brand") ?? ""}
        onChange={(e) => updateParam("brand", e.target.value)}
        aria-label="Filtrar por marca"
      >
        <option value="">Todas as marcas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </Select>

      <Select
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => updateParam("category", e.target.value)}
        aria-label="Filtrar por categoria"
      >
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>

      <Select
        defaultValue={searchParams.get("sort") ?? "name"}
        onChange={(e) => updateParam("sort", e.target.value)}
        aria-label="Ordenar"
      >
        <option value="name">Nome (A-Z)</option>
        <option value="recent">Mais recentes</option>
        <option value="most_viewed">Mais visualizados</option>
      </Select>

      {packagings.length > 0 && (
        <Select
          defaultValue={searchParams.get("packaging") ?? ""}
          onChange={(e) => updateParam("packaging", e.target.value)}
          aria-label="Filtrar por embalagem"
          className="lg:col-span-5"
        >
          <option value="">Todas as embalagens</option>
          {packagings.map((packaging) => (
            <option key={packaging} value={packaging}>{packaging}</option>
          ))}
        </Select>
      )}
    </div>
  );
}

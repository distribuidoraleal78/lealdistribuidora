import Link from "next/link";
import Image from "next/image";
import { Plus, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAllProductsAdmin } from "@/services/products.service";
import { ProductRowActions } from "@/components/admin/ProductRowActions";
import { Input } from "@/components/ui/Input";

export default async function AdminProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = createClient();
  const products = await getAllProductsAdmin(supabase, resolvedSearchParams.search);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-1 rounded-md bg-brand-400 px-4 py-2 text-sm font-semibold text-ink-900 hover:opacity-90"
        >
          <Plus size={16} aria-hidden="true" />
          Novo produto
        </Link>
      </div>

      <form className="mt-4">
        <Input
          name="search"
          defaultValue={resolvedSearchParams.search}
          placeholder="Buscar por nome ou código"
          className="max-w-sm"
        />
      </form>

      <div className="mt-6 overflow-hidden rounded-card border border-ink-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-border text-xs text-ink-muted">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ink-border last:border-0">
                <td className="px-4 py-3">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded object-contain"
                    />
                  ) : (
                    <Package size={18} className="text-ink-muted" aria-hidden="true" />
                  )}
                </td>
                <td className="px-4 py-3 text-white">{product.name}</td>
                <td className="px-4 py-3 text-ink-muted">{product.brand ?? "—"}</td>
                <td className="px-4 py-3 text-ink-muted">{product.code ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.active
                        ? "rounded-full bg-brand-800 px-2 py-0.5 text-xs text-brand-100"
                        : "rounded-full bg-red-950 px-2 py-0.5 text-xs text-red-300"
                    }
                  >
                    {product.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ProductRowActions product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-8 text-center text-sm text-ink-muted">
            Nenhum produto cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}

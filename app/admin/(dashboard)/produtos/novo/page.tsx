import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/app/actions/products.actions";

interface PageProps {
  params: Promise<Record<string, string | undefined>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NovoProdutoPage({ params, searchParams }: PageProps) {
  // Apenas aguarda as Promises exigidas pelo Next 15 para satisfazer a tipagem
  await Promise.all([params, searchParams]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-white">Novo produto</h1>
      <div className="mt-6">
        <ProductForm action={createProductAction} submitLabel="Cadastrar produto" />
      </div>
    </div>
  );
}

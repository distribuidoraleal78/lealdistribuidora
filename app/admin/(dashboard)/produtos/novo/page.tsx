import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/app/actions/products.actions";

export default function NovoProdutoPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-white">Novo produto</h1>
      <div className="mt-6">
        <ProductForm action={createProductAction} submitLabel="Cadastrar produto" />
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProductAction } from "@/app/actions/products.actions";

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!product) notFound();

  const updateWithId = updateProductAction.bind(null, product.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-white">Editar produto</h1>
      <div className="mt-6">
        <ProductForm action={updateWithId} product={product} submitLabel="Salvar alterações" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export default function PedidoPage() {
  const { items, updateQuantity, removeItem, updateNotes, clear } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (items.length === 0) {
      toast.error("Seu pedido está vazio. Adicione produtos no catálogo primeiro.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, companyName, phone, city, notes, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Não foi possível enviar o pedido.");
        return;
      }

      window.open(data.whatsappUrl, "_blank");
      clear();
      router.push("/");
      toast.success("Pedido enviado! Continue a conversa no WhatsApp.");
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingCart className="text-ink-border" size={48} aria-hidden="true" />
        <h1 className="text-xl font-semibold text-white">Seu pedido está vazio</h1>
        <p className="text-sm text-ink-muted">
          Navegue pelo catálogo e adicione os produtos que precisa.
        </p>
        <Link
          href="/catalogo"
          className="rounded-md bg-brand-400 px-6 py-3 text-sm font-semibold text-ink-900 hover:opacity-90"
        >
          Ir para o catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-white">Meu pedido</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="rounded-card border border-ink-border bg-ink-soft p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  {item.code && <p className="text-xs text-ink-muted">Cód. {item.code}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-ink-muted hover:text-red-400"
                  aria-label={`Remover ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-md border border-ink-border">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center text-white hover:bg-ink-900"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center text-white hover:bg-ink-900"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <Input
                value={item.notes ?? ""}
                onChange={(e) => updateNotes(item.productId, e.target.value)}
                placeholder="Observação (opcional)"
                className="mt-3"
              />
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-4 rounded-card border border-ink-border bg-ink-soft p-6"
        >
          <h2 className="text-lg font-semibold text-white">Seus dados</h2>

          <div>
            <label htmlFor="customerName" className="mb-1 block text-sm text-ink-muted">
              Nome
            </label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="mb-1 block text-sm text-ink-muted">
              Empresa
            </label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-ink-muted">
              Telefone
            </label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(53) 9xxxx-xxxx"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="mb-1 block text-sm text-ink-muted">
              Cidade
            </label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="notes" className="mb-1 block text-sm text-ink-muted">
              Observações gerais
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Enviando..." : "Enviar pedido pelo WhatsApp"}
          </Button>
        </form>
      </div>
    </div>
  );
}

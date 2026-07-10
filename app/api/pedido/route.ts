// Rota pública chamada pela página /pedido ao confirmar o carrinho.
// Envia os dados para o Google Sheets (Apps Script) e devolve o link do WhatsApp pronto.

import { NextResponse } from "next/server";
import { z } from "zod";
import { buildWhatsAppMessage } from "@/lib/utils";
import { siteConfig } from "@/lib/site.config";

const orderSchema = z.object({
  customerName: z.string().min(1, "Informe seu nome"),
  companyName: z.string().min(1, "Informe o nome da empresa"),
  phone: z.string().min(8, "Informe um telefone válido"),
  city: z.string().min(1, "Informe a cidade"),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        code: z.string().nullable(),
        quantity: z.number().min(1),
        notes: z.string().optional(),
      })
    )
    .min(1, "O pedido precisa ter pelo menos um item"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados inválidos" },
      { status: 400 }
    );
  }

  const order = parsed.data;

  const itemsSummary = order.items
    .map((item) => `${item.quantity}x ${item.name}${item.code ? ` (${item.code})` : ""}`)
    .join("; ");

  // Envia para a planilha — se o webhook falhar, ainda deixamos o pedido seguir para o
  // WhatsApp (não trava o cliente por um problema na planilha).
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: order.customerName,
          empresa: order.companyName,
          telefone: order.phone,
          cidade: order.city,
          itens: itemsSummary,
          observacoes: order.notes ?? "",
        }),
      });
    } catch (error) {
      console.error("Falha ao registrar pedido na planilha:", error);
    }
  }

  const message = buildWhatsAppMessage({
    customerName: order.customerName,
    companyName: order.companyName,
    phone: order.phone,
    city: order.city,
    items: order.items,
    notes: order.notes,
  });

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

  return NextResponse.json({ whatsappUrl });
}

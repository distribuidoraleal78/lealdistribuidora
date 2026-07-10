import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina classes Tailwind sem conflito (ex: "p-2" + "p-4" vira só "p-4"). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gera um slug de URL a partir do nome do produto: "Feijão Preto 1kg" -> "feijao-preto-1kg". */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Monta a mensagem formatada do WhatsApp a partir dos dados do pedido. */
export function buildWhatsAppMessage(params: {
  customerName: string;
  companyName: string;
  phone: string;
  city: string;
  items: { name: string; code: string | null; quantity: number }[];
  notes?: string;
}): string {
  const lines = [
    "*Novo pedido — Leal Distribuidora*",
    "",
    `*Cliente:* ${params.customerName}`,
    `*Empresa:* ${params.companyName}`,
    `*Telefone:* ${params.phone}`,
    `*Cidade:* ${params.city}`,
    "",
    "*Itens:*",
    ...params.items.map(
      (item) => `- ${item.quantity}x ${item.name}${item.code ? ` (cód. ${item.code})` : ""}`
    ),
  ];

  if (params.notes) {
    lines.push("", `*Observações:* ${params.notes}`);
  }

  return lines.join("\n");
}

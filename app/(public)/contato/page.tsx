import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${siteConfig.companyName} — telefone, WhatsApp, endereço e horário de atendimento.`,
};

export default function ContatoPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-bold text-white">Contato</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <ul className="space-y-4 text-sm text-ink-muted">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.address.full}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.phone} / {siteConfig.phoneAlt}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.email}
            </li>
            <li className="flex items-center gap-3">
              <Clock size={20} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.businessHours}
            </li>
          </ul>

          <div className="mt-8 overflow-hidden rounded-card border border-ink-border">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              title="Mapa — Leal Distribuidora"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-card border border-ink-border bg-ink-soft p-6">
          <h2 className="text-lg font-semibold text-white">Deixe sua mensagem</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Preenche aqui que sua mensagem já sai pronta no WhatsApp.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

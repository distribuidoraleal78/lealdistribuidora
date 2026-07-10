import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export function ContactQuickBlock() {
  return (
    <section className="border-t border-ink-border bg-ink-soft">
      <div className="container-page grid gap-8 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Fale com a gente</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.address.full}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.phone} / {siteConfig.phoneAlt}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={18} className="shrink-0 text-brand-300" aria-hidden="true" />
              {siteConfig.businessHours}
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-card border border-ink-border">
          <iframe
            src={siteConfig.googleMapsEmbedUrl}
            title="Mapa — Leal Distribuidora"
            className="h-64 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

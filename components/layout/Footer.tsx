import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink-900">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <Image src="/images/logo-mark.svg" alt={siteConfig.companyName} width={44} height={44} />
          <p className="mt-4 text-sm text-ink-muted">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Navegação</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/empresa" className="hover:text-brand-200">Empresa</Link></li>
            <li><Link href="/catalogo" className="hover:text-brand-200">Catálogo</Link></li>
            <li><Link href="/contato" className="hover:text-brand-200">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contato</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              {siteConfig.address.full}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" aria-hidden="true" />
              {siteConfig.phone} / {siteConfig.phoneAlt}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" aria-hidden="true" />
              {siteConfig.email}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Horário</h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <Clock size={16} className="shrink-0" aria-hidden="true" />
            {siteConfig.businessHours}
          </p>
        </div>
      </div>

      <div className="border-t border-ink-border py-4">
        <p className="container-page text-center text-xs text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.companyName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

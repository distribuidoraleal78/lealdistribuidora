import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function HeroBanner() {
  return (
    <section className="border-b border-ink-border bg-ink-900">
      <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
        <h1 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          {siteConfig.home.heroTitle}
        </h1>
        <p className="max-w-xl text-ink-muted">{siteConfig.home.heroSubtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/catalogo"
            className="rounded-md bg-brand-400 px-6 py-3 text-sm font-semibold text-ink-900 hover:opacity-90"
          >
            Ver catálogo
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-ink-border px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft"
          >
            Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  );
}

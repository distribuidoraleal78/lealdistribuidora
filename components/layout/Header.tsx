"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/empresa", label: "Empresa" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-border bg-ink-900/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.companyName}>
          <Image src="/images/logo-mark.svg" alt="" width={36} height={36} priority />
          <span className="hidden text-sm font-semibold text-white sm:inline">
            {siteConfig.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-ink-muted transition-colors hover:text-brand-200",
                pathname === link.href && "text-brand-200"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/pedido"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-ink-border text-ink-muted transition-colors hover:text-brand-200"
            aria-label="Ver pedido"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-400 px-1 text-[11px] font-semibold text-ink-900">
                {itemCount}
              </span>
            )}
          </Link>

          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-brand-400 px-4 py-2 text-sm font-semibold text-ink-900 transition-opacity hover:opacity-90 sm:inline-block"
          >
            WhatsApp
          </a>

          <button
            type="button"
            className="text-white md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-ink-border bg-ink-900 md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-ink-muted hover:bg-ink-soft hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

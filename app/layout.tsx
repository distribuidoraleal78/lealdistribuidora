import type { Metadata } from "next";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

// Fonte do sistema (sem next/font/google) — zero dependência de rede externa no build
// e no carregamento da página, o que deixa o site mais rápido e mais robusto.

export const metadata: Metadata = {
  metadataBase: new URL("https://lealdistribuidora.com.br"),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.keywords],
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Empresa",
  description: `Conheça a história, a missão e os valores da ${siteConfig.companyName}.`,
};

export default function EmpresaPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-bold text-white">Nossa empresa</h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-200">História</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          {siteConfig.home.whoWeAre}
        </p>
      </section>

      <section className="mt-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-brand-200">Missão</h2>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.home.mission}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-brand-200">Visão</h2>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.home.vision}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-brand-200">Valores</h2>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">
            {siteConfig.home.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-200">Área de atuação</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Atendemos varejo e food service em {siteConfig.address.city}/{siteConfig.address.state}{" "}
          e região, com um portfólio diversificado de marcas para o seu negócio.
        </p>
      </section>
    </div>
  );
}

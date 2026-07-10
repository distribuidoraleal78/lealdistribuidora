import { siteConfig } from "@/lib/site.config";

export function WhoWeAre() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white">Quem somos</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {siteConfig.home.whoWeAre}
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-brand-200">Missão</h3>
            <p className="mt-1 text-sm text-ink-muted">{siteConfig.home.mission}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-200">Visão</h3>
            <p className="mt-1 text-sm text-ink-muted">{siteConfig.home.vision}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-200">Valores</h3>
            <ul className="mt-1 space-y-1 text-sm text-ink-muted">
              {siteConfig.home.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

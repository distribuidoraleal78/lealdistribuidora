import { siteConfig } from "@/lib/site.config";

export function HowToBuy() {
  return (
    <section className="container-page py-16">
      <h2 className="text-center text-xl font-semibold text-white">Como comprar</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {siteConfig.home.howToBuy.map((step, index) => (
          <div key={step} className="rounded-card border border-ink-border bg-ink-soft p-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-400 text-sm font-bold text-ink-900">
              {index + 1}
            </span>
            <p className="mt-3 text-sm text-ink-muted">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

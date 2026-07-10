import { Truck, Package, Headset } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

const ICONS = [Truck, Package, Headset];

export function Differentiators() {
  return (
    <section className="border-y border-ink-border bg-ink-soft">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-3">
        {siteConfig.home.differentiators.map((item, index) => {
          const Icon = ICONS[index] ?? Truck;
          return (
            <div key={item.title} className="text-center">
              <Icon className="mx-auto text-brand-300" size={28} aria-hidden="true" />
              <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

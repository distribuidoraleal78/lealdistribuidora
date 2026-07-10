import { HeroBanner } from "@/components/public/HeroBanner";
import { WhoWeAre } from "@/components/public/WhoWeAre";
import { Differentiators } from "@/components/public/Differentiators";
import { FeaturedProducts } from "@/components/public/FeaturedProducts";
import { HowToBuy } from "@/components/public/HowToBuy";
import { ContactQuickBlock } from "@/components/public/ContactQuickBlock";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <WhoWeAre />
      <Differentiators />
      <FeaturedProducts />
      <HowToBuy />
      <ContactQuickBlock />
    </>
  );
}

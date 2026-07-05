import { FeatureCard } from "@/components/cards";
import { features } from "@/lib/data";

export default function FeaturesPage() {
  return (
    <section className="container-page py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-primary">Fonctionnalites</p>
        <h1 className="mt-3 text-4xl font-bold">Une plateforme d'incubation pour startups vertes</h1>
        <p className="mt-4 text-muted-foreground">
          Dashboard entrepreneur, creation de projet, parcours d'accompagnement, business model, ressources, mentorat,
          documents et architecture IA sont organises pour soutenir tout le cycle d'incubation.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

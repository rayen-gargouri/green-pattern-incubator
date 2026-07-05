import { StepCard } from "@/components/cards";
import { steps } from "@/lib/data";

export default function HowItWorksPage() {
  return (
    <section className="container-page py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-primary">Comment ca marche</p>
        <h1 className="mt-3 text-4xl font-bold">Un parcours en 6 etapes simples</h1>
        <p className="mt-4 text-muted-foreground">
          Chaque etape aide l'entrepreneur a passer de l'idee ecologique a une startup verte structuree: validation,
          marche, modele economique, impact, financement et lancement.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <StepCard key={step.title} index={index + 1} {...step} />
        ))}
      </div>
    </section>
  );
}

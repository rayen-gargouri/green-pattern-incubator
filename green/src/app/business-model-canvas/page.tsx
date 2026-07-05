import { EntrepreneurLayout } from "@/components/layouts/EntrepreneurLayout";
import { BMCForm } from "@/components/forms/BMCForm";
import { PanelsTopLeft } from "lucide-react";

export default function BusinessModelCanvasPage() {
  return (
    <EntrepreneurLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <PanelsTopLeft className="h-4 w-4" />
            Business Model Canvas
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Structurez votre modèle économique
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Remplissez les 9 blocs du Business Model Canvas pour formaliser la viabilité de votre
            startup verte : valeur, clients, revenus, partenaires et coûts. Vos données sont
            sauvegardées dans votre navigateur.
          </p>
        </div>

        {/* Guide rapide */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
          <p className="font-semibold mb-1">💡 Conseil</p>
          <p className="text-primary/80">
            Commencez par la <strong>Proposition de valeur</strong> et les{" "}
            <strong>Segments clients</strong>. Ces deux blocs sont le cœur de votre modèle.
            Complétez ensuite les autres blocs en partant de vos hypothèses de départ.
          </p>
        </div>

        {/* Formulaire BMC interactif côté client */}
        <BMCForm />
      </div>
    </EntrepreneurLayout>
  );
}

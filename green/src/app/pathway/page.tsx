import { EntrepreneurLayout } from "@/components/layouts/EntrepreneurLayout";
import { PathwaySteps } from "@/components/forms/PathwaySteps";
import { Map } from "lucide-react";

export default function PathwayPage() {
  return (
    <EntrepreneurLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Map className="h-4 w-4" />
            Parcours d&apos;accompagnement
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Votre parcours étape par étape
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Suivez les 9 étapes de l&apos;incubation : de l&apos;idéation initiale jusqu&apos;au
            suivi post-lancement. Marquez chaque étape comme terminée pour suivre votre progression.
          </p>
        </div>

        {/* Étapes interactives côté client */}
        <PathwaySteps />
      </div>
    </EntrepreneurLayout>
  );
}

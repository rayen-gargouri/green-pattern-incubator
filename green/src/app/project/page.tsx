import { EntrepreneurLayout } from "@/components/layouts/EntrepreneurLayout";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { Sprout } from "lucide-react";

export default function ProjectPage() {
  return (
    <EntrepreneurLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Sprout className="h-4 w-4" />
            Mon Projet Vert
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Création & modification du projet
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Remplissez ce formulaire guidé pour structurer votre idée verte.
            Vos données sont sauvegardées automatiquement dans votre navigateur.
          </p>
        </div>

        {/* Formulaire interactif côté client */}
        <ProjectForm />
      </div>
    </EntrepreneurLayout>
  );
}

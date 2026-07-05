import { EntrepreneurLayout } from "@/components/layouts/EntrepreneurLayout";
import { DocumentsManager } from "@/components/forms/DocumentsManager";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <EntrepreneurLayout>
      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <FileText className="h-4 w-4" />
            Documents du projet
          </div>
          <h2 className="text-3xl font-bold text-foreground">Vos documents et livrables</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Creez, modifiez, telechargez et enrichissez les documents essentiels de votre projet vert.
          </p>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-800">
          <p className="mb-1 font-semibold">Mode MVP IA</p>
          <p>
            Les contenus IA peuvent etre generes en mode demonstration sans cle API externe, puis sauvegardes dans vos
            documents locaux.
          </p>
        </div>

        <DocumentsManager />
      </div>
    </EntrepreneurLayout>
  );
}

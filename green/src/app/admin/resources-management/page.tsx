import { Database } from "lucide-react";
import { ResourceCard } from "@/components/cards";
import { ActionCard } from "@/components/ui/ActionCard";
import { demoResources } from "@/lib/data";

export default function AdminResourcesManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestion des ressources</h2>
        <p className="mt-2 text-muted-foreground">Ajoutez, modifiez ou organisez les ressources de la plateforme.</p>
      </div>
      <ActionCard title="Ajouter une ressource" description="Preparer une nouvelle entree bibliotheque." href="/admin/resources-management" icon={Database} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

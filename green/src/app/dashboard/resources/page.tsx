import { ResourceCard } from "@/components/cards";
import { StatusBadge } from "@/components/status-badge";
import { demoResources, resourceCategories } from "@/lib/data";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Bibliotheque</p>
        <h1 className="mt-2 text-3xl font-bold">Ressources pour projets verts</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {resourceCategories.map((category) => (
          <StatusBadge key={category} label={category} tone="gray" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

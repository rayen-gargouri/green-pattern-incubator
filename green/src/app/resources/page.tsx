import { AdminLayout } from "@/components/layouts/AdminLayout";
import { EntrepreneurLayout } from "@/components/layouts/EntrepreneurLayout";
import { ExpertLayout } from "@/components/layouts/ExpertLayout";
import { ResourceCard } from "@/components/cards";
import { StatusBadge } from "@/components/status-badge";
import { requireAuth } from "@/lib/auth";
import { demoResources, resourceCategories } from "@/lib/data";

function ResourcesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ressources</h2>
        <p className="mt-2 text-muted-foreground">
          Guides, modeles et contenus pratiques pour valider l'idee, structurer la startup verte, mesurer l'impact et
          preparer le lancement.
        </p>
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

export default async function ResourcesPage() {
  const user = await requireAuth();

  if (user?.role === "expert") {
    return (
      <ExpertLayout>
        <ResourcesContent />
      </ExpertLayout>
    );
  }

  if (user?.role === "admin") {
    return (
      <AdminLayout>
        <ResourcesContent />
      </AdminLayout>
    );
  }

  return (
    <EntrepreneurLayout>
      <ResourcesContent />
    </EntrepreneurLayout>
  );
}

import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { demoProjects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Projets</p>
          <h1 className="mt-2 text-3xl font-bold">Vos projets verts</h1>
        </div>
        <Button href="/dashboard/projects/new">
          <Plus className="h-4 w-4" />
          Creer mon projet
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

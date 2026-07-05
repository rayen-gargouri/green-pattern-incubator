import { ProjectCard } from "@/components/ui/ProjectCard";
import { demoProjects } from "@/lib/data";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Projets</h2>
        <p className="mt-2 text-muted-foreground">Supervision globale des projets incubes.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {demoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} href="/admin/projects" />
        ))}
      </div>
    </div>
  );
}

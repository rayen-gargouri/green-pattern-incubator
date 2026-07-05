import { ProjectCard } from "@/components/ui/ProjectCard";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { demoProjects } from "@/lib/data";

export default function ExpertProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Projets a suivre</h2>
        <p className="mt-2 text-muted-foreground">Analysez les projets et identifiez les conseils les plus utiles.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {demoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} href="/expert/feedbacks" />
        ))}
      </div>
      <Card>
        <CardTitle>Grille d'analyse</CardTitle>
        <CardDescription className="mt-2">
          Priorisez la clarte du probleme, la solidite de la solution, la preuve terrain, le modele economique et
          l'impact mesure.
        </CardDescription>
      </Card>
    </div>
  );
}

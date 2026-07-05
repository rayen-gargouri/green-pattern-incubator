import { notFound } from "next/navigation";
import { Bot, Download, Handshake, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusBadge } from "@/components/status-badge";
import { demoProjects, projectSteps } from "@/lib/data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = demoProjects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <StatusBadge label={project.category} />
          <h1 className="mt-3 text-3xl font-bold">{project.name}</h1>
          <p className="mt-2 text-muted-foreground">{project.slogan}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline"><Pencil className="h-4 w-4" />Modifier</Button>
          <Button variant="outline"><Download className="h-4 w-4" />Generer fiche</Button>
          <Button variant="secondary"><Handshake className="h-4 w-4" />Demander mentor</Button>
          <Button><Bot className="h-4 w-4" />Ameliorer avec IA</Button>
          <Button variant="ghost"><Trash2 className="h-4 w-4" />Supprimer</Button>
        </div>
      </div>
      <Card>
        <ProgressBar value={project.progress} />
      </Card>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-4">
          {[
            ["Description", project.shortDescription],
            ["Probleme", project.problem],
            ["Solution", project.solution],
            ["Public cible", project.targetAudience],
            ["Impact ecologique", project.environmentalImpact],
            ["Business model", project.businessModel],
            ["Stade actuel", project.stage],
            ["Besoins", project.needs],
            ["Objectifs court terme", project.shortTermGoals],
            ["Objectifs long terme", project.longTermGoals]
          ].map(([title, text]) => (
            <Card key={title}>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-2">{text}</CardDescription>
            </Card>
          ))}
        </div>
        <div className="grid gap-4">
          <Card>
            <CardTitle>Etapes du projet</CardTitle>
            <div className="mt-4 grid gap-3">
              {projectSteps.map((step, index) => (
                <div key={step} className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                  <span>{step}</span>
                  <StatusBadge label={index < 4 ? "termine" : index < 7 ? "en cours" : "non commence"} tone={index < 4 ? "green" : index < 7 ? "amber" : "gray"} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardTitle>Recommandations mentor</CardTitle>
            <CardDescription className="mt-2">
              Clarifier le cout unitaire, documenter les tests terrain et construire un argumentaire de lancement
              centre sur la preuve d'impact.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Recommandations IA</CardTitle>
            <CardDescription className="mt-2">
              L'assistant IA sera bientot disponible. Votre projet est deja pret pour cette integration.
            </CardDescription>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { BookOpen, FileText, Map, PanelsTopLeft, Plus, Sprout, TrendingUp } from "lucide-react";
import { AIDiagnosticCard } from "@/components/ai/AIDiagnosticCard";
import { AIRecommendationsPanel } from "@/components/ai/AIRecommendationsPanel";
import { AINextSteps } from "@/components/ai/AINextSteps";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/ui/ActionCard";
import { ProgressCard } from "@/components/ui/ProgressCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { StatCard } from "@/components/ui/StatCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { demoProjects, projectSteps } from "@/lib/data";

export default function DashboardPage() {
  const average = Math.round(demoProjects.reduce((sum, project) => sum + project.progress, 0) / demoProjects.length);
  const mainProject = demoProjects[0];
  const doneSteps = Math.round((mainProject.progress / 100) * projectSteps.length);
  const remainingSteps = projectSteps.length - doneSteps;

  return (
    <div className="space-y-8">
      <AnimatedSection direction="down" className="flex flex-col justify-between gap-6 md:flex-row md:items-center rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 border border-emerald-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-900 tracking-tight">Bienvenue, votre projet vert avance</h2>
          <p className="mt-2 text-emerald-700/80 font-medium">
            Prochaine étape recommandée : consolider le business model et les KPI d'impact.
          </p>
        </div>
        <Button href="/dashboard/projects/new" className="shadow-md hover:shadow-lg transition-shadow">
          <Plus className="h-4 w-4" />
          Créer / modifier mon projet
        </Button>
      </AnimatedSection>
      
      <div className="grid gap-6 md:grid-cols-3">
        <AnimatedSection delay={0.1}><StatCard label="Projets créés" value={demoProjects.length} icon={Sprout} tone="green" /></AnimatedSection>
        <AnimatedSection delay={0.2}><StatCard label="Étapes terminées" value={doneSteps} icon={TrendingUp} tone="blue" /></AnimatedSection>
        <AnimatedSection delay={0.3}><StatCard label="Étapes restantes" value={remainingSteps} icon={Map} tone="slate" /></AnimatedSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <AnimatedSection delay={0.4} direction="up">
          <ProgressCard
            title="Progression globale"
            description="Suivi moyen des étapes de vos projets."
            value={average}
            icon={TrendingUp}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.5} direction="up">
          <Card className="h-full bg-emerald-50/30 border-emerald-100">
            <CardTitle className="text-emerald-900">Prochaines tâches</CardTitle>
            <div className="mt-5 grid gap-4 text-sm text-emerald-800/80 font-medium">
              <p className="flex gap-3"><span className="text-emerald-500">•</span> Finaliser le canvas de {mainProject.name}.</p>
              <p className="flex gap-3"><span className="text-emerald-500">•</span> Documenter 3 indicateurs d'impact mesurables.</p>
              <p className="flex gap-3"><span className="text-emerald-500">•</span> Prioriser les actions de validation, de marché et de lancement.</p>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.6}>
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <AIDiagnosticCard fallbackProject={mainProject} />
          <AINextSteps fallbackProject={mainProject} />
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.7}>
        <AIRecommendationsPanel fallbackProject={mainProject} />
      </AnimatedSection>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <AnimatedSection delay={0.8} direction="up">
          <ProjectCard project={mainProject} />
        </AnimatedSection>
        <div className="grid gap-6">
          <AnimatedSection delay={0.85} direction="up">
            <Card>
              <CardTitle>Recommandations simples</CardTitle>
              <CardDescription className="mt-3 leading-relaxed">
                Gardez une preuve terrain par étape : entretien client, test prototype, devis fournisseur ou mesure
                d'impact. Votre projet sera plus solide pour l'incubation, le financement et le lancement.
              </CardDescription>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.9} direction="up">
            <Card>
              <CardTitle>Accompagnement</CardTitle>
              <CardDescription className="mt-3 leading-relaxed">
                Un mentor peut vous aider à challenger la solution, prioriser les tests et clarifier les risques.
              </CardDescription>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection delay={0.95} direction="up" className="mt-10">
        <h2 className="mb-6 text-xl font-extrabold tracking-tight">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          <ActionCard title="Mon projet" description="Créer ou modifier la fiche projet." href="/project" icon={Sprout} />
          <ActionCard title="Parcours" description="Voir les étapes d'accompagnement." href="/pathway" icon={Map} />
          <ActionCard title="Canvas" description="Structurer le modèle économique." href="/business-model-canvas" icon={PanelsTopLeft} />
          <ActionCard title="Ressources" description="Consulter les guides utiles." href="/resources" icon={BookOpen} />
          <ActionCard title="Documents" description="Centraliser les livrables." href="/documents" icon={FileText} />
        </div>
      </AnimatedSection>
    </div>
  );
}

import { BookOpen, ClipboardCheck, Lightbulb, MessageSquareText, SearchCheck } from "lucide-react";
import { ActionCard } from "@/components/ui/ActionCard";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { demoProjects } from "@/lib/data";

export default function ExpertDashboardPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection direction="down" className="flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border border-blue-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">Bienvenue dans votre espace expert</h2>
          <p className="mt-2 text-blue-800/80 font-medium">
            Priorisez les analyses, partagez des feedbacks courts et aidez les entrepreneurs à avancer.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid gap-6 md:grid-cols-4">
        <AnimatedSection delay={0.1}><StatCard label="Projets disponibles" value={demoProjects.length} icon={ClipboardCheck} tone="blue" /></AnimatedSection>
        <AnimatedSection delay={0.2}><StatCard label="Projets analysés" value="14" icon={SearchCheck} tone="green" /></AnimatedSection>
        <AnimatedSection delay={0.3}><StatCard label="Feedbacks donnés" value="38" icon={MessageSquareText} tone="blue" /></AnimatedSection>
        <AnimatedSection delay={0.4}><StatCard label="Recommandations" value="21" icon={Lightbulb} tone="slate" /></AnimatedSection>
      </div>

      <AnimatedSection delay={0.5}>
        <section className="mt-8">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight">Projets récents à analyser</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {demoProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={0.6 + index * 0.1} direction="up">
                <ProjectCard project={project} href="/expert/projects" />
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] mt-8">
        <AnimatedSection delay={0.7} direction="up">
          <section className="grid gap-6">
            <h2 className="text-xl font-extrabold tracking-tight">Feedbacks récents</h2>
            <FeedbackCard
              title="EcoPack Tunisia"
              author="Retour expert"
              content="Clarifier la chaîne d'approvisionnement et ajouter un indicateur de compostabilité vérifié."
            />
            <FeedbackCard
              title="SolarGrow"
              author="Retour expert"
              content="Préparer un comparatif coût énergie actuelle vs kit solaire sur trois profils d'exploitations."
            />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.8} direction="up">
          <Card className="h-full bg-blue-50/30 border-blue-100">
            <CardTitle className="text-blue-900">Suggestions pour aujourd'hui</CardTitle>
            <div className="mt-5 grid gap-4 text-sm text-blue-800/80 font-medium">
              <p className="flex gap-3"><span className="text-blue-500">•</span> Analyser deux projets avec une grille simple : problème, solution, marché, impact.</p>
              <p className="flex gap-3"><span className="text-blue-500">•</span> Ajouter une recommandation actionnable par projet.</p>
              <p className="flex gap-3"><span className="text-blue-500">•</span> Partager une ressource utile avec les entrepreneurs suivis.</p>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.9} direction="up" className="mt-10">
        <h2 className="mb-6 text-xl font-extrabold tracking-tight">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ActionCard title="Voir les projets" description="Consulter les projets à suivre." href="/expert/projects" icon={ClipboardCheck} />
          <ActionCard title="Mes feedbacks" description="Retrouver les retours envoyés." href="/expert/feedbacks" icon={MessageSquareText} />
          <ActionCard title="Recommandations" description="Ajouter des conseils stratégiques." href="/expert/recommendations" icon={Lightbulb} />
          <ActionCard title="Ressources" description="Consulter les guides utiles." href="/resources" icon={BookOpen} />
        </div>
      </AnimatedSection>
    </div>
  );
}

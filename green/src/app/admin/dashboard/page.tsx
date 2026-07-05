import { BarChart3, Database, FolderKanban, MessageSquareText, UsersRound } from "lucide-react";
import { ActionCard } from "@/components/ui/ActionCard";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { demoProjects } from "@/lib/data";

const recentUsers = [
  { name: "Amina Ben Ali", role: "entrepreneur", email: "amina@example.test" },
  { name: "Karim Expert", role: "expert", email: "karim@example.test" },
  { name: "Nora Admin", role: "admin", email: "nora@example.test" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection direction="down" className="flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50 p-6 border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Vue générale de la plateforme</h2>
          <p className="mt-2 text-slate-700/80 font-medium">
            Supervision des utilisateurs, projets, feedbacks experts et ressources.
          </p>
        </div>
      </AnimatedSection>
      
      <div className="grid gap-6 md:grid-cols-4">
        <AnimatedSection delay={0.1}><StatCard label="Utilisateurs" value="248" icon={UsersRound} tone="slate" /></AnimatedSection>
        <AnimatedSection delay={0.15}><StatCard label="Entrepreneurs" value="190" icon={UsersRound} tone="slate" /></AnimatedSection>
        <AnimatedSection delay={0.2}><StatCard label="Experts" value="24" icon={MessageSquareText} tone="blue" /></AnimatedSection>
        <AnimatedSection delay={0.25}><StatCard label="Projets" value={demoProjects.length} icon={FolderKanban} tone="green" /></AnimatedSection>
        <AnimatedSection delay={0.3}><StatCard label="Projets en cours" value="64" icon={BarChart3} tone="slate" /></AnimatedSection>
        <AnimatedSection delay={0.35}><StatCard label="Projets terminés" value="18" icon={BarChart3} tone="green" /></AnimatedSection>
        <AnimatedSection delay={0.4}><StatCard label="Feedbacks experts" value="38" icon={MessageSquareText} tone="blue" /></AnimatedSection>
        <AnimatedSection delay={0.45}><StatCard label="Ressources" value="42" icon={Database} tone="slate" /></AnimatedSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.5} direction="up">
          <Card className="h-full">
            <CardTitle>Utilisateurs récents</CardTitle>
            <div className="mt-5 grid gap-4">
              {recentUsers.map((user) => (
                <div key={user.email} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-bold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <StatusBadge label={user.role} tone="gray" />
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.6} direction="up">
          <Card className="h-full">
            <CardTitle>Projets récents</CardTitle>
            <div className="mt-5 grid gap-4">
              {demoProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-bold text-foreground">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.stage}</p>
                  </div>
                  <span className="flex items-center gap-2 font-bold text-primary">
                    <span className="text-sm">{project.progress}%</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.7} direction="up" className="mt-10">
        <h2 className="mb-6 text-xl font-extrabold tracking-tight">Gestion</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard title="Utilisateurs" description="Voir et gérer les comptes." href="/admin/users" icon={UsersRound} />
          <ActionCard title="Projets" description="Superviser les projets." href="/admin/projects" icon={FolderKanban} />
          <ActionCard title="Ressources" description="Gérer la bibliothèque." href="/admin/resources-management" icon={Database} />
          <ActionCard title="Statistiques" description="Consulter les indicateurs." href="/admin/statistics" icon={BarChart3} />
        </div>
      </AnimatedSection>
    </div>
  );
}

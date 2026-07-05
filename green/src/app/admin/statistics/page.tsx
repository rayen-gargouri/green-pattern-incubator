import { BarChart3, FolderKanban, MessageSquareText, UsersRound } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export default function AdminStatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Statistiques</h2>
        <p className="mt-2 text-muted-foreground">Indicateurs globaux du MVP Green Pattern Incubator.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Utilisateurs" value="248" icon={UsersRound} tone="slate" />
        <StatCard label="Projets actifs" value="64" icon={FolderKanban} tone="slate" />
        <StatCard label="Feedbacks" value="38" icon={MessageSquareText} tone="slate" />
        <StatCard label="Progression moyenne" value="52%" icon={BarChart3} tone="slate" />
      </div>
    </div>
  );
}

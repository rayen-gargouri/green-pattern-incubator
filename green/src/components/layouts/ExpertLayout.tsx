import { requireRole } from "@/lib/auth";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";
import { ExpertSidebar } from "@/components/navigation/ExpertSidebar";

export async function ExpertLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("expert");

  return (
    <div className="min-h-screen bg-background lg:flex">
      <ExpertSidebar />
      <div className="flex-1 p-5 lg:p-8">
        <DashboardHeader
          user={user}
          title="Dashboard expert"
          subtitle="Analysez les projets, donnez des feedbacks et accompagnez les entrepreneurs."
        />
        {children}
      </div>
    </div>
  );
}

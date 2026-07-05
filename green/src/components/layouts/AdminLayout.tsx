import { requireRole } from "@/lib/auth";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";
import { AdminSidebar } from "@/components/navigation/AdminSidebar";

export async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("admin");

  return (
    <div className="min-h-screen bg-background lg:flex">
      <AdminSidebar />
      <div className="flex-1 p-5 lg:p-8">
        <DashboardHeader
          user={user}
          title="Dashboard administrateur"
          subtitle="Supervisez les utilisateurs, les projets, les ressources et les statistiques."
        />
        {children}
      </div>
    </div>
  );
}

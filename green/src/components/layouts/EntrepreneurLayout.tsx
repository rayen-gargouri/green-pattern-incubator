import { requireRole } from "@/lib/auth";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";
import { EntrepreneurSidebar } from "@/components/navigation/EntrepreneurSidebar";
import { MentorChatbot } from "@/components/chatbot/MentorChatbot";

export async function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("entrepreneur");

  return (
    <div className="min-h-screen bg-background lg:flex">
      <EntrepreneurSidebar />
      <div className="flex-1 p-5 lg:p-8">
        <DashboardHeader
          user={user}
          title="Tableau de bord entrepreneur"
          subtitle="Pilotez votre projet vert, votre progression et vos prochaines actions."
        />
        {children}
      </div>
      <MentorChatbot />
    </div>
  );
}

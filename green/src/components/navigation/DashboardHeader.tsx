import { LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { getRoleLabel } from "@/lib/roles";
import type { CurrentUser } from "@/lib/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function DashboardHeader({
  user,
  title,
  subtitle
}: {
  user: CurrentUser;
  title: string;
  subtitle: string;
}) {
  return (
    <AnimatedSection direction="down" duration={0.4} className="mb-8 flex flex-col justify-between gap-6 border-b border-border/50 bg-background/80 backdrop-blur-md pb-6 pt-2 md:flex-row md:items-end sticky top-0 z-10 -mx-6 px-6 sm:-mx-8 sm:px-8">
      <div>
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{getRoleLabel(user.role)}</p>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="text-sm font-bold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 hidden sm:flex items-center justify-center text-primary font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <form action={logoutUser}>
          <Button variant="outline" size="sm" className="rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </AnimatedSection>
  );
}

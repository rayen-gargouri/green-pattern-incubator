import { BookOpen, ClipboardCheck, LayoutDashboard, Lightbulb, MessageSquareText } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/expert/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/expert/projects", label: "Projets a suivre", icon: ClipboardCheck },
  { href: "/expert/feedbacks", label: "Feedbacks", icon: MessageSquareText },
  { href: "/expert/recommendations", label: "Recommandations", icon: Lightbulb },
  { href: "/resources", label: "Ressources", icon: BookOpen }
];

export function ExpertSidebar() {
  return (
    <aside className="border-b bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center px-5 font-semibold text-cyan-800">Green Expert</div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-3 lg:grid lg:px-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-max items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import { BookOpen, FileText, LayoutDashboard, Map, PanelsTopLeft, Sprout } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/project", label: "Mon projet", icon: Sprout },
  { href: "/pathway", label: "Parcours", icon: Map },
  { href: "/business-model-canvas", label: "Business Model Canvas", icon: PanelsTopLeft },
  { href: "/resources", label: "Ressources", icon: BookOpen },
  { href: "/documents", label: "Documents", icon: FileText }
];

export function EntrepreneurSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r border-border/50 shadow-sm relative z-20">
      <div className="flex h-20 items-center px-6 text-lg font-bold text-primary">
        <Sprout className="mr-2 h-6 w-6 text-primary" />
        Green Pattern
      </div>
      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:gap-2 lg:px-4 lg:pt-4 scrollbar-hide">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "text-primary bg-emerald-50/80 font-semibold" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon className={cn("h-5 w-5 relative z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

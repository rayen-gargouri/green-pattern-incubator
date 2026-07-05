import Link from "next/link";
import { Leaf } from "lucide-react";
import { dashboardLinks } from "@/lib/data";

export function DashboardSidebar() {
  return (
    <aside className="border-b bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center gap-2 px-5 font-semibold">
        <Leaf className="h-5 w-5 text-primary" />
        Green Pattern
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-3 lg:grid lg:px-3">
        {dashboardLinks.map((item) => {
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

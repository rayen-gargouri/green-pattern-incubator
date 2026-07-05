import { Leaf } from "lucide-react";
import Link from "next/link";
import { publicNav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <Leaf className="h-5 w-5 text-primary" />
            Green Pattern Incubator
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Plateforme digitale d'incubation pour accompagner les jeunes entrepreneurs dans la transformation d'idees
            ecologiques en projets verts concrets, structures et durables.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Navigation</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {publicNav.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Contact</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <span>hello@greenpattern.example</span>
            <span>LinkedIn / Instagram / X</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

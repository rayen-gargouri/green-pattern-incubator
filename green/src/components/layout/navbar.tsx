import { Leaf, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { publicNav } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span>Green Pattern</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Button href="/auth" variant="ghost">
            <LogIn className="h-4 w-4" />
            Connexion
          </Button>
          <Button href="/register">Commencer</Button>
        </div>
        <Button className="sm:hidden" variant="outline" aria-label="Ouvrir le menu">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

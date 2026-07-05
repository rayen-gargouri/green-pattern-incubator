import { Leaf, Rocket, Target } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <section className="container-page py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-primary">A propos</p>
        <h1 className="mt-3 text-4xl font-bold">Rendre l'entrepreneuriat vert plus accessible</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Green Pattern Incubator est une plateforme digitale d'incubation dediee aux jeunes entrepreneurs qui
          souhaitent creer des projets verts, ecologiques et durables, depuis l'idee initiale jusqu'au lancement.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card>
          <Target className="mb-4 h-7 w-7 text-primary" />
          <CardTitle>Mission</CardTitle>
          <CardDescription className="mt-2">
            Rendre l'entrepreneuriat vert plus accessible, plus structure et plus efficace pour les jeunes porteurs de
            projets.
          </CardDescription>
        </Card>
        <Card>
          <Leaf className="mb-4 h-7 w-7 text-primary" />
          <CardTitle>Role</CardTitle>
          <CardDescription className="mt-2">
            Donner un cadre clair, des outils concrets, des ressources fiables et un acces au mentorat.
          </CardDescription>
        </Card>
        <Card>
          <Rocket className="mb-4 h-7 w-7 text-primary" />
          <CardTitle>Vision</CardTitle>
          <CardDescription className="mt-2">
            Creer une nouvelle generation de startups durables capables d'avoir un impact positif sur l'economie, la
            societe et l'environnement.
          </CardDescription>
        </Card>
      </div>
    </section>
  );
}

import { Handshake, Lightbulb, UsersRound } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MentorForm } from "./mentor-form";

export default function BecomeMentorPage() {
  return (
    <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Devenir mentor</p>
        <h1 className="mt-3 text-4xl font-bold">Aidez les jeunes entrepreneurs a lancer des projets durables</h1>
        <p className="mt-4 text-muted-foreground">
          Les mentors apportent methode, experience, recommandations et recul strategique aux projets en incubation.
        </p>
        <div className="mt-8 grid gap-4">
          {[
            { icon: Handshake, title: "Accompagner", text: "Suivez des projets assignes et donnez des retours utiles." },
            { icon: Lightbulb, title: "Structurer", text: "Aidez a clarifier probleme, solution, marche et impact." },
            { icon: UsersRound, title: "Transmettre", text: "Rejoignez un reseau de mentors engages pour l'impact." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
      <MentorForm />
    </section>
  );
}

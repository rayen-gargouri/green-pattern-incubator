import { Lightbulb } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const recommendations = [
  "Definir une preuve terrain simple pour chaque hypothese critique.",
  "Limiter les recommandations a trois actions prioritaires par rendez-vous.",
  "Relier chaque conseil a un indicateur: traction, cout, impact ou risque."
];

export default function ExpertRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Recommandations</h2>
        <p className="mt-2 text-muted-foreground">Conseils actionnables pour renforcer les projets accompagnes.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map((item) => (
          <Card key={item}>
            <Lightbulb className="mb-3 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Conseil expert</CardTitle>
            <CardDescription className="mt-2">{item}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

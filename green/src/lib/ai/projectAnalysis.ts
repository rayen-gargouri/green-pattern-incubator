import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function analyzeProject(project: Project) {
  return runAiJson(
    {
      system: "Analyse un projet entrepreneurial vert et retourne uniquement du JSON.",
      prompt: JSON.stringify(project)
    },
    {
      clarity: "Idee lisible avec une proposition de valeur concrete.",
      problemStrength: "Probleme ecologique pertinent et facile a expliquer.",
      solutionQuality: "Solution prometteuse, a renforcer avec des preuves terrain.",
      marketPotential: "Potentiel local interessant si les premiers clients pilotes confirment le besoin.",
      ecologicalImpact: project.environmentalImpact,
      risks: ["Manque de donnees terrain", "Couts operationnels a preciser", "Risque de promesse d'impact trop generale"],
      recommendations: [
        "Definir 3 KPI d'impact mesurables",
        "Interviewer 15 clients cibles",
        "Chiffrer le cout unitaire et le seuil de rentabilite"
      ]
    }
  );
}

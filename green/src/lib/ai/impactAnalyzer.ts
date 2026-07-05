import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function analyzeImpact(project: Project) {
  return runAiJson(
    { system: "Analyse l'impact ecologique d'un projet vert en JSON.", prompt: JSON.stringify(project) },
    {
      environmentalImpact: project.environmentalImpact,
      indicators: ["CO2 reduit", "Dechets evites", "Eau economisee", "Energie economisee", "Beneficiaires touches"],
      greenwashingRisks: ["Promesses non mesurees", "Absence de baseline", "Confusion entre intention et impact prouve"],
      improvementActions: ["Definir une situation de reference", "Mesurer avant/apres", "Publier des resultats simples"],
      sustainableKpis: [
        { name: "CO2 reduit", unit: "kgCO2e" },
        { name: "Dechets evites", unit: "kg" },
        { name: "Emplois verts crees", unit: "personnes" }
      ]
    }
  );
}

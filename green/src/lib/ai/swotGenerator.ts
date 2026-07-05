import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function generateSwot(project: Project) {
  return runAiJson(
    { system: "Genere une SWOT courte et exploitable en JSON.", prompt: JSON.stringify(project) },
    {
      strengths: ["Probleme ecologique clair", "Solution comprehensible", "Impact potentiel identifiable"],
      weaknesses: ["Besoin de preuves terrain", "Modele economique a tester"],
      opportunities: ["Demande croissante pour les solutions durables", "Partenariats publics et prives"],
      threats: ["Concurrence", "Contraintes reglementaires", "Difficulte a mesurer l'impact"]
    }
  );
}

import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function generateActionPlan(project: Project) {
  return runAiJson(
    { system: "Genere un plan d'action 30/60/90 jours en JSON.", prompt: JSON.stringify(project) },
    {
      days30: {
        objectives: ["Valider le probleme", "Clarifier les KPI"],
        tasks: ["Interviewer 15 clients", "Definir la baseline impact", "Prioriser les besoins MVP"],
        priority: "Haute",
        duration: "30 jours",
        successIndicator: "Probleme confirme et KPI mesurables"
      },
      days60: {
        objectives: ["Tester la solution", "Construire les premiers partenariats"],
        tasks: ["Lancer un pilote", "Signer 3 partenaires", "Chiffrer les couts"],
        priority: "Haute",
        duration: "60 jours",
        successIndicator: "Pilote actif avec premiers retours"
      },
      days90: {
        objectives: ["Preparer le lancement", "Clarifier l'argumentaire entrepreneurial"],
        tasks: ["Formaliser le business model", "Structurer le recit du projet", "Identifier financements"],
        priority: "Moyenne",
        duration: "90 jours",
        successIndicator: "Projet pret pour incubation, financement et lancement"
      }
    }
  );
}

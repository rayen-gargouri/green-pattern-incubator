import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function generatePitch(project: Project) {
  return runAiJson(
    { system: "Genere un argumentaire entrepreneurial structure pour une startup verte en JSON.", prompt: JSON.stringify(project) },
    {
      hook: `Et si ${project.name} rendait la transition ecologique plus simple pour ${project.targetAudience} ?`,
      problem: project.problem,
      solution: project.solution,
      market: project.targetAudience,
      businessModel: project.businessModel,
      ecologicalImpact: project.environmentalImpact,
      traction: "Premiers tests et partenaires pilotes a formaliser.",
      team: "Equipe fondatrice engagee, a completer avec profils techniques et commerciaux.",
      callToAction: "Nous cherchons des partenaires pilotes, mentors et premiers financements."
    }
  );
}

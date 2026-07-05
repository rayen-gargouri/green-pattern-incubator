import type { Project } from "@/lib/types";
import { runAiJson } from "./aiClient";

export async function generateBusinessModel(project: Project) {
  return runAiJson(
    { system: "Genere un Business Model Canvas vert en JSON.", prompt: JSON.stringify(project) },
    {
      customerSegments: [project.targetAudience],
      valueProposition: project.solution,
      channels: ["Partenariats locaux", "Vente directe", "Reseaux professionnels"],
      customerRelationships: ["Accompagnement pilote", "Support continu", "Suivi d'impact"],
      revenueStreams: [project.businessModel],
      keyResources: ["Equipe projet", "Partenaires techniques", "Donnees d'impact"],
      keyActivities: ["Validation terrain", "Production MVP", "Mesure impact"],
      keyPartners: ["Collectivites", "Fournisseurs durables", "Mentors"],
      costStructure: ["Prototype", "Distribution", "Operations", "Marketing"],
      ecologicalImpact: project.environmentalImpact,
      socialImpact: "Creation d'emplois verts et sensibilisation des beneficiaires."
    }
  );
}

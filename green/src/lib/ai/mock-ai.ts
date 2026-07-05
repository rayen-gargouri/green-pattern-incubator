import type { BMCData, Document, Project, Step } from "@/types";
import type {
  AIBusinessPlan,
  AINextStep,
  AIPitch,
  AIRecommendation,
  AIRequestPayload,
  BMCReview,
  ProjectDiagnostic,
  ProjectMaturityLevel,
  SWOTAnalysis
} from "./ai-types";

const BMC_LABELS: Record<keyof Omit<BMCData, "id" | "projectId" | "updatedAt">, string> = {
  valueProposition: "Proposition de valeur",
  customerSegments: "Segments clients",
  channels: "Canaux de distribution",
  customerRelationships: "Relation client",
  revenueStreams: "Sources de revenus",
  keyResources: "Ressources clés",
  keyActivities: "Activités clés",
  keyPartners: "Partenaires clés",
  costStructure: "Structure des coûts"
};

const BMC_KEYS = Object.keys(BMC_LABELS) as (keyof typeof BMC_LABELS)[];

function normalize(value: string | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compact(items: (string | false | null | undefined)[]) {
  return items.filter((item): item is string => Boolean(item));
}

function needsText(project: Project) {
  return normalize([project.needs, ...(project.selectedNeeds ?? [])].join(" "));
}

function hasNeed(project: Project, keyword: string) {
  return needsText(project).includes(normalize(keyword));
}

function isEarlyStage(project: Project) {
  const stage = normalize(project.advancementLevel ?? project.stage);
  return stage.includes("idee") || stage.includes("concept") || stage.includes("initial");
}

function inferMaturity(project: Project): ProjectMaturityLevel {
  const stage = normalize(project.advancementLevel ?? project.stage);
  if (stage.includes("lancement") || stage.includes("developpement")) return "lancement";
  if (stage.includes("prototype") || stage.includes("mvp")) return "pré-lancement";
  if (stage.includes("validation") || stage.includes("terrain")) return "validation";
  if (stage.includes("idee")) return "idée";
  return "concept";
}

function projectCompleteness(project: Project) {
  const fields = [
    project.name,
    project.category || project.sector,
    project.problem,
    project.solution,
    project.targetAudience,
    project.objectives || project.shortTermGoals,
    project.availableResources,
    project.environmentalImpact,
    project.needs
  ];
  return fields.filter((field) => field && field.trim().length > 8).length / fields.length;
}

function bmcCompleteness(bmc?: BMCData) {
  if (!bmc) return 0;
  const filled = BMC_KEYS.filter((key) => String(bmc[key] ?? "").trim().length > 8).length;
  return filled / BMC_KEYS.length;
}

function projectScore(payload: AIRequestPayload) {
  const base = 38;
  const completeness = projectCompleteness(payload.project) * 34;
  const progress = (payload.project.progress ?? 0) * 0.18;
  const bmc = bmcCompleteness(payload.bmc) * 14;
  const mentorBonus = payload.project.hasMentor ? 3 : 0;
  return Math.max(24, Math.min(94, Math.round(base + completeness + progress + bmc + mentorBonus)));
}

function missingDocuments(documents?: Document[]) {
  const docs = documents ?? [];
  return docs.filter((doc) => doc.status === "draft").map((doc) => doc.title);
}

function doneSteps(steps?: Step[]) {
  return (steps ?? []).filter((step) => step.status === "done").length;
}

export function generateMockDiagnostic(payload: AIRequestPayload): ProjectDiagnostic {
  const { project } = payload;
  const score = projectScore(payload);
  const maturityLevel = inferMaturity(project);
  const lowProgress = project.progress < 45;
  const missingBmc = bmcCompleteness(payload.bmc) < 0.45;

  return {
    score,
    maturityLevel,
    strengths: compact([
      project.problem && `Le problème ciblé est concret: ${project.problem}`,
      project.solution && `La solution proposée est compréhensible et reliée au problème identifié.`,
      project.environmentalImpact && `L'impact environnemental est déjà formulé, ce qui donne une base de mesure.`,
      project.targetAudience && `La cible prioritaire est identifiée: ${project.targetAudience}.`,
      project.hasMentor && "Le projet bénéficie déjà d'un accompagnement mentor."
    ]).slice(0, 5),
    weaknesses: compact([
      lowProgress && "La progression reste limitée: il faut transformer les hypothèses en preuves terrain.",
      missingBmc && "Le Business Model Canvas n'est pas encore assez complet pour juger la viabilité.",
      !project.businessModel && "Le modèle économique doit être clarifié avec des sources de revenus testables.",
      !project.availableResources && "Les ressources disponibles ne sont pas assez explicites.",
      !project.environmentalImpact && "L'impact environnemental doit être rendu mesurable avec des indicateurs."
    ]).slice(0, 5),
    risks: compact([
      "Promettre un impact écologique sans méthode de mesure peut fragiliser la crédibilité.",
      hasNeed(project, "financement") && "Le besoin de financement peut ralentir les tests si le budget minimum n'est pas chiffré.",
      isEarlyStage(project) && "Une solution encore trop théorique peut manquer d'adhésion client.",
      "Les coûts opérationnels et les partenaires clés doivent être validés tôt."
    ]).slice(0, 4),
    opportunities: compact([
      "Les solutions durables bénéficient d'une demande croissante et de dispositifs d'accompagnement spécialisés.",
      hasNeed(project, "partenariats") && "Des partenariats avec collectivités, associations ou acteurs locaux peuvent accélérer le pilote.",
      hasNeed(project, "marketing") && "Un récit clair sur le problème, la preuve terrain et l'impact peut différencier le projet.",
      "La plateforme peut servir de base pour structurer les documents utiles au jury et aux mentors."
    ]).slice(0, 4),
    priorityRecommendations: compact([
      lowProgress && "Réaliser 10 à 15 entretiens avec la cible prioritaire sous 2 semaines.",
      missingBmc && "Compléter les blocs Proposition de valeur, Segments clients, Revenus et Coûts du BMC.",
      hasNeed(project, "financement") && "Chiffrer le budget minimum du prochain test et identifier 5 sources de financement vert.",
      "Définir 3 KPI d'impact simples: volume évité, énergie économisée, bénéficiaires touchés ou CO2 évité.",
      "Créer un pitch de 1 minute centré sur problème, solution, cible, modèle et impact."
    ]).slice(0, 5),
    nextActions: compact([
      "Mettre à jour la fiche projet avec les données manquantes.",
      "Finaliser le Business Model Canvas avant la prochaine revue.",
      "Générer la SWOT puis transformer les risques en actions.",
      missingDocuments(payload.documents).length > 0 && "Compléter les documents prioritaires encore en brouillon."
    ]).slice(0, 4),
    summary: `${project.name} présente une base prometteuse pour un projet vert. Le niveau actuel est ${maturityLevel}; la priorité est de consolider les preuves terrain, le modèle économique et la mesure d'impact.`
  };
}

export function generateMockRecommendations(payload: AIRequestPayload): AIRecommendation[] {
  const { project } = payload;
  const early = isEarlyStage(project);
  const draftDocs = missingDocuments(payload.documents);
  const items: AIRecommendation[] = [
    {
      id: "rec-validation-terrain",
      title: "Valider le problème avec des entretiens terrain",
      description: early
        ? "Le projet est encore tôt: des entretiens structurés permettront de vérifier que le problème est prioritaire."
        : "Même avec une progression avancée, de nouveaux retours terrain renforcent le positionnement.",
      priority: early || project.progress < 50 ? "haute" : "moyenne",
      category: "marché",
      action: "Planifier 10 entretiens avec la cible et noter les objections récurrentes."
    },
    {
      id: "rec-kpi-impact",
      title: "Définir des KPI d'impact mesurables",
      description: "Un projet vert doit prouver son impact avec des indicateurs simples et suivis dans le temps.",
      priority: project.environmentalImpact ? "moyenne" : "haute",
      category: "impact",
      action: "Choisir 3 indicateurs et créer une baseline avant le pilote."
    },
    {
      id: "rec-bmc-viabilite",
      title: "Sécuriser la viabilité du modèle économique",
      description: "Les revenus, coûts et partenaires doivent être cohérents avec la solution proposée.",
      priority: bmcCompleteness(payload.bmc) < 0.5 ? "haute" : "moyenne",
      category: "business",
      action: "Compléter le BMC et tester une hypothèse de prix auprès de 5 prospects."
    },
    {
      id: "rec-financement",
      title: "Préparer un budget de test finançable",
      description: "Un budget clair rend les demandes de subvention, concours ou mentorat financier plus crédibles.",
      priority: hasNeed(project, "financement") ? "haute" : "basse",
      category: "financement",
      action: "Lister les dépenses du prochain pilote et identifier 5 financeurs ou concours verts."
    },
    {
      id: "rec-pitch",
      title: "Transformer le projet en pitch court",
      description: "Un pitch clair aide à convaincre jurys, mentors, partenaires et premiers clients.",
      priority: draftDocs.some((title) => normalize(title).includes("pitch")) ? "moyenne" : "basse",
      category: "marketing",
      action: "Générer un pitch de 1 minute puis le tester à voix haute."
    },
    {
      id: "rec-prototype",
      title: "Formaliser le prochain prototype ou pilote",
      description: "Le projet gagnera en crédibilité avec un test limité, mesurable et daté.",
      priority: project.progress < 60 ? "haute" : "moyenne",
      category: "technique",
      action: "Décrire le MVP, les ressources nécessaires et le résultat attendu du pilote."
    }
  ];

  return items.sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
}

export function generateMockSwot(payload: AIRequestPayload): SWOTAnalysis {
  const { project } = payload;

  return {
    strengths: compact([
      project.solution && "Solution alignée avec un problème environnemental identifié.",
      project.targetAudience && `Cible déjà formulée: ${project.targetAudience}.`,
      project.environmentalImpact && "Intention d'impact environnemental claire.",
      project.hasMentor && "Présence d'un mentor ou d'un accompagnement."
    ]),
    weaknesses: compact([
      !project.businessModel && "Modèle économique encore insuffisamment détaillé.",
      bmcCompleteness(payload.bmc) < 0.5 && "Business Model Canvas incomplet.",
      project.progress < 50 && "Peu de preuves terrain ou d'avancement opérationnel.",
      !project.availableResources && "Ressources disponibles à préciser."
    ]),
    opportunities: compact([
      "Intérêt croissant pour les solutions écologiques locales.",
      "Possibilité de partenariats avec collectivités, incubateurs, ONG ou entreprises responsables.",
      hasNeed(project, "financement") && "Accès potentiel à des concours, subventions ou fonds à impact.",
      "Les livrables générés peuvent accélérer la préparation devant un jury."
    ]),
    threats: compact([
      "Concurrence de solutions existantes si la différenciation n'est pas prouvée.",
      "Risque de greenwashing si l'impact n'est pas mesuré.",
      "Dépendance à des partenaires ou fournisseurs clés.",
      "Contraintes réglementaires ou coûts opérationnels sous-estimés."
    ]),
    conclusion:
      "La priorité est de convertir les hypothèses en preuves: entretiens, pilote, BMC complet, KPI d'impact et budget de test."
  };
}

export function generateMockPitch(payload: AIRequestPayload): AIPitch {
  const { project } = payload;
  const duration = payload.pitchDuration ?? "1min";
  const audience = payload.pitchAudience ?? "incubateur";
  const hook =
    duration === "30s"
      ? `${project.name} aide ${project.targetAudience || "sa cible"} à résoudre un problème écologique concret.`
      : `Et si ${project.name} transformait un problème environnemental en solution durable, locale et mesurable ?`;
  const problem = project.problem || "Le problème environnemental ciblé doit encore être formulé précisément.";
  const solution = project.solution || "La solution proposée doit être décrite avec un cas d'usage simple.";
  const target = project.targetAudience || "Les premiers bénéficiaires doivent être priorisés.";
  const impact = project.environmentalImpact || "L'impact sera mesuré avec des indicateurs simples avant/après.";
  const businessModel =
    project.businessModel ||
    "Le modèle économique peut démarrer par un pilote payant, des partenariats ou une offre B2B simplifiée.";
  const callToAction =
    audience === "investisseurs"
      ? "Nous cherchons un financement d'amorçage et des partenaires pilotes pour accélérer la validation."
      : audience === "mentors"
      ? "Nous cherchons un mentor pour challenger le modèle économique, l'impact et la stratégie de lancement."
      : "Nous cherchons un accompagnement, des partenaires pilotes et des retours experts pour passer à l'étape suivante.";

  const fullPitch =
    duration === "30s"
      ? `${hook} ${problem} Notre solution: ${solution} Elle s'adresse à ${target} et vise ${impact}. ${callToAction}`
      : `${hook}\n\nLe problème est simple: ${problem}\n\nNotre solution: ${solution}\n\nNous ciblons d'abord ${target}. L'impact attendu est le suivant: ${impact}\n\nLe modèle économique envisagé: ${businessModel}\n\n${callToAction}`;

  return { duration, hook, problem, solution, target, impact, businessModel, callToAction, fullPitch };
}

export function generateMockBusinessPlan(payload: AIRequestPayload): AIBusinessPlan {
  const { project } = payload;

  return {
    executiveSummary: `${project.name} est un projet vert dans le secteur ${project.sector || project.category || "écologique"}. Il vise à résoudre un problème concret pour ${project.targetAudience || "une cible à préciser"} avec une solution durable et mesurable.`,
    problem: project.problem || "Le problème environnemental doit être détaillé avec des données terrain.",
    solution: project.solution || "La solution doit être décrite avec son fonctionnement, ses bénéfices et ses limites.",
    targetMarket:
      project.targetAudience ||
      "Le marché cible doit être segmenté: premiers utilisateurs, payeurs, partenaires et prescripteurs.",
    valueProposition:
      payload.bmc?.valueProposition ||
      project.shortDescription ||
      "Une proposition de valeur claire doit relier gain client, simplicité d'usage et impact écologique.",
    businessModel:
      project.businessModel ||
      payload.bmc?.revenueStreams ||
      "Modèle à tester: offre pilote, abonnement, vente directe, commission ou partenariat B2B.",
    marketingStrategy:
      "Démarrer avec une stratégie terrain: entretiens, premiers clients pilotes, preuves d'impact, contenu pédagogique et partenariats locaux.",
    requiredResources: compact([
      project.availableResources ? `Capitaliser sur les ressources existantes: ${project.availableResources}` : "Budget pilote",
      "Temps fondateur dédié à la validation terrain",
      "Support de présentation et pitch",
      hasNeed(project, "technique") && "Appui technique ou prototype MVP",
      hasNeed(project, "marketing") && "Supports marketing et liste de prospects"
    ]),
    potentialPartners: compact([
      "Incubateurs et mentors spécialisés en impact",
      "Collectivités locales ou institutions publiques",
      "Associations environnementales",
      "Entreprises responsables du secteur",
      hasNeed(project, "financement") && "Concours et financeurs à impact"
    ]),
    environmentalImpact:
      project.environmentalImpact ||
      "Définir une baseline puis suivre 3 indicateurs: déchets évités, CO2 évité, énergie ou eau économisée.",
    nextSteps: [
      "Finaliser la fiche projet et le BMC.",
      "Réaliser une validation terrain avec la cible prioritaire.",
      "Chiffrer un budget pilote et les coûts unitaires.",
      "Créer un pitch de 1 minute et une analyse SWOT.",
      "Identifier 3 partenaires ou clients pilotes."
    ]
  };
}

export function generateMockBMCReview(payload: AIRequestPayload): BMCReview {
  const bmc = payload.bmc;
  const missingSections = BMC_KEYS.filter((key) => !String(bmc?.[key] ?? "").trim()).map((key) => BMC_LABELS[key]);
  const completenessScore = Math.round(bmcCompleteness(bmc) * 100);
  const inconsistencies = compact([
    bmc?.valueProposition && !bmc.customerSegments && "La proposition de valeur existe mais les segments clients sont vides.",
    bmc?.revenueStreams && !bmc.costStructure && "Les revenus sont évoqués sans structure de coûts.",
    bmc?.channels && !bmc.customerRelationships && "Les canaux sont listés sans préciser la relation client.",
    bmc?.keyActivities && !bmc.keyResources && "Les activités clés nécessitent des ressources clés associées.",
    bmc?.keyPartners && !bmc.keyActivities && "Les partenaires doivent être reliés à des activités concrètes."
  ]);
  const coherenceScore = Math.max(
    20,
    Math.min(92, Math.round(55 + completenessScore * 0.35 - inconsistencies.length * 8))
  );

  return {
    completenessScore,
    coherenceScore,
    missingSections,
    inconsistencies,
    suggestionsBySection: BMC_KEYS.map((key) => ({
      section: BMC_LABELS[key],
      suggestion: suggestionForBMCSection(key, payload.project, bmc)
    })),
    globalAdvice:
      completenessScore < 60
        ? "Complétez d'abord les blocs clients, valeur, revenus et coûts. Ce sont les fondations pour juger la viabilité."
        : "Le canvas est exploitable. La prochaine étape est de tester les hypothèses les plus risquées auprès de prospects."
  };
}

export function generateMockNextSteps(payload: AIRequestPayload): AINextStep[] {
  const { project } = payload;
  const drafts = missingDocuments(payload.documents);
  const completedSteps = doneSteps(payload.steps);
  const steps: AINextStep[] = [
    {
      title: "Valider la cible prioritaire",
      description: "Interviewer des prospects pour confirmer le problème, les alternatives existantes et le niveau d'urgence.",
      urgency: project.progress < 55 ? "haute" : "moyenne",
      estimatedEffort: "moyen",
      relatedPage: "/project"
    },
    {
      title: "Compléter le Business Model Canvas",
      description: "Renforcer les blocs valeur, clients, revenus, coûts et partenaires avant une revue expert.",
      urgency: bmcCompleteness(payload.bmc) < 0.7 ? "haute" : "moyenne",
      estimatedEffort: "moyen",
      relatedPage: "/business-model-canvas"
    },
    {
      title: "Générer les livrables clés",
      description:
        drafts.length > 0
          ? `Prioriser les documents encore en brouillon: ${drafts.slice(0, 3).join(", ")}.`
          : "Mettre à jour les livrables avec les dernières preuves terrain.",
      urgency: drafts.length > 2 ? "haute" : "moyenne",
      estimatedEffort: "rapide",
      relatedPage: "/documents"
    },
    {
      title: "Définir 3 indicateurs d'impact",
      description: "Choisir une baseline et des indicateurs faciles à mesurer pendant le pilote.",
      urgency: project.environmentalImpact ? "moyenne" : "haute",
      estimatedEffort: "rapide",
      relatedPage: "/resources"
    },
    {
      title: completedSteps > 4 ? "Préparer le lancement pilote" : "Avancer dans le parcours d'accompagnement",
      description:
        completedSteps > 4
          ? "Planifier un test limité avec objectifs, budget, partenaires et critères de succès."
          : "Terminer les étapes structurantes avant de demander un accompagnement expert.",
      urgency: "moyenne",
      estimatedEffort: "important",
      relatedPage: "/pathway"
    }
  ];

  if (hasNeed(project, "financement")) {
    steps.unshift({
      title: "Chiffrer le besoin de financement",
      description: "Définir le budget minimum du pilote, les dépenses critiques et les financements compatibles.",
      urgency: "haute",
      estimatedEffort: "moyen",
      relatedPage: "/documents"
    });
  }

  return steps.slice(0, 5);
}

function suggestionForBMCSection(
  section: keyof typeof BMC_LABELS,
  project: Project,
  bmc?: BMCData
) {
  const value = String(bmc?.[section] ?? "").trim();
  if (value.length > 12) {
    return "Transformer ce bloc en hypothèse testable avec un indicateur de validation.";
  }

  const suggestions: Record<keyof typeof BMC_LABELS, string> = {
    valueProposition: `Formuler le bénéfice principal de ${project.name}: gain client + preuve d'impact.`,
    customerSegments: "Décrire les premiers clients prêts à tester, pas seulement le marché large.",
    channels: "Choisir 2 canaux de démarrage: terrain, partenariats, vente directe ou communauté.",
    customerRelationships: "Préciser comment accompagner, fidéliser et collecter les retours utilisateurs.",
    revenueStreams: "Tester une première hypothèse de prix ou de formule payante.",
    keyResources: "Lister les ressources indispensables au prochain pilote: équipe, outils, budget, données.",
    keyActivities: "Identifier les 3 activités qui créent vraiment la valeur et l'impact.",
    keyPartners: "Cibler des partenaires qui réduisent le coût, l'accès marché ou le risque opérationnel.",
    costStructure: "Estimer les coûts fixes, variables et le coût du prochain test terrain."
  };

  return suggestions[section];
}

function priorityRank(priority: AIRecommendation["priority"]) {
  return priority === "haute" ? 0 : priority === "moyenne" ? 1 : 2;
}

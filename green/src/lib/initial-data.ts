/**
 * lib/initial-data.ts
 * Données initiales pour le MVP : étapes du parcours et documents par défaut.
 * Utilisées pour initialiser localStorage si vide.
 */

import type { Document, Step } from "@/types";

// ============================================================
// Étapes du parcours d'accompagnement
// ============================================================
export const initialSteps: Step[] = [
  {
    id: "step-1",
    order: 1,
    title: "Idéation",
    description: "Définissez clairement votre idée verte, le problème écologique ciblé et votre vision initiale.",
    tasks: [
      "Décrire l'idée en 3 phrases claires",
      "Identifier le problème environnemental ciblé",
      "Définir pourquoi maintenant et pourquoi vous",
      "Lister 5 mots clés de votre projet"
    ],
    status: "not_started"
  },
  {
    id: "step-2",
    order: 2,
    title: "Validation de l'idée",
    description: "Vérifiez que le problème identifié est réel, que des personnes en souffrent et que votre solution est désirée.",
    tasks: [
      "Mener 5 à 10 entretiens avec des personnes concernées",
      "Valider que le problème est bien réel et prioritaire",
      "Identifier des solutions existantes et leurs limites",
      "Rédiger un résumé de validation (1 page)"
    ],
    status: "not_started"
  },
  {
    id: "step-3",
    order: 3,
    title: "Étude de marché",
    description: "Analysez votre marché, vos concurrents et définissez précisément votre segment cible.",
    tasks: [
      "Estimer la taille du marché cible",
      "Identifier 3 à 5 concurrents directs et indirects",
      "Créer un profil type de votre client idéal (persona)",
      "Analyser les tendances du secteur green"
    ],
    status: "not_started"
  },
  {
    id: "step-4",
    order: 4,
    title: "Business Model Canvas",
    description: "Formalisez votre modèle économique en remplissant les 9 blocs du Business Model Canvas.",
    tasks: [
      "Définir votre proposition de valeur unique",
      "Identifier vos segments clients prioritaires",
      "Lister vos canaux de distribution",
      "Définir vos sources de revenus principales",
      "Remplir le canvas complet dans l'outil dédié"
    ],
    status: "not_started"
  },
  {
    id: "step-5",
    order: 5,
    title: "Plan d'action",
    description: "Définissez les actions prioritaires pour les 30, 60 et 90 prochains jours.",
    tasks: [
      "Lister les 5 actions les plus importantes du mois",
      "Identifier les ressources nécessaires pour chaque action",
      "Définir des indicateurs de succès mesurables",
      "Planifier un point de suivi hebdomadaire"
    ],
    status: "not_started"
  },
  {
    id: "step-6",
    order: 6,
    title: "Stratégie marketing",
    description: "Définissez comment vous allez attirer, convaincre et fidéliser vos premiers clients.",
    tasks: [
      "Choisir 2 à 3 canaux d'acquisition prioritaires",
      "Rédiger votre message principal (pitch 30 secondes)",
      "Créer une liste de 20 prospects à contacter",
      "Préparer un support de présentation (deck)"
    ],
    status: "not_started"
  },
  {
    id: "step-7",
    order: 7,
    title: "Recherche de financement",
    description: "Identifiez les sources de financement adaptées à votre projet vert et préparez vos dossiers.",
    tasks: [
      "Dresser la liste des besoins financiers précis",
      "Identifier 5 sources de financement compatibles",
      "Préparer un dossier de présentation investisseur",
      "Constituer un budget prévisionnel sur 12 mois"
    ],
    status: "not_started"
  },
  {
    id: "step-8",
    order: 8,
    title: "Lancement",
    description: "Préparez et exécutez le lancement de votre MVP pour obtenir vos premiers retours terrain.",
    tasks: [
      "Définir le périmètre exact du MVP (minimum viable)",
      "Identifier 10 clients pilotes à embarquer",
      "Préparer les supports de lancement",
      "Planifier la communication de lancement"
    ],
    status: "not_started"
  },
  {
    id: "step-9",
    order: 9,
    title: "Suivi et développement",
    description: "Mesurez les résultats, collectez les retours et améliorez continuellement votre projet.",
    tasks: [
      "Mettre en place un tableau de bord de suivi",
      "Collecter et analyser les retours clients",
      "Identifier les priorités d'amélioration",
      "Définir la prochaine phase de développement"
    ],
    status: "not_started"
  }
];

// ============================================================
// Documents par défaut
// ============================================================
export const initialDocuments: Document[] = [
  {
    id: "doc-idea",
    type: "project_idea",
    title: "Fiche Idée de Projet",
    description: "Résumé structuré de votre idée verte : problème, solution, cible, différenciation.",
    status: "draft"
  },
  {
    id: "doc-bmc",
    type: "business_model_canvas",
    title: "Business Model Canvas",
    description: "Les 9 blocs de votre modèle économique, exportés depuis l'outil BMC.",
    status: "draft"
  },
  {
    id: "doc-swot",
    type: "swot_analysis",
    title: "Analyse SWOT",
    description: "Forces, faiblesses, opportunités et menaces de votre projet vert.",
    status: "draft"
  },
  {
    id: "doc-action",
    type: "action_plan",
    title: "Plan d'Action",
    description: "Les actions prioritaires sur 30, 60 et 90 jours pour avancer.",
    status: "draft"
  },
  {
    id: "doc-pitch",
    type: "pitch",
    title: "Pitch Simplifié",
    description: "Présentation concise de votre projet pour des investisseurs ou partenaires.",
    status: "draft"
  },
  {
    id: "doc-bp",
    type: "business_plan",
    title: "Business Plan Simplifié",
    description: "Document complet incluant étude de marché, modèle, finances et stratégie.",
    status: "draft"
  },
  {
    id: "doc-impact",
    type: "environmental_impact",
    title: "Rapport d'Impact Environnemental",
    description: "Indicateurs clés, méthodes de mesure et objectifs d'impact écologique.",
    status: "draft"
  }
];

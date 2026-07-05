import {
  BarChart3,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Factory,
  GraduationCap,
  Handshake,
  Leaf,
  LineChart,
  MapPinned,
  MessageSquareText,
  Recycle,
  Rocket,
  ShieldCheck,
  Sprout,
  SunMedium,
  Target,
  UsersRound,
  Waves
} from "lucide-react";
import type { Project, Resource } from "@/lib/types";

export const publicNav = [
  { href: "/about", label: "A propos" },
  { href: "/how-it-works", label: "Comment ca marche" },
  { href: "/features", label: "Fonctionnalites" },
  { href: "/become-mentor", label: "Devenir mentor" },
  { href: "/contact", label: "Contact" }
];

export const features = [
  { title: "Dashboard entrepreneur", description: "Une vue claire des projets, priorites, progres et ressources recommandees.", icon: BarChart3 },
  { title: "Creation de projet", description: "Un formulaire guide pour transformer une idee verte en fiche projet exploitable.", icon: Sprout },
  { title: "Business model canvas", description: "Des blocs structures pour clarifier revenus, partenaires et proposition de valeur.", icon: BriefcaseBusiness },
  { title: "Suivi de progression", description: "Dix etapes de maturite pour avancer sans perdre le fil.", icon: CheckCircle2 },
  { title: "Bibliotheque ressources", description: "Guides, modeles et contenus pratiques filtres par besoin.", icon: BookOpen },
  { title: "Mentorat", description: "Des retours experts pour renforcer le projet et preparer le lancement.", icon: Handshake },
  { title: "Espace administrateur", description: "Pilotage des utilisateurs, projets, mentors, ressources et statistiques.", icon: ShieldCheck },
  { title: "Assistant IA Green Coach", description: "Architecture prete pour analyser les idees, structurer les modeles et soutenir le plan d'action.", icon: Bot }
];

export const impactStats = [
  { label: "Projets verts", value: "120+", icon: Leaf },
  { label: "Emplois verts vises", value: "350", icon: UsersRound },
  { label: "Dechets evites", value: "48 t", icon: Recycle },
  { label: "CO2 evite", value: "620 t", icon: Factory }
];

export const steps = [
  { title: "Creer un compte", description: "Choisissez votre role et accedez a votre espace dedie.", icon: UsersRound },
  { title: "Deposer son idee verte", description: "Decrivez le probleme ecologique et la solution imaginee.", icon: Leaf },
  { title: "Structurer le projet", description: "Clarifiez la cible, les besoins, les objectifs et la localisation.", icon: ClipboardList },
  { title: "Construire le business model", description: "Formalisez revenus, couts, partenaires et canaux.", icon: CircleDollarSign },
  { title: "Mesurer l'impact", description: "Identifiez les indicateurs durables et les risques de greenwashing.", icon: LineChart },
  { title: "Preparer le lancement", description: "Organisez le MVP, la strategie, le financement et le plan d'action.", icon: Rocket }
];

export const projectSteps = [
  "Idee initiale",
  "Validation du probleme",
  "Definition de la solution",
  "Public cible",
  "Business model",
  "Impact ecologique",
  "Prototype MVP",
  "Test terrain",
  "Strategie de lancement",
  "Preparation au lancement"
];

export const categories = [
  "recyclage",
  "gestion des dechets",
  "energie renouvelable",
  "agriculture durable",
  "eau",
  "mobilite verte",
  "economie circulaire",
  "education environnementale",
  "technologie verte",
  "autre"
];

export const resourceCategories = [
  "business model",
  "argumentaire",
  "developpement durable",
  "financement",
  "marketing",
  "etude de marche",
  "impact ecologique",
  "juridique",
  "prototypage",
  "IA et innovation"
];

export const demoProjects: Project[] = [
  {
    id: "ecopack-tunisia",
    name: "EcoPack Tunisia",
    slogan: "Emballer mieux, polluer moins",
    category: "economie circulaire",
    shortDescription: "Emballages biodegradables pour petits commerces et restaurateurs.",
    problem: "Les commerces utilisent encore beaucoup d'emballages plastiques jetables difficiles a recycler.",
    solution: "Produire et distribuer des emballages compostables a base de fibres vegetales locales.",
    targetAudience: "Restaurants, epiceries fines, traiteurs et commerces de proximite.",
    location: "Tunis",
    stage: "Prototype MVP",
    environmentalImpact: "Reduction des plastiques a usage unique et valorisation de matieres vegetales.",
    businessModel: "Vente B2B par abonnement mensuel et commandes ponctuelles.",
    needs: "Tests matiere, partenaires fournisseurs, premiers clients pilotes.",
    shortTermGoals: "Valider 3 formats d'emballages et signer 10 commerces pilotes.",
    longTermGoals: "Installer une unite locale de production et couvrir trois grandes villes.",
    progress: 68,
    hasMentor: true
  },
  {
    id: "recyclclean",
    name: "RecyClean",
    slogan: "La collecte locale devient simple",
    category: "gestion des dechets",
    shortDescription: "Plateforme locale de collecte et tri des dechets pour quartiers urbains.",
    problem: "Les habitants manquent de solutions pratiques pour trier et deposer leurs dechets valorisables.",
    solution: "Connecter foyers, collecteurs et centres de tri via une application de planification.",
    targetAudience: "Quartiers urbains, syndics, municipalites et collecteurs independants.",
    location: "Sfax",
    stage: "Validation terrain",
    environmentalImpact: "Hausse du taux de recyclage et reduction des depots sauvages.",
    businessModel: "Commission sur collecte, contrats B2B avec syndics et collectivites.",
    needs: "Accords municipaux, application pilote, reseau de collecteurs.",
    shortTermGoals: "Tester deux quartiers et mesurer les volumes collectes.",
    longTermGoals: "Devenir l'infrastructure locale de collecte intelligente.",
    progress: 52,
    hasMentor: false
  },
  {
    id: "solargrow",
    name: "SolarGrow",
    slogan: "Une energie solaire pour cultiver mieux",
    category: "energie renouvelable",
    shortDescription: "Solution solaire pour petites exploitations agricoles.",
    problem: "Les petits agriculteurs dependent d'une energie couteuse et instable pour irriguer.",
    solution: "Kits solaires modulaires avec suivi de consommation et maintenance simplifiee.",
    targetAudience: "Petites exploitations agricoles et cooperatives rurales.",
    location: "Kairouan",
    stage: "Idee structuree",
    environmentalImpact: "Reduction de la dependance aux carburants et meilleure efficacite energetique.",
    businessModel: "Location avec option d'achat et maintenance incluse.",
    needs: "Partenaires techniques, financement materiel, sites pilotes.",
    shortTermGoals: "Installer 5 kits pilotes et suivre l'economie d'energie.",
    longTermGoals: "Equiper 1 000 petites fermes en trois ans.",
    progress: 35,
    hasMentor: true
  }
];

export const demoResources: Resource[] = [
  { id: "bmc-green", title: "Comment creer un Business Model Canvas vert", category: "business model", description: "Un guide pratique pour structurer valeur, revenus, partenaires et impact.", type: "Guide", url: "#", createdAt: "2026-06-03" },
  { id: "argumentaire", title: "Raconter clairement sa startup verte", category: "argumentaire", description: "Une trame pour expliquer le probleme, la solution, le modele, l'impact et les besoins de lancement.", type: "Template", url: "#", createdAt: "2026-06-08" },
  { id: "impact", title: "Mesurer son impact ecologique", category: "impact ecologique", description: "KPI, methodes de suivi et points de vigilance contre le greenwashing.", type: "Article", url: "#", createdAt: "2026-06-12" },
  { id: "circular", title: "Introduction a l'economie circulaire", category: "developpement durable", description: "Concepts essentiels pour concevoir une activite plus sobre et reparable.", type: "Cours", url: "#", createdAt: "2026-06-18" },
  { id: "funding", title: "Trouver des financements pour projets verts", category: "financement", description: "Cartographie des aides, concours, subventions et investisseurs a impact.", type: "Checklist", url: "#", createdAt: "2026-06-22" }
];

export const dashboardLinks = [
  { href: "/dashboard", label: "Vue generale", icon: BarChart3 },
  { href: "/project", label: "Mon projet", icon: Sprout },
  { href: "/resources", label: "Ressources", icon: BookOpen },
  { href: "/dashboard/ai", label: "Green Coach IA", icon: Bot },
  { href: "/expert/dashboard", label: "Espace expert", icon: MessageSquareText },
  { href: "/admin/dashboard", label: "Admin", icon: ShieldCheck }
];

export const aiActions = [
  { type: "analyze-project", title: "Analyser mon projet", description: "Clarte, marche, impact, risques et recommandations.", icon: Target },
  { type: "generate-business-model", title: "Generer mon business model", description: "Canvas complet adapte aux projets verts.", icon: BriefcaseBusiness },
  { type: "generate-swot", title: "Creer mon SWOT", description: "Forces, faiblesses, opportunites et menaces.", icon: ClipboardList },
  { type: "generate-pitch", title: "Structurer mon argumentaire", description: "Recit clair du probleme, de la solution, du modele, de l'impact et du lancement.", icon: Rocket },
  { type: "analyze-impact", title: "Analyser mon impact ecologique", description: "KPI durables, risques de greenwashing et actions utiles.", icon: Waves },
  { type: "generate-action-plan", title: "Creer mon plan d'action", description: "Objectifs et taches sur 30, 60 et 90 jours.", icon: MapPinned }
];

export const adminStats = [
  { label: "Utilisateurs", value: 248 },
  { label: "Projets", value: 87 },
  { label: "Mentors", value: 24 },
  { label: "Ressources", value: 42 }
];

export const mentorProjects = [
  { project: demoProjects[0], status: "Accompagnement actif", focus: "Industrialisation et premiers contrats B2B" },
  { project: demoProjects[2], status: "Diagnostic initial", focus: "Validation terrain et cout d'acquisition" }
];

export const roleLabels = {
  entrepreneur: "Entrepreneur",
  expert: "Expert",
  admin: "Administrateur"
};

export const stageIcons = [Leaf, Target, SunMedium, GraduationCap];

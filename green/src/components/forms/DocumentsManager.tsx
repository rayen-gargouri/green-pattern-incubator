"use client";

import { useEffect, useState } from "react";
import { Download, Edit3, FileText, Loader2, Plus } from "lucide-react";
import { downloadMarkdown, getDocuments, getProject, saveDocuments, updateDocument } from "@/lib/storage";
import { initialDocuments } from "@/lib/initial-data";
import type { Document } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

// ============================================================
// Générateur de contenu Markdown par type de document
// ============================================================
function generateContent(doc: Document, projectName: string): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    year: "numeric", month: "long", day: "numeric"
  });

  switch (doc.type) {
    case "project_idea":
      return `# Fiche Idée de Projet — ${projectName}\n> Générée le ${date} via Green Pattern Incubator\n\n## 🌿 Présentation du projet\nNom : ${projectName}\n\n## ❗ Problème environnemental ciblé\n[À compléter depuis la fiche projet]\n\n## 💡 Solution proposée\n[À compléter depuis la fiche projet]\n\n## 🎯 Public cible\n[À compléter depuis la fiche projet]\n\n## 🌍 Impact environnemental attendu\n[À compléter depuis la fiche projet]\n\n## 🔑 Différenciation\n[En quoi votre solution est-elle unique ou meilleure que l'existant ?]\n\n---\n*Complétez ce document en remplissant d'abord votre fiche projet sur la plateforme.*`;
    case "business_model_canvas":
      return `# Business Model Canvas — ${projectName}\n> Généré le ${date} via Green Pattern Incubator\n\n## 💡 Proposition de valeur\n[Depuis l'outil BMC]\n\n## 👥 Segments clients\n[Depuis l'outil BMC]\n\n## 📢 Canaux de distribution\n[Depuis l'outil BMC]\n\n## 🤝 Relation client\n[Depuis l'outil BMC]\n\n## 💰 Sources de revenus\n[Depuis l'outil BMC]\n\n## 🔧 Ressources clés\n[Depuis l'outil BMC]\n\n## ⚙️ Activités clés\n[Depuis l'outil BMC]\n\n## 🌐 Partenaires clés\n[Depuis l'outil BMC]\n\n## 📊 Structure des coûts\n[Depuis l'outil BMC]\n\n---\n*Remplissez le Business Model Canvas dans la section dédiée de la plateforme.*`;
    case "swot_analysis":
      return `# Analyse SWOT — ${projectName}\n> Générée le ${date} via Green Pattern Incubator\n\n## ✅ Forces (Strengths)\n- [Listez vos points forts internes]\n- [Compétences de l'équipe]\n- [Avantages concurrentiels]\n\n## ⚠️ Faiblesses (Weaknesses)\n- [Ressources limitées]\n- [Manques à combler]\n- [Risques internes]\n\n## 🚀 Opportunités (Opportunities)\n- [Tendances du marché favorables]\n- [Soutien aux projets verts]\n- [Partenariats potentiels]\n\n## ⛔ Menaces (Threats)\n- [Concurrents existants]\n- [Risques réglementaires]\n- [Facteurs environnementaux]\n\n---\n*Complétez chaque quadrant avec les éléments spécifiques à votre projet.*`;
    case "action_plan":
      return `# Plan d'Action — ${projectName}\n> Généré le ${date} via Green Pattern Incubator\n\n## 🎯 Objectifs globaux\n[À définir depuis vos objectifs de projet]\n\n## 📅 Actions sur 30 jours\n1. [ ] [Action prioritaire 1]\n2. [ ] [Action prioritaire 2]\n3. [ ] [Action prioritaire 3]\n\n## 📅 Actions sur 60 jours\n1. [ ] [Jalons intermédiaires]\n2. [ ] [Tests terrain]\n3. [ ] [Premiers retours clients]\n\n## 📅 Actions sur 90 jours\n1. [ ] [MVP ou lancement pilote]\n2. [ ] [Premières métriques]\n3. [ ] [Ajustements post-lancement]\n\n## 📊 Indicateurs de succès\n| Indicateur | Cible | Unité |\n|------------|-------|-------|\n| Clients pilotes | 10 | personnes |\n| Impact mesuré | TBD | à définir |\n| Revenus | TBD | € |\n\n---\n*Mettez à jour ce plan régulièrement selon l'avancement de votre parcours.*`;
    case "pitch":
      return `# Pitch — ${projectName}\n> Généré le ${date} via Green Pattern Incubator\n\n## 🎤 Accroche (10 secondes)\n"[Une phrase percutante qui résume votre projet et son impact]"\n\n## ❗ Le problème (30 secondes)\n[Quel problème environnemental concret adressez-vous ?\nQui en souffre ? Dans quelle mesure ?]\n\n## 💡 Notre solution (30 secondes)\n[Comment votre projet résout-il ce problème ?\nQu'est-ce qui vous différencie ?]\n\n## 📈 Le marché (20 secondes)\n[Quelle est la taille de votre marché cible ?\nQui sont vos premiers clients ?]\n\n## 💰 Le modèle économique (20 secondes)\n[Comment gagnez-vous de l'argent ?\nQuel est votre plan de revenus ?]\n\n## 🌍 L'impact environnemental (20 secondes)\n[Quel impact concret et mesurable aurez-vous ?\nComment le mesurez-vous ?]\n\n## 🚀 L'appel à l'action (10 secondes)\n"[Ce que vous demandez : financement, partenariat, mentorat…]"\n\n---\n*Entraînez-vous à présenter ce pitch en moins de 2 minutes.*`;
    case "business_plan":
      return `# Business Plan Simplifié — ${projectName}\n> Généré le ${date} via Green Pattern Incubator\n\n## 1. Résumé exécutif\n[Synthèse du projet en 5 à 10 lignes]\n\n## 2. Le problème et la solution\n### Problème\n[Description détaillée du problème environnemental]\n\n### Solution\n[Comment votre projet y répond concrètement]\n\n## 3. Étude de marché\n### Taille du marché\n[Estimation du marché total et accessible]\n\n### Concurrents\n| Concurrent | Forces | Faiblesses |\n|------------|--------|------------|\n| [Nom] | [+] | [-] |\n\n## 4. Modèle économique\n### Sources de revenus\n[Listez vos flux de revenus]\n\n### Structure de coûts\n[Principaux postes de dépenses]\n\n## 5. Plan d'action et jalons\n[Calendrier des étapes clés]\n\n## 6. Financements recherchés\n[Montants, sources, utilisation prévue]\n\n## 7. Impact environnemental et social\n[KPI, méthodes de mesure, objectifs SDGs]\n\n---\n*Développez chaque section avec les données réelles de votre projet.*`;
    case "environmental_impact":
      return `# Rapport d'Impact Environnemental — ${projectName}\n> Généré le ${date} via Green Pattern Incubator\n\n## 🌿 Synthèse d'impact\n[Description générale de l'impact de votre projet sur l'environnement]\n\n## 📊 Indicateurs clés (KPIs environnementaux)\n| Indicateur | Valeur actuelle | Objectif | Unité |\n|------------|-----------------|----------|-------|\n| CO₂ évité | - | TBD | tonnes/an |\n| Déchets valorisés | - | TBD | kg/an |\n| Eau économisée | - | TBD | litres/an |\n| Emplois verts créés | - | TBD | postes |\n\n## 🔬 Méthodes de mesure\n[Comment comptez-vous mesurer et prouver votre impact ?]\n\n## ⚠️ Risques de greenwashing\n- [Risque identifié 1 et mesure corrective]\n- [Risque identifié 2 et mesure corrective]\n\n## 🎯 Contribution aux ODD (Objectifs de Développement Durable)\n- ODD 13 — Action climatique : [Comment ?]\n- ODD 12 — Consommation responsable : [Comment ?]\n- ODD 8 — Travail décent et croissance : [Comment ?]\n\n## 📅 Feuille de route impact\n| Trimestre | Objectif d'impact |\n|-----------|-------------------|\n| T1 | [Objectif mesurable] |\n| T2 | [Objectif mesurable] |\n| T3 | [Objectif mesurable] |\n| T4 | [Objectif mesurable] |\n\n---\n*Ce rapport doit être mis à jour trimestriellement avec des données réelles.*`;
    default:
      return `# ${doc.title} — ${projectName}\n> Généré le ${date}\n\n[Contenu à compléter]`;
  }
}

// ============================================================
// Labels lisibles pour les types de documents
// ============================================================
const DOCTYPE_LABELS: Record<string, string> = {
  project_idea: "Idée de Projet",
  business_model_canvas: "Business Model Canvas",
  swot_analysis: "Analyse SWOT",
  action_plan: "Plan d'Action",
  pitch: "Pitch Simplifié",
  business_plan: "Business Plan",
  environmental_impact: "Rapport d'Impact"
};

// ============================================================
// Composant principal
// ============================================================
export function DocumentsManager() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("Mon Projet Vert");

  useEffect(() => {
    const stored = getDocuments();
    setDocs(stored ?? initialDocuments);
    if (!stored) saveDocuments(initialDocuments);
    const proj = getProject();
    if (proj?.name) setProjectName(proj.name);
  }, []);

  function handleDownload(doc: Document) {
    setDownloading(doc.id);
    const content = generateContent(doc, projectName);
    const slug = doc.type.replace(/_/g, "-");
    downloadMarkdown(`gpi-${slug}`, content);

    // Marquer comme "exporté"
    const updated = updateDocument(doc.id, { status: "exported", content }, docs);
    setDocs(updated);
    setTimeout(() => setDownloading(null), 800);
  }

  function handleCreate(doc: Document) {
    const updated = updateDocument(doc.id, { status: "completed" }, docs);
    setDocs(updated);
  }

  const stats = {
    total: docs.length,
    completed: docs.filter((d) => d.status !== "draft").length,
    exported: docs.filter((d) => d.status === "exported").length
  };

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Documents totaux", value: stats.total, color: "text-foreground", bg: "bg-card" },
          { label: "Complétés", value: stats.completed, color: "text-primary", bg: "bg-emerald-50/50" },
          { label: "Exportés", value: stats.exported, color: "text-cyan-700", bg: "bg-cyan-50/50" }
        ].map((stat, index) => (
          <AnimatedSection key={stat.label} delay={index * 0.1} direction="down">
            <div className={`rounded-2xl border border-border/60 ${stat.bg} p-6 shadow-sm text-center`}>
              <p className={`text-4xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Liste des documents */}
      <div className="grid gap-6 md:grid-cols-2">
        {docs.map((doc, index) => {
          const isDownloading = downloading === doc.id;
          const statusColor =
            doc.status === "exported"
              ? "bg-cyan-100 text-cyan-800 border-cyan-200"
              : doc.status === "completed"
              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
              : "bg-slate-100 text-slate-700 border-slate-200";

          return (
            <AnimatedSection key={doc.id} delay={0.2 + index * 0.1} direction="up">
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-card hover:-translate-y-1">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-base">{doc.title}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                        {DOCTYPE_LABELS[doc.type] ?? doc.type}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColor}`}>
                    {doc.status === "exported" ? "Exporté" : doc.status === "completed" ? "Complété" : "Brouillon"}
                  </span>
                </div>

                <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">{doc.description}</p>

                <div className="flex flex-wrap gap-3">
                  {doc.status === "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreate(doc)}
                    >
                      <Plus className="h-4 w-4" />
                      Créer
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCreate(doc)}
                  >
                    <Edit3 className="h-4 w-4" />
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(doc)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Télécharger (.md)
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}

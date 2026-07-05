"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Save, Sprout, Square } from "lucide-react";
import { getProject, saveProject } from "@/lib/storage";
import type { Project, ProjectNeeds } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

// ============================================================
// Données de configuration
// ============================================================
const sectors = [
  "Recyclage et valorisation des déchets",
  "Gestion des déchets",
  "Énergie renouvelable",
  "Agriculture durable et agroécologie",
  "Eau et assainissement",
  "Mobilité verte",
  "Économie circulaire",
  "Éducation environnementale",
  "Technologie verte",
  "Bâtiment et construction durable",
  "Alimentation durable",
  "Biodiversité et espaces verts",
  "Autre"
];

const stages = [
  "Idée initiale",
  "Idée structurée",
  "Validation terrain",
  "Prototype MVP",
  "Lancement",
  "En développement"
];

const NEEDS_OPTIONS: ProjectNeeds[] = [
  "financement",
  "mentorat",
  "étude de marché",
  "business plan",
  "marketing",
  "partenariats",
  "accompagnement technique"
];

// ============================================================
// Composant
// ============================================================
export function ProjectForm() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<Partial<Project>>({
    name: "",
    sector: "",
    problem: "",
    solution: "",
    targetAudience: "",
    objectives: "",
    availableResources: "",
    advancementLevel: stages[0],
    selectedNeeds: [],
    shortDescription: "",
    environmentalImpact: "",
    location: ""
  });

  // Charger depuis localStorage au montage
  useEffect(() => {
    const existing = getProject();
    if (existing) {
      setForm({
        name: existing.name ?? "",
        sector: existing.sector ?? existing.category ?? "",
        problem: existing.problem ?? "",
        solution: existing.solution ?? "",
        targetAudience: existing.targetAudience ?? "",
        objectives: existing.objectives ?? existing.shortTermGoals ?? "",
        availableResources: existing.availableResources ?? "",
        advancementLevel: existing.advancementLevel ?? existing.stage ?? stages[0],
        selectedNeeds: existing.selectedNeeds ?? [],
        shortDescription: existing.shortDescription ?? "",
        environmentalImpact: existing.environmentalImpact ?? "",
        location: existing.location ?? ""
      });
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleNeed(need: ProjectNeeds) {
    setSaved(false);
    setForm((prev) => {
      const current = prev.selectedNeeds ?? [];
      const exists = current.includes(need);
      return {
        ...prev,
        selectedNeeds: exists ? current.filter((n) => n !== need) : [...current, need]
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const project: Project = {
      id: getProject()?.id ?? `project_${Date.now()}`,
      name: form.name ?? "",
      slogan: form.shortDescription ?? "",
      category: form.sector ?? "",
      sector: form.sector ?? "",
      shortDescription: form.shortDescription ?? "",
      problem: form.problem ?? "",
      solution: form.solution ?? "",
      targetAudience: form.targetAudience ?? "",
      location: form.location ?? "",
      stage: form.advancementLevel ?? stages[0],
      advancementLevel: form.advancementLevel ?? stages[0],
      environmentalImpact: form.environmentalImpact ?? "",
      businessModel: "",
      needs: (form.selectedNeeds ?? []).join(", "),
      selectedNeeds: form.selectedNeeds ?? [],
      objectives: form.objectives ?? "",
      availableResources: form.availableResources ?? "",
      shortTermGoals: form.objectives ?? "",
      longTermGoals: "",
      progress: getProject()?.progress ?? 0,
      hasMentor: getProject()?.hasMentor ?? false,
      createdAt: getProject()?.createdAt ?? new Date().toISOString()
    };
    saveProject(project);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* Section 1 — Identification */}
      <AnimatedSection delay={0.1}>
        <fieldset className="rounded-2xl border border-border/60 bg-card p-8 shadow-card space-y-6">
          <legend className="flex items-center gap-2 px-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Sprout className="h-5 w-5" />
            1. Identification du projet
          </legend>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Nom du projet *" htmlFor="name">
              <Input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ex : EcoPack Tunisia"
              />
            </Field>

            <Field label="Secteur d'activité *" htmlFor="sector">
              <Select
                id="sector"
                name="sector"
                required
                value={form.sector}
                onChange={handleChange}
              >
                <option value="">Choisir un secteur…</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Localisation" htmlFor="location">
            <Input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ex : Tunis, Sfax, Dakar…"
            />
          </Field>

          <Field label="Description courte du projet" htmlFor="shortDescription">
            <Textarea
              id="shortDescription"
              name="shortDescription"
              rows={2}
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="En une ou deux phrases, résumez votre projet vert…"
            />
          </Field>
        </fieldset>
      </AnimatedSection>

      {/* Section 2 — Problème et solution */}
      <AnimatedSection delay={0.2}>
        <fieldset className="rounded-2xl border border-border/60 bg-card p-8 shadow-card space-y-6">
          <legend className="flex items-center gap-2 px-2 text-sm font-bold text-primary uppercase tracking-wider">
            2. Problème environnemental & solution
          </legend>

          <Field label="Problème environnemental ciblé *" htmlFor="problem">
            <Textarea
              id="problem"
              name="problem"
              required
              rows={3}
              value={form.problem}
              onChange={handleChange}
              placeholder="Quel problème écologique ou environnemental votre projet cherche-t-il à résoudre ?"
            />
          </Field>

          <Field label="Solution proposée *" htmlFor="solution">
            <Textarea
              id="solution"
              name="solution"
              required
              rows={3}
              value={form.solution}
              onChange={handleChange}
              placeholder="Comment votre projet résout-il ce problème concrètement ?"
            />
          </Field>

          <Field label="Impact environnemental attendu" htmlFor="environmentalImpact">
            <Textarea
              id="environmentalImpact"
              name="environmentalImpact"
              rows={2}
              value={form.environmentalImpact}
              onChange={handleChange}
              placeholder="Ex : Réduction de 30% des déchets plastiques dans le quartier…"
            />
          </Field>
        </fieldset>
      </AnimatedSection>

      {/* Section 3 — Public et objectifs */}
      <AnimatedSection delay={0.3}>
        <fieldset className="rounded-2xl border border-border/60 bg-card p-8 shadow-card space-y-6">
          <legend className="flex items-center gap-2 px-2 text-sm font-bold text-primary uppercase tracking-wider">
            3. Public cible & objectifs
          </legend>

          <Field label="Public cible *" htmlFor="targetAudience">
            <Textarea
              id="targetAudience"
              name="targetAudience"
              required
              rows={2}
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="Qui sont vos bénéficiaires ou clients principaux ? (âge, secteur, lieu…)"
            />
          </Field>

          <Field label="Objectifs du projet" htmlFor="objectives">
            <Textarea
              id="objectives"
              name="objectives"
              rows={3}
              value={form.objectives}
              onChange={handleChange}
              placeholder="Quels sont vos objectifs à court et moyen terme ? (chiffres, jalons, impacts…)"
            />
          </Field>
        </fieldset>
      </AnimatedSection>

      {/* Section 4 — Ressources et avancement */}
      <AnimatedSection delay={0.4}>
        <fieldset className="rounded-2xl border border-border/60 bg-card p-8 shadow-card space-y-6">
          <legend className="flex items-center gap-2 px-2 text-sm font-bold text-primary uppercase tracking-wider">
            4. Ressources & avancement
          </legend>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Ressources disponibles" htmlFor="availableResources">
              <Textarea
                id="availableResources"
                name="availableResources"
                rows={3}
                value={form.availableResources}
                onChange={handleChange}
                placeholder="Compétences, équipe, outils, budget initial, partenaires…"
              />
            </Field>

            <Field label="Niveau d'avancement actuel *" htmlFor="advancementLevel">
              <Select
                id="advancementLevel"
                name="advancementLevel"
                required
                value={form.advancementLevel}
                onChange={handleChange}
              >
                {stages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>
        </fieldset>
      </AnimatedSection>

      {/* Section 5 — Besoins principaux */}
      <AnimatedSection delay={0.5}>
        <fieldset className="rounded-2xl border border-border/60 bg-card p-8 shadow-card space-y-5">
          <legend className="flex items-center gap-2 px-2 text-sm font-bold text-primary uppercase tracking-wider">
            5. Besoins principaux
          </legend>
          <p className="text-sm text-muted-foreground mb-2">Sélectionnez tous vos besoins actuels pour que nous puissions mieux vous orienter.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NEEDS_OPTIONS.map((need) => {
              const selected = (form.selectedNeeds ?? []).includes(need);
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={need}
                  type="button"
                  onClick={() => toggleNeed(need)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-colors text-left ${
                    selected
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  {selected ? (
                    <CheckSquare className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Square className="h-5 w-5 shrink-0" />
                  )}
                  <span className="capitalize">{need}</span>
                </motion.button>
              );
            })}
          </div>
        </fieldset>
      </AnimatedSection>

      {/* Bouton sauvegarde */}
      <AnimatedSection delay={0.6} direction="up" className="flex items-center gap-4">
        <Button type="submit" size="lg">
          <Save className="h-4 w-4" />
          Enregistrer mon projet
        </Button>
        {saved && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Projet sauvegardé avec succès
          </motion.span>
        )}
      </AnimatedSection>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

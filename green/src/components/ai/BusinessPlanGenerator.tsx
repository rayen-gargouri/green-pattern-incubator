"use client";

import { useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AIErrorState } from "./AIErrorState";
import { AILoadingState } from "./AILoadingState";
import { buildClientAIPayload, getCurrentProject, listToMarkdown, persistAIOutput, postAI } from "./ai-ui-utils";
import type { AIBusinessPlan } from "@/lib/ai/ai-types";
import type { DocumentType, Project } from "@/types";

type GeneratorProps = {
  fallbackProject?: Project;
  onSaveDocument?: (type: DocumentType, content: string) => void;
};

export function BusinessPlanGenerator({ fallbackProject, onSaveDocument }: GeneratorProps) {
  const [plan, setPlan] = useState<AIBusinessPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const payload = buildClientAIPayload(fallbackProject);
      const response = await postAI<AIBusinessPlan>("/api/ai/business-plan", payload);
      setPlan(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("business-plan", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  function saveAsDocument() {
    if (!plan || !onSaveDocument) return;
    const project = getCurrentProject(fallbackProject);
    onSaveDocument("business_plan", businessPlanToMarkdown(plan, project.name));
    setSaved(true);
  }

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <BriefcaseBusiness className="h-4 w-4" />
            Business plan IA
          </div>
          <CardTitle>Business plan simplifie</CardTitle>
          <CardDescription className="mt-2">Synthese structuree pour preparer l'accompagnement.</CardDescription>
        </div>
        <Button type="button" onClick={generate} disabled={loading} className="h-auto min-h-10 whitespace-normal">
          <Sparkles className="h-4 w-4" />
          Generer un business plan simplifie avec l'IA
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Business plan en cours..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && plan && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {plan && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <PlanBlock title="Resume executif" value={plan.executiveSummary} />
              <PlanBlock title="Proposition de valeur" value={plan.valueProposition} />
              <PlanBlock title="Marche cible" value={plan.targetMarket} />
              <PlanBlock title="Modele economique" value={plan.businessModel} />
            </div>
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm font-semibold text-foreground">Prochaines etapes</p>
              <ul className="mt-3 space-y-2 text-sm leading-5 text-muted-foreground">
                {plan.nextSteps.map((step) => (
                  <li key={step}>- {step}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="secondary" onClick={saveAsDocument}>
                <Save className="h-4 w-4" />
                Sauvegarder comme document
              </Button>
              {saved && (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Diagnostic genere avec succes
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function PlanBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function businessPlanToMarkdown(plan: AIBusinessPlan, projectName: string) {
  return [
    `# Business Plan Simplifie - ${projectName}`,
    "",
    "## Resume executif",
    plan.executiveSummary,
    "",
    "## Probleme",
    plan.problem,
    "",
    "## Solution",
    plan.solution,
    "",
    "## Marche cible",
    plan.targetMarket,
    "",
    "## Proposition de valeur",
    plan.valueProposition,
    "",
    "## Modele economique",
    plan.businessModel,
    "",
    "## Strategie marketing",
    plan.marketingStrategy,
    "",
    listToMarkdown("Ressources necessaires", plan.requiredResources),
    "",
    listToMarkdown("Partenaires potentiels", plan.potentialPartners),
    "",
    "## Impact environnemental",
    plan.environmentalImpact,
    "",
    listToMarkdown("Prochaines etapes", plan.nextSteps)
  ].join("\n");
}

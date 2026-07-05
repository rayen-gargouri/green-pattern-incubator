"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ListChecks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AIErrorState } from "./AIErrorState";
import { AILoadingState } from "./AILoadingState";
import {
  buildClientAIPayload,
  getCurrentProject,
  getLatestAIOutput,
  persistAIOutput,
  postAI
} from "./ai-ui-utils";
import type { AINextStep } from "@/lib/ai/ai-types";
import type { Project } from "@/types";

export function AINextSteps({ fallbackProject }: { fallbackProject?: Project }) {
  const [steps, setSteps] = useState<AINextStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const project = getCurrentProject(fallbackProject);
    const saved = getLatestAIOutput<AINextStep[]>("next-steps", project);
    if (saved) setSteps(saved);
  }, [fallbackProject]);

  async function runNextSteps() {
    setLoading(true);
    setError(null);
    try {
      const payload = buildClientAIPayload(fallbackProject);
      const response = await postAI<AINextStep[]>("/api/ai/next-steps", payload);
      setSteps(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("next-steps", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <ListChecks className="h-4 w-4" />
            Prochaines etapes IA
          </div>
          <CardTitle>Actions a lancer</CardTitle>
          <CardDescription className="mt-2">Urgence, effort estime et page associee.</CardDescription>
        </div>
        <Button type="button" variant="outline" onClick={runNextSteps} disabled={loading}>
          <Sparkles className="h-4 w-4" />
          Generer
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Calcul des prochaines etapes..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && steps.length > 0 && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {steps.length > 0 && (
          <div className="grid gap-3">
            {steps.map((step) => (
              <a
                key={`${step.title}-${step.relatedPage}`}
                href={step.relatedPage}
                className="group rounded-lg border bg-white p-4 transition hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${urgencyClass(step.urgency)}`}>
                    {step.urgency}
                  </span>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {step.estimatedEffort}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function urgencyClass(urgency: AINextStep["urgency"]) {
  if (urgency === "haute") return "bg-red-50 text-red-700";
  if (urgency === "moyenne") return "bg-amber-50 text-amber-700";
  return "bg-primary/10 text-primary";
}

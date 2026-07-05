"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
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
import type { AIRecommendation } from "@/lib/ai/ai-types";
import type { Project } from "@/types";

export function AIRecommendationsPanel({ fallbackProject }: { fallbackProject?: Project }) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const project = getCurrentProject(fallbackProject);
    const saved = getLatestAIOutput<AIRecommendation[]>("recommendations", project);
    if (saved) setRecommendations(saved);
  }, [fallbackProject]);

  async function runRecommendations() {
    setLoading(true);
    setError(null);
    try {
      const payload = buildClientAIPayload(fallbackProject);
      const response = await postAI<AIRecommendation[]>("/api/ai/recommendations", payload);
      setRecommendations(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("recommendations", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <Lightbulb className="h-4 w-4" />
            Recommandations IA personnalisees
          </div>
          <CardTitle>Priorites d'accompagnement</CardTitle>
          <CardDescription className="mt-2">
            Actions classees par impact, urgence et categorie metier.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" onClick={runRecommendations} disabled={loading}>
          <Sparkles className="h-4 w-4" />
          Generer
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Recommandations en cours..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && recommendations.length > 0 && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {recommendations.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${priorityClass(recommendation.priority)}`}>
                    {recommendation.priority}
                  </span>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {recommendation.category}
                  </span>
                </div>
                <p className="font-semibold text-foreground">{recommendation.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{recommendation.description}</p>
                <p className="mt-3 text-sm font-medium text-primary">{recommendation.action}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function priorityClass(priority: AIRecommendation["priority"]) {
  if (priority === "haute") return "bg-red-50 text-red-700";
  if (priority === "moyenne") return "bg-amber-50 text-amber-700";
  return "bg-primary/10 text-primary";
}

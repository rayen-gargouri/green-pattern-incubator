"use client";

import { useState } from "react";
import { CheckCircle2, PanelsTopLeft, Sparkles, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AIErrorState } from "./AIErrorState";
import { AILoadingState } from "./AILoadingState";
import { buildClientAIPayload, persistAIOutput, postAI } from "./ai-ui-utils";
import type { BMCReview } from "@/lib/ai/ai-types";
import type { BMCData, Project } from "@/types";

export function BMCReviewPanel({
  bmc,
  fallbackProject
}: {
  bmc: BMCData;
  fallbackProject?: Project;
}) {
  const [review, setReview] = useState<BMCReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  async function runReview() {
    setLoading(true);
    setError(null);
    try {
      const payload = { ...buildClientAIPayload(fallbackProject), bmc };
      const response = await postAI<BMCReview>("/api/ai/bmc-review", payload);
      setReview(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("bmc-review", payload.project, response.output);
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
            <PanelsTopLeft className="h-4 w-4" />
            Analyse IA du canvas
          </div>
          <CardTitle>Completude et coherence</CardTitle>
          <CardDescription className="mt-2">
            Sections vides, incoherences et suggestions par bloc.
          </CardDescription>
        </div>
        <Button type="button" onClick={runReview} disabled={loading} className="h-auto min-h-10 whitespace-normal">
          <Sparkles className="h-4 w-4" />
          Analyser mon Business Model Canvas avec l'IA
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Analyse du canvas en cours..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && review && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {review && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <ScoreCard label="Score de completude" value={review.completenessScore} />
              <ScoreCard label="Score de coherence" value={review.coherenceScore} />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <ReviewList
                icon={TriangleAlert}
                title="Sections manquantes"
                items={review.missingSections.length ? review.missingSections : ["Aucune section vide majeure."]}
              />
              <ReviewList
                icon={TriangleAlert}
                title="Incoherences detectees"
                items={review.inconsistencies.length ? review.inconsistencies : ["Aucune incoherence majeure detectee."]}
              />
            </div>
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Suggestions par bloc
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {review.suggestionsBySection.map((item) => (
                  <div key={item.section} className="rounded-md border bg-muted/40 p-3">
                    <p className="text-sm font-semibold text-foreground">{item.section}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="rounded-lg border bg-primary/5 p-4 text-sm font-medium leading-6 text-primary">
              {review.globalAdvice}
            </p>
          </>
        )}
      </div>
    </Card>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-primary">{value}/100</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ReviewList({
  icon: Icon,
  title,
  items
}: {
  icon: typeof TriangleAlert;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

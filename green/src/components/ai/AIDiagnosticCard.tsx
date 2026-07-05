"use client";

import { useEffect, useState } from "react";
import { Bot, CheckCircle2, Gauge, Sparkles, Target, TriangleAlert } from "lucide-react";
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
import type { ProjectDiagnostic } from "@/lib/ai/ai-types";
import type { Project } from "@/types";

export function AIDiagnosticCard({ fallbackProject }: { fallbackProject?: Project }) {
  const [diagnostic, setDiagnostic] = useState<ProjectDiagnostic | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const project = getCurrentProject(fallbackProject);
    const saved = getLatestAIOutput<ProjectDiagnostic>("diagnostic", project);
    if (saved) setDiagnostic(saved);
  }, [fallbackProject]);

  async function runDiagnostic() {
    setLoading(true);
    setError(null);
    try {
      const payload = buildClientAIPayload(fallbackProject);
      const response = await postAI<ProjectDiagnostic>("/api/ai/diagnostic", payload);
      setDiagnostic(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("diagnostic", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  const score = diagnostic?.score ?? 0;

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <Bot className="h-4 w-4" />
            Diagnostic IA du projet
          </div>
          <CardTitle>Analyse de maturite</CardTitle>
          <CardDescription className="mt-2">
            Score, risques, opportunites et actions prioritaires pour le projet.
          </CardDescription>
        </div>
        <Button type="button" onClick={runDiagnostic} disabled={loading} className="h-auto min-h-10 whitespace-normal">
          <Sparkles className="h-4 w-4" />
          Analyser mon projet avec l'IA
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState />}
        {error && <AIErrorState message={error} />}

        {diagnostic && (
          <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Score global</p>
                  <p className="mt-1 text-4xl font-bold text-primary">{score}/100</p>
                </div>
                <Gauge className="h-9 w-9 text-primary" />
              </div>
              <div className="mt-4 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${score}%` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {diagnostic.maturityLevel}
                </span>
                {demoMode && (
                  <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                    Mode demonstration IA active
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{diagnostic.summary}</p>
            </div>

            <div className="grid gap-3">
              <DiagnosticList icon={CheckCircle2} title="Points forts" items={diagnostic.strengths} />
              <DiagnosticList icon={TriangleAlert} title="Risques" items={diagnostic.risks} />
              <DiagnosticList icon={Target} title="Actions conseillees" items={diagnostic.nextActions} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function DiagnosticList({
  icon: Icon,
  title,
  items
}: {
  icon: typeof CheckCircle2;
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
        {items.slice(0, 3).map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

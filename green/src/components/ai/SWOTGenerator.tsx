"use client";

import { useState } from "react";
import { CheckCircle2, ClipboardList, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AIErrorState } from "./AIErrorState";
import { AILoadingState } from "./AILoadingState";
import { buildClientAIPayload, getCurrentProject, listToMarkdown, persistAIOutput, postAI } from "./ai-ui-utils";
import type { SWOTAnalysis } from "@/lib/ai/ai-types";
import type { DocumentType, Project } from "@/types";

type GeneratorProps = {
  fallbackProject?: Project;
  onSaveDocument?: (type: DocumentType, content: string) => void;
};

export function SWOTGenerator({ fallbackProject, onSaveDocument }: GeneratorProps) {
  const [analysis, setAnalysis] = useState<SWOTAnalysis | null>(null);
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
      const response = await postAI<SWOTAnalysis>("/api/ai/swot", payload);
      setAnalysis(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("swot", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  function saveAsDocument() {
    if (!analysis || !onSaveDocument) return;
    const project = getCurrentProject(fallbackProject);
    onSaveDocument("swot_analysis", swotToMarkdown(analysis, project.name));
    setSaved(true);
  }

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <ClipboardList className="h-4 w-4" />
            SWOT IA
          </div>
          <CardTitle>Analyse SWOT</CardTitle>
          <CardDescription className="mt-2">Forces, faiblesses, opportunites et menaces.</CardDescription>
        </div>
        <Button type="button" onClick={generate} disabled={loading} className="h-auto min-h-10 whitespace-normal">
          <Sparkles className="h-4 w-4" />
          Generer une analyse SWOT avec l'IA
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Analyse SWOT en cours..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && analysis && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {analysis && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <SWOTBlock title="Forces" items={analysis.strengths} />
              <SWOTBlock title="Faiblesses" items={analysis.weaknesses} />
              <SWOTBlock title="Opportunites" items={analysis.opportunities} />
              <SWOTBlock title="Menaces" items={analysis.threats} />
            </div>
            <p className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
              {analysis.conclusion}
            </p>
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

function SWOTBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      <ul className="space-y-2 text-sm leading-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

function swotToMarkdown(analysis: SWOTAnalysis, projectName: string) {
  return [
    `# Analyse SWOT - ${projectName}`,
    "",
    listToMarkdown("Forces", analysis.strengths),
    "",
    listToMarkdown("Faiblesses", analysis.weaknesses),
    "",
    listToMarkdown("Opportunites", analysis.opportunities),
    "",
    listToMarkdown("Menaces", analysis.threats),
    "",
    "## Conclusion",
    analysis.conclusion
  ].join("\n");
}

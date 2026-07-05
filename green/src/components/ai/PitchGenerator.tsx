"use client";

import { useState } from "react";
import { CheckCircle2, Mic2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AIErrorState } from "./AIErrorState";
import { AILoadingState } from "./AILoadingState";
import { buildClientAIPayload, getCurrentProject, persistAIOutput, postAI } from "./ai-ui-utils";
import type { AIPitch, AIPitchAudience, AIPitchDuration } from "@/lib/ai/ai-types";
import type { DocumentType, Project } from "@/types";

type GeneratorProps = {
  fallbackProject?: Project;
  onSaveDocument?: (type: DocumentType, content: string) => void;
};

export function PitchGenerator({ fallbackProject, onSaveDocument }: GeneratorProps) {
  const [duration, setDuration] = useState<AIPitchDuration>("1min");
  const [audience, setAudience] = useState<AIPitchAudience>("incubateur");
  const [pitch, setPitch] = useState<AIPitch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const payload = { ...buildClientAIPayload(fallbackProject), duration, audience };
      const response = await postAI<AIPitch>("/api/ai/pitch", payload);
      setPitch(response.output);
      setDemoMode(response.demoMode);
      persistAIOutput("pitch", payload.project, response.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de generer l'analyse pour le moment");
    } finally {
      setLoading(false);
    }
  }

  function saveAsDocument() {
    if (!pitch || !onSaveDocument) return;
    const project = getCurrentProject(fallbackProject);
    onSaveDocument("pitch", pitchToMarkdown(pitch, project.name));
    setSaved(true);
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-primary">
            <Mic2 className="h-4 w-4" />
            Pitch IA
          </div>
          <CardTitle>Pitch simplifie</CardTitle>
          <CardDescription className="mt-2">Version courte adaptee au contexte de presentation.</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value as AIPitchDuration)}
            className="h-10 rounded-md border bg-white px-3 text-sm"
            aria-label="Type de pitch"
          >
            <option value="30s">30 secondes</option>
            <option value="1min">1 minute</option>
            <option value="3min">3 minutes</option>
          </select>
          <select
            value={audience}
            onChange={(event) => setAudience(event.target.value as AIPitchAudience)}
            className="h-10 rounded-md border bg-white px-3 text-sm"
            aria-label="Audience"
          >
            <option value="incubateur">Incubateur</option>
            <option value="jury">Jury</option>
            <option value="investisseurs">Investisseurs</option>
            <option value="mentors">Mentors</option>
          </select>
          <Button type="button" onClick={generate} disabled={loading}>
            <Sparkles className="h-4 w-4" />
            Generer
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {loading && <AILoadingState label="Pitch en cours..." />}
        {error && <AIErrorState message={error} />}
        {demoMode && pitch && (
          <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            Mode demonstration IA active
          </span>
        )}
        {pitch && (
          <>
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm font-semibold text-primary">{pitch.hook}</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-muted-foreground">
                {pitch.fullPitch}
              </pre>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <PitchDetail label="Probleme" value={pitch.problem} />
              <PitchDetail label="Solution" value={pitch.solution} />
              <PitchDetail label="Cible" value={pitch.target} />
              <PitchDetail label="Impact" value={pitch.impact} />
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

function PitchDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <p className="text-xs font-semibold uppercase text-primary">{label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function pitchToMarkdown(pitch: AIPitch, projectName: string) {
  return [
    `# Pitch simplifie - ${projectName}`,
    "",
    `Durée: ${pitch.duration}`,
    "",
    "## Accroche",
    pitch.hook,
    "",
    "## Probleme",
    pitch.problem,
    "",
    "## Solution",
    pitch.solution,
    "",
    "## Cible",
    pitch.target,
    "",
    "## Impact",
    pitch.impact,
    "",
    "## Modele economique",
    pitch.businessModel,
    "",
    "## Appel a l'action",
    pitch.callToAction,
    "",
    "## Pitch complet",
    pitch.fullPitch
  ].join("\n");
}

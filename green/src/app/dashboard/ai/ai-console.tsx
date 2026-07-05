"use client";

import { useState } from "react";
import { Copy, Save } from "lucide-react";
import { aiActions, demoProjects } from "@/lib/data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/states";

export function AiConsole() {
  const [active, setActive] = useState(aiActions[0].type);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("L'assistant IA sera bientot disponible. Votre projet est deja pret pour cette integration.");

  async function runAction(type: string) {
    setActive(type);
    setLoading(true);
    const response = await fetch(`/api/ai/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project: demoProjects[0] })
    });
    const json = await response.json();
    setResult(JSON.stringify(json, null, 2));
    setLoading(false);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="grid gap-3">
        {aiActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.type}
              onClick={() => runAction(action.type)}
              className={`rounded-lg border bg-white p-4 text-left transition hover:bg-muted ${active === action.type ? "border-primary" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{action.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <Card>
        <CardTitle>Resultat structure</CardTitle>
        <CardDescription className="mt-1">
          Les appels passent par des endpoints securises. Aucune cle IA n'est exposee cote client.
        </CardDescription>
        <div className="mt-5 min-h-80 rounded-md border bg-slate-950 p-4 text-sm text-slate-100">
          {loading ? <LoadingState label="Generation en cours" /> : <pre className="whitespace-pre-wrap">{result}</pre>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => navigator.clipboard.writeText(result)}>
            <Copy className="h-4 w-4" />
            Copier
          </Button>
          <Button type="button" variant="secondary">
            <Save className="h-4 w-4" />
            Sauvegarder dans le projet
          </Button>
        </div>
      </Card>
    </div>
  );
}

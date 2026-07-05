"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { getBMC, saveBMC } from "@/lib/storage";
import type { BMCData } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/Textarea";

// ============================================================
// Configuration des blocs BMC
// ============================================================
const BMC_BLOCKS: {
  key: keyof Omit<BMCData, "id" | "projectId" | "updatedAt">;
  label: string;
  placeholder: string;
  color: string;
}[] = [
  {
    key: "valueProposition",
    label: "💡 Proposition de valeur",
    placeholder: "Quelle valeur unique apportez-vous à vos clients ? Pourquoi vous choisir plutôt qu'un autre ?",
    color: "border-l-primary/80"
  },
  {
    key: "customerSegments",
    label: "👥 Segments clients",
    placeholder: "Qui sont vos clients ou bénéficiaires ? (PME, particuliers, collectivités, ONG…)",
    color: "border-l-blue-400/80"
  },
  {
    key: "channels",
    label: "📢 Canaux de distribution",
    placeholder: "Comment atteignez-vous vos clients ? (vente directe, web, partenaires, marchés…)",
    color: "border-l-cyan-400/80"
  },
  {
    key: "customerRelationships",
    label: "🤝 Relation client",
    placeholder: "Comment interagissez-vous avec vos clients ? (self-service, communauté, accompagnement…)",
    color: "border-l-teal-400/80"
  },
  {
    key: "revenueStreams",
    label: "💰 Sources de revenus",
    placeholder: "Comment gagnez-vous de l'argent ? (vente, abonnement, commission, don, subvention…)",
    color: "border-l-emerald-400/80"
  },
  {
    key: "keyResources",
    label: "🔧 Ressources clés",
    placeholder: "De quoi avez-vous besoin pour fonctionner ? (équipe, technologie, capital, matières premières…)",
    color: "border-l-amber-400/80"
  },
  {
    key: "keyActivities",
    label: "⚙️ Activités clés",
    placeholder: "Quelles sont les activités essentielles de votre modèle ? (production, R&D, sensibilisation…)",
    color: "border-l-orange-400/80"
  },
  {
    key: "keyPartners",
    label: "🌐 Partenaires clés",
    placeholder: "Qui sont vos partenaires stratégiques ? (fournisseurs, investisseurs, collectivités, ONG…)",
    color: "border-l-indigo-400/80"
  },
  {
    key: "costStructure",
    label: "📊 Structure des coûts",
    placeholder: "Quels sont vos principaux postes de dépenses ? (personnel, matériel, logistique, marketing…)",
    color: "border-l-rose-400/80"
  }
];

const EMPTY_BMC: BMCData = {
  valueProposition: "",
  customerSegments: "",
  channels: "",
  customerRelationships: "",
  revenueStreams: "",
  keyResources: "",
  keyActivities: "",
  keyPartners: "",
  costStructure: ""
};

// ============================================================
// Composant
// ============================================================
export function BMCForm() {
  const [data, setData] = useState<BMCData>(EMPTY_BMC);
  const [saved, setSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const stored = getBMC();
    if (stored) {
      setData(stored);
      setLastSaved(stored.updatedAt ?? null);
    }
  }, []);

  function handleChange(key: keyof BMCData, value: string) {
    setSaved(false);
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    saveBMC(data);
    setSaved(true);
    const now = new Date().toISOString();
    setLastSaved(now);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    if (confirm("Réinitialiser tout le canvas ? Cette action effacera vos données.")) {
      setData(EMPTY_BMC);
      setSaved(false);
    }
  }

  const filledBlocks = BMC_BLOCKS.filter(
    (b) => (data[b.key as keyof typeof data] as string)?.trim().length > 0
  ).length;

  return (
    <div className="space-y-8">
      {/* Barre de progression */}
      <AnimatedSection direction="down" className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="space-y-2 flex-1 max-w-md">
          <p className="text-sm font-bold text-foreground">
            {filledBlocks} / {BMC_BLOCKS.length} blocs remplis
          </p>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-primary transition-all duration-700 ease-out"
              style={{ width: `${(filledBlocks / BMC_BLOCKS.length) * 100}%` }}
            />
          </div>
        </div>
        {lastSaved && (
          <p className="text-xs font-medium text-muted-foreground ml-4">
            Dernière sauvegarde :{" "}
            <span className="text-foreground">
              {new Date(lastSaved).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </p>
        )}
      </AnimatedSection>

      {/* Grille des blocs BMC */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {BMC_BLOCKS.map((block, index) => {
          const value = (data[block.key as keyof typeof data] as string) ?? "";
          const isFilled = value.trim().length > 0;

          return (
            <AnimatedSection key={block.key} delay={index * 0.05} direction="up">
              <div
                className={`flex h-full flex-col rounded-2xl border-l-4 border-t border-b border-r border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-card hover:-translate-y-1 ${block.color}`}
              >
                <label
                  htmlFor={block.key}
                  className="mb-4 flex items-center text-sm font-bold text-foreground"
                >
                  {block.label}
                  {isFilled && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary" />
                  )}
                </label>
                <Textarea
                  id={block.key}
                  rows={5}
                  value={value}
                  onChange={(e) => handleChange(block.key as keyof BMCData, e.target.value)}
                  placeholder={block.placeholder}
                  className="flex-1 resize-none bg-background/50 border-border/50"
                />
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Actions */}
      <AnimatedSection delay={0.5} direction="up" className="flex flex-wrap items-center gap-4">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4" />
          Sauvegarder le canvas
        </Button>

        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="h-4 w-4" />
          Réinitialiser
        </Button>

        {saved && (
          <span className="flex items-center gap-2 text-sm font-semibold text-primary animate-in fade-in slide-in-from-left-4">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Canvas sauvegardé avec succès
          </span>
        )}
      </AnimatedSection>
    </div>
  );
}

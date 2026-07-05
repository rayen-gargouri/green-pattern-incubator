"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Circle, Clock } from "lucide-react";
import { computeProgress, getSteps, markStepDone, markStepUndone, saveSteps } from "@/lib/storage";
import { initialSteps } from "@/lib/initial-data";
import type { Step } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PathwaySteps() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [openId, setOpenId] = useState<string | null>("step-1");
  const [progress, setProgress] = useState(0);

  // Initialiser depuis localStorage ou données par défaut
  useEffect(() => {
    const stored = getSteps();
    const loaded = stored ?? initialSteps;
    if (!stored) saveSteps(initialSteps);
    setSteps(loaded);
    setProgress(computeProgress(loaded));
  }, []);

  function toggleDone(step: Step) {
    const isDone = step.status === "done";
    const updated = isDone ? markStepUndone(step.id, steps) : markStepDone(step.id, steps);
    setSteps(updated);
    setProgress(computeProgress(updated));
  }

  function toggleOpen(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const done = steps.filter((s) => s.status === "done").length;
  const total = steps.length;

  return (
    <div className="space-y-8">
      {/* Barre de progression globale */}
      <AnimatedSection direction="down" className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary uppercase tracking-wider">Progression globale</p>
            <p className="mt-1 text-3xl font-extrabold text-foreground">{progress}%</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p className="font-bold text-foreground text-lg">{done} / {total}</p>
            <p className="font-medium">étapes terminées</p>
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden shadow-inner">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-5 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {done} terminée{done > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-500" />
            {steps.filter((s) => s.status === "in_progress").length} en cours
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="h-4 w-4" />
            {steps.filter((s) => s.status === "not_started").length} à démarrer
          </span>
        </div>
      </AnimatedSection>

      {/* Liste des étapes */}
      <div className="grid gap-4">
        {steps.map((step, index) => {
          const isDone = step.status === "done";
          const isOpen = openId === step.id;

          return (
            <AnimatedSection key={step.id} delay={index * 0.05} direction="up">
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  isDone 
                    ? "border-primary/30 bg-primary/5 shadow-sm" 
                    : isOpen
                      ? "border-border/80 bg-card shadow-card-hover"
                      : "border-border/50 bg-card shadow-sm hover:shadow-card hover:-translate-y-0.5"
                }`}
              >
                {/* En-tête de l'étape */}
                <button
                  type="button"
                  onClick={() => toggleOpen(step.id)}
                  className="flex w-full items-center gap-4 p-5 text-left focus:outline-none"
                >
                  {/* Numéro + statut */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold transition-colors ${
                      isDone
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-6 w-6" /> : step.order}
                  </div>

                  {/* Titre et description courte */}
                  <div className="flex-1 min-w-0 pr-4">
                    <p className={`text-lg font-bold ${isDone ? "text-primary" : "text-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground truncate">{step.description}</p>
                  </div>

                  {/* Badge statut */}
                  <span
                    className={`hidden sm:inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      isDone
                        ? "bg-primary/10 text-primary"
                        : step.status === "in_progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? "Terminé" : step.status === "in_progress" ? "En cours" : "À faire"}
                  </span>

                  {/* Bouton toggle icône */}
                  <div
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground"
                  >
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Contenu dépliable */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 px-5 pb-6 pt-5 space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>

                        {/* Tâches */}
                        <div className="space-y-3 bg-white/50 p-4 rounded-xl border border-border/50">
                          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                            Tâches à réaliser
                          </p>
                          <ul className="space-y-2.5">
                            {step.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span className="leading-relaxed">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bouton action */}
                        <div className="pt-2">
                          <Button
                            variant={isDone ? "outline" : "primary"}
                            onClick={() => toggleDone(step)}
                          >
                            {isDone ? (
                              <>
                                <Circle className="h-4 w-4" />
                                Marquer comme non terminé
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Marquer comme terminé
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}

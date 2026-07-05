"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea } from "@/components/forms/form-fields";
import { categories } from "@/lib/data";
import { projectSchema, type ProjectFormValues } from "@/lib/validations";

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ProjectFormValues>({ resolver: zodResolver(projectSchema) });

  return (
    <form onSubmit={handleSubmit(() => undefined)} className="grid gap-5 rounded-lg border bg-white p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <FormInput label="Nom du projet" registration={register("name")} error={errors.name} />
        <FormInput label="Slogan" registration={register("slogan")} error={errors.slogan} />
        <FormSelect label="Categorie" options={categories} registration={register("category")} error={errors.category} />
        <FormInput label="Localisation" registration={register("location")} error={errors.location} />
        <FormInput label="Public cible" registration={register("targetAudience")} error={errors.targetAudience} />
        <FormInput label="Stade actuel" registration={register("stage")} error={errors.stage} />
      </div>
      <FormTextarea label="Description courte" registration={register("shortDescription")} error={errors.shortDescription} />
      <FormTextarea label="Probleme ecologique cible" registration={register("problem")} error={errors.problem} />
      <FormTextarea label="Solution proposee" registration={register("solution")} error={errors.solution} />
      <FormTextarea label="Impact environnemental attendu" registration={register("environmentalImpact")} error={errors.environmentalImpact} />
      <FormTextarea label="Modele economique envisage" registration={register("businessModel")} error={errors.businessModel} />
      <FormTextarea label="Besoins principaux" registration={register("needs")} error={errors.needs} />
      <div className="grid gap-5 md:grid-cols-2">
        <FormTextarea label="Objectifs a court terme" registration={register("shortTermGoals")} error={errors.shortTermGoals} />
        <FormTextarea label="Objectifs a long terme" registration={register("longTermGoals")} error={errors.longTermGoals} />
      </div>
      {isSubmitSuccessful ? <p className="text-sm text-primary">Projet valide pour la demonstration. La sauvegarde Prisma est prete a brancher.</p> : null}
      <Button className="w-fit">
        <Save className="h-4 w-4" />
        Enregistrer le projet
      </Button>
    </form>
  );
}

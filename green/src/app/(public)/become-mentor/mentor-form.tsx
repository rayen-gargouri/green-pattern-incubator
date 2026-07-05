"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { mentorApplicationSchema } from "@/lib/validations";
import { FormInput, FormTextarea } from "@/components/forms/form-fields";
import { Button } from "@/components/ui/button";
import type { z } from "zod";

type Values = z.infer<typeof mentorApplicationSchema>;

export function MentorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<Values>({ resolver: zodResolver(mentorApplicationSchema) });

  return (
    <form onSubmit={handleSubmit(() => undefined)} className="grid gap-4 rounded-lg border bg-white p-6">
      <FormInput label="Nom" registration={register("name")} error={errors.name} />
      <FormInput label="Email" type="email" registration={register("email")} error={errors.email} />
      <FormInput label="Domaine d'expertise" registration={register("expertise")} error={errors.expertise} />
      <FormTextarea label="Experience" registration={register("experience")} error={errors.experience} />
      <FormTextarea label="Message" registration={register("message")} error={errors.message} />
      {isSubmitSuccessful ? <p className="text-sm text-primary">Demande enregistree pour la demonstration.</p> : null}
      <Button>
        <Send className="h-4 w-4" />
        Devenir mentor
      </Button>
    </form>
  );
}

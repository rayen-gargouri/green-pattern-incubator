import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),
  email: z.string().email("Email invalide."),
  role: z.enum(["entrepreneur", "expert", "admin"]),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caracteres.")
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide."),
  password: z.string().min(1, "Mot de passe obligatoire.")
});

export const projectSchema = z.object({
  name: z.string().min(2, "Le nom du projet est obligatoire."),
  slogan: z.string().min(2, "Le slogan est obligatoire."),
  category: z.string().min(1, "La categorie est obligatoire."),
  shortDescription: z.string().min(20, "La description doit contenir au moins 20 caracteres."),
  problem: z.string().min(10, "Le probleme ecologique est obligatoire."),
  solution: z.string().min(10, "La solution est obligatoire."),
  targetAudience: z.string().min(2, "Le public cible est obligatoire."),
  location: z.string().min(2, "La localisation est obligatoire."),
  stage: z.string().min(2, "Le stade actuel est obligatoire."),
  environmentalImpact: z.string().min(10, "L'impact attendu est obligatoire."),
  businessModel: z.string().min(10, "Le modele economique est obligatoire."),
  needs: z.string().min(5, "Les besoins principaux sont obligatoires."),
  shortTermGoals: z.string().min(5, "Les objectifs court terme sont obligatoires."),
  longTermGoals: z.string().min(5, "Les objectifs long terme sont obligatoires.")
});

export const mentorApplicationSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),
  email: z.string().email("Email invalide."),
  expertise: z.string().min(2, "Le domaine d'expertise est obligatoire."),
  experience: z.string().min(10, "Detaillez votre experience."),
  message: z.string().min(10, "Ajoutez un message.")
});

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),
  email: z.string().email("Email invalide."),
  message: z.string().min(10, "Le message est trop court.")
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

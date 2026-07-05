import { Mail, Share2 } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Contact</p>
        <h1 className="mt-3 text-4xl font-bold">Parlons de votre projet vert</h1>
        <p className="mt-4 text-muted-foreground">
          Une question, un partenariat, une idee a structurer ? L'equipe Green Pattern est la pour vous aider a avancer.
        </p>
        <div className="mt-8 grid gap-4">
          <Card>
            <Mail className="mb-3 h-6 w-6 text-primary" />
            <CardTitle>Email</CardTitle>
            <CardDescription>hello@greenpattern.example</CardDescription>
          </Card>
          <Card>
            <Share2 className="mb-3 h-6 w-6 text-primary" />
            <CardTitle>Reseaux sociaux</CardTitle>
            <CardDescription>LinkedIn, Instagram et X: @greenpattern</CardDescription>
          </Card>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}

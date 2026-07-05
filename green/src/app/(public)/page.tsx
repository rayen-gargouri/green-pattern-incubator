import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Compass,
  Leaf,
  Lightbulb,
  Recycle,
  Rocket,
  Sprout,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap
} from "lucide-react";
import { FeatureCard, ImpactCard } from "@/components/cards";
import { HeroSection } from "@/components/sections/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { features, impactStats } from "@/lib/data";

// ============================================================
// Section "Comment ça marche"
// ============================================================
const howItWorks = [
  {
    step: "01",
    icon: Sprout,
    title: "Créez votre compte",
    description:
      "Inscrivez-vous en quelques secondes, choisissez votre rôle (entrepreneur ou administrateur) et accédez à votre espace personnalisé."
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Déposez votre idée verte",
    description:
      "Remplissez le formulaire guidé pour structurer votre idée : problème écologique ciblé, solution, public, besoins et niveau d'avancement."
  },
  {
    step: "03",
    icon: Compass,
    title: "Suivez votre parcours",
    description:
      "Avancez pas à pas à travers 9 étapes d'incubation, du Business Model Canvas à la stratégie de lancement, avec des tâches concrètes."
  },
  {
    step: "04",
    icon: Rocket,
    title: "Lancez votre projet",
    description:
      "Générez vos documents clés, mesurez votre impact et préparez votre pitch pour des investisseurs, incubateurs ou partenaires."
  }
];

// ============================================================
// Avantages
// ============================================================
const advantages = [
  {
    icon: Target,
    title: "Parcours structuré",
    description: "9 étapes claires avec des tâches concrètes pour ne jamais être perdu dans votre progression."
  },
  {
    icon: Wrench,
    title: "Outils intégrés",
    description: "Business Model Canvas, formulaire projet guidé, bibliothèque de ressources et générateur de documents."
  },
  {
    icon: Bot,
    title: "IA en préparation",
    description: "Une architecture IA prête à analyser vos projets, générer des recommandations et automatiser vos documents."
  },
  {
    icon: TrendingUp,
    title: "Suivi de progression",
    description: "Visualisez votre avancement en temps réel et identifiez les prochaines étapes prioritaires."
  },
  {
    icon: Users,
    title: "Rôles adaptés",
    description: "Espace entrepreneur pour créer, espace administrateur pour superviser et gérer la plateforme."
  },
  {
    icon: Zap,
    title: "100% opérationnel",
    description: "Données persistées localement pour le MVP — architecture prête pour Supabase et PostgreSQL."
  }
];

export default function HomePage() {
  const average = 52;

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Problème & Solution */}
      <AnimatedSection className="container-page grid gap-6 py-24 md:grid-cols-2">
        <Card className="border-l-4 border-l-amber-400 bg-amber-50/30">
          <Lightbulb className="mb-4 h-8 w-8 text-amber-500" />
          <CardTitle className="text-2xl">Le problème</CardTitle>
          <CardDescription className="mt-3 leading-relaxed text-base">
            Beaucoup de jeunes ont des idées innovantes pour protéger l&apos;environnement, mais
            manquent souvent de méthode, d&apos;accompagnement, de ressources et de visibilité pour
            transformer ces idées en projets réels et durables.
          </CardDescription>
        </Card>
        <Card className="border-l-4 border-l-primary bg-primary/5">
          <Compass className="mb-4 h-8 w-8 text-primary" />
          <CardTitle className="text-2xl">La solution</CardTitle>
          <CardDescription className="mt-3 leading-relaxed text-base">
            Green Pattern Incubator propose un parcours structuré, des outils entrepreneuriaux, des
            ressources pédagogiques et un accompagnement expert pour aider les porteurs de projets à
            construire des startups vertes solides et durables.
          </CardDescription>
        </Card>
      </AnimatedSection>

      {/* Comment ça marche */}
      <section className="bg-white py-24">
        <AnimatedSection className="container-page">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Processus</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Comment ça marche ?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              De l&apos;inscription à votre premier pitch, voici les 4 étapes pour transformer votre
              idée verte en projet durable.
            </p>
          </div>
          <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Ligne de connexion sur desktop */}
            <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {howItWorks.map(({ step, icon: Icon, title, description }, index) => (
              <AnimatedSection 
                key={step} 
                delay={index * 0.15} 
                direction="up" 
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary shadow-xl transition-transform duration-300 group-hover:-translate-y-2">
                  <Icon className="h-10 w-10 text-white" />
                  <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-primary shadow-md">
                    {step}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Fonctionnalités */}
      <AnimatedSection className="container-page py-24 bg-muted/30 rounded-3xl my-10">
        <div className="mb-12 max-w-3xl px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Fonctionnalités</p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Tout pour transformer une idée verte en projet durable</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6">
          {features.slice(0, 8).map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <FeatureCard {...feature} />
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* Avantages */}
      <section className="bg-white py-24">
        <AnimatedSection className="container-page">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Avantages</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Pourquoi choisir Green Pattern Incubator ?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map(({ icon: Icon, title, description }, index) => (
              <AnimatedSection key={title} delay={index * 0.1} direction="up">
                <div className="flex h-full gap-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Impact */}
      <AnimatedSection className="container-page py-24">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Impact</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Des indicateurs utiles dès le départ</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            La plateforme encourage l&apos;entrepreneuriat durable, soutient l&apos;innovation écologique et
            contribue à la création de projets ayant un impact positif sur l&apos;environnement, l&apos;économie
            locale et la société.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((item, index) => (
            <AnimatedSection key={item.label} delay={index * 0.1}>
              <ImpactCard {...item} />
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection direction="none" className="bg-primary py-24 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-10 text-center">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-md">
              <Leaf className="h-5 w-5" />
              Rejoignez le mouvement
            </div>
            <h2 className="text-4xl font-extrabold sm:text-6xl">Lancez votre projet vert aujourd&apos;hui</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-100/90 leading-relaxed">
              Créez, structurez et développez votre projet vert avec une plateforme digitale pensée
              pour les entrepreneurs de demain. Gratuit, guidé et prêt à l&apos;emploi.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.2} className="flex flex-col gap-4 sm:flex-row">
            <Button href="/register" size="lg" className="rounded-full bg-white text-primary hover:bg-emerald-50 px-8 h-14 text-lg">
              Commencer mon projet
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/features" size="lg" className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 px-8 h-14 text-lg">
              Découvrir la plateforme
            </Button>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.3} className="mt-6 flex flex-wrap justify-center gap-8 text-sm font-medium text-emerald-100">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              Parcours guidé et progressif
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              Outils projet intégrés
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              Architecture IA préparée
            </span>
            <span className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-emerald-300" />
              {average}% de progression moyenne
            </span>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </>
  );
}

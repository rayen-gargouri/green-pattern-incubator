"use client";

import { ArrowRight, PlayCircle, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Abstract background shapes */}
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="container-page relative z-10 grid min-h-[calc(100vh-64px)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div 
          className="space-y-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm"
          >
            <Sprout className="h-4 w-4" />
            Incubateur digital pour projets durables
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              De l'idée verte au projet <span className="text-primary">durable</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Green Pattern Incubator accompagne les jeunes entrepreneurs dans la transformation de leurs idées
              écologiques en projets verts concrets, structurés et durables.
            </p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4 sm:flex-row">
            <Button href="/register" size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl">
              Commencer maintenant
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/features" size="lg" variant="outline" className="rounded-full px-8">
              <PlayCircle className="h-4 w-4" />
              Découvrir la plateforme
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projet en incubation</p>
                <h2 className="text-2xl font-bold mt-1 text-foreground">EcoPack Tunisia</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">68%</span>
            </div>
            <div className="mb-6 h-4 rounded-full bg-muted/80 shadow-inner">
              <motion.div 
                className="h-4 w-[68%] rounded-full bg-gradient-to-r from-emerald-400 to-primary"
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Validation idée", "Étude de marché", "Business model", "Impact écologique"].map((item, index) => (
                <motion.div 
                  key={item} 
                  className="rounded-xl border border-border/50 bg-white/80 p-4 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <p className="text-sm font-bold text-foreground">{item}</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{index < 2 ? "Terminé" : "En cours"}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

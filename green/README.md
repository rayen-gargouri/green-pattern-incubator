# Green Pattern Incubator

**"De l'idee verte au projet durable."**

Green Pattern Incubator est une plateforme web MVP pour aider les jeunes entrepreneurs a transformer une idee ecologique en projet vert structure, durable et presentable devant mentors, experts, incubateurs ou jurys.

## Fonctionnalites principales

- Authentification MVP avec roles entrepreneur, expert et administrateur.
- Dashboard entrepreneur avec progression, projet principal, actions rapides et recommandations.
- Creation et modification d'une fiche projet vert.
- Parcours d'accompagnement avec etapes et suivi de progression.
- Business Model Canvas interactif.
- Documents projet: fiche idee, SWOT, pitch, business plan, impact et plan d'action.
- Ressources pour l'entrepreneuriat vert.
- Dashboards expert et administrateur.
- Persistance MVP via `localStorage`.
- Module IA Green Coach pour diagnostic, recommandations, SWOT, pitch, business plan, revue BMC et prochaines etapes.

## Stack technique

- Next.js 15 avec App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Prisma, structure prete pour PostgreSQL/Supabase
- `localStorage` pour le MVP

## Installation

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Comptes demo

- Entrepreneur: `demo@greenpattern.test` / `demo123`
- Expert: `expert@greenpattern.test` / `expert123`
- Administrateur: `admin@greenpattern.test` / `admin123`

## Intelligence artificielle

Le module IA est integre comme assistant metier Green Coach, pas comme simple chatbot. Toute la logique IA passe par des routes API serveur afin de ne jamais exposer de cle cote client.

Fonctionnalites disponibles:

- Diagnostic IA du projet avec score, maturite, forces, faiblesses, risques et actions.
- Recommandations IA personnalisees classees par priorite.
- Generation d'analyse SWOT.
- Generation de pitch 30 secondes, 1 minute ou 3 minutes.
- Generation de business plan simplifie.
- Analyse IA du Business Model Canvas.
- Generation de prochaines etapes intelligentes.
- Sauvegarde MVP des sorties IA dans `localStorage` via `green_pattern_ai_outputs`.

Le MVP fonctionne sans cle API externe. Si `AI_API_KEY` est absente, le mode mock retourne automatiquement des reponses credibles basees sur le projet, les besoins, la progression, le BMC et les documents existants.

Variables d'environnement:

```env
AI_PROVIDER=mock
AI_API_KEY=
AI_MODEL=
AI_BASE_URL=
```

Providers supportes: `mock`, `openai`, `deepseek`. Pour DeepSeek, utiliser par exemple
`AI_PROVIDER=deepseek`, `AI_MODEL=deepseek-v4-flash` et `AI_BASE_URL=https://api.deepseek.com`.

Structure IA:

```text
src/lib/ai/
  prompts.ts
  ai-client.ts
  ai-types.ts
  ai-service.ts
  mock-ai.ts
  validators.ts
```

Routes API IA:

```text
POST /api/ai/diagnostic
POST /api/ai/recommendations
POST /api/ai/swot
POST /api/ai/pitch
POST /api/ai/business-plan
POST /api/ai/bmc-review
POST /api/ai/next-steps
```

Composants IA:

```text
src/components/ai/AIDiagnosticCard.tsx
src/components/ai/AIRecommendationsPanel.tsx
src/components/ai/SWOTGenerator.tsx
src/components/ai/PitchGenerator.tsx
src/components/ai/BusinessPlanGenerator.tsx
src/components/ai/BMCReviewPanel.tsx
src/components/ai/AINextSteps.tsx
src/components/ai/AILoadingState.tsx
src/components/ai/AIErrorState.tsx
```

Note de securite:

- Ne jamais exposer `AI_API_KEY` dans un composant client.
- Valider les payloads entrants dans les routes API.
- Limiter et nettoyer les textes envoyes au provider IA.
- Utiliser le mock si aucune cle n'est configuree ou si le provider echoue.

## Base de donnees future

Le fichier `database/schema.sql` prepare les tables PostgreSQL:

- `ai_outputs` pour historiser les contenus IA generes.
- `ai_requests` pour journaliser les appels IA et leur statut.

Le schema Prisma contient aussi les modeles `AiOutput` et `AiRequest` pour une future migration DB.

## Roadmap IA future

- Connexion complete a un vrai modele IA.
- Historique complet des echanges et generations.
- Assistant conversationnel contextualise.
- Scoring avance du projet.
- Matching avec experts.
- Matching avec financements.
- Generation PDF des documents.
- Recommandations automatiques selon le parcours.
- Analyse d'impact environnemental avancee.

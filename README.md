# Green Pattern Incubator

Green Pattern Incubator est une application web MVP pour accompagner de jeunes entrepreneurs dans la transformation d'une idee ecologique en projet vert structure, durable et presentable.

Le code de l'application se trouve dans le dossier [`green`](./green).

## Fonctionnalites

- Authentification avec roles entrepreneur, expert et administrateur.
- Dashboard entrepreneur avec progression, projet principal et recommandations.
- Creation et edition de projets verts.
- Parcours d'accompagnement avec suivi d'etapes.
- Business Model Canvas interactif.
- Gestion de documents projet: idee, SWOT, pitch, business plan, impact et plan d'action.
- Ressources pour l'entrepreneuriat vert.
- Dashboards expert et administrateur.
- Assistant IA Green Coach avec mode mock par defaut.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- NextAuth
- Prisma
- PostgreSQL/Supabase prevu pour la suite

## Installation

Depuis la racine du depot:

```bash
cd green
npm install
```

## Lancement en developpement

```bash
cd green
npm run dev
```

Ouvrir ensuite:

```text
http://127.0.0.1:3000
```

Si le port 3000 est deja utilise, lancer Next sur un autre port:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3001
```

## Comptes demo

```text
Entrepreneur:   demo@greenpattern.test / demo123
Expert:         expert@greenpattern.test / expert123
Administrateur: admin@greenpattern.test / admin123
```

## Variables d'environnement

Copier l'exemple:

```bash
cd green
copy .env.example .env
```

Configuration IA par defaut:

```env
AI_PROVIDER=mock
AI_API_KEY=
AI_MODEL=
AI_BASE_URL=
```

Le mode `mock` permet d'utiliser le MVP sans cle API externe.

## Scripts utiles

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
```

## Structure principale

```text
green/
  src/app/          Pages, layouts et routes API Next.js
  src/components/   Composants UI, formulaires, navigation et IA
  src/lib/          Logique metier, stockage, auth et services IA
  prisma/           Schema Prisma
  database/         Schema SQL preparatoire
```

## Notes

- Le MVP utilise principalement `localStorage` pour les donnees cote client.
- Les routes IA passent cote serveur afin de ne pas exposer les cles API.
- Le fichier README detaille de l'application est disponible dans [`green/README.md`](./green/README.md).

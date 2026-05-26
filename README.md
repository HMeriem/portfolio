# Portfolio Boilerplate

Stack : **React 18 + NestJS 10 + TypeScript + Docker**

[![CI](https://github.com/votre-user/portfolio-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/votre-user/portfolio-boilerplate/actions/workflows/ci.yml)

## Prérequis

| Outil | Version minimale |
|---|---|
| Node.js | 20.x |
| Docker | 25.x |
| Docker Compose | v2.x |
| npm | 10.x |

## Structure

```
portfolio-boilerplate/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD (lint, tests, build, e2e)
├── .husky/
│   ├── pre-commit              # lint-staged avant chaque commit
│   └── commit-msg              # Validation Conventional Commits
├── frontend/                   # React 18 + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── test/
│   │       └── setup.ts
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── eslint.config.ts
│   ├── .prettierrc
│   └── vite.config.ts          # Inclut la config Vitest
├── backend/                    # NestJS 10 + TypeScript
│   ├── src/
│   │   ├── app/
│   │   │   └── app.module.ts   # ConfigModule + validation env
│   │   ├── config/
│   │   │   └── env.validation.ts
│   │   └── health/
│   ├── test/
│   │   └── jest-e2e.json
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── eslint.config.ts
│   ├── .prettierrc
│   └── tsconfig.spec.json
├── e2e/                        # Tests Playwright
├── .env.example                # Variables d'environnement (template)
├── .gitignore
├── docker-compose.yml          # Dev (hot-reload)
├── docker-compose.prod.yml     # Production
├── Makefile                    # Commandes centralisées
└── package.json                # Racine : husky + lint-staged
```

## Démarrage rapide

### 1. Configuration de l'environnement

```bash
cp .env.example .env
# Éditer .env si nécessaire
```

### 2. Premier setup (installe les deps et configure les hooks Git)

```bash
make setup
```

### 3. Lancer en développement

```bash
make dev
```

### 4. Lancer en production

```bash
make prod
```

## URLs

| Service  | Dev | Prod |
|----------|-----|------|
| Frontend | http://localhost:3000 | http://localhost:3000 |
| Backend  | http://localhost:4000 | http://localhost:4000 |
| Health   | http://localhost:4000/api/health | http://localhost:4000/api/health |

## Commandes disponibles

```bash
make help          # Affiche toutes les commandes

# Développement
make dev           # Démarre la stack dev (hot-reload)
make logs          # Logs temps réel
make logs-fe       # Logs frontend uniquement
make logs-be       # Logs backend uniquement

# Qualité
make lint          # ESLint sur front + back
make lint-fix      # Auto-fix ESLint
make format        # Prettier sur front + back
make format-check  # Vérifie le formatage

# Tests
make test-unit     # Tests unitaires front (Vitest) + back (Jest)
make test          # Tests E2E Playwright
make test-ui       # Playwright en mode UI interactif
make test-report   # Rapport HTML du dernier run

# Docker
make build         # Build les images de prod
make down          # Stoppe tous les conteneurs
make clean         # Supprime conteneurs + volumes + images
```

## Ajouter un module NestJS

```bash
cd backend
npx nest g module mon-module
npx nest g controller mon-module
npx nest g service mon-module
```

## Conventions de commit

Ce projet suit [Conventional Commits](https://www.conventionalcommits.org/). Le hook `commit-msg` valide chaque message.

```bash
# Exemples valides
git commit -m "feat: add contact form"
git commit -m "fix(api): handle empty response body"
git commit -m "chore: update dependencies"
git commit -m "test(health): add e2e spec"

# Types acceptés
feat | fix | docs | style | refactor | perf | test | chore | ci | build | revert
```

## Conventions CSS Modules

Chaque composant a son `.module.css` colocalisé :

- Classes en camelCase : `.myButton`, `.cardTitle`
- Variables globales dans `src/styles/global.css`
- Import : `import styles from './MonComposant.module.css'`

## Contribuer

1. Créer une branche depuis `develop` : `git checkout -b feat/ma-feature`
2. Développer + tester localement : `make lint && make test-unit`
3. Commiter en respectant Conventional Commits
4. Ouvrir une Pull Request vers `develop`
5. Le pipeline CI doit être entièrement vert avant merge
# portfolio

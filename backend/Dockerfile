FROM node:20-alpine AS base
WORKDIR /app

# ─── Dépendances de production uniquement ─────────────────────
FROM base AS deps-prod
COPY package*.json ./
RUN npm ci --omit=dev

# ─── Toutes les dépendances (pour le build) ───────────────────
FROM base AS deps-dev
COPY package*.json ./
RUN npm ci

# ─── Build ────────────────────────────────────────────────────
FROM deps-dev AS builder
COPY . .
RUN npm run build

# ─── Développement (hot-reload) ───────────────────────────────
FROM deps-dev AS dev
COPY . .
EXPOSE 4000
CMD ["sh", "-c", "npm run build && npm run start:dev"]

# ─── Production (image allégée) ───────────────────────────────
FROM node:20-alpine AS prod
WORKDIR /app

# Copier uniquement le build et les deps de prod
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 4000
CMD ["node", "dist/main"]

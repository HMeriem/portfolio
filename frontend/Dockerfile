FROM node:20-alpine AS base
WORKDIR /app

# ─── Dépendances ──────────────────────────────────────────────
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ─── Développement ────────────────────────────────────────────
FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ─── Build de production ──────────────────────────────────────
FROM deps AS builder
COPY . .
RUN npm run build

# ─── Production (nginx) ───────────────────────────────────────
FROM nginx:1.27-alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Utilisateur non-root pour plus de sécurité
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

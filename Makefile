.PHONY: help setup dev prod build down restart logs logs-fe logs-be \
        clean install lint lint-fix format format-check \
        test test-unit test-unit-fe test-unit-be test-ui test-debug test-report

help:
	@echo ""
	@echo "  Setup"
	@echo "    setup             Premier démarrage : installe les deps et configure Husky"
	@echo "    install           Installe toutes les dépendances (root + frontend + backend + e2e)"
	@echo ""
	@echo "  Docker"
	@echo "    dev               Démarre en mode développement avec hot-reload"
	@echo "    prod              Démarre en mode production (build optimisé)"
	@echo "    build             Construit les images Docker de production"
	@echo "    down              Arrête les conteneurs"
	@echo "    restart           Redémarre les conteneurs (dev)"
	@echo "    logs              Affiche les logs en temps réel"
	@echo "    logs-fe           Logs du frontend uniquement"
	@echo "    logs-be           Logs du backend uniquement"
	@echo "    clean             Supprime les conteneurs, volumes et images"
	@echo ""
	@echo "  Qualité"
	@echo "    lint              Lance ESLint sur frontend et backend"
	@echo "    lint-fix          Corrige automatiquement les erreurs ESLint"
	@echo "    format            Formate le code avec Prettier"
	@echo "    format-check      Vérifie le formatage sans modifier"
	@echo ""
	@echo "  Tests"
	@echo "    test-unit         Lance les tests unitaires (front + back)"
	@echo "    test-unit-fe      Tests unitaires frontend uniquement (Vitest)"
	@echo "    test-unit-be      Tests unitaires backend uniquement (Jest)"
	@echo "    test              Lance les tests Playwright (e2e)"
	@echo "    test-ui           Lance Playwright en mode UI interactif"
	@echo "    test-debug        Lance Playwright en mode debug"
	@echo "    test-report       Affiche le dernier rapport HTML Playwright"
	@echo ""

# ─── Setup ────────────────────────────────────────────────────
setup: install
	npx husky
	@echo "✅  Setup terminé. Husky est configuré."

install:
	npm install
	cd frontend && npm install
	cd backend && npm install
	cd e2e && npm install && npx playwright install --with-deps

# ─── Docker ───────────────────────────────────────────────────
dev:
	docker compose up

prod:
	docker compose -f docker-compose.prod.yml up --build

build:
	docker compose -f docker-compose.prod.yml build

down:
	docker compose down
	docker compose -f docker-compose.prod.yml down

restart:
	docker compose down && docker compose up

logs:
	docker compose logs -f

logs-fe:
	docker compose logs -f frontend

logs-be:
	docker compose logs -f backend

clean:
	docker compose down -v --rmi local --remove-orphans
	docker compose -f docker-compose.prod.yml down -v --rmi local --remove-orphans

# ─── Qualité ──────────────────────────────────────────────────
lint:
	cd frontend && npm run lint
	cd backend && npm run lint

lint-fix:
	cd frontend && npm run lint:fix
	cd backend && npm run lint:fix

format:
	cd frontend && npm run format
	cd backend && npm run format

format-check:
	cd frontend && npm run format:check
	cd backend && npm run format:check

# ─── Tests ────────────────────────────────────────────────────
test-unit:
	cd frontend && npm run test:run
	cd backend && npm run test:cov

test-unit-fe:
	cd frontend && npm run test:run

test-unit-be:
	cd backend && npm run test:cov

test:
	cd e2e && npm test

test-ui:
	cd e2e && npm run test:ui

test-debug:
	cd e2e && npm run test:debug

test-report:
	cd e2e && npm run test:report

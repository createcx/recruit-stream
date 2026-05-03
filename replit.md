# RecruitStream — Staffing & Project Management Platform

## Overview

Full-stack staffing platform cloned from canvas mockups. pnpm workspace monorepo with TypeScript. 20-page React+Vite frontend, Express 5 API, PostgreSQL + Drizzle ORM backend. All pages wired to live API with real seeded data.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + shadcn/ui + Tailwind + wouter + TanStack Query
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- **Build**: esbuild (CJS bundle for API server)

## Artifacts

- `artifacts/web` — React+Vite frontend (port 22333, preview path `/`)
- `artifacts/api-server` — Express 5 API server (port 8080, path `/api`)
- `artifacts/mockup-sandbox` — Canvas mockup reference (port 8081)

## GitHub

- Repo: `https://github.com/createcx/recruit-stream`
- Branch with full Replit build: `replit-version`

## Pages (20 total)

| Route | Page |
|-------|------|
| `/` | Dashboard — KPI cards, placement trend chart, pipeline by stage |
| `/candidates` | Candidates list + search + status filter + drawer detail |
| `/jobs` | Jobs list + drawer |
| `/companies` | Companies list + drawer |
| `/contacts` | Contacts list + drawer |
| `/pipeline` | Kanban board grouped by candidate status |
| `/placements` | Placements list + drawer |
| `/activities` | Activity log + drawer |
| `/clients` | Clients list + drawer |
| `/projects` | Projects list + drawer |
| `/sows` | Statements of Work + drawer |
| `/change-orders` | Change Orders + drawer |
| `/documents` | Documents list + drawer |
| `/financials` | Financials/invoices + drawer |
| `/resources` | Resource allocation + drawer |
| `/planning` | Resource planning view |
| `/phases` | Phases & Gates + drawer |
| `/forecasting` | Revenue & headcount forecasts |
| `/onboarding` | Onboarding tasks + drawer |
| `/integrations` | Integration catalog with toggle |

## DB Schema (lib/db/src/schema/)

One Drizzle table per entity: candidates, jobs, companies, contacts, clients, placements, projects, activities, documents, financials, resources, sows, change_orders, phases, forecasts, onboarding_tasks, integrations.

## API Routes (artifacts/api-server/src/routes/)

Full CRUD for all 17 entities + dashboard summary/pipeline-stats/recent-activities endpoints. All under `/api/`.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to Postgres
- `pnpm --filter @workspace/scripts run seed` — reseed database with sample data
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

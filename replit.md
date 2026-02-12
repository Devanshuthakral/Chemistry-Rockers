# Chemistry Rockers - Tuition Website

## Overview

Chemistry Rockers is a full-stack tuition/coaching website for a chemistry-specialized institute run by Payal Thakral. The platform showcases courses (Class 9-12, JEE, NEET chemistry), displays student results dynamically from a database, accepts contact inquiries, and provides an admin dashboard for managing results and inquiries. The site features WhatsApp integration for direct student communication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript, built using Vite
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS with shadcn/ui component library (new-york style)
- **Animations**: Framer Motion for page transitions, hero sections, and card animations
- **SEO**: React Helmet for meta tags per page
- **State Management**: TanStack React Query for server state (API data fetching, caching, mutations)
- **Forms**: React Hook Form with Zod resolvers for validation
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Pages
- Home (hero, features, featured results)
- About (teacher profile)
- Courses (class listings with online/offline modes)
- Results (searchable/filterable student results from DB)
- Contact (inquiry form)
- Admin (protected dashboard for managing results and inquiries)
- Login (Replit Auth sign-in)

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript, executed via `tsx`
- **API Style**: REST API under `/api/` prefix
- **Authentication**: Replit Auth (OpenID Connect) with Passport.js, sessions stored in PostgreSQL via `connect-pg-simple`
- **Session Management**: Express sessions with PostgreSQL-backed session store

### API Routes
- `GET /api/results` — List all student results (public)
- `POST /api/results` — Create student result (authenticated)
- `DELETE /api/results/:id` — Delete student result (authenticated)
- `POST /api/contact` — Submit contact inquiry (public)
- `GET /api/contact` — List contact inquiries (authenticated)
- `DELETE /api/contact/:id` — Delete contact inquiry (authenticated)
- `GET /api/auth/user` — Get current authenticated user

### Database
- **Database**: PostgreSQL (required, uses `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema location**: `shared/schema.ts` and `shared/models/auth.ts`
- **Migrations**: Generated via `drizzle-kit push` (config in `drizzle.config.ts`)

### Database Tables
1. **student_results** — name, class_grade, exam_type (Board/JEE/NEET), marks, year, image_url
2. **contact_inquiries** — name, email, phone, message, class_interested, mode (Online/Offline), created_at
3. **users** — id, email, first_name, last_name, profile_image_url, created_at, updated_at (Replit Auth)
4. **sessions** — sid, sess, expire (Replit Auth session storage)

### Shared Code
- `shared/schema.ts` exports Drizzle table definitions, Zod insert schemas, and TypeScript types used by both frontend and backend
- `shared/routes.ts` defines API contract with typed paths, methods, and response schemas

### Build Process
- Development: `tsx server/index.ts` runs the server with Vite middleware for HMR
- Production: Custom build script (`script/build.ts`) that runs Vite build for client and esbuild for server, outputting to `dist/`
- The server serves static files from `dist/public` in production

### Key Design Decisions
- **Monorepo structure**: Client, server, and shared code in one repo with path aliases for clean imports
- **Shared validation**: Zod schemas generated from Drizzle tables via `drizzle-zod`, used on both client (form validation) and server (request validation)
- **Replit Auth integration**: Located in `server/replit_integrations/auth/` with separated concerns (auth setup, routes, storage)
- **Database seeding**: `server/seed.ts` provides initial demo data for student results and contact inquiries

## External Dependencies

### Required Services
- **PostgreSQL Database**: Must be provisioned with `DATABASE_URL` environment variable set
- **Replit Auth (OIDC)**: Uses `ISSUER_URL` (defaults to `https://replit.com/oidc`), requires `REPL_ID` and `SESSION_SECRET` environment variables

### Third-Party Integrations
- **WhatsApp**: Floating WhatsApp button linking to `wa.me/917988418895` for direct student contact
- **Unsplash**: Student result profile images and teacher portrait sourced from Unsplash

### Key NPM Packages
- `drizzle-orm` + `drizzle-kit` — Database ORM and migrations
- `express` + `express-session` — HTTP server and session management
- `passport` + `openid-client` — Authentication via Replit OIDC
- `connect-pg-simple` — PostgreSQL session store
- `@tanstack/react-query` — Client-side data fetching
- `framer-motion` — Animations
- `react-helmet` — SEO meta tags
- `shadcn/ui` components (Radix UI primitives) — UI component library
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Schema validation
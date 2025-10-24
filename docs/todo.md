# Implementation To-Do

## Tooling & Packages

- [x] Install Redux Toolkit and configure the base store without react-redux hooks.
- [x] Install next-intl for the localization pipeline.
- [x] Install shadcn/ui CLI dependencies (class-variance-authority, tailwind-merge, lucide-react, radix-ui primitives).
- [x] Install zod for shared validation schemas.
- [x] Install supporting utilities (date-fns, framer-motion optional, defer until required).

## Project Structure

- [x] Scaffold base directories (`src/config`, `src/constants`, `src/features/auth`, `src/features/dashboard`, `src/lib`, `src/server`).
- [x] Add index barrels or placeholder files to avoid unresolved import errors.
- [x] Document shared module boundaries in `docs/implementation-plan.md` for quick reference.

## Base Configuration

- [x] Configure the custom Redux store provider wrapper for the App Router layout.
- [x] Add global error boundary and loading UI according to Next.js App Router conventions.
- [x] Wire global styles, CSS variables, and Tailwind v4 layer tokens in `src/app/globals.css`.
- [x] Update `next.config.ts` for esm externals, image domains, and intl settings if needed.

## Authentication & Sessions

- [x] Create the `auth` feature structure with slices for session state and PKCE verifier cache.
- [x] Implement OAuth PKCE utilities (code verifier/challenge generators, state nonce helpers).
- [x] Build route handlers for `/api/auth/login`, `/api/auth/callback`, and `/api/auth/refresh` with SSR-safe cookies.
- [x] Add secure HTTP-only cookie helpers for session, locale, and refresh tokens.
- [x] Implement SSR/ISR session bootstrap in `layout.tsx` and route segment loaders.
- [x] Guard protected routes with middleware and server components that enforce authentication.

## RTK Query & Data Layer

- [x] Define a base `apiSlice` with `fetchBaseQuery`, automatic token refresh, and error normalization.
- [x] Add typed endpoints for user profile, dashboard metrics, and notifications.
- [x] Integrate RTK Query listeners for logout on 401 and background refetch orchestration.

## UI Foundation

- [x] Initialize shadcn/ui with the design system components required for the dashboard shell.
- [x] Build the authenticated layout (header, sidebar navigation, locale switcher, session menu).
- [ ] Create reusable form components wired to zod schemas where appropriate.
- [ ] Add skeleton/loading states that align with streaming server components.

## Localization & Settings

- [ ] Configure `next-intl` provider, middleware, and route segment message loading.
- [ ] Create initial message bundles (`en`, placeholder `ar` if required) and utilities for typed translations.
- [ ] Implement locale switcher tied to secure cookies and respected on SSR.

## Secure Storage & Utilities

- [ ] Implement the secure browser storage wrapper (e.g., Web Crypto + IndexedDB fallback) for optional client caching.
- [ ] Expose typed APIs for storing ephemeral data (non-PII) with automatic expiration.
- [ ] Document storage usage constraints and tie-in points with Redux slices.

## Real-Time & Notifications

- [ ] Scaffold a `realtime` module that can connect to the chosen provider (Pusher, Ably, or SSE abstraction).
- [ ] Add client-side hooks or services to bridge real-time events into Redux Toolkit slices.
- [ ] Provide graceful degradation path when WebSockets are unavailable.

## Testing & Quality

- [ ] Configure ESLint with markdown lint integration and ensure new rules pass.
- [ ] Add Vitest or Jest setup for utilities, plus React Testing Library for component coverage.
- [ ] Create integration tests for critical auth flows and API error handling.
- [ ] Set up end-to-end testing scaffold (Playwright) for login and dashboard smoke tests.

## Documentation & Handoff

- [ ] Update `README.md` with setup steps, environment variables, and development scripts.
- [ ] Capture architectural decisions in `docs/adr/` (create directory if missing).
- [ ] Record testing strategy and coverage expectations.
- [ ] Prepare deployment checklist covering environment variables, secure cookie secrets, and monitoring hooks.

# Chemex Dashboard Implementation Plan

## 1. Scope & Goals

- Deliver the web dashboard described in `docs/front end brief.txt` and `docs/Front-End Brief.docx`, covering all admin/manager/operator flows.
- Immediate milestone: implement the OAuth-based authentication domain end-to-end (UI, flow, storage, guards) while scaffolding shared foundations for upcoming modules.
- Favor server-first rendering (SSR / ISR) for authentication-sensitive routes so user identity and permissions resolve before page paint; fall back to client-side hydration only when technically required.
- Enforce ABAC-driven role and attribute checks for every route, sidebar entry, button, and data action; add dedicated Unauthorized screen for denied access attempts.
- Provide English/Arabic localization with cookie-stored locale, invisible URL segments, and `next-intl` powered messages.
- Guarantee zero hard-coded literals in feature code; values come from typed config and constants modules backed by environment variables when needed.
- Meet non-functional targets: responsive Next.js SPA, first render < 3s, list loads < 300 ms, modular maintainable code, and telemetry-enabled monitoring with real-time channels.

## 2. Architecture Decisions

- Framework: Next.js App Router (TypeScript).
- Styling: Tailwind CSS v4 (no config file). Layer customizations inside `src/app/globals.css` using `@import '@tailwind';` and `@theme` tokens; expose repeated design tokens via `src/config/theme.ts`.
- UI components: shadcn/ui. Generate components into `src/components/ui` and wrap them with feature-specific atoms/molecules in `src/components/common`.
- State: Redux Toolkit core only. Avoid `react-redux` by consuming state exclusively through RTK Query generated hooks and custom wrapper hooks that talk to the RTK store instance directly.
- API access: Instantiate a single `ApiClient` class in `src/lib/http/api-client.ts` responsible for attaching auth token (if available) and `X_LOCALE` header on every request, handling retries, and exposing typed methods (`get`, `post`, etc.). Service modules import the shared instance.
- API definitions: Feature services (e.g., `src/features/auth/services/oauth-service.ts`) build on top of `ApiClient` rather than RTK Query base queries. Endpoints and paths stay in `src/constants/endpoints.ts`.
- ABAC: Central policy engine in `src/lib/access/policy.ts` reading user attributes, role definitions (`src/constants/roles.ts`), and route metadata (`src/config/routes.ts`).
- Providers: Compose Redux Toolkit store provider (using RTK store’s built-in context utilities), shadcn theme provider, cookie-based locale provider, and auth session provider inside `src/providers/app-providers.tsx`. Wrap `src/app/layout.tsx` with this provider.
- Real-time: Prepare `src/lib/realtime` with a single socket client (e.g., WebSocket or SSE) that authenticates via OAuth token and broadcasts events to feature-specific listeners.
- Rendering strategy: Default to SSR/ISR via Next.js Route Handlers and Server Components for data fetching and auth checks; hydrate with Client Components only where interactivity or live updates demand it.

## 3. Project Structure

- `src/app/` – Next.js app router routes; each route folder contains `page.tsx`, optional `loading.tsx`, and `layout.tsx` that import feature modules. Include `src/app/(auth)/unauthorized/page.tsx` to render the unauthenticated/unauthorized screen.
- `src/features/` – One folder per domain module (initially focus on `Authentication`). Each feature exposes:
  - `components/` for feature UI composed from shadcn primitives.
  - `hooks/` for feature-specific logic that orchestrates Redux Toolkit state, RTK Query hooks, and ApiClient services.
  - `services/` exporting functions that wrap the shared `ApiClient` instance (no additional state managers).
  - `slices/` for reducers when persistent state beyond RTK Query cache is needed (e.g., auth session metadata).
  - `constants.ts` referencing shared config instead of literals (e.g., form schemas, OAuth scopes).
- `src/config/` – Global configuration (api, auth, theme, locale, realtime, forms, table defaults).
- `src/constants/` – Enumerations (roles, permissions, routes, cache keys, validation messages) and static data seeds.
- `src/lib/` – Cross-cutting utilities (http client adapters, error normalizer, form helpers, ABAC policy evaluator, telemetry client, realtime client, date helpers).
- `src/server/` – Server-only code (Next.js Route Handlers, OAuth exchange helpers, session bootstrap utilities, secure cookie operations) kept free of client-side dependencies.
- `src/providers/` – `app-providers.tsx` plus split providers if needed (e.g., `theme-provider`, `intl-provider`).
- `src/state/` – Redux Toolkit store, middleware, slices, entity adapters, selectors, and RTK Query base API configuration.
- `src/middleware/` – Server middleware (e.g., locale cookie resolver, auth guard for App Router).
- `public/locales/` – Next-intl JSON message catalogs for `en` and `ar`, structured per feature.
- `src/types/` – Shared TypeScript interfaces (DTOs, entities, API responses, form schemas).
- `src/tests/` – Integration and unit tests using Jest/React Testing Library for components and slices.

Module boundary guardrails:

- Feature folders may depend on `src/lib`, `src/config`, `src/constants`, and `src/state`, but never on other feature folders.
- `src/server` exposes typed functions consumed by route handlers or server components; any client consumption goes through dedicated abstractions in `src/features/*/services`.
- Shared utilities that touch browser-only APIs stay under `src/lib/client` (to be created) to prevent accidental server imports; server-only helpers remain under `src/lib/server` or `src/server`.


## 4. Cross-Cutting Setup

- **Routing config**: `src/config/routes.ts` defines all route objects with metadata (title keys, roles, breadcrumb hierarchy, sidebar grouping, unauthorized redirect path). Use this file to render navigation and to drive route guards.
- **RBAC/ABAC logic**: Implement `evaluateAccess(userAttributes, policy)` returning boolean, using attribute maps and permission constants. Policies are defined per feature action in `src/features/*/constants.ts` and referenced through `usePermission` hook.
- **Authentication flow (OAuth focus)**: Implement OAuth authorization code with PKCE. Store tokens (access, refresh) in secure HTTP-only cookies via Next server actions. Use server-side loaders (Route Handlers/Server Components) to resolve the active session before rendering protected pages, while Redux Toolkit slices mirror session metadata for client interactivity. No `next-auth`; instead rely on `ApiClient` + custom OAuth service.
- **Error handling**: Global error boundary in `src/components/common/error-boundary.tsx`; toast notifications using shadcn `use-toast`. Centralize error messages in `src/constants/messages.ts` keyed by localization string IDs.
- **Telemetry & Real-time**: `src/lib/telemetry/logger.ts` for client logging (console + remote sink). `src/lib/realtime/client.ts` manages WebSocket/SSE connection authenticated via OAuth token, dispatching Redux actions on live updates.

## 5. Styling & Theming

- Keep Tailwind v4 default pipeline; define design tokens (`color`, `spacing`, `typography`) inside `globals.css` using `@theme`.
- Create `ThemeProvider` wrapper bridging shadcn to Tailwind tokens, enabling dark/light modes.
- For reusable layout blocks (cards, tables, forms) create wrappers in `src/components/common` that read config-driven variants (e.g., table density from `src/config/ui.ts`).
- Authentication pages follow the PM’s UX guidance with localized typography and OAuth provider buttons styled via shadcn primitives.

## 6. Localization Strategy

- Configure `next-intl` with `src/providers/intl-provider.tsx` reading locale from `cookies().get('locale')`.
- Add middleware `src/middleware/locale.ts` to default locale, fall back to English, and rewrite requests without locale prefix.
- Store translation keys by feature: `public/locales/en/auth.json`, `public/locales/ar/auth.json`, etc. Avoid hard-coded strings by referencing `t('auth.login.title')` keys defined in constants.
- Provide `setLocale` action that updates Redux state and issues `Set-Cookie` header via server action; also trigger `revalidatePath` or router refresh.

## 7. State Management Plan

- Configure Redux Toolkit store via `configureStore` while consuming it solely inside RTK Query hooks and feature hooks (no `react-redux` imports). Expose helper functions (`useAppSelector` replacement hooks) that interact directly with the store instance if component-level access is needed.
- Initial slices:
  - `authSlice` – OAuth session metadata (tokens presence flags, active scopes, user profile snapshot, expiresAt).
  - `accessSlice` – derived permissions, active role context, feature toggles.
  - `uiSlice` – layout preferences (sidebar collapse, table density, theme).
  - `localeSlice` – current locale, derived from cookie on hydration.
- Define RTK Query API for authentication only at this stage (`authApi`), using custom `baseQuery` that delegates to the shared `ApiClient` and surfaces hooks for components (`useBeginOAuthMutation`, `useExchangeCodeMutation`, etc.).
- Use entity adapters for future list-heavy features; they will plug into the same store without new state libraries.
- Memoized selectors reside in `src/state/selectors` and are consumed via feature hooks rather than `useSelector` to comply with the no `react-redux` constraint.

## 8. Feature Implementation Tracks

- **Authentication Module (current focus)**:
  - OAuth authorization initiation (PKCE generator, redirect to provider, handle callback).
  - Token exchange via ApiClient, secure HTTP-only cookie storage, SSR session resolution, Redux Toolkit state update.
  - Session refresh, logout, and token revocation logic.
  - Guarded route handling with redirect to `/unauthorized` when policies fail.
  - Real-time client bootstrap post-authentication (connect using access token, subscribe to auth-related channels e.g., forced logout).
- **Future Modules** (to follow after authentication baseline): Access Control, Brands Management, Base Chemicals, Store Management, Produce Management, Machines & Telemetry, Orders & Execution, Advertising, Notification Center.

## 9. Security & Compliance

- Store tokens using HTTP-only cookies set via server actions; never expose raw tokens client-side.
- Implement `Content-Security-Policy` headers in `next.config.ts` and sanitize HTML input.
- Use form validation schemas (Zod) defined in `src/config/forms.ts`; integrate with shadcn forms.
- Audit trail: every mutating ApiClient call triggers `logAuditEvent` utility with user, action, entity, attributes.
- Access guard middleware checks both role and attribute requirements before rendering protected routes and sends users to `/unauthorized` when enforcement fails.
- Ensure `ApiClient` automatically injects `Authorization` bearer token and `X_LOCALE` header on every request once the user is logged in.
- Secure sensitive payloads in transit (TLS, request signing where applicable) and at rest (encrypt local caches, avoid storing secrets in client bundles). Use server-side sessions to pre-render user-specific data while respecting the <500ms load goal.
- Leverage browser secure storage when client persistence is unavoidable: default to platform-provided protected storage (e.g., Web Crypto–sealed IndexedDB, `sessionStorage` for ephemeral data) and gate access through a `SecureStorage` utility that enforces encryption and CSRF/Replay protections.

## 10. Performance & Monitoring

- Enable Next.js static/dynamic route caching based on config per page.
- Implement skeleton loaders/shimmers (shadcn) for high-traffic tables.
- Introduce `requestIdleCallback` hydration for non-critical widgets.
- Monitor API latency via ApiClient interceptors and surface metrics through telemetry logger.
- Add bundle analyzer in dev mode; enforce module boundaries via ESLint rules.
- Ensure real-time client reconnect strategy and heartbeats are monitored to maintain live features.

## 11. Testing & Quality

- Unit tests for slices, hooks, utilities; integration tests for pages using mocked RTK Query.
- Playwright e2e covering critical flows (auth, navigation, CRUD operations).
- ESLint + Prettier + Stylelint (via Tailwind recommended plugin) pre-commit hooks.
- Accessibility audits with Axe testing on key pages.

## 12. Delivery Milestones

- **Phase 1 (current)**: Project scaffolding, providers, localization pipeline, OAuth authentication flow, ApiClient integration, unauthorized screen, real-time client bootstrap.
- **Phase 2**: Core domain modules (Access Control, Brands, Base Chemicals) and shared components.
- **Phase 3**: Order/Execution, Machines & Telemetry, Notifications, Advertising modules with real-time enhancements.
- **Phase 4**: Performance hardening, security reviews, accessibility compliance, end-to-end tests.

## 13. Follow-Up Items

- Confirm backend API contract for all modules (endpoints, ABAC attributes).
- Clarify telemetry data sources and WebSocket availability for live updates.
- Obtain UI design tokens/style guide to align with theme config.
- Define localization workflow for translating new message keys.

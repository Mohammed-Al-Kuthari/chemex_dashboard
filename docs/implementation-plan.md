# Chemex Dashboard Implementation Plan

## 1. Alignment With Project Brief

- **Scope**: Web Dashboard (admins, managers, operators) interacting with the shared backend API for materials, recipes, products, machines, orders, advertising, telemetry.
- **Objectives**: ABAC-driven access, real-time telemetry, comprehensive CRUD, bilingual UX (English/Arabic), strong accessibility, consistent design system, security-first implementations.
- **Non-Functional Targets**: <400ms core shell load, <300ms list reloads (95%), modular & extensible architecture, strict security posture, integrated error logging / telemetry, heavy use of built-in caching/prefetching to maintain the 400ms SLA.
- **Current Scope Focus**: Deliver core platform scaffolding only (configs, store, routing, theming, security, realtime contracts) while deferring all feature implementations—including authentication—until the foundation is approved.

## 2. Architectural Overview

- **Core Paradigm**: Feature-driven modular architecture with vertical slices per domain (e.g., `features/auth`, `features/brands`). Each slice contains UI, application services, and adapters that depend on shared abstractions.
- **SOLID & DIP**: Shared `interfaces` layer in `core/contracts` defines abstractions for services (auth, access-control, telemetry, storage, http). Concrete implementations live under `infrastructure` and are injected through providers/hooks to UI consumers.
- **Framework Leverage**: Default to Next.js/Node built-ins (server actions, route handlers, middleware, edge runtime utilities) and installed package capabilities before authoring custom classes or DI bindings. Custom logic only fills genuine gaps.
- **Layering**:
  - `app/` (Next.js app router) hosts routing, layouts, and server actions, with `app/providers` bridging Redux, theming, and intl contexts at the root.
  - `core/` hosts cross-cutting concerns: configs, constants, contracts, store bootstrap utilities, SSR helpers.
  - `core/store/` centralizes the Redux Toolkit store, slices, RTK Query endpoints, and middleware.
  - `features/` encapsulate bounded contexts from the brief (Auth, Access Control, Brands, Base Chemicals, Store, Produce, Machines, Orders, Advertising, Notifications, Settings).
  - `shared/` holds reusable UI (shadcn composition), animations, form wrappers, typography, hooks, services, assets.
  - `infrastructure/` provides concrete adapters for http client, websocket, storage, logging, analytics, with environment-aware implementations.

## 3. Directory Structure (Proposed)

```text
src/
  app/
    layout.tsx
    page.tsx
    api/
  providers/
    AppProviders.tsx
    AppThemeProvider.tsx
  core/
    configs/
      app-config.ts
      env.server.ts
      theme-config.ts
      i18n-config.ts
    constants/
      index.ts
      access-control.ts
      keys.ts
      timeouts.ts
      routes.ts
      endpoints.ts
    contracts/
      services/
      repositories/
      models/
        ApiResponse.ts
    di/
      container.ts
      tokens.ts
    lib/
      http/
      validation/
      logging/
        logger.ts
    locales/
      messages/
        en/
        ar/
      index.ts
    security/
      abac/
      auth/
    services/
      env.service.ts
      feature-flags.service.ts
  features/
    auth/
    access-control/
    brands/
    base-chemicals/
    store/
    produce/
    machines/
    orders/
    advertising/
    notifications/
    settings/
    shared-types.ts
  infrastructure/
    http/
    storage/
    websocket/
    auth/
    abac/
    telemetry/
  shared/
    components/
      layout/
      navigation/
      data-display/
      feedback/
      forms/
      typography/
        AppText.tsx
        ServerText.tsx
    hooks/
    animations/
    utils/
    icons/
    services/
      realtime/
        RealtimeService.ts
        channels/
      storage/
        SecureStorage.ts
    routing/
      index.ts
      helpers.ts
    ui/
      (shadcn generated components)
  styles/
    globals.css
    theme.css
```

## 4. Internationalization Strategy

- **Library**: `next-intl` already installed; configure `i18n-config.ts` under `core/configs` to load locale bundles and handle routing without URL prefixes, relying exclusively on locale cookies.
- **Supported Locales**: `.env` exposes `SUPPORTED_LOCALES="en,ar"` (comma-separated). `core/configs/app-config.ts` parses the list via `core/services/env.service.ts` and feeds it to a language-switcher dropdown that auto-expands as locales are added.
- **Locale Resources**: Domain-driven message files under `core/locales/messages/{locale}/{domain}.json` to avoid large monolithic files.
- **AppText Component**: `shared/components/typography/AppText.tsx` accepts translation key + values; internally uses `useTranslations()` to resolve text.
- **ServerText Component**: `shared/components/typography/ServerText.tsx` renders trusted server-supplied strings without translation.
- **Content Negotiation**: Locale detection middleware leverages `next-intl` cookies; no `[locale]` route segments. Preferences persist via cookie keys defined in `core/constants/keys.ts`.

## 5. Theming & Design System

- **UI Library**: Adopt shadcn/ui + Tailwind for primitive components; extend with domain-specific components in `shared/components/ui`.
- **Theming**: Support light, dark, and system modes via CSS variables declared in `styles/globals.css` (Tailwind v4 token utilities). `next-themes` toggles the appropriate `data-theme` attribute while `tailwind-merge` ensures class composition remains conflict-free.
- **Accessibility**: Enforce accessible color contrast, focus states, keyboard navigation.
- **Tailwind v4 Note**: With the config-less workflow, declare tokens via `@theme` and `@utility` blocks in CSS files; avoid expecting a `tailwind.config.js`.

## 6. State Management & Data Flow

- **Redux Toolkit First**: All state (global + feature-specific) flows through a single Redux Toolkit store located in `core/store`. Feature slices follow strict module boundaries; no additional state libraries or custom React context usage.
- **RTK Query Caching**: Server data fetched via RTK Query endpoints to deliver normalized caching, automated revalidation, polling, and streaming (websocket integration via `onCacheEntryAdded`).
- **HTTP Client Instrumentation**: Axios-based client under `infrastructure/http` attaches interceptors that emit request/response/error metadata through the shared logger (dev-only verbosity) and feed consistent headers/cookies from config.
- **Server Components Preference**: Pages leverage Next.js server components/SSR to prefetch user session and critical data, falling back to client components only when interactions require it. Authentication tokens resolved ahead of render.
- **Real-Time**: WebSocket adapter under `infrastructure/websocket` integrates with RTK Query subscriptions for telemetry & notifications.
- **API Response Model**: Shared `ApiResponse<T>` typing (matching `{ success: boolean; message: string; data: T }`) lives in `core/contracts` and is consumed by RTK Query endpoints, server actions, and edge middleware to keep response handling consistent.

## 7. Security & Configuration

- **Environment Handling**: `.env` values loaded once through `core/configs/env.server.ts`. Validation via `zod` schema (per requirement "zoe package") inside `core/lib/validation/env.ts`. Only sanitized configs exported to the app.
- **Secrets**: No direct `process.env` usage outside env config; config exports typed objects.
- **Tokens & Storage**: Secure cookie config in `core/constants/keys.ts` with httpOnly/secure flags defined in config objects.
- **ABAC**: Policy definitions in `core/security/abac` with attribute resolvers decoupled from concrete services.
- **RBAC Integration**: Role definitions and permission matrices stored under `core/constants/access-control.ts`, supporting both single role strings and string arrays per user session. Middleware enforces route-level access, while HOCs/higher-order hooks gate UI elements (tabs, buttons, sections) based on resolved role arrays combined with ABAC attributes.
- **Auth Preflight**: Edge middleware resolves user identities and issues SSR-safe access tokens prior to page render, allowing server components and RTK Query to hydrate with authenticated context without client-side fallbacks.
- **Sensitive Storage**: User tokens and sensitive data persisted only in encrypted/httpOnly cookies via a storage service that requires a secure key. Browser storage usage (local, session, Cache API, Storage Buckets) funnels through `shared/services/storage` with per-scope strategies and encryption/validation safeguards.
- **Realtime Backbone**: `shared/services/realtime` exposes a transport-agnostic interface (pub/sub, request/response) ready to power chats, telemetry, timers, notifications, and future channels. During the core phase it will define channel contracts, event schemas, connection lifecycle, and graceful fallbacks while awaiting final backend transport details.
- **Structured Logging**: Central `core/lib/logging/logger.ts` provides environment-aware logging. It emits request/response/error metadata in development only (driven by config derived from `NODE_ENV`), with noop/limited output in production.

## 8. Routing & Navigation

- **App Router**: Group routes per feature (e.g., `/dashboard/brands`).
- **Route Constants**: All routes defined in `core/constants/routes.ts` and consumed via helper `createRoutePath` to avoid hard-coded paths.
- **Layouts**: Hierarchical layouts for authenticated vs public pages, composing the Redux/intl/theme providers exported from `app/providers` without introducing additional ad-hoc contexts.
- **Routing Service**: A centralized navigation service under `shared/services/routing` exposes typed helpers (SSR-friendly) to build URLs based on route constants, ensuring new pages are registered once and reused everywhere.
- **Next.js Built-ins**: Prefer Next.js server actions, route handlers, middleware, `cookies()`/`headers()` utilities, dynamic segments, and caching APIs over custom wrappers to minimize bespoke infrastructure.

## 9. Storage Strategy

- **Browser Storage**: Dedicated storage adapters orchestrate usage of localStorage, sessionStorage, Shared Storage, Cache Storage, and Storage Buckets depending on data sensitivity, lifetime, and offline requirements. Each adapter exposes async methods behind interfaces to remain framework-agnostic and testable.
- **Secure Keys**: Encryption keys defined in `core/constants/keys.ts` derive per-user storage namespaces, ensuring data at rest remains protected before hydration.
- **Token Handling**: Primary auth token flows via httpOnly cookies; fallback refresh tokens and non-sensitive session hints stored with AES encryption in storage adapters.
- **Cache Invalidation**: RTK Query's cache lifecycle hooks combined with storage metadata provide centralized invalidation and persistence rules.

## 10. Feature Breakdown (Dashboard)

1. **Authentication**: Login, reset password, token flows, secure storage & session refresh.
2. **Access Control**: Manage users, roles, permissions, attribute policies.
3. **Brands Management**: Brands & brand managers CRUD.
4. **Base Chemical Management**: Materials & groups with filters/pagination.
5. **Store Management**: Orders, shipping, machine orders, contracts.
6. **Produce Management**: Categories, products, recipes, neutralizers, phases/steps, search/filter.
7. **Machines & Telemetry**: Machine metadata, units, container levels, heartbeat visualization.
8. **Orders & Execution**: Execution tracking, real-time timelines, feedback logs.
9. **Advertising Management**: Promotions, rules, coupons.
10. **Notifications**: Real-time alerts center.
11. **Settings**: Theme, language, profile management, feature toggles.

> Feature implementation (including authentication flows) is intentionally deferred until the platform foundation phases are complete.

## 11. Shared Resources

- **Animations**: Framer Motion presets for transitions.
- **Hooks**: `useFeatureFlag`, `useTelemetry`, `useLocaleSwitcher`, `useThemeMode`; feature flags default to env/config-driven toggles with optional upgrade path if a remote service is introduced later.
- **Services**: `ApiService`, `TelemetryService`, `NotificationService`, each exposing interfaces consumed by features.
- **UI Primitives**: Shared dropdowns, inputs, buttons, selectors, switches, and typography wrappers generated via the shadcn CLI, then wrapped with project-specific defaults (variants, icons, accessibility states) for reuse.
- **Utilities**: Date/time helpers, formatting, error normalization, all referencing constants (e.g., timeouts, locales).

## 12. Testing Strategy

- **Unit Tests**: Jest/Testing Library per feature slice focusing on services & UI logic.
- **Integration Tests**: Playwright for critical flows (auth, orders, telemetry dashboards).
- **Contracts**: Mock server via MSW ensuring API schema alignment.
- **Security Checks**: Lint rules + dependency audits; future integration with automated security scanners.

## 13. Implementation Phases

1. **Foundation**: Setup configs, constants, env validation, DI container, Redux store bootstrap, theming, i18n (cookie-driven), shadcn CLI baseline components (buttons, inputs, dropdowns, switches, typography), routing service, realtime scaffolding, API response typing.
2. **Security Plumbing**: Implement middleware, SSR auth preflight scaffolds, RBAC/ABAC policies, storage encryption, performance budgets, and the environment-aware logging pipeline capturing request/response/error metadata—without yet wiring feature-specific logic.
3. **Platform Services**: Finalize reusable services (realtime abstractions, caching strategies, storage adapters, analytics/logging), add testing harnesses (Jest, MSW, Playwright scaffolds).
4. **Performance & Observability**: Establish monitoring dashboards, synthetic checks, bundle analysis, and ensure the <400ms SLA is met before feature work begins.
5. **Feature Enablement**: Once the core platform is stable, unlock domain feature slices (Auth, Access Control, etc.) for implementation following the established patterns.
6. **Testing & Handover**: Expand automated tests, run security review, accessibility audit, and prepare documentation (architecture, onboarding guides).

## 14. Outstanding Questions

- API contract specifics per module (available endpoints, response shape?).
- Real-time channel details (protocol, auth, message schema) for telemetry.
- Branding & design tokens: do we have official design kit to import to shadcn tokens?

> Awaiting confirmation to proceed with implementation following the above plan.

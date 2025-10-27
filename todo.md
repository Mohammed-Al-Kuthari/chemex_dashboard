# Chemex Dashboard TODO

## Phase 1 – Foundation (Core Scaffolding)

- [x] Verify `.env` baseline and add `SUPPORTED_LOCALES` along with other required secrets.
- [x] Implement `core/services/env.service.ts` with zod validation and sanitized exports.
- [x] Populate `core/constants` (routes, endpoints, keys, timeouts, access control).
- [x] Define shared `ApiResponse<T>` model in `core/contracts/models/ApiResponse.ts`.
- [x] Configure cookie-based localization via `core/configs/i18n-config.ts` using `next-intl`.
- [x] Create locale message structure under `core/locales/messages/{locale}/{domain}.json` with initial EN/AR placeholders.
- [x] Prepare Tailwind v4 tokens in `styles/globals.css` (`@theme` / `@utility` blocks) and integrate shadcn base styles.
- [x] Scaffold Redux Toolkit store in `core/store` with basic middleware and typed hooks.
- [x] Set up RTK Query base API slice reflecting shared `ApiResponse<T>` shape.
- [x] Align `src/app/providers/AppProviders.tsx` (Redux, intl, theme via `next-themes`) pulling logic from `core` modules.
- [x] Add `AppThemeProvider.tsx` wrapper to integrate `next-themes` with cookie persistence.
- [x] Generate base shadcn components (button, input, dropdown, selector, switch, typography) via CLI and export them under `shared/components` with project defaults.
- [x] Create shared routing helpers in `shared/routing` consuming route constants.
- [x] Establish secure storage adapter in `shared/services/storage/SecureStorage.ts` (encryption, httpOnly cookie coordination).
- [x] Draft realtime service contract in `shared/services/realtime/RealtimeService.ts` and channel interfaces.
- [ ] Add lint/test tooling configuration updates if needed (Jest/Playwright scaffolds).

## Phase 2 – Security Plumbing

- [x] Implement edge middleware for locale detection, auth preflight, and RBAC route gating.
- [x] Define RBAC/ABAC policies in `core/constants/access-control.ts` and `core/security/abac`.
- [x] Wire secure cookie/token configuration in `core/configs/app-config.ts` and storage service.
- [x] Ensure SSR paths fetch user/session data ahead of render (placeholder server actions).
- [x] Add logging/error handling utilities in `core/lib/logging`.
- [x] Wire axios/http client interceptors to log request/response/error metadata through the central logger when `isDebugLoggingEnabled` config is true.
- [x] Ensure logger checks environment-derived config so verbose output is disabled in production builds.

## Phase 3 – Platform Services

- [x] Finalize realtime adapter abstractions (connection lifecycle, fallbacks) awaiting backend details.
- [x] Implement caching strategy helpers for RTK Query (tags, revalidation rules).
- [x] Introduce analytics/telemetry service contracts in `shared/services`.
- [x] Build shared hooks (`useFeatureFlag`, `useLocaleSwitcher`, `useThemeMode`, `useTelemetry`).
- [x] Prepare storage strategy documentation aligning browser storage usage per data type.

## Phase 4 – Performance & Observability

- [x] Set up performance monitoring (Core Web Vitals, synthetic checks) and bundle analysis script.
- [x] Add logging integration for client errors and realtime channel failures.
- [ ] Verify <400ms core shell load via Lighthouse/Next.js metrics.

## Phase 5 – Feature Enablement Preparation

- [ ] Document feature slice guidelines (folder structure, RTK Query usage, routing conventions).
- [ ] Provide sample slice template (without business logic) for future teams.
- [ ] Confirm localization workflow (adding new locale, message extraction).

## Phase 6 – Testing & Handover

- [ ] Add Jest configuration with example unit tests for store, services, hooks.
- [ ] Configure Playwright (or alternative) integration test scaffold for smoke flows.
- [ ] Document security checklist (env protection, storage handling, middleware enforcement).
- [ ] Compile technical docs: architecture overview, onboarding guide, coding standards.
- [ ] Review outstanding questions (API contracts, realtime protocol, design tokens) and gather answers.

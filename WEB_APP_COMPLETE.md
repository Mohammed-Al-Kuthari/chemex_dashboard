# ChemEx Web Dashboard - Next.js v16 Project Structure

## 🌐 Overview

This document outlines the complete project structure for the ChemEx web dashboard built with Next.js v16 and TypeScript. The dashboard serves as the Admin/Manager interface for managing all operational data including recipes, materials, products, machines, orders, and more.

---

## 🎯 Architecture Principles

- **Next.js App Router** - File-based routing with layouts and nested routes
- **Component-Driven Development** - Reusable, composable UI components
- **Feature-Based Organization** - Business logic grouped by domain
- **Server & Client Components** - Optimized rendering strategy
- **State Management** - Redux Toolkit ONLY for predictable, performant state
- **Role-Based Access Control** - Dynamic UI (sidebar, buttons, controls) based on admin roles
- **Type Safety** - Full TypeScript implementation
- **Performance First** - Target 300ms loading time with Redux optimization
- **Multi-Admin Support** - Super Admin + Sub-Admins with granular permissions

---

## 📁 Complete Project Structure

```
chemex_dashboard/
│
├── public/                           # Static files
│   ├── images/
│   │   ├── logo/
│   │   ├── icons/
│   │   └── avatars/
│   ├── fonts/
│   └── locales/
│
├── messages/                         # Translations (no locale in URL)
│   ├── en.json                       # English translations
│   └── ar.json                       # Arabic translations
│
├── src/
│   │
│   ├── i18n.ts                       # i18n configuration
│   ├── middleware.ts                 # Middleware (auth + locale)
│   │
│   ├── app/                          # App Router (Next.js 16)
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing/redirect page
│   │   ├── globals.css               # Global styles
│   │   ├── providers.tsx             # Client providers wrapper
│   │   │
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── layout.tsx            # Dashboard layout with sidebar/navbar
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Main dashboard/overview
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── page.tsx          # Users list
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx      # User details
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx  # Edit user
│   │   │   │   └── create/
│   │   │   │       └── page.tsx      # Create user
│   │   │   │
│   │   │   ├── roles/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── permissions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── brands/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── managers/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── materials/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── groups/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── recipes/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── [recipeId]/
│   │   │   │   │           ├── page.tsx
│   │   │   │   │           └── phases/
│   │   │   │   │               └── page.tsx
│   │   │   │   ├── categories/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── neutralizers/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── machines/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── telemetry/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── containers/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── units/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── tracking/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── machine-orders/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── shipping/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── executions/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── logs/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── monitoring/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── feedback/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── promotions/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── rules/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── coupons/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── create/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── contracts/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       ├── profile/
│   │   │       │   └── page.tsx
│   │   │       └── preferences/
│   │   │           └── page.tsx
│   │   │
│   │   └── api/                      # API routes (if needed)
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       └── webhook/
│   │           └── route.ts
│   │
│   ├── components/                   # Reusable UI components
│   │   │
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── separator.tsx
│   │   │   └── switch.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── footer.tsx
│   │   │   └── main-layout.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── reset-password-form.tsx
│   │   │   ├── auth-guard.tsx
│   │   │   └── protected-route.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── user-form.tsx
│   │   │   ├── role-form.tsx
│   │   │   ├── brand-form.tsx
│   │   │   ├── material-form.tsx
│   │   │   ├── product-form.tsx
│   │   │   ├── recipe-form.tsx
│   │   │   ├── machine-form.tsx
│   │   │   ├── promotion-form.tsx
│   │   │   └── form-components/
│   │   │       ├── form-input.tsx
│   │   │       ├── form-select.tsx
│   │   │       ├── form-textarea.tsx
│   │   │       └── form-checkbox.tsx
│   │   │
│   │   ├── tables/
│   │   │   ├── users-table.tsx
│   │   │   ├── roles-table.tsx
│   │   │   ├── brands-table.tsx
│   │   │   ├── materials-table.tsx
│   │   │   ├── products-table.tsx
│   │   │   ├── machines-table.tsx
│   │   │   ├── orders-table.tsx
│   │   │   ├── executions-table.tsx
│   │   │   ├── data-table.tsx        # Generic reusable table
│   │   │   └── table-components/
│   │   │       ├── table-header.tsx
│   │   │       ├── table-pagination.tsx
│   │   │       ├── table-filters.tsx
│   │   │       └── table-search.tsx
│   │   │
│   │   ├── widgets/
│   │   │   ├── stats-card.tsx
│   │   │   ├── chart-widget.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   ├── notifications-panel.tsx
│   │   │   └── quick-actions.tsx
│   │   │
│   │   ├── monitoring/
│   │   │   ├── machine-status.tsx
│   │   │   ├── heartbeat-monitor.tsx
│   │   │   ├── execution-progress.tsx
│   │   │   ├── container-levels.tsx
│   │   │   └── real-time-logs.tsx
│   │   │
│   │   └── shared/
│   │       ├── loading-spinner.tsx
│   │       ├── error-boundary.tsx
│   │       ├── empty-state.tsx
│   │       ├── confirmation-modal.tsx
│   │       ├── page-header.tsx
│   │       └── search-bar.tsx
│   │
│   ├── lib/                          # Core utilities & configuration
│   │   ├── api/
│   │   │   ├── client.ts             # Axios/Fetch configuration
│   │   │   ├── interceptors.ts
│   │   │   ├── endpoints.ts
│   │   │   └── websocket.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── auth-config.ts
│   │   │   ├── auth-provider.tsx
│   │   │   ├── session.ts
│   │   │   └── permissions.ts        # ABAC logic
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-auth.ts
│   │   │   ├── use-permissions.ts
│   │   │   ├── use-websocket.ts
│   │   │   ├── use-debounce.ts
│   │   │   ├── use-pagination.ts
│   │   │   ├── use-table.ts
│   │   │   ├── use-toast.ts
│   │   │   └── use-local-storage.ts
│   │   │
│   │   ├── store/                    # State management (Zustand/Redux/Context)
│   │   │   ├── auth-store.ts
│   │   │   ├── user-store.ts
│   │   │   ├── ui-store.ts
│   │   │   └── notification-store.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── date-utils.ts
│   │   │   ├── string-utils.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── security/
│   │   │   ├── encryption.ts
│   │   │   ├── token-manager.ts
│   │   │   └── secure-storage.ts
│   │   │
│   │   └── types/
│   │       ├── api.types.ts
│   │       ├── auth.types.ts
│   │       ├── user.types.ts
│   │       ├── brand.types.ts
│   │       ├── material.types.ts
│   │       ├── product.types.ts
│   │       ├── machine.types.ts
│   │       ├── order.types.ts
│   │       ├── execution.types.ts
│   │       └── common.types.ts
│   │
│   ├── services/                     # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── role.service.ts
│   │   ├── brand.service.ts
│   │   ├── material.service.ts
│   │   ├── product.service.ts
│   │   ├── recipe.service.ts
│   │   ├── machine.service.ts
│   │   ├── order.service.ts
│   │   ├── execution.service.ts
│   │   ├── promotion.service.ts
│   │   ├── notification.service.ts
│   │   └── analytics.service.ts
│   │
│   ├── middleware/
│   │   └── auth-middleware.ts        # Route protection
│   │
│   └── styles/
│       ├── globals.css               # Tailwind v4 CSS-first config + themes
│       └── rtl.css                   # RTL-specific overrides
│
├── tests/                            # Testing
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                        # Environment variables
├── .env.production
├── next.config.js                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── components.json                   # shadcn/ui configuration
├── package.json
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## 📦 Dependencies (package.json)

```json
{
  "name": "chemex-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "cypress": "cypress open",
    "cypress:headless": "cypress run"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",

    "// UI Framework": "",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",

    "// Styling": "",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",

    "// State Management (Redux Toolkit ONLY)": "",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",

    "// Forms & Validation": "",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.3",

    "// Data Fetching": "",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.5",

    "// Authentication": "",
    "next-auth": "^5.0.0",

    "// Tables": "",
    "@tanstack/react-table": "^8.11.0",

    "// Charts & Visualization": "",
    "recharts": "^2.10.3",
    "chart.js": "^4.4.1",
    "react-chartjs-2": "^5.2.0",

    "// Date handling": "",
    "date-fns": "^3.0.6",

    "// Icons": "",
    "lucide-react": "^0.303.0",

    "// Real-time": "",
    "socket.io-client": "^4.6.1",

    "// i18n": "",
    "next-intl": "^3.4.0",

    "// Utilities": "",
    "lodash": "^4.17.21",
    "nanoid": "^5.0.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/lodash": "^4.14.202",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.9",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",

    "// Testing": "",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "cypress": "^13.6.2",

    "// Type definitions": "",
    "@types/socket.io-client": "^3.0.0"
  }
}
```

---

## ⚙️ Configuration Files

### next.config.js

```javascript
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.chemex.com", "cdn.chemex.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/services/*": ["./src/services/*"],
      "@/types/*": ["./src/lib/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### src/styles/globals.css (Tailwind v4 CSS-First Configuration)

```css
/* Tailwind v4 - CSS-first configuration with multi-theming & RTL/LTR support */
@import "tailwindcss";

/* =================================================================
   THEME CONFIGURATION
   ================================================================= */
@theme {
  /* Breakpoints */
  --breakpoint-3xl: 1920px;

  /* Fonts */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  --font-arabic: "Cairo", "Tajawal", sans-serif;

  /* Brand Colors - ChemEx */
  --color-chemex-primary: oklch(0.55 0.2 240);
  --color-chemex-secondary: oklch(0.65 0.15 180);
  --color-chemex-accent: oklch(0.7 0.18 150);

  /* Semantic Colors - Light Theme */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-primary: oklch(0.55 0.2 240);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-secondary: oklch(0.95 0.01 240);
  --color-secondary-foreground: oklch(0.15 0 0);
  --color-muted: oklch(0.96 0.01 240);
  --color-muted-foreground: oklch(0.45 0.01 240);
  --color-accent: oklch(0.96 0.01 240);
  --color-accent-foreground: oklch(0.15 0 0);
  --color-destructive: oklch(0.58 0.25 25);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-border: oklch(0.9 0.01 240);
  --color-input: oklch(0.9 0.01 240);
  --color-ring: oklch(0.55 0.2 240);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.15 0 0);
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.15 0 0);

  /* Status Colors */
  --color-success: oklch(0.65 0.18 150);
  --color-warning: oklch(0.75 0.15 85);
  --color-error: oklch(0.58 0.25 25);
  --color-info: oklch(0.6 0.15 240);

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animations */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* =================================================================
   DARK THEME
   ================================================================= */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.15 0 0);
    --color-foreground: oklch(0.98 0 0);
    --color-primary: oklch(0.65 0.2 240);
    --color-primary-foreground: oklch(0.15 0 0);
    --color-secondary: oklch(0.2 0.01 240);
    --color-secondary-foreground: oklch(0.98 0 0);
    --color-muted: oklch(0.2 0.01 240);
    --color-muted-foreground: oklch(0.65 0.01 240);
    --color-accent: oklch(0.2 0.01 240);
    --color-accent-foreground: oklch(0.98 0 0);
    --color-destructive: oklch(0.65 0.25 25);
    --color-destructive-foreground: oklch(0.98 0 0);
    --color-border: oklch(0.25 0.01 240);
    --color-input: oklch(0.25 0.01 240);
    --color-ring: oklch(0.65 0.2 240);
    --color-card: oklch(0.18 0 0);
    --color-card-foreground: oklch(0.98 0 0);
    --color-popover: oklch(0.18 0 0);
    --color-popover-foreground: oklch(0.98 0 0);
  }
}

/* Dark theme class override */
.dark {
  --color-background: oklch(0.15 0 0);
  --color-foreground: oklch(0.98 0 0);
  --color-primary: oklch(0.65 0.2 240);
  --color-primary-foreground: oklch(0.15 0 0);
  --color-secondary: oklch(0.2 0.01 240);
  --color-secondary-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.2 0.01 240);
  --color-muted-foreground: oklch(0.65 0.01 240);
  --color-accent: oklch(0.2 0.01 240);
  --color-accent-foreground: oklch(0.98 0 0);
  --color-destructive: oklch(0.65 0.25 25);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-border: oklch(0.25 0.01 240);
  --color-input: oklch(0.25 0.01 240);
  --color-ring: oklch(0.65 0.2 240);
  --color-card: oklch(0.18 0 0);
  --color-card-foreground: oklch(0.98 0 0);
  --color-popover: oklch(0.18 0 0);
  --color-popover-foreground: oklch(0.98 0 0);
}

/* =================================================================
   BASE STYLES
   ================================================================= */
* {
  @apply border-border;
}

body {
  @apply bg-background text-foreground;
  font-family: var(--font-sans);
}

/* Arabic font when dir="rtl" */
[dir="rtl"] body {
  font-family: var(--font-arabic);
}

/* Flip margins/paddings using logical properties */
.ml-auto {
  margin-inline-start: auto;
}

.mr-auto {
  margin-inline-end: auto;
}

/* =================================================================
   ANIMATIONS
   ================================================================= */
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}

.animate-accordion-down {
  animation: accordion-down 0.2s var(--ease-snappy);
}

.animate-accordion-up {
  animation: accordion-up 0.2s var(--ease-snappy);
}
```

### Theme Toggle Component

```typescript
// src/components/theme-toggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        }
      }
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Language Toggle Component (Cookie-Based)

```typescript
// src/components/language-toggle.tsx
"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export function LanguageToggle() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  useEffect(() => {
    // Get current locale from cookie or localStorage
    const savedLocale = 
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] || localStorage.getItem("locale") || "en";
    
    setCurrentLocale(savedLocale);
  }, []);

  const switchLanguage = async (newLocale: "en" | "ar") => {
    // Save to cookie (expires in 1 year)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Save to localStorage as backup
    localStorage.setItem("locale", newLocale);
    
    // Update document direction and language
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
    
    // Update state
    setCurrentLocale(newLocale);
    
    // Refresh the page to apply new locale
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          English {currentLocale === "en" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("ar")}>
          العربية {currentLocale === "ar" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Locale Utilities (Cookie-Based)

```typescript
// src/lib/locale.ts
import { cookies } from "next/headers";

export type Locale = "en" | "ar";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ar"];

// Server-side: Get locale from cookies
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale;
  
  return locale && locales.includes(locale) ? locale : defaultLocale;
}

// Get messages for current locale
export async function getMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`@/messages/${defaultLocale}.json`)).default;
  }
}
```

### i18n Configuration

```typescript
// src/i18n.ts
import { getRequestConfig } from "next-intl/server";
import { getLocale } from "@/lib/locale";

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### Middleware for Locale Detection

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/login", "/forgot-password"];
const adminPaths = ["/dashboard"];
const superAdminPaths = [
  "/dashboard/roles",
  "/dashboard/permissions",
  "/dashboard/settings",
];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const pathname = request.nextUrl.pathname;

  // Get locale from cookie or default to 'en'
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";

  // Set locale cookie if not present
  const response = NextResponse.next();
  if (!request.cookies.get("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "lax",
    });
  }

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return response;
  }

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check super admin paths
  if (superAdminPaths.some((path) => pathname.startsWith(path))) {
    if (token.role !== "super_admin") {
      return NextResponse.redirect(
        new URL("/dashboard/unauthorized", request.url)
      );
    }
  }

  // Check admin paths
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    const allowedRoles = ["super_admin", "admin", "manager"];
    if (!allowedRoles.includes(token.role as string)) {
      return NextResponse.redirect(
        new URL("/dashboard/unauthorized", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Root Layout with Theme Provider (No Locale in URL)

```typescript
// src/app/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Inter, Cairo } from "next/font/google";
import { getLocale, getMessages } from "@/lib/locale";
import "@/styles/globals.css";
import "@/styles/rtl.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-arabic" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from cookie (server-side)
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Translation Files

```json
// messages/en.json
{
  "common": {
    "welcome": "Welcome",
    "login": "Login",
    "logout": "Logout",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "search": "Search",
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success"
  },
  "auth": {
    "signIn": "Sign In",
    "signOut": "Sign Out",
    "email": "Email Address",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "rememberMe": "Remember Me",
    "invalidCredentials": "Invalid email or password"
  },
  "dashboard": {
    "title": "Dashboard",
    "overview": "Overview",
    "users": "Users",
    "roles": "Roles",
    "permissions": "Permissions",
    "brands": "Brands",
    "materials": "Materials",
    "products": "Products",
    "machines": "Machines",
    "orders": "Orders",
    "settings": "Settings"
  },
  "users": {
    "title": "Users",
    "createUser": "Create User",
    "editUser": "Edit User",
    "deleteUser": "Delete User",
    "userDetails": "User Details",
    "name": "Name",
    "email": "Email",
    "role": "Role",
    "status": "Status",
    "actions": "Actions"
  }
}
```

```json
// messages/ar.json
{
  "common": {
    "welcome": "مرحباً",
    "login": "تسجيل الدخول",
    "logout": "تسجيل الخروج",
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "edit": "تعديل",
    "create": "إنشاء",
    "search": "بحث",
    "loading": "جاري التحميل...",
    "error": "حدث خطأ",
    "success": "نجح"
  },
  "auth": {
    "signIn": "تسجيل الدخول",
    "signOut": "تسجيل الخروج",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "forgotPassword": "هل نسيت كلمة المرور؟",
    "rememberMe": "تذكرني",
    "invalidCredentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة"
  },
  "dashboard": {
    "title": "لوحة التحكم",
    "overview": "نظرة عامة",
    "users": "المستخدمون",
    "roles": "الأدوار",
    "permissions": "الصلاحيات",
    "brands": "العلامات التجارية",
    "materials": "المواد",
    "products": "المنتجات",
    "machines": "الآلات",
    "orders": "الطلبات",
    "settings": "الإعدادات"
  },
  "users": {
    "title": "المستخدمون",
    "createUser": "إنشاء مستخدم",
    "editUser": "تعديل مستخدم",
    "deleteUser": "حذف مستخدم",
    "userDetails": "تفاصيل المستخدم",
    "name": "الاسم",
    "email": "البريد الإلكتروني",
    "role": "الدور",
    "status": "الحالة",
    "actions": "الإجراءات"
  }
}
```

### Using Translations in Components

```typescript
// Server Component
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("overview")}</p>
    </div>
  );
}
```

```typescript
// Client Component
"use client";

import { useTranslations } from "next-intl";

export function UserForm() {
  const t = useTranslations("users");

  return (
    <form>
      <h2>{t("createUser")}</h2>
      <input placeholder={t("name")} />
      <input placeholder={t("email")} />
      <button type="submit">{t("save")}</button>
    </form>
  );
}
```

---

## 🔒 Authentication & Security

### Auth Configuration (NextAuth v5)

```typescript
// src/lib/auth/auth-config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "@/services/auth.service";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await loginUser(email, password);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
};
```

### Middleware Protection

```typescript
// src/middleware.ts
import { auth } from "@/lib/auth/auth-config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  if (!isAuthPage && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Role-Based UI Control (Dynamic Sidebar & Buttons)

```typescript
// src/lib/auth/permissions.ts
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectUserRole,
  selectUserPermissions,
} from "@/lib/store/slices/authSlice";

export interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}

export interface Role {
  name: string;
  permissions: Permission[];
}

// Check if user has permission for resource and action
export const checkPermission = (
  userPermissions: Permission[],
  resource: string,
  action: string
): boolean => {
  return userPermissions.some(
    (p) => p.resource === resource && p.actions.includes(action)
  );
};

// Hook to check permissions
export const usePermission = (resource: string, action: string) => {
  const permissions = useAppSelector(selectUserPermissions);
  return checkPermission(permissions, resource, action);
};

// Hook to check user role
export const useRole = () => {
  return useAppSelector(selectUserRole);
};

// Check if user has any of the specified roles
export const useHasRole = (...roles: string[]) => {
  const userRole = useRole();
  return userRole ? roles.includes(userRole) : false;
};
```

### HOC for Permission-Based Rendering

```typescript
// src/components/auth/with-permission.tsx
"use client";

import { usePermission } from "@/lib/auth/permissions";
import { ReactNode } from "react";

interface WithPermissionProps {
  children: ReactNode;
  resource: string;
  action: string;
  fallback?: ReactNode;
}

export function WithPermission({
  children,
  resource,
  action,
  fallback = null,
}: WithPermissionProps) {
  const hasPermission = usePermission(resource, action);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage in components
// <WithPermission resource="users" action="create">
//   <Button>Create User</Button>
// </WithPermission>
```

### HOC for Role-Based Rendering

```typescript
// src/components/auth/with-role.tsx
"use client";

import { useHasRole } from "@/lib/auth/permissions";
import { ReactNode } from "react";

interface WithRoleProps {
  children: ReactNode;
  roles: string[];
  fallback?: ReactNode;
}

export function WithRole({ children, roles, fallback = null }: WithRoleProps) {
  const hasRole = useHasRole(...roles);

  if (!hasRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage
// <WithRole roles={['super_admin', 'admin']}>
//   <DeleteButton />
// </WithRole>
```

### Dynamic Sidebar Based on Roles & Permissions

```typescript
// src/components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectUserRole,
  selectUserPermissions,
} from "@/lib/store/slices/authSlice";
import { checkPermission } from "@/lib/auth/permissions";
import {
  Users,
  Package,
  Settings,
  BarChart,
  Boxes,
  ShoppingCart,
  Cog,
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  requiredRole?: string[];
  requiredPermission?: { resource: string; action: string };
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
    requiredPermission: { resource: "users", action: "read" },
  },
  {
    name: "Roles",
    href: "/dashboard/roles",
    icon: Settings,
    requiredRole: ["super_admin"],
  },
  {
    name: "Brands",
    href: "/dashboard/brands",
    icon: Package,
    requiredPermission: { resource: "brands", action: "read" },
  },
  {
    name: "Materials",
    href: "/dashboard/materials",
    icon: Boxes,
    requiredPermission: { resource: "materials", action: "read" },
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingCart,
    requiredPermission: { resource: "products", action: "read" },
  },
  {
    name: "Machines",
    href: "/dashboard/machines",
    icon: Cog,
    requiredPermission: { resource: "machines", action: "read" },
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    requiredRole: ["super_admin", "admin"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const userRole = useAppSelector(selectUserRole);
  const userPermissions = useAppSelector(selectUserPermissions);

  // Filter sidebar items based on role and permissions
  const visibleItems = sidebarItems.filter((item) => {
    // Check role requirement
    if (item.requiredRole && !item.requiredRole.includes(userRole || "")) {
      return false;
    }

    // Check permission requirement
    if (item.requiredPermission) {
      return checkPermission(
        userPermissions,
        item.requiredPermission.resource,
        item.requiredPermission.action
      );
    }

    return true;
  });

  return (
    <aside className="w-64 bg-white border-r h-screen">
      <nav className="p-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

### Dynamic Button Controls Based on Permissions

```typescript
// src/components/tables/users-table.tsx
"use client";

import { WithPermission } from "@/components/auth/with-permission";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div>
      {/* Create button - only visible if user can create */}
      <WithPermission resource="users" action="create">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </WithPermission>

      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="flex gap-2">
                {/* Edit button - only visible if user can update */}
                <WithPermission resource="users" action="update">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </WithPermission>

                {/* Delete button - only visible if user can delete */}
                <WithPermission resource="users" action="delete">
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </WithPermission>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Middleware for Route Protection

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/login", "/forgot-password"];
const adminPaths = ["/dashboard"];
const superAdminPaths = [
  "/dashboard/roles",
  "/dashboard/permissions",
  "/dashboard/settings",
];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check super admin paths
  if (superAdminPaths.some((path) => pathname.startsWith(path))) {
    if (token.role !== "super_admin") {
      return NextResponse.redirect(
        new URL("/dashboard/unauthorized", request.url)
      );
    }
  }

  // Check admin paths
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    const allowedRoles = ["super_admin", "admin", "manager"];
    if (!allowedRoles.includes(token.role as string)) {
      return NextResponse.redirect(
        new URL("/dashboard/unauthorized", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## ⚡ Redux Toolkit Performance Optimization (Target: 300ms)

### Performance Strategies

1. **RTK Query Caching**: Automatic request deduplication and caching
2. **Code Splitting**: Lazy load slices and components
3. **Memoization**: Use `createSelector` for derived state
4. **Normalized State**: Flatten data structures
5. **Selective Subscriptions**: Use specific selectors
6. **Bundle Optimization**: Tree-shaking unused code

### Optimized Selectors with Reselect

```typescript
// src/lib/store/selectors/userSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Base selectors
const selectUsers = (state: RootState) => state.users.entities;
const selectUserId = (_state: RootState, userId: string) => userId;

// Memoized selector - only recalculates when dependencies change
export const selectUserById = createSelector(
  [selectUsers, selectUserId],
  (users, userId) => users[userId]
);

// Memoized filtered selector
export const selectActiveUsers = createSelector([selectUsers], (users) =>
  Object.values(users).filter((user) => user.status === "active")
);
```

### Normalized State Pattern (Faster Lookups)

```typescript
// src/lib/store/slices/usersSlice.ts
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
  },
});

// Auto-generated selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);
```

### RTK Query with Aggressive Caching

```typescript
// src/lib/store/api/apiSlice.ts
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  // Aggressive caching for 300ms target
  keepUnusedDataFor: 300, // Keep cache for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data older than 30s
  refetchOnFocus: false, // Don't refetch on window focus
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      // Transform response to normalized structure
      transformResponse: (response: User[]) => {
        return response.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<string, User>);
      },
    }),
  }),
});
```

### Code Splitting for Slices

```typescript
// src/lib/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// Core reducers loaded immediately
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serialization check in production for performance
      serializableCheck: process.env.NODE_ENV === "development",
    }).concat(apiSlice.middleware),
});

// Lazy load feature-specific reducers
export const injectReducer = (key: string, reducer: any) => {
  if (!store.asyncReducers) {
    store.asyncReducers = {};
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    combineReducers({
      ...store.asyncReducers,
      [apiSlice.reducerPath]: apiSlice.reducer,
    })
  );
};

export default store;
```

### Performance Monitoring

```typescript
// src/lib/store/middleware/performanceMiddleware.ts
import type { Middleware } from "@reduxjs/toolkit";

export const performanceMiddleware: Middleware = () => (next) => (action) => {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();
    const result = next(action);
    const end = performance.now();

    const duration = end - start;
    if (duration > 16) {
      // Warn if action takes >16ms (60fps threshold)
      console.warn(`Slow action: ${action.type} took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  return next(action);
};
```

---

## 🌐 API Layer

### API Client Setup

```typescript
// src/lib/api/client.ts
import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  get instance() {
    return this.client;
  }
}

export const apiClient = new ApiClient().instance;
```

### Service Example

```typescript
// src/services/user.service.ts
import { apiClient } from "@/lib/api/client";
import type { User, CreateUserDto, UpdateUserDto } from "@/types/user.types";

export const userService = {
  async getUsers(page = 1, limit = 10) {
    return apiClient.get<User[]>("/users", {
      params: { page, limit },
    });
  },

  async getUserById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  },

  async createUser(data: CreateUserDto) {
    return apiClient.post<User>("/users", data);
  },

  async updateUser(id: string, data: UpdateUserDto) {
    return apiClient.put<User>(`/users/${id}`, data);
  },

  async deleteUser(id: string) {
    return apiClient.delete(`/users/${id}`);
  },
};
```

---

## 🎨 Component Examples

### Reusable Data Table

```typescript
// src/components/tables/data-table.tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

---

## 🔄 State Management (Redux Toolkit)

### Why Redux Toolkit Only?

- **Performance**: Optimized for 300ms loading time target
- **Predictable**: Single source of truth
- **DevTools**: Time-travel debugging
- **RTK Query**: Built-in data fetching with caching
- **TypeScript**: Full type safety
- **No overhead**: Lighter than multiple state libraries

### Store Setup

```typescript
// src/lib/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Auth Slice with Roles

```typescript
// src/lib/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "manager" | "operator";
  permissions: Permission[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectUserPermissions = (state: RootState) =>
  state.auth.user?.permissions || [];
```

### RTK Query API Slice (Optimized for Performance)

```typescript
// src/lib/store/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Machine", "Order", "Execution"],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["User"],
      // Keep cached for 60 seconds
      keepUnusedDataFor: 60,
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
```

### Typed Hooks

```typescript
// src/lib/store/hooks.ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### Provider Setup

```typescript
// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

```typescript
// src/app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 🌍 Internationalization

```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## 📊 Key Dashboard Features

### Access Control

- ✅ User management (CRUD)
- ✅ Roles management
- ✅ Permissions management
- ✅ ABAC implementation

### Brand Management

- ✅ Brands CRUD
- ✅ Brand managers assignment
- ✅ Brand-specific access control

### Base Chemical Management

- ✅ Materials management
- ✅ Material groups
- ✅ Advanced filtering & pagination

### Store Management

- ✅ Order management
- ✅ Shipping management
- ✅ Machine orders
- ✅ Contract management

### Product Management

- ✅ Categories management
- ✅ Products CRUD
- ✅ Recipes with phases & steps
- ✅ Neutralizers management
- ✅ Search & filters

### Machines & Telemetry

- ✅ Machines management
- ✅ Units management
- ✅ Container levels monitoring
- ✅ Heartbeat monitoring
- ✅ Real-time updates

### Orders & Execution

- ✅ Execution orders visualization
- ✅ Real-time progress monitoring
- ✅ Step timeline
- ✅ Process logs
- ✅ Feedback management

### Advertising Management

- ✅ Promotions CRUD
- ✅ Promotion rules & actions
- ✅ Coupons management
- ✅ Cart rules

---

## 🔐 Security Checklist

- ✅ HTTP-only cookies for tokens
- ✅ CSRF protection
- ✅ Content Security Policy (CSP)
- ✅ XSS prevention
- ✅ SQL injection prevention (server-side)
- ✅ Rate limiting on sensitive endpoints
- ✅ Environment variables for secrets
- ✅ Secure headers configuration

---

## 📈 Performance Targets

- First Contentful Paint: **< 1.5s**
- Time to Interactive: **< 3s**
- Lighthouse score: **> 90**
- Initial bundle size: **< 500KB**
- List view load time: **< 300ms**

---

## 🚀 Build & Deployment

### Development

```bash
npm run dev
# or
yarn dev
```

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

**.env.local**

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.chemex.com

# Auth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# WebSocket
NEXT_PUBLIC_WS_URL=wss://api.chemex.com

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

**.env.production**

```env
NEXT_PUBLIC_APP_URL=https://dashboard.chemex.com
NEXT_PUBLIC_API_URL=https://api.chemex.com
NEXTAUTH_SECRET=production-secret-key
NEXTAUTH_URL=https://dashboard.chemex.com
NEXT_PUBLIC_WS_URL=wss://api.chemex.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🧪 Testing

### Unit Tests (Jest)

```typescript
// tests/unit/services/user.service.test.ts
import { userService } from "@/services/user.service";
import { apiClient } from "@/lib/api/client";

jest.mock("@/lib/api/client");

describe("UserService", () => {
  it("should fetch users", async () => {
    const mockUsers = [{ id: "1", name: "John Doe" }];
    (apiClient.get as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userService.getUsers();
    expect(result).toEqual(mockUsers);
  });
});
```

### E2E Tests (Cypress)

```typescript
// cypress/e2e/login.cy.ts
describe("Login Flow", () => {
  it("should login successfully", () => {
    cy.visit("/login");
    cy.get('[data-testid="email"]').type("admin@chemex.com");
    cy.get('[data-testid="password"]').type("password123");
    cy.get('[data-testid="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table/v8)
- [TanStack Query](https://tanstack.com/query/latest)
- [NextAuth.js](https://next-auth.js.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## ✅ Development Checklist

### Initial Setup

- [ ] Initialize Next.js 16 project
- [ ] Set up folder structure
- [ ] Configure dependencies
- [ ] Set up shadcn/ui
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint & Prettier
- [ ] Configure TypeScript strict mode

### Core Implementation

- [ ] Set up NextAuth.js
- [ ] Configure API client with interceptors
- [ ] Implement ABAC permissions
- [ ] Set up state management (Zustand)
- [ ] Configure internationalization
- [ ] Set up error handling

### Feature Development (Priority Order)

1. [ ] Authentication (Login, Reset Password)
2. [ ] Dashboard Overview
3. [ ] User Management
4. [ ] Roles & Permissions
5. [ ] Brands Management
6. [ ] Materials & Groups
7. [ ] Products & Categories
8. [ ] Recipes with Phases
9. [ ] Machines & Telemetry
10. [ ] Orders & Shipping
11. [ ] Execution Monitoring
12. [ ] Promotions & Coupons

### Testing & QA

- [ ] Unit tests for services
- [ ] Component tests
- [ ] Integration tests
- [ ] E2E tests with Cypress
- [ ] Security testing
- [ ] Performance testing
- [ ] Accessibility testing (WCAG 2.1)

### Pre-Deployment

- [ ] Environment configuration
- [ ] Build optimization
- [ ] Security headers
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

---

This structure provides a solid foundation for building a scalable, secure, and performant Next.js 16 web dashboard following industry best practices and modern development patterns.
# ChemEx Project - Shared Architecture & Guidelines

## 📋 Overview

This document contains shared concepts, patterns, and guidelines used across both the Flutter mobile app and Next.js web dashboard for the ChemEx chemical machine management system.

---

## 🎯 Core Principles

Both projects follow these fundamental principles:

- **Clean Architecture** - Separation of concerns (Presentation, Domain, Data layers)
- **SOLID Principles** - Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion
- **Feature-First Organization** - Features grouped by business domain
- **ABAC (Attribute-Based Access Control)** - Role-based permissions with conditions
- **Localization Support** - English/Arabic (RTL/LTR)
- **Real-time Capabilities** - WebSocket/SSE for live updates
- **Security First** - Secure token storage, encryption, and best practices

---

## 🔄 Shared Concepts

### 1. API Integration

Both projects connect to the same backend API with consistent patterns:

**Base Configuration:**

- Base URL configuration in environment variables
- Token-based authentication (JWT)
- Automatic token refresh mechanism
- Request/response interceptors
- Error handling and retry logic
- Timeout configuration (30 seconds)

**Common Headers:**

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

**API Endpoints Structure:**

```
/api/v1/auth/*          - Authentication endpoints
/api/v1/users/*         - User management
/api/v1/brands/*        - Brand management
/api/v1/materials/*     - Materials & groups
/api/v1/products/*      - Products & categories
/api/v1/recipes/*       - Recipes, phases, steps
/api/v1/machines/*      - Machines & units
/api/v1/orders/*        - Order management
/api/v1/executions/*    - Execution monitoring
/api/v1/promotions/*    - Promotions & coupons
/api/v1/notifications/* - Notifications
```

### 2. Authentication Flow

Unified authentication process across both platforms:

**Login Flow:**

1. User enters email and password
2. Client sends POST to `/api/v1/auth/login`
3. Server validates credentials
4. Returns access token + refresh token + user data
5. Client stores tokens securely
6. Client redirects to home/dashboard

**Registration Flow:**

1. User fills registration form
2. Client sends POST to `/api/v1/auth/register`
3. Server creates user account
4. Server sends OTP via email
5. Client navigates to verification page
6. User enters 6-digit OTP
7. Client sends POST to `/api/v1/auth/verify`
8. Server validates OTP
9. Client logs in automatically

**Password Reset Flow:**

1. User clicks "Forgot Password"
2. Client sends email to `/api/v1/auth/forgot-password`
3. Server sends verification code to email
4. User enters verification code
5. User sets new password
6. Client sends POST to `/api/v1/auth/reset-password`
7. Password updated successfully

**Token Management:**

- Access token: Short-lived (15 minutes)
- Refresh token: Long-lived (7 days)
- Automatic refresh before expiration
- Secure storage (Flutter Secure Storage / HTTP-only cookies)

### 3. ABAC (Attribute-Based Access Control)

Permission structure used across both platforms:

**Permission Model:**

```typescript
interface Permission {
  resource: string;      // e.g., "products", "machines", "users"
  action: string;        // "create", "read", "update", "delete"
  conditions?: {
    brandId?: string;    // Limit to specific brand
    role?: string;       // Role-based condition
    own?: boolean;       // Only own resources
  };
}

interface Role {
  id: string;
  name: string;          // "admin", "manager", "operator", "user"
  permissions: Permission[];
}
```

**Role Hierarchy:**

- **Super Admin**: Full system access
- **Admin**: Manage all resources except system settings
- **Brand Manager**: Manage specific brand's resources
- **Operator**: View and update execution data
- **User**: Limited to own machines and orders

**Permission Examples:**

```json
{
  "resource": "products",
  "action": "create",
  "conditions": {
    "brandId": "brand-123"
  }
}

{
  "resource": "machines",
  "action": "read",
  "conditions": {
    "own": true
  }
}
```

### 4. Real-time Features

Both platforms implement real-time updates via WebSocket:

**Connection Setup:**

- WebSocket URL: `wss://api.chemex.com/ws`
- Authentication via JWT token in connection params
- Automatic reconnection on disconnect
- Heartbeat/ping-pong for connection health

**Real-time Events:**

- `machine.heartbeat` - Machine status updates
- `execution.progress` - Execution progress updates
- `execution.step` - Step completion notifications
- `order.status` - Order status changes
- `notification.new` - New notifications
- `container.level` - Container level changes

**Event Structure:**

```json
{
  "event": "machine.heartbeat",
  "data": {
    "machineId": "machine-123",
    "status": "online",
    "timestamp": "2025-10-23T10:00:00Z"
  }
}
```

### 5. Localization

Both platforms support English and Arabic:

**Language Codes:**

- `en` - English (LTR)
- `ar` - Arabic (RTL)

**Translation Structure:**

```json
{
  "auth": {
    "login": "Login",
    "email": "Email",
    "password": "Password"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  }
}
```

**RTL Support:**

- Automatic text direction based on locale
- Mirrored layouts for Arabic
- Date/time formatting per locale
- Number formatting (1,234.56 vs ١٬٢٣٤٫٥٦)

---

## 🎨 Design System

### Color Palette

Consistent colors across mobile and web:

```css
/* Primary Colors */
--primary: #1E40AF;         /* Blue */
--secondary: #7C3AED;       /* Purple */

/* Status Colors */
--success: #10B981;         /* Green */
--warning: #F59E0B;         /* Amber */
--error: #EF4444;           /* Red */
--info: #3B82F6;            /* Blue */

/* Neutral Colors */
--background: #F9FAFB;      /* Light gray */
--surface: #FFFFFF;         /* White */
--text-primary: #111827;    /* Dark gray */
--text-secondary: #6B7280;  /* Medium gray */
--border: #E5E7EB;          /* Light gray */
```

### Typography Scale

```css
/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

---

## 🔐 Security Best Practices

### Mobile (Flutter)

1. **Secure Token Storage**
   - Use Flutter Secure Storage
   - Encrypted shared preferences for sensitive data
   - Clear tokens on logout

2. **Network Security**
   - SSL certificate pinning
   - Validate SSL certificates
   - Use HTTPS only

3. **Code Protection**
   - Obfuscate code in release builds
   - Remove debug logs in production
   - Implement root/jailbreak detection

4. **Biometric Authentication**
   - Optional fingerprint/face ID
   - Fallback to PIN/password

### Web (Next.js)

1. **Token Management**
   - HTTP-only cookies for tokens
   - Secure flag enabled
   - SameSite=Strict

2. **Request Security**
   - CSRF protection
   - XSS prevention (sanitize inputs)
   - SQL injection prevention

3. **Headers**
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

4. **Rate Limiting**
   - Login attempts: 5 per 15 minutes
   - API calls: 100 per minute
   - Password reset: 3 per hour

---

## 📊 Performance Targets

### Mobile App

| Metric | Target |
|--------|--------|
| App Startup | < 2 seconds |
| Screen Transitions | 60 FPS |
| API Calls (Cached) | < 300ms |
| App Bundle Size | < 30MB |
| Memory Usage | < 150MB |

### Web Dashboard

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |
| Initial Bundle Size | < 500KB |
| List View Load | < 300ms |

---

## 🧪 Testing Strategy

### Unit Tests

**What to Test:**

- Business logic
- Utility functions
- Data transformations
- Validation functions

**Coverage Target:** > 80%

### Integration Tests

**What to Test:**

- API integration
- Authentication flows
- Data fetching/caching
- Error handling

### E2E Tests

**Critical Paths:**

- Login/logout flow
- User registration with OTP
- Product creation (web)
- Machine monitoring (mobile)
- Order placement (mobile)
- Execution monitoring (both)

---

## 🔄 Data Synchronization

### Cross-Platform Sync

When users switch between mobile and web:

1. **Cart Synchronization**
   - Cart stored on server
   - Automatic sync on login
   - Real-time updates via WebSocket

2. **User Preferences**
   - Theme (light/dark)
   - Language (en/ar)
   - Notification settings
   - Stored in user profile

3. **Real-time Updates**
   - Order status changes
   - Execution progress
   - Notifications
   - Machine status

---

## 📈 Analytics & Monitoring

### Events to Track

**User Events:**

- Login/logout
- Registration
- Password reset
- Profile updates

**Business Events:**

- Product views
- Order creation
- Execution start/complete
- Cart actions

**Technical Events:**

- API errors
- App crashes
- Performance issues
- Network failures

### Tools

**Mobile:**

- Firebase Analytics
- Firebase Crashlytics
- Firebase Performance Monitoring

**Web:**

- Google Analytics / Mixpanel
- Sentry (error tracking)
- Vercel Analytics
- LogRocket (session replay)

---

## 🚀 Deployment Strategy

### Mobile App

**Android:**

- Google Play Store (Production)
- Firebase App Distribution (Staging/Beta)
- Internal testing track

**iOS:**

- Apple App Store (Production)
- TestFlight (Beta testing)
- Ad-hoc distribution (Internal)

**CI/CD:**

- GitHub Actions / Codemagic
- Automated builds on merge to main
- Automated tests before deployment

### Web Dashboard

**Hosting:**

- Vercel (Recommended)
- AWS Amplify
- Netlify

**Deployment:**

- Preview deployments for PRs
- Production deployment on merge to main
- Automatic rollback on errors

**CDN:**

- CloudFront
- Cloudflare

---

## 📝 Development Workflow

### Git Workflow

```
main (production)
├── develop (staging)
│   ├── feature/auth-flow
│   ├── feature/machine-monitoring
│   ├── feature/order-management
│   └── bugfix/cart-calculation
```

### Commit Convention

```
feat: Add machine heartbeat monitoring
fix: Resolve cart total calculation issue
docs: Update API integration guide
style: Format code with prettier
refactor: Restructure auth service
test: Add unit tests for order service
chore: Update dependencies
perf: Optimize image loading
ci: Update GitHub Actions workflow
```

### Branch Naming

```
feature/feature-name
bugfix/bug-description
hotfix/critical-fix
release/version-number
```

### Pull Request Process

1. Create feature branch from `develop`
2. Implement changes with tests
3. Create PR with description and screenshots
4. Request code review
5. Address review comments
6. Automated tests must pass
7. Merge to `develop`

---

## 📚 API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Product Name"
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🔍 Error Codes

Standard error codes used across both platforms:

| Code | Description |
|------|-------------|
| AUTH_001 | Invalid credentials |
| AUTH_002 | Token expired |
| AUTH_003 | Invalid token |
| AUTH_004 | Account not verified |
| VAL_001 | Validation error |
| VAL_002 | Missing required field |
| PERM_001 | Insufficient permissions |
| PERM_002 | Access denied |
| RES_001 | Resource not found |
| RES_002 | Resource already exists |
| SYS_001 | Internal server error |
| NET_001 | Network timeout |
| NET_002 | Connection failed |

---

## 📅 Development Timeline

Based on the project brief:

| Period | Focus | Platform |
|--------|-------|----------|
| 12/10 - 26/10 | Application Structure, Splash, Onboarding, Auth | Mobile |
| 26/10 - 23/11 | Application Structure, Auth, Route Map, Middleware | Web |
| 23/11 - 07/12 | Brands, Materials, Products, Recipes | Web |
| 07/12 - 21/12 | Home, Profile, Machine, Containers, Products | Mobile |
| 21/12 - 04/01 | Hardware, Phases, Execution, Orders, Promotions | Web |
| 04/01 - 18/01 | Cart, Checkout, Offers, Notifications, Orders | Mobile |
| 18/01 - 01/02 | Machine Requests, Monitoring, Logs, Languages | Web |
| 01/02 - 15/02 | Languages, E2E Testing | Mobile |
| 01/02 - 15/02 | Release Plan, Documentation, Landing | Both |
| 14/02 - 26/02 | Deployment | Both |

---

## ✅ Quality Checklist

### Code Quality

- [ ] TypeScript/Dart strict mode enabled
- [ ] No linting errors
- [ ] Code formatted consistently
- [ ] No console.log in production
- [ ] Proper error handling
- [ ] Comments for complex logic

### Performance

- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Bundle size optimized
- [ ] API calls cached appropriately
- [ ] No memory leaks
- [ ] 60 FPS animations

### Security

- [ ] Tokens stored securely
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting

### Accessibility

- [ ] Screen reader support
- [ ] Keyboard navigation (web)
- [ ] Sufficient color contrast
- [ ] Text scaling support
- [ ] Focus indicators
- [ ] Alt text for images

### Testing

- [ ] Unit tests > 80% coverage
- [ ] Integration tests for critical paths
- [ ] E2E tests for main flows
- [ ] Manual QA completed
- [ ] Cross-browser testing (web)
- [ ] Device testing (mobile)

---

## 📖 Documentation Requirements

### Code Documentation

- Function/method descriptions
- Parameter descriptions
- Return value descriptions
- Usage examples
- Edge cases noted

### API Documentation

- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error responses
- Rate limits

### User Documentation

- Setup guides
- Feature documentation
- Troubleshooting guides
- FAQ section
- Video tutorials (optional)

---

## 🎯 Success Criteria

### Technical Success

- ✅ All features implemented per requirements
- ✅ Performance targets met
- ✅ Security audit passed
- ✅ Test coverage > 80%
- ✅ Zero critical bugs

### Business Success

- ✅ On-time delivery
- ✅ Within budget
- ✅ User acceptance testing passed
- ✅ Scalable architecture
- ✅ Maintainable codebase

---

This shared documentation ensures consistency, quality, and collaboration across both the mobile and web platforms of the ChemEx project.

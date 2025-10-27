import { ROUTES } from "@/core/constants/routes";
import { PERMISSIONS, type Permission } from "@/core/constants/access-control";
import {
  hasRequiredPermissions,
  getEffectivePermissions,
  hasSessionExpired,
  type Session,
} from "./session";
import { evaluatePolicies } from "@/core/security/abac/policy-engine";
import { defaultPolicies } from "@/core/security/abac/policies";

export type RouteAccessRule = {
  matcher: RegExp;
  requiresAuth: boolean;
  permissions?: Permission[];
  description?: string;
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createRouteMatcher = (pattern: string) =>
  new RegExp(`^${escapeRegex(pattern)}(?:/.*)?$`, "i");

export const routeAccessRules: RouteAccessRule[] = [
  {
    matcher: createRouteMatcher(`${ROUTES.AUTH.LOGIN}`),
    requiresAuth: false,
    description: "Authentication login page",
  },
  {
    matcher: createRouteMatcher(`${ROUTES.AUTH.RESET_PASSWORD}`),
    requiresAuth: false,
    description: "Password reset page",
  },
  {
    matcher: /^\/auth(?:\/.*)?$/i,
    requiresAuth: false,
    description: "General authentication routes",
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.BRANDS}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_BRANDS],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.BASE_CHEMICALS}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_BASE_CHEMICALS],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.STORE}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_STORE],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.PRODUCE}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_PRODUCE],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.MACHINES}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_MACHINES],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.ORDERS}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_ORDERS],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.ADVERTISING}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.MANAGE_ADVERTISING],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.NOTIFICATIONS}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.VIEW_TELEMETRY],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.DASHBOARD.ROOT}`),
    requiresAuth: true,
    permissions: [PERMISSIONS.VIEW_REPORTING],
  },
  {
    matcher: createRouteMatcher(`${ROUTES.SETTINGS.ROOT}`),
    requiresAuth: true,
    description: "Settings root",
  },
  {
    matcher: createRouteMatcher(`${ROUTES.SETTINGS.PROFILE}`),
    requiresAuth: true,
    description: "Profile settings",
  },
  {
    matcher: createRouteMatcher(`${ROUTES.SETTINGS.PREFERENCES}`),
    requiresAuth: true,
    description: "Preferences settings",
  },
];

const protectedDefaultRule: RouteAccessRule = {
  matcher: /^\/(?!_next|api|public|static).*/i,
  requiresAuth: true,
};

export type RouteAccessEvaluation = {
  allowed: boolean;
  requiresAuth: boolean;
  missingPermissions: Permission[];
  matchedRule: RouteAccessRule;
  effectivePermissions: Permission[];
};

const findRuleForPath = (pathname: string) =>
  routeAccessRules.find((rule) => rule.matcher.test(pathname)) ?? protectedDefaultRule;

export const evaluateRouteAccess = (
  pathname: string,
  session: Session | null,
): RouteAccessEvaluation => {
  const matchedRule = findRuleForPath(pathname);
  const requiredPermissions = matchedRule.permissions ?? [];
  const requiresAuth = matchedRule.requiresAuth;
  const validSession = session && !hasSessionExpired(session) ? session : null;
  const decision = evaluatePolicies(defaultPolicies, {
    session: validSession,
    resource: {
      type: "route",
      identifier: pathname,
      permissions: requiredPermissions,
      attributes: {
        requiresAuth,
        description: matchedRule.description,
      },
    },
  });

  const effectivePermissions = Array.from(getEffectivePermissions(validSession));
  const missingPermissions = requiredPermissions.filter(
    (permission) => !effectivePermissions.includes(permission),
  );

  const allowed = decision.allowed && hasRequiredPermissions(validSession, requiredPermissions);

  return {
    allowed,
    requiresAuth,
    missingPermissions,
    matchedRule,
    effectivePermissions,
  };
};

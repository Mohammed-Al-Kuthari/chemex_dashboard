export type RouteKey =
  | "home"
  | "dashboard"
  | "login"
  | "authCallback"
  | "unauthorized";

export type RouteMeta = {
  path: string;
  requiresAuth: boolean;
  allowRoles?: string[];
  titleKey: string;
  descriptionKey?: string;
};

export const ROUTES: Record<RouteKey, RouteMeta> = {
  home: {
    path: "/",
    requiresAuth: true,
    allowRoles: undefined,
    titleKey: "routes.home.title",
  },
  dashboard: {
    path: "/dashboard",
    requiresAuth: true,
    allowRoles: undefined,
    titleKey: "routes.dashboard.title",
  },
  login: {
    path: "/auth/sign-in",
    requiresAuth: false,
    titleKey: "routes.login.title",
  },
  authCallback: {
    path: "/api/auth/callback",
    requiresAuth: false,
    titleKey: "routes.authCallback.title",
  },
  unauthorized: {
    path: "/unauthorized",
    requiresAuth: false,
    titleKey: "routes.unauthorized.title",
  },
};

export const DEFAULT_LOGIN_REDIRECT = ROUTES.dashboard.path;
export const RETURN_TO_PARAM = "returnTo";

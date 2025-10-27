export const ROUTE_SEGMENTS = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  AUTH: "/auth",
  SETTINGS: "/settings",
} as const;

export const ROUTES = {
  HOME: ROUTE_SEGMENTS.ROOT,
  AUTH: {
    LOGIN: `${ROUTE_SEGMENTS.AUTH}/login`,
    RESET_PASSWORD: `${ROUTE_SEGMENTS.AUTH}/reset-password`,
  },
  DASHBOARD: {
    ROOT: ROUTE_SEGMENTS.DASHBOARD,
    BRANDS: `${ROUTE_SEGMENTS.DASHBOARD}/brands`,
    BASE_CHEMICALS: `${ROUTE_SEGMENTS.DASHBOARD}/base-chemicals`,
    STORE: `${ROUTE_SEGMENTS.DASHBOARD}/store`,
    PRODUCE: `${ROUTE_SEGMENTS.DASHBOARD}/produce`,
    MACHINES: `${ROUTE_SEGMENTS.DASHBOARD}/machines`,
    ORDERS: `${ROUTE_SEGMENTS.DASHBOARD}/orders`,
    ADVERTISING: `${ROUTE_SEGMENTS.DASHBOARD}/advertising`,
    NOTIFICATIONS: `${ROUTE_SEGMENTS.DASHBOARD}/notifications`,
  },
  SETTINGS: {
    ROOT: ROUTE_SEGMENTS.SETTINGS,
    PROFILE: `${ROUTE_SEGMENTS.SETTINGS}/profile`,
    PREFERENCES: `${ROUTE_SEGMENTS.SETTINGS}/preferences`,
  },
} as const;

export type RouteTree = typeof ROUTES;

const API_VERSION = "/v1";
const API_PREFIX = `/api${API_VERSION}` as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_PREFIX}/auth/login`,
    REFRESH: `${API_PREFIX}/auth/refresh`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
  },
  USERS: {
    ROOT: `${API_PREFIX}/users`,
    DETAIL: (id: string) => `${API_PREFIX}/users/${id}`,
  },
  BRANDS: {
    ROOT: `${API_PREFIX}/brands`,
  },
  BASE_CHEMICALS: {
    ROOT: `${API_PREFIX}/base-chemicals`,
  },
} as const;

export type ApiEndpointTree = typeof API_ENDPOINTS;

export const createApiEndpoint = (path: string) => `${API_PREFIX}${path}`;

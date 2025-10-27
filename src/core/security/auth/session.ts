import {
  ROLES,
  ROLE_PERMISSIONS,
  PERMISSIONS,
  type Permission,
  type Role,
} from "@/core/constants/access-control";
import { authCookieConfig } from "@/core/configs/app-config";

type GlobalBufferType = {
  Buffer?: {
    from: (
      input: string,
      encoding: string
    ) => { toString: (encoding: string) => string };
  };
};

export type SessionTokenPayload = {
  sub: string;
  roles?: Role[];
  permissions?: Permission[];
  tenantId?: string;
  locale?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export type Session = {
  userId: string;
  roles: Role[];
  permissions: Permission[];
  tenantId?: string;
  locale?: string;
  expiresAt?: number | null;
  issuedAt?: number | null;
  rawToken?: string;
  attributes?: Record<string, unknown>;
};

const ROLE_VALUES = new Set<Role>(Object.values(ROLES) as Role[]);

const PERMISSION_VALUES = new Set<Permission>(
  Object.values(PERMISSIONS) as Permission[]
);

const isRole = (candidate: unknown): candidate is Role =>
  typeof candidate === "string" && ROLE_VALUES.has(candidate as Role);

const isPermission = (candidate: unknown): candidate is Permission =>
  typeof candidate === "string" &&
  PERMISSION_VALUES.has(candidate as Permission);

const decodeBase64 = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof globalThis.atob === "function") {
    return globalThis.atob(normalized);
  }

  const globalBuffer = (globalThis as GlobalBufferType).Buffer;

  if (globalBuffer) {
    return globalBuffer.from(normalized, "base64").toString("utf-8");
  }

  throw new Error("Base64 decoder is not available in the current runtime");
};

const decodeTokenPayload = (token: string): SessionTokenPayload | null => {
  try {
    const [, payload = ""] = token.split(".");
    const payloadSegment = payload || token;
    const decoded = decodeBase64(payloadSegment);
    return JSON.parse(decoded) as SessionTokenPayload;
  } catch {
    return null;
  }
};

const normalizeRoles = (roles?: Role[]): Role[] => {
  if (!roles?.length) {
    return [];
  }

  return roles.filter((role): role is Role => isRole(role));
};

const normalizePermissions = (permissions?: Permission[]): Permission[] => {
  if (!permissions?.length) {
    return [];
  }

  const seen = new Set<Permission>();
  for (const permission of permissions) {
    if (isPermission(permission)) {
      seen.add(permission);
    }
  }

  return Array.from(seen);
};

export const createSessionFromToken = (token: string): Session | null => {
  const payload = decodeTokenPayload(token);

  if (!payload?.sub) {
    return null;
  }

  const roles = normalizeRoles(payload.roles);
  const permissions = normalizePermissions(payload.permissions);

  return {
    userId: payload.sub,
    roles,
    permissions,
    tenantId:
      typeof payload.tenantId === "string" ? payload.tenantId : undefined,
    locale: typeof payload.locale === "string" ? payload.locale : undefined,
    expiresAt: typeof payload.exp === "number" ? payload.exp : null,
    issuedAt: typeof payload.iat === "number" ? payload.iat : null,
    rawToken: token,
    attributes: payload,
  } satisfies Session;
};

export const hasSessionExpired = (session: Session) => {
  if (!session.expiresAt) {
    return false;
  }

  const expiresAtMs = session.expiresAt * 1000;
  return Date.now() >= expiresAtMs;
};

export const getEffectivePermissions = (
  session: Session | null
): Set<Permission> => {
  if (!session) {
    return new Set();
  }

  const derived = session.roles.flatMap((role) => ROLE_PERMISSIONS[role] ?? []);
  const merged = [...derived, ...session.permissions];
  return new Set(merged);
};

export const hasRequiredPermissions = (
  session: Session | null,
  permissions: Permission[]
) => {
  if (!permissions.length) {
    return true;
  }

  const effective = getEffectivePermissions(session);
  return permissions.every((permission) => effective.has(permission));
};

export const readSessionTokenFromCookies = (cookies: Map<string, string>) => {
  const sessionCookie = cookies.get(authCookieConfig.session.name);
  if (sessionCookie) {
    return sessionCookie;
  }

  const accessToken = cookies.get(authCookieConfig.accessToken.name);
  if (accessToken) {
    return accessToken;
  }

  return null;
};

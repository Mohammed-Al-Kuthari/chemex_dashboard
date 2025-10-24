import type { Role } from "../../../constants";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  roles: Role[];
  locale?: string;
  permissions?: string[];
};

export type AuthSessionMeta = {
  sessionId: string;
  issuedAt: string;
  expiresAt: string;
  scopes: string[];
  hasRefreshToken: boolean;
};

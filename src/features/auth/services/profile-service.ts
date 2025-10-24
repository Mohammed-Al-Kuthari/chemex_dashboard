import { API_ENDPOINTS, ROLES } from '../../../constants';
import { AUTH_CONFIG } from '../../../config';
import { apiClient } from '../../../lib/http';
import type { AuthUser } from '../types';
import type { Role } from '../../../constants';

export interface UserInfoResponse {
  sub: string;
  email: string;
  name?: string;
  preferred_username?: string;
  picture?: string;
  locale?: string;
  roles?: string[];
  permissions?: string[];
}

const allowedRoles = new Set<Role>(Object.values(ROLES));

const normalizeRoles = (roles?: string[]): Role[] => {
  if (!roles) {
    return [];
  }

  return roles.filter((role): role is Role => allowedRoles.has(role as Role));
};

export const fetchUserProfile = async (accessToken: string): Promise<AuthUser> => {
  const endpoint = AUTH_CONFIG.userInfoEndpoint || API_ENDPOINTS.auth.userInfo;

  const payload = await apiClient.get<UserInfoResponse>(endpoint, {
    accessToken,
  });

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name ?? payload.preferred_username,
    avatarUrl: payload.picture,
    locale: payload.locale,
    roles: normalizeRoles(payload.roles),
    permissions: payload.permissions,
  };
};

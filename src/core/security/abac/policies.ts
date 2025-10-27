import { hasRequiredPermissions } from "@/core/security/auth/session";
import type { Policy } from "./policy-engine";

export const defaultPolicies: Policy[] = [
  {
    id: "deny-when-auth-required-and-missing-session",
    description: "Block access to protected resources when no session is present",
    effect: "deny",
    condition: ({ session, resource }) =>
      Boolean(resource.attributes?.requiresAuth) && !session,
  },
  {
    id: "deny-when-missing-permissions",
    description: "Block access if the session lacks required permissions",
    effect: "deny",
    condition: ({ session, resource }) => {
      const permissions = resource.permissions ?? [];
      if (!permissions.length) {
        return false;
      }

      return !hasRequiredPermissions(session, permissions);
    },
  },
  {
    id: "allow-when-auth-not-required",
    description: "Allow public resources",
    effect: "allow",
    condition: ({ resource }) => resource.attributes?.requiresAuth === false,
  },
  {
    id: "allow-when-all-permissions-present",
    description: "Allow access when all required permissions are met",
    effect: "allow",
    condition: ({ session, resource }) => {
      const permissions = resource.permissions ?? [];
      if (!permissions.length) {
        return Boolean(resource.attributes?.requiresAuth);
      }

      return hasRequiredPermissions(session, permissions);
    },
  },
];

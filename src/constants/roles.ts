export const ROLES = {
  admin: "admin",
  manager: "manager",
  operator: "operator",
  auditor: "auditor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

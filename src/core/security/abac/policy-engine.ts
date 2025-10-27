import type { Session } from "@/core/security/auth/session";
import type { Permission } from "@/core/constants/access-control";

export type PolicyEffect = "allow" | "deny";

export type PolicyResource = {
  type: "route" | "feature" | "api";
  identifier: string;
  permissions?: Permission[];
  attributes?: Record<string, unknown>;
};

export type PolicyEnvironment = Record<string, unknown>;

export type PolicyContext = {
  session: Session | null;
  resource: PolicyResource;
  environment?: PolicyEnvironment;
};

export type PolicyResult = {
  policyId: string;
  effect: PolicyEffect;
  matched: boolean;
};

export type Policy = {
  id: string;
  description?: string;
  effect: PolicyEffect;
  condition: (context: PolicyContext) => boolean;
};

export type PolicyDecision = {
  allowed: boolean;
  decidingPolicy?: Policy;
  results: PolicyResult[];
};

export const evaluatePolicies = (
  policies: Policy[],
  context: PolicyContext,
): PolicyDecision => {
  const results: PolicyResult[] = [];

  for (const policy of policies) {
    const matched = safeEvaluate(policy, context);
    results.push({ policyId: policy.id, effect: policy.effect, matched });

    if (!matched) {
      continue;
    }

    if (policy.effect === "deny") {
      return {
        allowed: false,
        decidingPolicy: policy,
        results,
      };
    }

    if (policy.effect === "allow") {
      return {
        allowed: true,
        decidingPolicy: policy,
        results,
      };
    }
  }

  return {
    allowed: false,
    decidingPolicy: undefined,
    results,
  };
};

const safeEvaluate = (policy: Policy, context: PolicyContext) => {
  try {
    return policy.condition(context);
  } catch {
    return false;
  }
};

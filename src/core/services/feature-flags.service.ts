type FeatureFlag = "realtimeTelemetry" | "advancedAnalytics";

type FeatureFlagMap = Record<FeatureFlag, boolean>;

const defaultFlags: FeatureFlagMap = {
  realtimeTelemetry: true,
  advancedAnalytics: false,
};

export const featureFlags = {
  isEnabled: (flag: FeatureFlag) => defaultFlags[flag] ?? false,
  all: () => ({ ...defaultFlags }),
} as const;

export type { FeatureFlag };

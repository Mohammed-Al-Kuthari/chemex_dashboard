"use client";

import { useFeatureFlagContext } from "@/providers/AppFeatureFlagProvider";

export const useFeatureFlag = (name: string, defaultValue = false) => {
  const { isEnabled } = useFeatureFlagContext();
  return isEnabled(name, defaultValue);
};

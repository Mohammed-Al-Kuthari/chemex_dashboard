import { logger } from "@/core/lib/logging/logger";

import type { TelemetryClient } from "@/shared/services/analytics";

type WebVitalsModule = typeof import("web-vitals");

export type WebVitalMetric = {
  name: string
  value: number
  rating: string
  id: string
  delta: number
};

export type WebVitalCallback = (metric: WebVitalMetric) => void;

const loadWebVitals = async (): Promise<WebVitalsModule | null> => {
  try {
    return await import("web-vitals");
  } catch (error) {
    logger.error("Failed to load web-vitals", { error });
    return null;
  }
};

export const startWebVitalsMonitor = async (onMetric: WebVitalCallback) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const webVitals = await loadWebVitals();

  if (!webVitals) {
    return () => undefined;
  }

  webVitals.onCLS(onMetric);
  webVitals.onFID(onMetric);
  webVitals.onLCP(onMetric);
  webVitals.onINP(onMetric);
  webVitals.onTTFB(onMetric);
  webVitals.onFCP(onMetric);

  return () => undefined;
};

export const reportMetricToTelemetry = (
  client: TelemetryClient,
  metric: WebVitalMetric,
) => {
  void client.track({
    name: `web-vital:${metric.name}`,
    properties: {
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      id: metric.id,
    },
  });
};

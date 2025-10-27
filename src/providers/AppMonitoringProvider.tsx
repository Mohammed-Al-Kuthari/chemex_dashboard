"use client";

import { useEffect, type ReactNode } from "react";

import { useTelemetry } from "@/shared/hooks";
import { startWebVitalsMonitor } from "@/shared/services/performance/WebVitalsMonitor";
import { captureError } from "@/core/lib/logging/error-handler";
import { logger } from "@/core/lib/logging/logger";

type AppMonitoringProviderProps = {
  children: ReactNode;
};

export function AppMonitoringProvider({ children }: AppMonitoringProviderProps) {
  const { track } = useTelemetry();

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const cleanupWebVitalsPromise = startWebVitalsMonitor((metric) => {
      track({
        name: `web-vital:${metric.name}`,
        properties: {
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
          id: metric.id,
        },
      }).catch((error) => {
        logger.warn("Failed to track web-vital", { error, metric });
      });
    });

    void cleanupWebVitalsPromise.catch((error) => {
      logger.error("Failed to start web-vitals monitor", { error });
    });

    return () => {
      void cleanupWebVitalsPromise.then((cleanup) => cleanup());
    };
  }, [track]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const handleError = (event: ErrorEvent) => {
      captureError(event.error ?? event.message, "Unhandled window error", {
        scope: "window.error",
      });

      track({
        name: "client-error",
        properties: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      }).catch(() => undefined);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      captureError(event.reason, "Unhandled promise rejection", {
        scope: "window.unhandledrejection",
      });

      track({
        name: "client-unhandled-rejection",
        properties: {
          reason: serializeReason(event.reason),
        },
      }).catch(() => undefined);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, [track]);

  return <>{children}</>;
}

const serializeReason = (reason: unknown) => {
  if (reason instanceof Error) {
    return {
      message: reason.message,
      name: reason.name,
      stack: reason.stack,
    };
  }

  return reason;
};

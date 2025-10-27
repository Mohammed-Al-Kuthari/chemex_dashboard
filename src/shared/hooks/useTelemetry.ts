"use client";

import { useCallback } from "react";

import { useTelemetryClient } from "@/providers/AppTelemetryProvider";
import type { TelemetryEvent, IdentifyPayload } from "@/shared/services/analytics";

export const useTelemetry = () => {
  const client = useTelemetryClient();

  const identify = useCallback(
    (payload: IdentifyPayload) => client.identify(payload),
    [client],
  );

  const track = useCallback(
    (event: TelemetryEvent) => client.track(event),
    [client],
  );

  const flush = useCallback(() => client.flush(), [client]);

  return {
    identify,
    track,
    flush,
    setContext: client.setContext.bind(client),
  } as const;
};

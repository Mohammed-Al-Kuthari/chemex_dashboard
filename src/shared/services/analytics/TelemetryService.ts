type TelemetryContext = Record<string, unknown>;

type IdentifyPayload = {
  userId: string;
  traits?: Record<string, unknown>;
};

type TelemetryEvent = {
  name: string;
  properties?: Record<string, unknown>;
  context?: TelemetryContext;
  timestamp?: string;
};

type TelemetryOptions = {
  endpoint?: string | null;
  defaultContext?: TelemetryContext;
  disabled?: boolean;
};

export interface TelemetryClient {
  identify(payload: IdentifyPayload): Promise<void>;
  track(event: TelemetryEvent): Promise<void>;
  flush(): Promise<void>;
  setContext(context: TelemetryContext): void;
}

class ConsoleTelemetryClient implements TelemetryClient {
  private context: TelemetryContext;
  private readonly endpoint?: string | null;
  private readonly disabled: boolean;

  constructor(options: TelemetryOptions = {}) {
    this.context = options.defaultContext ?? {};
    this.endpoint = options.endpoint;
    this.disabled = options.disabled ?? false;
  }

  async identify(payload: IdentifyPayload) {
    if (this.disabled) {
      return;
    }

    this.emit("identify", payload);
  }

  async track(event: TelemetryEvent) {
    if (this.disabled) {
      return;
    }

    const payload = {
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString(),
      context: {
        ...this.context,
        ...event.context,
      },
    };

    this.emit("track", payload);

    if (this.endpoint) {
      await this.sendBeacon(payload).catch(() => undefined);
    }
  }

  async flush() {
    // No pending queue in the console implementation.
  }

  setContext(context: TelemetryContext) {
    this.context = context;
  }

  private emit(event: string, payload: unknown) {
    console.info(`[Telemetry:${event}]`, payload);
  }

  private async sendBeacon(payload: unknown) {
    if (typeof navigator?.sendBeacon === "function" && this.endpoint) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon(this.endpoint, blob);
      return;
    }

    if (this.endpoint) {
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => undefined);
    }
  }
}

export const createTelemetryClient = (options?: TelemetryOptions): TelemetryClient =>
  new ConsoleTelemetryClient(options);

export type { TelemetryEvent, TelemetryOptions, TelemetryContext, IdentifyPayload };

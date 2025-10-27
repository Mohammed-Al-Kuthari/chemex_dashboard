import {
  RealtimeService,
  type RealtimeAdapter,
  type RealtimeChannelOptions,
  type RealtimePayload,
} from "./RealtimeService";
import { logger } from "@/core/lib/logging/logger";

export type RealtimeConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error";

export type RealtimeStateListener = (
  state: RealtimeConnectionState,
  error?: unknown
) => void;

export type ManagedRealtimeOptions = {
  autoReconnect?: boolean;
  retryDelaysMs?: number[];
  maxRetries?: number;
};

const DEFAULT_RETRY_DELAYS = [500, 1000, 2000, 5000];

export class ManagedRealtimeService extends RealtimeService {
  private state: RealtimeConnectionState = "disconnected";
  private readonly listeners = new Set<RealtimeStateListener>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly autoReconnect: boolean;
  private readonly retryDelays: number[];
  private readonly maxRetries?: number;

  constructor(adapter: RealtimeAdapter, options: ManagedRealtimeOptions = {}) {
    super(adapter);
    this.autoReconnect = options.autoReconnect ?? true;
    this.retryDelays = options.retryDelaysMs ?? DEFAULT_RETRY_DELAYS;
    this.maxRetries = options.maxRetries;
  }

  override async connect(): Promise<void> {
    if (this.state === "connected" || this.state === "connecting") {
      return;
    }

    this.setState(this.reconnectAttempts > 0 ? "reconnecting" : "connecting");

    try {
      await super.connect();
      this.reconnectAttempts = 0;
      this.clearTimer();
      this.setState("connected");
    } catch (error) {
      this.setState("error", error);
      if (this.autoReconnect) {
        this.scheduleReconnect();
      }
      throw error;
    }
  }

  override async disconnect(): Promise<void> {
    this.clearTimer();
    this.reconnectAttempts = 0;
    await super.disconnect();
    this.setState("disconnected");
  }

  override subscribe<TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    handler: (payload: TPayload) => void | Promise<void>
  ) {
    if (this.state === "disconnected") {
      void this.connect().catch((error) => {
        logger.error("Failed to reconnect in ManagedRealtimeService", {
          error,
          attempt: this.reconnectAttempts,
        });
      });
    }

    return super.subscribe(channel, handler);
  }

  onStateChange(listener: RealtimeStateListener) {
    this.listeners.add(listener);
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  getState() {
    return this.state;
  }

  private scheduleReconnect() {
    if (!this.autoReconnect) {
      return;
    }

    if (
      this.maxRetries !== undefined &&
      this.reconnectAttempts >= this.maxRetries
    ) {
      return;
    }

    const delay =
      this.retryDelays[
        Math.min(this.reconnectAttempts, this.retryDelays.length - 1)
      ];
    this.clearTimer();
    this.reconnectAttempts += 1;
    this.reconnectTimer = setTimeout(() => {
      void this.connect().catch(() => undefined);
    }, delay);
  }

  private clearTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private setState(state: RealtimeConnectionState, error?: unknown) {
    this.state = state;

    const context = {
      state,
      reconnectAttempts: this.reconnectAttempts,
      error,
    };

    switch (state) {
      case "error":
        logger.error("Realtime connection error", context);
        break;
      case "reconnecting":
        logger.warn("Realtime reconnect attempt", context);
        break;
      case "connected":
        if (this.reconnectAttempts > 0) {
          logger.info("Realtime connection restored", context);
        }
        break;
      default:
        logger.debug("Realtime state change", context);
        break;
    }

    this.listeners.forEach((listener) => listener(state, error));
  }
}

export const createManagedRealtimeService = (
  adapter: RealtimeAdapter,
  options?: ManagedRealtimeOptions
) => new ManagedRealtimeService(adapter, options);

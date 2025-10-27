import type { RealtimeAdapter, RealtimeChannelOptions, RealtimeEventHandler, RealtimePayload, RealtimeSubscription } from "../RealtimeService";

export class FallbackRealtimeAdapter implements RealtimeAdapter {
  private activeAdapter: RealtimeAdapter | null = null;

  constructor(private readonly adapters: ReadonlyArray<RealtimeAdapter>) {
    if (adapters.length === 0) {
      throw new Error("FallbackRealtimeAdapter requires at least one adapter");
    }
  }

  async connect(): Promise<void> {
    let lastError: unknown;

    for (const adapter of this.adapters) {
      try {
        await adapter.connect();
        this.activeAdapter = adapter;
        return;
      } catch (error) {
        lastError = error;
      }
    }

    this.activeAdapter = null;
    throw lastError ?? new Error("No realtime adapter available");
  }

  async disconnect(): Promise<void> {
    if (!this.activeAdapter) {
      return;
    }

    await this.activeAdapter.disconnect();
    this.activeAdapter = null;
  }

  subscribe<TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    handler: RealtimeEventHandler<TPayload>,
  ): RealtimeSubscription {
    const adapter = this.ensureActive();
    return adapter.subscribe(channel, handler);
  }

  async publish<TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    payload: TPayload,
  ): Promise<void> {
    const adapter = this.ensureActive();
    await adapter.publish(channel, payload);
  }

  private ensureActive() {
    if (!this.activeAdapter) {
      throw new Error("Realtime adapter is not connected");
    }

    return this.activeAdapter;
  }
}

export const createFallbackRealtimeAdapter = (
  primary: RealtimeAdapter,
  ...fallbacks: RealtimeAdapter[]
) => new FallbackRealtimeAdapter([primary, ...fallbacks]);

export type RealtimePayload = Record<string, unknown> | string | number | boolean | null | undefined;

export type RealtimeEventHandler<TPayload = RealtimePayload> = (payload: TPayload) => void | Promise<void>;

export type RealtimeSubscription = {
  unsubscribe: () => void;
};

export type RealtimeChannelOptions = {
  name: string;
  params?: Record<string, string | number>;
};

export interface RealtimeAdapter {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  subscribe: <TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    handler: RealtimeEventHandler<TPayload>,
  ) => RealtimeSubscription;
  publish: <TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    payload: TPayload,
  ) => Promise<void>;
}

export class RealtimeService {
  constructor(private readonly adapter: RealtimeAdapter) {}

  connect() {
    return this.adapter.connect();
  }

  disconnect() {
    return this.adapter.disconnect();
  }

  subscribe<TPayload = RealtimePayload>(
    channel: RealtimeChannelOptions,
    handler: RealtimeEventHandler<TPayload>,
  ) {
    return this.adapter.subscribe(channel, handler);
  }

  publish<TPayload = RealtimePayload>(channel: RealtimeChannelOptions, payload: TPayload) {
    return this.adapter.publish(channel, payload);
  }
}

export const createRealtimeService = (adapter: RealtimeAdapter) => new RealtimeService(adapter);

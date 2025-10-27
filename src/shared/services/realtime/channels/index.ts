export type RealtimeChannelName =
  | "telemetry"
  | "notifications"
  | "orders"
  | "chats";

export type RealtimeChannelRegistry = Record<RealtimeChannelName, string>;

export const REALTIME_CHANNELS: RealtimeChannelRegistry = {
  telemetry: "telemetry",
  notifications: "notifications",
  orders: "orders",
  chats: "chats",
};

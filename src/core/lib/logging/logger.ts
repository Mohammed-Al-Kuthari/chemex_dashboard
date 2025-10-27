import { appConfig } from "../../configs/app-config";

export type LogLevel = "info" | "warn" | "error" | "debug";

export type LogContext = Record<string, unknown>;

const isEnabled = appConfig.isDebugLoggingEnabled;

const formatContext = (context?: LogContext) =>
  context && Object.keys(context).length > 0 ? context : undefined;

const emit = (level: LogLevel, message: string, context?: LogContext) => {
  if (!isEnabled && level !== "error") {
    return;
  }

  const payload = formatContext(context);

  switch (level) {
    case "info":
      console.info(`[INFO] ${message}`, payload ?? "");
      break;
    case "warn":
      console.warn(`[WARN] ${message}`, payload ?? "");
      break;
    case "error":
      console.error(`[ERROR] ${message}`, payload ?? "");
      break;
    case "debug":
      if (isEnabled) {
        console.debug(`[DEBUG] ${message}`, payload ?? "");
      }
      break;
  }
};

export type HttpLogPayload = {
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  requestBody?: unknown;
  responseBody?: unknown;
  error?: unknown;
};

export const logger = {
  info: (message: string, context?: LogContext) => emit("info", message, context),
  warn: (message: string, context?: LogContext) => emit("warn", message, context),
  error: (message: string, context?: LogContext) => emit("error", message, context),
  debug: (message: string, context?: LogContext) => emit("debug", message, context),
  http: (payload: HttpLogPayload) => {
    const { method, url, status, durationMs, requestBody, responseBody, error } = payload;
    const context: LogContext = {
      method,
      url,
      status,
      durationMs,
      requestBody,
      responseBody,
      error,
    };

    if (error) {
      emit("error", `HTTP ${method} ${url} failed`, context);
    } else {
      emit("info", `HTTP ${method} ${url}`, context);
    }
  },
} as const;

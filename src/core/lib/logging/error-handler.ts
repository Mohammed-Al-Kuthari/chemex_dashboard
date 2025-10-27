import { logger, type LogContext } from "./logger";

export type ErrorMetadata = LogContext & {
  scope?: string;
  rethrow?: boolean;
};

export const captureError = (error: unknown, message: string, metadata: ErrorMetadata = {}) => {
  const context: LogContext = {
    ...metadata,
    error,
  };

  logger.error(message, context);

  if (metadata.rethrow) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};

export const withErrorLogging = async <T>(
  operation: () => Promise<T>,
  message: string,
  metadata: ErrorMetadata = {},
) => {
  try {
    return await operation();
  } catch (error) {
    captureError(error, message, metadata);
    return undefined;
  }
};

export const assertWithLogging = (condition: unknown, message: string, metadata: ErrorMetadata = {}) => {
  if (condition) {
    return;
  }

  captureError(new Error(message), message, metadata);
};

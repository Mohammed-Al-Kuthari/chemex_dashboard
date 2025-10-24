import { API_CONFIG } from "../../config";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown;
  accessToken?: string;
  locale?: string;
  cache?: RequestCache;
  signal?: AbortSignal;
}

export interface ApiResponseErrorPayload {
  error: string;
  error_description?: string;
  statusCode?: number;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly payload?: ApiResponseErrorPayload
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export class ApiClient {
  constructor(private readonly baseUrl: string = API_CONFIG.baseUrl) {}

  async get<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST" });
  }

  async delete<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const headers = new Headers({
      ...API_CONFIG.defaultHeaders,
      ...options.headers,
    });

    if (options.accessToken) {
      headers.set("Authorization", `Bearer ${options.accessToken}`);
    }

    if (options.locale) {
      headers.set("X-Locale", options.locale);
    }

    const init: RequestInit = {
      method: options.method ?? "GET",
      headers,
      cache: options.cache,
      signal: options.signal,
    };

    if (options.body !== undefined) {
      if (options.body instanceof FormData || options.body instanceof Blob) {
        headers.delete("Content-Type");
        init.body = options.body;
      } else if (options.body instanceof URLSearchParams) {
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        init.body = options.body;
      } else if (typeof options.body === "string") {
        headers.set("Content-Type", "text/plain;charset=UTF-8");
        init.body = options.body;
      } else {
        headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
        init.body = JSON.stringify(options.body);
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

    try {
      const response = await fetch(url, {
        ...init,
        signal: options.signal ?? controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        let payload: ApiResponseErrorPayload | undefined;

        try {
          payload = (await response.json()) as ApiResponseErrorPayload;
        } catch {
          payload = undefined;
        }

        throw new ApiClientError(
          payload?.error_description ?? `Request failed with status ${response.status}`,
          response.status,
          payload
        );
      }

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiClientError("Request timed out", 408);
      }

      throw new ApiClientError(
        error instanceof Error ? error.message : "Unknown error",
        500
      );
    }
  }
}

export const apiClient = new ApiClient();

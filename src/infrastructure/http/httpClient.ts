import axios from "axios";

import { appConfig } from "@/core/configs/app-config";
import { TIMEOUTS } from "@/core/constants/timeouts";
import { logger } from "@/core/lib/logging/logger";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
  }
}

export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: TIMEOUTS.HTTP_REQUEST,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  config.metadata = {
    startTime: performance.now(),
  };

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    const durationMs = response.config.metadata
      ? performance.now() - response.config.metadata.startTime
      : undefined;

    logger.http({
      method: response.config.method?.toUpperCase() ?? "GET",
      url: response.config.url ?? "",
      status: response.status,
      durationMs,
      requestBody: response.config.data,
      responseBody: response.data,
    });

    return response;
  },
  (error) => {
    const { config } = error;
    const durationMs = config?.metadata
      ? performance.now() - config.metadata.startTime
      : undefined;

    logger.http({
      method: config?.method?.toUpperCase() ?? "GET",
      url: config?.url ?? "",
      status: error.response?.status,
      durationMs,
      requestBody: config?.data,
      responseBody: error.response?.data,
      error: error.message,
    });

    return Promise.reject(error);
  },
);

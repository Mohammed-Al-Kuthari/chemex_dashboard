import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import { httpClient } from "@/infrastructure/http/httpClient";
import { CACHE_TAG_TYPES } from "./cache";
import type { ApiResponse } from "@/core/contracts/models/ApiResponse";

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

type AxiosBaseQueryError = {
  status?: number;
  data: unknown;
  message: string;
};

const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> = async (
  { url, method = "GET", data, params, headers },
) => {
  try {
    const result = await httpClient.request<ApiResponse<unknown>>({
      url,
      method,
      data,
      params,
      headers,
    });

    return { data: result.data };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message,
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
  refetchOnReconnect: true,
  tagTypes: CACHE_TAG_TYPES,
});

export type BaseApi = typeof baseApi;

export type ApiSuccessResponse<TData> = {
  success: true;
  message: string;
  data: TData;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  data?: unknown;
};

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export const isApiSuccess = <TData>(response: ApiResponse<TData>): response is ApiSuccessResponse<TData> =>
  response.success;

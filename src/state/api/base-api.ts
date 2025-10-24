import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { clearAuthState } from '../../features/auth';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('x-client', 'chemex-dashboard');
    return headers;
  },
});

const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (!refreshResult.error) {
      return rawBaseQuery(args, api, extraOptions);
    }

    api.dispatch(clearAuthState());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile', 'Dashboard', 'Notifications'],
  endpoints: () => ({}),
});

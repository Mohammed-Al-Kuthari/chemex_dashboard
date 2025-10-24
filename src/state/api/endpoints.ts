import type { AuthUser } from '../../features/auth';
import { apiSlice } from './base-api';

export interface DashboardMetricSummary {
  totalOrders: number;
  activeAlerts: number;
  uptimePercentage: number;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchSessionProfile: build.query<AuthUser, void>({
      query: () => ({ url: 'auth/session' }),
      providesTags: ['Profile'],
    }),
    fetchDashboardMetrics: build.query<DashboardMetricSummary, void>({
      query: () => ({ url: 'dashboard/metrics' }),
      providesTags: ['Dashboard'],
    }),
    listNotifications: build.query<NotificationItem[], void>({
      query: () => ({ url: 'notifications' }),
      providesTags: ['Notifications'],
    }),
  }),
});

export const { endpoints: apiEndpoints } = extendedApi;

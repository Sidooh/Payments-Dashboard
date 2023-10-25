import { ApiResponse, RawAnalytics } from '@nabcellent/sui-react';
import { coreApi } from '@/services/coreApi.ts';

type DashboardSummariesResponse = {
    total_payments: number;
    total_payments_today: number;
    total_revenue: number;
    total_revenue_today: number;
};

type ProvidersBalancesResponse = {
    org_balance: number;
    b2b_balance: number;
};

export const dashboardApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummaries: builder.query<DashboardSummariesResponse, void>({
            query: () => '/dashboard/',
            transformResponse: (response: ApiResponse<DashboardSummariesResponse>) => response.data,
        }),
        getDashboardChartData: builder.query<RawAnalytics[], void>({
            query: () => '/dashboard/chart',
            transformResponse: (response: ApiResponse<RawAnalytics[]>) => response.data,
        }),
        getProvidersBalances: builder.query<ProvidersBalancesResponse, void>({
            query: () => '/dashboard/providers/balances',
            transformResponse: (response: ApiResponse<ProvidersBalancesResponse>) => response.data,
        }),
    }),
});

export const { useGetDashboardSummariesQuery, useGetDashboardChartDataQuery, useGetProvidersBalancesQuery } =
    dashboardApi;

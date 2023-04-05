import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, RawAnalytics } from '@nabcellent/sui-react';

type DashboardSummariesResponse = {
    total_payments: number
    total_payments_today: number
    total_revenue: number
    total_revenue_today: number
}

type ProvidersBalancesResponse = {
    org_balance: number
    b2b_balance: number
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Dashboard'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}/dashboard`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDashboardSummaries: builder.query<DashboardSummariesResponse, void>({
            query: () => '/',
            transformResponse: (response: ApiResponse<DashboardSummariesResponse>) => response.data
        }),
        getDashboardChartData: builder.query<RawAnalytics[], void>({
            query: () => '/chart',
            transformResponse: (response: ApiResponse<RawAnalytics[]>) => response.data
        }),
        getProvidersBalances: builder.query<ProvidersBalancesResponse, void>({
            query: () => '/providers/balances',
            transformResponse: (response: ApiResponse<ProvidersBalancesResponse>) => response.data
        }),
    })
});

export const {
    useGetDashboardSummariesQuery,
    useGetDashboardChartDataQuery,
    useGetProvidersBalancesQuery
} = dashboardApi;
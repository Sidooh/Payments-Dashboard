import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { Payment } from 'utils/types';
import { ApiResponse, Status } from '@nabcellent/sui-react';

type ChartData = {
    labels: string[],
    datasets: number[]
}

interface RevenueDayData {
    [key: string]: ChartData;
}

type RevenueData = {
    today: RevenueDayData
    yesterday: RevenueDayData
}

type DashboardData = {
    total_payments: number
    total_payments_today: number
    total_revenue: number
    total_revenue_today: number
    recent_payments: Payment[];
}

export const paymentsAPI = createApi({
    reducerPath: 'paymentsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDashboardSummaries: builder.query<DashboardData, void>({
            query: () => '/dashboard',
            transformResponse: (response: ApiResponse<DashboardData>) => response.data
        }),
        getDashboardRevenueData: builder.query<RevenueData, void>({
            query: () => '/dashboard/revenue-chart',
            transformResponse: (response: ApiResponse<RevenueData>) => response.data
        }),
        payments: builder.query<Payment[], Status | void>({
            query: (status?: Status) => {
                let url = '/payments';

                if (status) url += `?status=${status}`;

                return url;
            },
            transformResponse: (response: ApiResponse<Payment[]>) => response.data,
            providesTags: ['Payment']
        }),
        payment: builder.query<Payment, number>({
            query: id => `/payments/${id}`,
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            providesTags: ['Payment']
        }),
        checkPayment: builder.mutation<Payment, number>({
            query: id => ({
                url: `/payments/${id}/check-payment`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
        retryPurchase: builder.mutation<Payment, number>({
            query: id => ({
                url: `/payments/${id}/retry-purchase`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
        reversePayment: builder.mutation<Payment, number>({
            query: id => ({
                url: `/payments/${id}/reverse`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
        querySTKStatus: builder.mutation<Payment, void>({
            query: () => `/payments/mpesa/status/query`,
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
        completePayment: builder.mutation<Payment, number>({
            query: id => ({
                url: `/payments/${id}/complete`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
        failPayment: builder.mutation<Payment, number>({
            query: id => ({
                url: `/payments/${id}/fail`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment']
        }),
    })
});

export const {
    useGetDashboardSummariesQuery,
    useGetDashboardRevenueDataQuery,
    usePaymentsQuery,
    usePaymentQuery,
    useCheckPaymentMutation,
    useRetryPurchaseMutation,
    useReversePaymentMutation,
    useQuerySTKStatusMutation,
    useCompletePaymentMutation,
    useFailPaymentMutation,
} = paymentsAPI;
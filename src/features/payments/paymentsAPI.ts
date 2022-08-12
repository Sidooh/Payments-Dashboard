import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, Payment } from 'utils/types';

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
        getDashboard: builder.query<DashboardData, void>({
            query: () => '/dashboard',
            transformResponse: (response: ApiResponse<DashboardData>) => response.data
        }),
        payments: builder.query<Payment[], void>({
            query: () => '/payments',
            transformResponse: (response: ApiResponse<Payment[]>) => response.data,
            providesTags: ['Payment']
        }),
        payment: builder.query<Payment, number>({
            query: id => `/payments/${id}`,
            transformResponse: (response: ApiResponse<Payment>) => response.data
        })
    })
});

export const {
    useGetDashboardQuery,
    usePaymentsQuery,
    usePaymentQuery
} = paymentsAPI;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, Payment } from '../../utils/types';

export const paymentsAPI = createApi({
    reducerPath: 'paymentsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDashboard: builder.query<any, void>({
            query: () => '/dashboard',
        }),
        payments: builder.query<ApiResponse<Payment[]>, void>({
            query: () => '/payments'
        }),
        payment: builder.query<ApiResponse<Payment>, number>({
            query: id => `/payments/${id}`
        })
    })
});

export const {
    useGetDashboardQuery,
    usePaymentsQuery,
    usePaymentQuery
} = paymentsAPI;
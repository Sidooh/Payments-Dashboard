import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, Status } from '@nabcellent/sui-react';

export type PaymentsSLOsResponse = {
    year: number,
    count: number,
    status: Status
}

export type VendorsSLOsResponse = {
    tende: number,
    vouchers: number,
}

type ChartData = {
    count: number
    amount: number
    date: string
    destination: string
    status: Status
}

export const analyticsApi = createApi({
    reducerPath: 'analyticsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}/analytics`,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPaymentsSLOs: builder.query<PaymentsSLOsResponse[], void>({
            query: () => '/slos/payments',
            transformResponse: (res: ApiResponse<PaymentsSLOsResponse[]>) => res.data
        }),
        getVendorsSLOs: builder.query<VendorsSLOsResponse, void>({
            query: () => '/slos/vendors',
            transformResponse: (res: ApiResponse<VendorsSLOsResponse>) => res.data
        }),
        getPayments: builder.query<ChartData[], void>({
            query: () => '/payments',
            transformResponse: (res: ApiResponse<ChartData[]>) => res.data
        }),
    })
});

export const {
    useGetPaymentsSLOsQuery,
    useGetVendorsSLOsQuery,
    useGetPaymentsQuery,
} = analyticsApi;
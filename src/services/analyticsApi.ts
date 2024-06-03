import { coreApi } from '@/services/coreApi';
import { Status } from '@/lib/enums.ts';
import { ApiResponse } from '@/lib/types';

export type PaymentsSLOsResponse = {
    year: number;
    count: number;
    status: Status;
};

export type VendorsSLOsResponse = {
    tende: number;
    vouchers: number;
};

type ChartData = {
    count: number;
    amount: number;
    date: string;
    destination: string;
    status: Status;
};

export const analyticsApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentsSLOs: builder.query<PaymentsSLOsResponse[], void>({
            query: () => '/analytics/slo/payments',
            transformResponse: (res: ApiResponse<PaymentsSLOsResponse[]>) => res.data,
        }),
        getVendorsSLOs: builder.query<VendorsSLOsResponse, void>({
            query: () => '/analytics/slo/vendors',
            transformResponse: (res: ApiResponse<VendorsSLOsResponse>) => res.data,
        }),
        getPayments: builder.query<ChartData[], void>({
            query: () => '/analytics/payments',
            transformResponse: (res: ApiResponse<ChartData[]>) => res.data,
        }),
    }),
});

export const { useGetPaymentsSLOsQuery, useGetVendorsSLOsQuery, useGetPaymentsQuery } = analyticsApi;

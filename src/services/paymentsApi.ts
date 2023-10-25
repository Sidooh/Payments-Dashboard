import { Payment } from '@/utils/types';
import { ApiResponse, Status } from '@nabcellent/sui-react';
import { coreApi } from '@/services/coreApi.ts';

export const paymentsApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        payments: builder.query<Payment[], Status | void>({
            query: (status?: Status) => {
                let url = '/payments?with=account';

                if (status) url += `&status=${status}`;

                return url;
            },
            transformResponse: (response: ApiResponse<Payment[]>) => response.data,
            providesTags: ['Payment'],
        }),
        payment: builder.query<Payment, number>({
            query: (id) => `/payments/${id}`,
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            providesTags: ['Payment'],
        }),
        checkPayment: builder.mutation<Payment, number>({
            query: (id) => ({
                url: `/payments/${id}/check-payment`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),
        retryPurchase: builder.mutation<Payment, number>({
            query: (id) => ({
                url: `/payments/${id}/retry-purchase`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),
        reversePayment: builder.mutation<Payment, number>({
            query: (id) => ({
                url: `/payments/${id}/reverse`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),
        querySTKStatus: builder.mutation<Payment, void>({
            query: () => `/payments/mpesa/status/query`,
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),
        completePayment: builder.mutation<Payment, number>({
            query: (id) => ({
                url: `/payments/${id}/complete`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),
        failPayment: builder.mutation<Payment, number>({
            query: (id) => ({
                url: `/payments/${id}/fail`,
                method: 'POST',
            }),
            transformResponse: (response: ApiResponse<Payment>) => response.data,
            invalidatesTags: ['Payment'],
        }),

        mpesaPayments: builder.query<Payment[], { type: string; sub_type: string }>({
            query: ({ type, sub_type }) => `/payments/providers/${type}/${sub_type}`,
            transformResponse: (response: ApiResponse<Payment[]>) => response.data,
        }),
    }),
});

export const {
    usePaymentsQuery,
    usePaymentQuery,
    useCheckPaymentMutation,
    useRetryPurchaseMutation,
    useReversePaymentMutation,
    useQuerySTKStatusMutation,
    useCompletePaymentMutation,
    useFailPaymentMutation,
    useMpesaPaymentsQuery,
} = paymentsApi;

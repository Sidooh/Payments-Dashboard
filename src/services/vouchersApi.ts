import { Voucher, VoucherTransaction } from '@/utils/types';
import { ApiResponse } from '@nabcellent/sui-react';
import { coreApi } from '@/services/coreApi.ts';

export const vouchersApi = coreApi.injectEndpoints({
    endpoints: (builder) => ({
        vouchers: builder.query<Voucher[], void>({
            query: () => '/vouchers?with=account',
            transformResponse: (response: ApiResponse<Voucher[]>) => response.data,
            providesTags: ['Voucher'],
        }),
        voucher: builder.query<Voucher, number>({
            query: (id) => `/vouchers/${id}?with=account,transactions`,
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            providesTags: ['Voucher'],
        }),
        voucherTransactions: builder.query<VoucherTransaction[], void>({
            query: () => `/voucher-transactions?with=payment`,
            transformResponse: (response: ApiResponse<VoucherTransaction[]>) => response.data,
        }),
        creditVoucher: builder.mutation<Voucher, { id: number; amount: number }>({
            query: ({ id, ...patch }) => ({
                url: `/vouchers/${id}/credit`,
                method: 'PUT',
                body: patch,
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher'],
        }),
        debitVoucher: builder.mutation<Voucher, { id: number; amount: number }>({
            query: ({ id, ...patch }) => ({
                url: `/vouchers/${id}/debit`,
                method: 'PUT',
                body: patch,
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher'],
        }),
        activateVoucher: builder.mutation<Voucher, number>({
            query: (id) => ({
                url: `/vouchers/${id}/activate`,
                method: 'PUT',
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher'],
        }),
        deactivateVoucher: builder.mutation<Voucher, number>({
            query: (id) => ({
                url: `/vouchers/${id}/deactivate`,
                method: 'PUT',
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher'],
        }),
    }),
});

export const {
    useVouchersQuery,
    useVoucherQuery,
    useVoucherTransactionsQuery,
    useCreditVoucherMutation,
    useDebitVoucherMutation,
    useActivateVoucherMutation,
    useDeactivateVoucherMutation,
} = vouchersApi;

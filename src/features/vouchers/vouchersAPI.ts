import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { Voucher, VoucherTransaction } from 'utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const vouchersAPI = createApi({
    reducerPath: 'vouchersApi',
    tagTypes: ['Voucher'],
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
        vouchers: builder.query<Voucher[], void>({
            query: () => '/vouchers?with=account',
            transformResponse: (response: ApiResponse<Voucher[]>) => response.data,
            providesTags: ['Voucher']
        }),
        voucher: builder.query<Voucher, number>({
            query: id => `/vouchers/${id}?with=account,transactions`,
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            providesTags: ['Voucher']
        }),
        voucherTransactions: builder.query<VoucherTransaction[], void>({
            query: () => `/voucher-transactions?with=payment`,
            transformResponse: (response: ApiResponse<VoucherTransaction[]>) => response.data
        }),
        activateVoucher: builder.mutation<Voucher, number>({
            query: id => ({
                url: `/vouchers/${id}/activate`,
                method: 'PUT',
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher']
        }),
        deactivateVoucher: builder.mutation<Voucher, number>({
            query: id => ({
                url: `/vouchers/${id}/deactivate`,
                method: 'PUT',
            }),
            transformResponse: (response: ApiResponse<Voucher>) => response.data,
            invalidatesTags: ['Voucher']
        }),
    })
});

export const {
    useVouchersQuery,
    useVoucherQuery,
    useVoucherTransactionsQuery,
    useActivateVoucherMutation,
    useDeactivateVoucherMutation,
} = vouchersAPI;
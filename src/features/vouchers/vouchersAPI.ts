import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, Voucher, VoucherTransaction } from '../../utils/types';

export const vouchersAPI = createApi({
    reducerPath: 'vouchersApi',
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
        vouchers: builder.query<ApiResponse<Voucher[]>, void>({
            query: () => '/vouchers?with=account'
        }),
        voucher: builder.query<ApiResponse<Voucher>, number>({
            query: id => `/vouchers/${id}`
        }),
        voucherTransactions: builder.query<ApiResponse<VoucherTransaction[]>, void>({
            query: () => `/vouchers/transactions?with=payment`
        })
    })
});

export const {
    useVouchersQuery,
    useVoucherQuery,
    useVoucherTransactionsQuery
} = vouchersAPI;
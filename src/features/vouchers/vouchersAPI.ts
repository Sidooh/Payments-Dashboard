import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { Voucher, VoucherTransaction } from 'utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const vouchersAPI = createApi({
    reducerPath: 'vouchersApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        vouchers: builder.query<Voucher[], void>({
            query: () => '/vouchers?with=account',
            transformResponse: (response: ApiResponse<Voucher[]>) => response.data
        }),
        voucher: builder.query<Voucher, number>({
            query: id => `/vouchers/${id}?with=account,transactions`,
            transformResponse: (response: ApiResponse<Voucher>) => response.data
        }),
        voucherTransactions: builder.query<VoucherTransaction[], void>({
            query: () => `/vouchers/transactions`,
            transformResponse: (response: ApiResponse<VoucherTransaction[]>) => response.data
        })
    })
});

export const {
    useVouchersQuery,
    useVoucherQuery,
    useVoucherTransactionsQuery
} = vouchersAPI;
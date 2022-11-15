import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { FloatAccount, Voucher, VoucherTransaction } from 'utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const floatAccountsApi = createApi({
    reducerPath: 'floatAccountsApi',
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
        floatAccounts: builder.query<FloatAccount[], void>({
            query: () => '/float-accounts?with=account',
            transformResponse: (response: ApiResponse<FloatAccount[]>) => response.data
        }),
        floatAccount: builder.query<FloatAccount, number>({
            query: id => `/float-accounts/${id}?with=account,transactions`,
            transformResponse: (response: ApiResponse<FloatAccount>) => response.data
        }),
        floatAccountsTransactions: builder.query<VoucherTransaction[], void>({
            query: () => `/float-accounts/transactions`,
            transformResponse: (response: ApiResponse<VoucherTransaction[]>) => response.data
        })
    })
});

export const {
    useFloatAccountsQuery,
    useFloatAccountQuery,
    useFloatAccountsTransactionsQuery
} = floatAccountsApi;
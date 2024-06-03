import { FloatAccount, FloatAccountTransaction, Payment } from '@/lib/types/models';
import { coreApi } from '@/services/coreApi.ts';
import { ApiResponse, CreditFloatAccountRequest } from '@/lib/types';

export const floatAccountsApi = coreApi.injectEndpoints({
    endpoints: (build) => ({
        floatAccounts: build.query<FloatAccount[], void>({
            query: () => '/float-accounts?with=account',
            transformResponse: (response: ApiResponse<FloatAccount[]>) => response.data,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'FloatAccount' as const, id })), 'FloatAccount']
                    : ['FloatAccount'],
        }),
        floatAccount: build.query<FloatAccount, number>({
            query: (id) => `/float-accounts/${id}?with=account,transactions`,
            transformResponse: (response: ApiResponse<FloatAccount>) => response.data,
            providesTags: ['FloatAccount'],
        }),
        floatAccountsTransactions: build.query<FloatAccountTransaction[], void>({
            query: () => `/float-account-transactions`,
            transformResponse: (response: ApiResponse<FloatAccountTransaction[]>) => response.data,
        }),
        topUpFloatAccount: build.mutation<Payment, CreditFloatAccountRequest>({
            query: (body) => ({
                url: '/float-accounts/credit',
                method: 'POST',
                body,
            }),
            transformResponse: (res: ApiResponse<Payment>) => res.data,
            invalidatesTags: (_, error) => (error ? [] : ['FloatAccount']),
        }),
    }),
});

export const {
    useFloatAccountsQuery,
    useTopUpFloatAccountMutation,
    useFloatAccountQuery,
    useFloatAccountsTransactionsQuery,
} = floatAccountsApi;

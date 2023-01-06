import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { Payment } from 'utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const mpesaAPI = createApi({
    reducerPath: 'mpesaApi',
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
        mpesaPayments: builder.query<Payment[], { type: string, sub_type: string }>({
            query: ({ type, sub_type }) => `/payments/${type}/${sub_type}`,
            transformResponse: (response: ApiResponse<Payment[]>) => response.data
        }),
    })
});

export const {
    useMpesaPaymentsQuery,
} = mpesaAPI;
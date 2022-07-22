import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { Payment, ApiResponse } from 'utils/types';

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
        mpesaPayments: builder.query<ApiResponse<Payment[]>, string>({
            query: (subType) => `/mpesa/${subType}/payments`
        }),
    })
});

export const {
    useMpesaPaymentsQuery,
} = mpesaAPI;
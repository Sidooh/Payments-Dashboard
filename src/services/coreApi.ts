import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from '@/config';
import { RootState } from '@/app/store';

export const coreApi = createApi({
    reducerPath: 'coreApi',
    keepUnusedDataFor: 60 * 7, // Seven minutes
    tagTypes: ['Dashboard', 'Payment', 'Voucher', 'FloatAccount'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}`,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (!CONFIG.sidooh.services.payments.api.url) throw new Error('Payments Api URL Env is not set!');

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    endpoints: () => ({}),
});

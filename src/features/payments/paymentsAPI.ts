import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from 'config';
import {RootState} from 'app/store';
import {ApiResponse, Payment} from 'utils/types';
import {Status} from "../../utils/enums";

type ChartData = {
    labels: string[],
    datasets: number[]
}

interface RevenueDayData {
    [key: string]: ChartData
}

type RevenueData = {
    today: RevenueDayData
    yesterday: RevenueDayData
}

export const paymentsAPI = createApi({
    reducerPath: 'paymentsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.payments.api.url}`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDashboardSummaries: builder.query<any, void>({
            query: () => '/dashboard',
        }),
        getDashboardRevenueData: builder.query<RevenueData, void>({
            query: () => '/dashboard/revenue-chart',
        }),
        payments: builder.query<ApiResponse<Payment[]>, Status | void>({
            query: (status?: Status) => {
                let url = '/payments';

                if (status) url += `?status=${status}`;

                return url;
            },
            providesTags: ['Payment']
        }),
        payment: builder.query<ApiResponse<Payment>, number>({
            query: id => `/payments/${id}`,
            providesTags: ['Payment']
        })
    })
});

export const {
    useGetDashboardSummariesQuery,
    useGetDashboardRevenueDataQuery,
    usePaymentsQuery,
    usePaymentQuery
} = paymentsAPI;
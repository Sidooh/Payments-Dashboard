import { PaymentSubType } from '@/lib/enums';
import { Status } from '@/lib/enums.ts';
import { ComponentType } from 'react';
import { To } from 'react-router-dom';
import { IconType } from 'react-icons';

export type RouteChildType = {
    name: string;
    active?: boolean;
    icon: IconType;
    to?: To;
    disabled?: boolean;
    children?: Omit<RouteChildType, 'children' | 'icon'>[];
};

export type RouteType = {
    label: string;
    children: RouteChildType[];
};

export interface ApiResponse<T> {
    status: string;
    data: T;
}

export type AnalyticsChartData = {
    status: Status;
    date: number;
    amount: number;
    count: number;
};

export type CreditFloatAccountRequest = {
    account_id: number;
    amount: number | string;
    description: string;
    float_account: number;
    source: PaymentSubType;
    source_account: number;
};

export type LoginResponse = { access_token: string };
export type LoginRequest = {
    email: string;
    password: string;
};

export type RawAnalytics = {
    date: string | number;
    [key: string]: string | number;
};

export type FacetedFilterType = {
    column_id: string;
    title: string;
    options: {
        label: string;
        value: string;
        icon?: ComponentType<{ className?: string }>;
    }[];
};

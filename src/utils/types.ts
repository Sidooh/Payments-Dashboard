import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Status } from './enums';

export interface ApiResponse<T> {
    status?: string;
    data?: T;
}

export type ToastDataType = {
    type: 'success' | 'info' | 'warning' | 'danger';
    msg: string;
    duration?: number | undefined;
    close?: boolean | undefined;
    gravity?: 'top' | 'bottom' | undefined;
    position?: 'left' | 'center' | 'right' | undefined;
}

export type RouteChildType = {
    name: string
    active?: boolean
    icon?: IconProp
    to?: string
    exact?: boolean
    badge?: {
        text?: string
        type?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    }
    children?: RouteChildType[]
}

export type RouteType = {
    label: string
    labelDisable?: boolean
    children: RouteChildType[]
}

/** MODEL INTERFACES
 * */

interface Model {
    id: number;
    created_at: string;
}

export interface StkCallback extends Model {
    amount: number;
    result_desc: string;
    checkout_request_id: string;
}

export interface StkRequest extends Model {
    checkout_request_id: string;
    amount: number;
    phone: number;
    reference: string;
    status: Status;
    response?: StkCallback;
}

export interface Voucher extends Model {
    type: string;
    balance: number;
    account_id: number;
    voucher_transactions?: VoucherTransaction[];
}

export interface VoucherTransaction extends Model {
    type: string;
    amount: number;
    description: string;
    voucher_id: number;
    voucher?: Voucher;
}

export interface Payment extends Model {
    amount: number;
    type: string;
    subtype: string;
    status: Status;
    providable?: StkRequest | VoucherTransaction;
}
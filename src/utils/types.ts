import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Status } from './enums';

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

export type StkCallback = {
    id: string
    amount: number
    result_desc: string
    checkout_request_id: string
    created_at: string
}

export type StkRequest = {
    id: string
    checkout_request_id: string
    amount: number
    phone: number
    reference: string
    status: Status
    created_at: string
    response?: StkCallback
}

export type Voucher = {
    id: number
    type: string
    balance: number
    account_id: number
    created_at: string
    voucher_transactions?: VoucherTransaction[]
}

export type VoucherTransaction = {
    id: number
    type: string
    amount: number
    description: string
    voucher_id: number
    created_at: string
    voucher?: Voucher
}

export type Payment = {
    id: number
    amount: number
    type: string
    subtype: string
    status: Status
    created_at: string
    providable?: StkRequest | VoucherTransaction
}

export type TandaRequest = {
    request_id: number
    receipt_number: number
    amount: number
    provider: string
    message: string
    destination: string
    last_modified: string
    status: number
}

export type Transaction = {
    id?: number
    status: Status
    description: string
    destination: string
    type: string
    amount: number
    created_at: string
    payment?: Payment
    request?: TandaRequest
}
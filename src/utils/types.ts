import { Account, Model, Status } from '@nabcellent/sui-react';

export interface StkCallback extends Model {
    amount: number;
    result_desc: string;
    checkout_request_id: string;
    mpesa_receipt_number: string
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
    account?: Account;
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
    provider?: StkRequest | VoucherTransaction;
}
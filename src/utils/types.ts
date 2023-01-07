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
    voucher_type?: VoucherType;
    account?: Account;
}

export interface VoucherTransaction extends Model {
    type: string;
    amount: number;
    description: string;
    voucher_id: number;
    voucher?: Voucher;
}

export interface VoucherType extends Model {
    name: string
}

export interface Payment extends Model {
    amount: number;
    type: string;
    subtype: string;
    status: Status;
    description: string;
    destination_type: string;
    destination_subtype: string;
    destination_data: {
        payment_id?: number,
    };
    account?: Account
    provider?: StkRequest | VoucherTransaction
    destination_provider: FloatAccountTransaction | VoucherTransaction
}

export interface FloatAccount extends Model {
    balance: number;
    account?: Account;
    floatable_type: string;
    floatable_id: string;
    float_account_transactions?: VoucherTransaction[];
}

export interface FloatAccountTransaction extends Model {
    type: string;
    amount: number;
    description: string;
    float_account_id: number;
    float_account?: FloatAccount;
}
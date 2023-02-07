import { Account, Model, Status, TransactionType } from '@nabcellent/sui-react';

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
    status: Status;
    account_id: number;
    voucher_transactions?: VoucherTransaction[];
    voucher_type?: VoucherType;
    account?: Account;
}

export interface VoucherTransaction extends Model {
    type: TransactionType;
    amount: number;
    description: string;
    voucher_id: number;
    voucher?: Voucher;
}

export interface VoucherType extends Model {
    name: string
}

export interface MpesaC2BCallback extends Model {
    transaction_type: string
    trans_id: string
    trans_amount: number
    first_name: string
    middle_name: string
    last_name: string
    msisdn: string
}

export interface Payment<P = StkRequest | VoucherTransaction | MpesaC2BCallback> extends Model {
    amount: number;
    charge: number;
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
    provider?: P
    destination_provider?: SidoohTransaction | BulkPaymentRequest | TendePayRequest
}

export interface BulkPaymentRequest extends Model {
    amount: number
    command_id: string
    conversation_id: string
    phone: string
    remarks: string
    response: BulkPaymentResponse
}

export interface BulkPaymentResponse extends Model {
    result_type: number
    result_code: number
    result_desc: string
    originator_conversation_id: string
    conversation_id: string
}

export interface FloatAccountTransaction extends Model {
    type: TransactionType;
    amount: number;
    description: string;
    float_account_id: number;
    float_account?: FloatAccount;
}

export interface FloatAccount extends Model {
    balance: number;
    account?: Account;
    floatable_type: string;
    floatable_id: string;
    transactions?: FloatAccountTransaction[];
}

export type TendePayRequest = Model & {
    service: string
    unique_reference: string
    transaction_reference: string
    text: {
        account_number: number
        amount: number
        pay_bill_number: number
        source_paybill: number
    }
    msisdn: string
    timestamp: Date
    response_code: string
    response_message: string
    successful: boolean
    status: string

    callback?: TendePayCallback
}

export type TendePayCallback = Model & {
    initiator_reference: string
    response_code: string
    status: string
    status_description: string
    amount: number
    account_reference: string
    confirmation_code: string
    msisdn: string
    receiver_party_name: string
    date: Date
}

export type SidoohTransaction = FloatAccountTransaction | VoucherTransaction
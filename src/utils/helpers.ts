import { Sweet, toast } from "@nabcellent/sui-react";
import { logger } from "./logger";
import { Voucher } from "./types";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";

export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const flattenRoutes = (children: any) => {
    const allChildren: any[] = [];

    const flatChild = (children: any) => {
        children.forEach((child: any) => {
            if (child.children) {
                flatChild(child.children);
            } else {
                allChildren.push(child);
            }
        });
    };
    flatChild(children);

    return allChildren;
};

export const getFlattenedRoutes = (children: any) => children.reduce(
    (acc: any, val: any) => {
        if (val.children) {
            return {
                ...acc,
                [camelize(val.name)]: flattenRoutes(val.children)
            };
        } else {
            return {
                ...acc,
                unTitled: [...acc.unTitled, val]
            };
        }
    },
    { unTitled: [] }
);

type CreditDebitMutation = MutationTrigger<MutationDefinition<{ id: number, amount: number }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Voucher", Voucher, "vouchersApi">>
type Action = 'credit' | 'debit'

export const queryVoucher = async (action: Action, voucherId: number, credit: CreditDebitMutation, debit: CreditDebitMutation) => {
    await Sweet.fire({
        title: `Voucher ${action === 'credit' ? 'Credit' : 'Debit'}`,
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        input: 'number',
        inputAttributes: { placeholder: 'Enter Amount' },
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Sweet.isLoading(),
        preConfirm: async (amount: number) => {
            if (!amount) return Sweet.showValidationMessage('Amount is required.');
            if (amount <= 0) return Sweet.showValidationMessage('Amount must be greater than 0.');

            let res;
            if (action === 'credit') {
                res = await credit({ id: voucherId, amount }) as any;
            } else if (action === 'debit') {
                res = await debit({ id: voucherId, amount }) as any;
            } else return

            logger.log(res);

            if (res?.data?.id) await toast({
                html: `Voucher <b class="text-${action === 'credit' ? 'success' : 'danger'}">
                        ${action === 'credit' ? 'Credited' : 'Debited'}
                    </b>`
            });
            if (res?.error?.data?.message) return Sweet.showValidationMessage(res?.error.data.message);
        }
    });
}
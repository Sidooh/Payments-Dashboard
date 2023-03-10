import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";
import { Voucher } from "../utils/types";
import { Field, Formik, FormikProps } from "formik";
import { Sweet, toast } from "@nabcellent/sui-react";
import { logger } from "../utils/logger";
import { FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';

type CreditDebitMutation = MutationTrigger<MutationDefinition<{ id: number, amount: number }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Voucher", Voucher, "vouchersApi">>
type Action = 'credit' | 'debit'

export const transactVoucher = async (action: Action, voucher: Voucher, credit: CreditDebitMutation, debit: CreditDebitMutation) => {
    type FormValues = { account_id: number, amount: number, float_account_id: number, reason?: string }
    let formikRef: FormikProps<FormValues> | null

    await Sweet.fire({
        titleText: `Voucher ${action === 'credit' ? 'Credit' : 'Debit'}`,
        html: (
            <Formik<FormValues>
                innerRef={ref => formikRef = ref}
                initialValues={{ account_id: voucher.account_id, amount: 100, float_account_id: 1, reason: '' }}
                validationSchema={yup.object().shape({
                    float_account_id: yup.number().oneOf([1, 2], 'Invalid Float Account.').required(),
                    amount: yup.number().label('Amount').min(10).required(),
                    reason: yup.string(),
                })}
                onSubmit={() => {}}>
                {() => (
                    <>
                        <FloatingLabel label={'Float Account'} className={'text-start'}>
                            <Field as="select" className="form-select mb-2" name="float_account_id"
                                   placeholder={'Float Account'}>
                                <option value="1">PAYMENT'S</option>
                                <option value="2">SAVING'S</option>
                            </Field>
                        </FloatingLabel>
                        <FloatingLabel label={'Amount'} className={'text-start'}>
                            <Field type="number" className="form-control mb-2" name="amount" placeholder={'Amount'}/>
                        </FloatingLabel>
                        <FloatingLabel label={'Reason'} className={'text-start'}>
                            <Field className="form-control mb-2" name="reason" placeholder={'Reason'}/>
                        </FloatingLabel>
                    </>
                )}
            </Formik>
        ),
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Sweet.isLoading(),
        preConfirm: async () => {
            await formikRef?.submitForm()

            if (formikRef?.isValid) {
                let res, args = { id: voucher.id, ...formikRef?.values };
                if (action === 'credit') {
                    res = await credit(args) as any;
                } else if (action === 'debit') {
                    res = await debit(args) as any;
                } else return

                logger.log(res);

                if (res?.data?.id) await toast({
                    html: `Voucher <b class="text-${action === 'credit' ? 'success' : 'danger'}">
                        ${action === 'credit' ? 'Credited' : 'Debited'}
                    </b>`
                });

                if (res?.error?.data?.errors) {
                    const messages = Object.values(res?.error?.data?.errors) as string[][]

                    return Sweet.showValidationMessage(messages[0][0])
                }

                if (res?.error?.data?.message) {
                    return Sweet.showValidationMessage(res?.error.data.message);
                }
            } else {
                return Sweet.showValidationMessage(Object.values(formikRef?.errors ?? '')[0])
            }
        }
    });
}
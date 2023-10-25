import { CreditFloatAccountRequest, FloatAccount } from '../utils/types';
import { Formik, FormikProps } from 'formik';
import { Sweet, toast } from '@nabcellent/sui-react';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { PaymentSubType } from '@/utils/enums.ts';

export async function topUpFloatAccount<T extends Function>(
    floatAccount: FloatAccount,
    floatAccounts: FloatAccount[],
    creditFloatAccount: T
) {
    let formikRef: FormikProps<CreditFloatAccountRequest> | null;

    await Sweet.fire({
        titleText: `Float Account TopUp`,
        html: (
            <Formik<CreditFloatAccountRequest>
                innerRef={(ref) => (formikRef = ref)}
                initialValues={{
                    account_id: 0,
                    amount: '',
                    description: 'Float Account TopUp',
                    float_account: floatAccount.id,
                    source: PaymentSubType.FLOAT,
                    source_account: 0,
                }}
                validationSchema={yup.object().shape({
                    account_id: yup.number().required(),
                    amount: yup.number().label('Amount').min(10).required(),
                    description: yup.string().required(),
                    float_account: yup
                        .number()
                        .oneOf(
                            floatAccounts.map((a) => a.id),
                            'Invalid Destination Account'
                        )
                        .required(),
                    source: yup.string().oneOf(['FLOAT']),
                    source_account: yup
                        .number()
                        .oneOf(
                            floatAccounts.map((a) => a.id),
                            'Invalid Source Account'
                        )
                        .required(),
                })}
                onSubmit={() => {}}
            >
                {({ values, handleChange }) => (
                    <div className={'text-start'}>
                        <div className="mb-3">
                            <label className={'mb-0'}>Source Account</label>
                            <Form.Select
                                name={'source_account'}
                                defaultValue={values.source_account}
                                onChange={handleChange}
                            >
                                <option value="" hidden>
                                    Select float account
                                </option>
                                {floatAccounts
                                    .filter((a) => a.id !== floatAccount.id)
                                    .map((a) => (
                                        <option key={a.id} value={a.id}>
                                            (Account, {a.account_id}) ({a.floatable_type}, {a.id}){' '}
                                            {a.account?.user?.name && `- ${a.account?.user?.name}`}
                                            {a.description && `- ${a.description}`}
                                        </option>
                                    ))}
                            </Form.Select>
                        </div>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <label className={'mb-0'}>Amount</label>
                            <Form.Control
                                type="number"
                                name={'amount'}
                                value={values.amount}
                                required
                                placeholder="70000"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                )}
            </Formik>
        ),
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: 'Top Up',
        allowOutsideClick: () => !Sweet.isLoading(),
        preConfirm: async () => {
            await formikRef?.submitForm();

            if (formikRef?.isValid) {
                formikRef.values.account_id = floatAccounts.find(
                    (a) => a.id == formikRef?.values.source_account
                )!.account_id;

                let res = await creditFloatAccount(formikRef.values);

                if (res?.data?.id) {
                    await toast({ titleText: 'TopUp Successful!' });
                }

                if (res?.error?.data?.errors) {
                    const messages = Object.values(res?.error?.data?.errors) as string[][];

                    return Sweet.showValidationMessage(messages[0][0]);
                }

                if (res?.error?.data?.message) {
                    return Sweet.showValidationMessage(res?.error.data.message);
                }
            } else {
                return Sweet.showValidationMessage(Object.values(formikRef?.errors ?? '')[0]);
            }
        },
    });
}

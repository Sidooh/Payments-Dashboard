import { Voucher } from '../lib/types/models';
import * as yup from 'yup';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.tsx';
import { Str, toast } from '@/lib/utils.ts';
import Tooltip from '@/components/common/Tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import SubmitButton from '@/components/common/SubmitButton.tsx';
import { useState } from 'react';
import { useCreditVoucherMutation, useDebitVoucherMutation } from '@/services/vouchersApi.ts';
import { Textarea } from '@/components/ui/textarea.tsx';

enum Action {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

type VoucherTransactionFormProps = {
    voucher: Voucher;
};

const schema = yup.object().shape({
    id: yup.number().required(),
    account_id: yup.number().required(),
    float_account_id: yup.string().oneOf(['1', '2'], 'Invalid Float Account.').required(),
    amount: yup.number().label('Amount').min(10).required(),
    reason: yup.string(),
});

export const VoucherTransactionForm = ({ voucher }: VoucherTransactionFormProps) => {
    const [action, setAction] = useState<Action>();
    const [open, setOpen] = useState(false);
    const [creditVoucher, { isLoading: creditIsLoading, error: creditError }] = useCreditVoucherMutation();
    const [debitVoucher, { isLoading: debitIsLoading, error: debitError }] = useDebitVoucherMutation();

    const form = useForm<yup.InferType<typeof schema>>({
        resolver: yupResolver(schema),
        defaultValues: {
            id: voucher.id,
            account_id: voucher.account_id,
            amount: 20,
            float_account_id: '1',
            reason: '',
        },
    });

    const handleSubmit: SubmitHandler<{ id: number; amount: number }> = (values) => {
        let res;
        if (action === Action.CREDIT) {
            res = creditVoucher(values);
        } else {
            res = debitVoucher(values);
        }

        res.unwrap().then(() => {
            toast({ titleText: `Voucher ${Str.headline(action)}ed.` });

            setOpen(false);

            form.reset();
        });
    };

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <div>
                    <Tooltip title={'Debit'} asChild>
                        <Button size={'icon'} className={'rounded-s-full rounded-e-none h-7'}>
                            <FaMinus
                                color={'red'}
                                className={'cursor-pointer'}
                                onClick={() => setAction(Action.DEBIT)}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Credit'} asChild>
                        <Button size={'icon'} className={'rounded-e-full rounded-s-none h-7'}>
                            <FaPlus
                                color={'green'}
                                className={'cursor-pointer'}
                                onClick={() => setAction(Action.CREDIT)}
                            />
                        </Button>
                    </Tooltip>
                </div>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{Str.headline(action)} Voucher</DialogTitle>
                            <DialogDescription>Fill in the form to credit the float account.</DialogDescription>
                            <AlertError error={creditError || debitError} className={'mt-4'} />
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="float_account_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Float Account</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a float account" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">PAYMENTS</SelectItem>
                                            <SelectItem value="2">SAVINGS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The float account to be{' '}
                                        {(action === Action.CREDIT ? Action.DEBIT : Action.CREDIT).toLowerCase()}ed.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g: 200,000"
                                            type={'number'}
                                            min={10}
                                            max={250000}
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g: Gift Voucher..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A reason for {action?.toLowerCase()}ing this voucher.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SubmitButton
                            className={'w-full'}
                            disabled={creditIsLoading || debitIsLoading || !form.formState.isValid}
                            isLoading={creditIsLoading || debitIsLoading}
                            text={Str.headline(action)}
                            loadingText={`${action?.toLowerCase()}ing`}
                            icon={CheckCircledIcon}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

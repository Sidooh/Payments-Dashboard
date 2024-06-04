import * as yup from 'yup';
import { PaymentSubType } from '@/lib/enums.ts';
import { FloatAccount } from '@/lib/types/models.ts';
import { cn, currencyFormat, Str, toast } from '@/lib/utils.ts';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { useTopUpFloatAccountMutation } from '@/services/floatAccountsApi.ts';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Tooltip from '@/components/common/Tooltip.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command.tsx';
import { CaretSortIcon, CheckCircledIcon, CheckIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input.tsx';
import SubmitButton from '@/components/common/SubmitButton.tsx';
import { CreditFloatAccountRequest } from '@/lib/types';

type TopUpFloatAccountProps = { trigger: ReactNode; floatAccount: FloatAccount; floatAccounts: FloatAccount[] };

const schema = yup.object().shape({
    account_id: yup.number().required(),
    amount: yup.number().min(10).max(250000).label('Amount').typeError('Please enter amount').required(),
    description: yup.string().required(),
    float_account: yup.number().required(),
    source: yup.string().oneOf([PaymentSubType.FLOAT]).required(),
    source_account: yup.number().required(),
});

export default function TopUpFloatAccount({ trigger, floatAccount, floatAccounts }: TopUpFloatAccountProps) {
    const [topUp, { isLoading, error }] = useTopUpFloatAccountMutation();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            description: 'Float Account TopUp',
            float_account: floatAccount.id,
            source: PaymentSubType.FLOAT,
        },
    });

    const handleSubmit: SubmitHandler<CreditFloatAccountRequest> = (values) => {
        topUp(values)
            .unwrap()
            .then(() => {
                toast({ titleText: 'Float TopUp Successful' });

                setOpen(false);

                form.reset();
            });
    };

    const getLabel = (a?: FloatAccount) =>
        a
            ? `${a.account_id} - ${Str.headline(a.floatable_type)} ID, ${a.id} ${a.account?.user?.name ? ` - ${a.account?.user?.name}` : ''} ${a.description ? ` - ${a.description}` : ''} - ${currencyFormat(a.balance)}`
            : '';

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <Tooltip title={'Top Up Float'} placement={'top'} asChild>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            </Tooltip>
            <DialogContent className={'w-5/6'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Float Top Up</DialogTitle>
                            <DialogDescription>Fill in the form to credit the float account.</DialogDescription>
                            <AlertError error={error} className={'mt-4'} />
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="source_account"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Source Account</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'justify-between',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value
                                                        ? getLabel(floatAccounts.find((a) => a.id === field.value))
                                                        : 'Select float account'}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search account..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>No account found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {floatAccounts.map((a) => (
                                                            <CommandItem
                                                                value={getLabel(a)}
                                                                key={a.id}
                                                                onSelect={() => {
                                                                    form.setValue('source_account', a.id);
                                                                    form.setValue('account_id', a.account_id);
                                                                }}
                                                            >
                                                                {getLabel(a)}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        'ml-auto h-4 w-4',
                                                                        a.id === field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>This is the float account that will be debited.</FormDescription>
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

                        <SubmitButton
                            className={'w-full'}
                            disabled={isLoading || !form.formState.isValid}
                            isLoading={isLoading}
                            text={'Top Up'}
                            loadingText={'Toping up...'}
                            icon={CheckCircledIcon}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

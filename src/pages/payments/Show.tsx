import { Link, useParams } from 'react-router-dom';
import {
    useCompletePaymentMutation,
    useFailPaymentMutation,
    usePaymentQuery,
    useQuerySTKStatusMutation,
    useRetryPurchaseMutation,
    useReversePaymentMutation,
} from '@/services/paymentsApi';
import CardBgCorner from '@/components/CardBgCorner';
import moment from 'moment';
import MpesaPayment from './MpesaPayment';
import SourceProvider from './SourceProvider';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Fragment } from 'react';
import DestinationProvider from './DestinationProvider';
import { FloatAccountTransaction, Payment, StkRequest, VoucherTransaction } from '@/lib/types/models';
import Latency from '../../components/Latency';
import BuniPayment from './BuniPayment';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdQueryStats } from 'react-icons/md';
import { FaSyncAlt, FaUndoAlt } from 'react-icons/fa';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { currencyFormat, toast } from '@/lib/utils.ts';
import { PaymentSubType, PaymentType, Status } from '@/lib/enums.ts';
import Tooltip from '@/components/common/Tooltip.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TiArrowBack } from 'react-icons/ti';
import { CgOptions } from 'react-icons/cg';
import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import { Separator } from '@/components/ui/separator.tsx';

const Show = () => {
    const { id } = useParams();
    const { data: payment, isError, error, isLoading, isSuccess } = usePaymentQuery(Number(id));

    const [reversePayment] = useReversePaymentMutation();
    const [retryPurchase] = useRetryPurchaseMutation();
    const [querySTKStatus] = useQuerySTKStatusMutation();
    const [completePayment] = useCompletePaymentMutation();
    const [failPayment] = useFailPaymentMutation();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !payment) return <Skeleton className={'h-[700px]'} />;

    const queryPayment = async (action: 'reverse' | 'check-payment' | 'retry-purchase' | 'query-status') => {
        let options: SweetAlertOptions = {
            backdrop: `rgba(0, 0, 150, 0.4)`,
            showLoaderOnConfirm: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            allowOutsideClick: () => !Swal.isLoading(),
        };

        const queryErrorAlert = (res: any, titleText: string) =>
            toast({
                titleText,
                text: res?.error?.data?.message || res?.error?.error,
                icon: 'error',
            });

        if (action === 'reverse') {
            options.title = 'Reverse Payment';
            options.text = 'Are you sure you want to reverse this payment?';
            options.preConfirm = async () => {
                const res = (await reversePayment(payment.id)) as any;

                if (res?.data?.id) toast({ titleText: 'Payment Reversal Complete!' });
                if (res?.error) await queryErrorAlert(res, 'Payment Reversal Error!');
            };
        }
        if (action === 'retry-purchase') {
            options.title = 'Retry Purchase';
            options.text = 'Are you sure you want to retry the purchase for this payment?';
            options.preConfirm = async () => {
                const res = (await retryPurchase(payment.id)) as any;

                if (res?.data?.id) toast({ titleText: 'Purchase Retry Complete!' });
                if (res?.error) await queryErrorAlert(res, 'Purchase Retry Error!');
            };
        }
        if (action === 'query-status') {
            options.title = 'Query STK Status';
            options.text = 'Are you sure you want to query STK transactions?';
            options.preConfirm = async () => {
                const res = (await querySTKStatus()) as any;

                if (res?.data?.status === 0) {
                    toast({ titleText: 'STK Status Query Complete!' });
                } else {
                    await queryErrorAlert(res, 'Something went wrong!');
                }
            };
        }

        await Swal.fire(options);
    };

    const paymentDropdownItems = [];
    if (payment?.status === Status.PENDING) {
        paymentDropdownItems.push(
            <DropdownMenuItem onClick={() => queryPayment('check-payment')}>
                <BsCheck2Circle />
                &nbsp; Check Payment
            </DropdownMenuItem>
        );

        if (payment.subtype === PaymentSubType.STK && (payment.provider as StkRequest)?.status !== Status.PAID) {
            paymentDropdownItems.push(
                <DropdownMenuItem onClick={() => queryPayment('query-status')}>
                    <MdQueryStats />
                    &nbsp; Query Status
                </DropdownMenuItem>
            );
        }
    }
    if (payment?.status === Status.COMPLETED) {
        paymentDropdownItems.push(
            <DropdownMenuItem onClick={() => queryPayment('retry-purchase')}>
                <FaSyncAlt />
                &nbsp; Retry Purchase
            </DropdownMenuItem>
        );
        paymentDropdownItems.push(
            <DropdownMenuItem onClick={() => queryPayment('reverse')}>
                <FaUndoAlt />
                &nbsp; Reverse Payment
            </DropdownMenuItem>
        );
    }

    return (
        <div className="space-y-3">
            <Card className="relative">
                <CardBgCorner corner={4} />
                <CardHeader className={'relative flex-row justify-between items-start'}>
                    <div>
                        <h5 className={'font-semibold leading-none tracking-tight'}>Payment: #{payment?.id}</h5>
                        <p className="text-sm text-muted-foreground">
                            {moment(payment?.created_at).format('MMM Do, Y | hh:mm A')}
                        </p>
                        <span className={'font-bold text-xs'}>
                            Latency <Latency from={payment.created_at} to={payment.updated_at} />
                        </span>
                    </div>
                    <div className={'text-end leading-none'}>
                        <h5 className={'m-0'}>{payment?.type.toUpperCase()}</h5>
                        <small>
                            <b>{payment.subtype}</b>
                        </small>
                    </div>
                </CardHeader>
                <CardContent className="relative">
                    <div className={'flex justify-between items-end'}>
                        <StatusBadge
                            status={payment.status}
                            statuses={[Status.COMPLETED, Status.FAILED]}
                            onStatusChange={async (status) => {
                                await Swal.fire({
                                    backdrop: `rgba(0, 0, 150, 0.4)`,
                                    showLoaderOnConfirm: true,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Proceed',
                                    title: 'Update Status',
                                    html: `Are you sure you want to update the status of this payment to <b>${status}</b>?`,
                                    allowOutsideClick: () => !Swal.isLoading(),
                                    preConfirm: async () => {
                                        let res;
                                        if (status === Status.COMPLETED) {
                                            res = (await completePayment(payment.id)) as any;
                                        } else if (status === Status.FAILED) {
                                            res = (await failPayment(payment.id)) as any;
                                        } else return;

                                        if (res?.data?.id) await toast({ titleText: 'Payment status updated!' });
                                        if (res?.error?.data?.message)
                                            await toast({
                                                titleText: res?.error.data.message,
                                                icon: 'error',
                                                timer: 7,
                                            });
                                    },
                                });
                            }}
                        />
                        <div className={'items-center'}>
                            {payment?.description?.toLowerCase().includes('reversal') && (
                                <Tooltip title={'Previous Payment'} placement={'left'} asChild>
                                    <Button size={'icon'} className={'rounded-full h-7 w-7'}>
                                        <Link to={`/payments/${payment.destination_data.payment_id}`}>
                                            <TiArrowBack />
                                        </Link>
                                    </Button>
                                </Tooltip>
                            )}

                            {paymentDropdownItems.length > 0 && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size={'icon'} className={'rounded-full h-7 w-7'}>
                                            <CgOptions />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {paymentDropdownItems.map((item, i) => (
                                            <Fragment key={i}>{item}</Fragment>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                /*<Dropdown>
                                    <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                        <FaCrosshairs className={'btn btn-danger py-2 px-2 rounded-circle'} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {paymentDropdownItems.map((item, i) => (
                                            <Fragment key={i}>{item}</Fragment>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>*/
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="relative">
                <CardBgCorner corner={1} />
                <CardHeader className={'font-semibold leading-none tracking-tight'}>Details</CardHeader>
                <CardContent className={'relative'}>
                    <div className="flex flex-col justify-evenly gap-y-1 lg:flex-row lg:h-12 lg:items-center lg:space-x-4 text-sm">
                        <div>
                            <small className={'text-muted-foreground'}>Account</small>
                            <SidoohAccount account={payment.account} />
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <small className={'text-muted-foreground'}>Description</small>
                            <p>{payment.description}</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <small className={'text-muted-foreground'}>Amount</small>
                            <p>{currencyFormat(payment.amount)}</p>
                            <small className={'text-red-700'}>{currencyFormat(payment.charge)}</small>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <small className={'text-muted-foreground'}>Source</small>
                            <p>
                                {payment.type} ~ {payment.subtype}
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div>
                            <small className={'text-muted-foreground'}>Destination</small>
                            <p>
                                {payment.destination_type} ~ {payment.destination_subtype}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {payment?.type === PaymentType.MPESA && <MpesaPayment payment={payment} />}
            {payment?.type === PaymentType.BUNI && <BuniPayment payment={payment} />}
            {payment?.type === PaymentType.SIDOOH && (
                <SourceProvider payment={payment as Payment<FloatAccountTransaction | VoucherTransaction>} />
            )}
            <DestinationProvider payment={payment} />
        </div>
    );
};

export default Show;

import { useParams } from 'react-router-dom';
import { useActivateVoucherMutation, useDeactivateVoucherMutation, useVoucherQuery } from '@/services/vouchersApi';
import VoucherTransactionsTable from '@/components/tables/VoucherTransactionsTable';
import CardBgCorner from '@/components/CardBgCorner';
import CountUp from 'react-countup';
import moment from 'moment/moment';
import { VoucherTransactionForm } from '@/components/VoucherTransactionForm.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Status } from '@/lib/enums.ts';
import Swal from 'sweetalert2';
import { toast } from '@/lib/utils.ts';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import AlertInfo from '@/components/alerts/AlertInfo.tsx';

const Show = () => {
    const { id } = useParams();
    const { data: voucher, isError, error, isLoading, isSuccess } = useVoucherQuery(Number(id));

    const [activateVoucher] = useActivateVoucherMutation();
    const [deactivateVoucher] = useDeactivateVoucherMutation();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !voucher) return <Skeleton className={'h-[700px]'} />;

    const account = voucher.account;

    const handleStatusChange = async (status: Status) => {
        await Swal.fire({
            backdrop: `rgba(0, 0, 150, 0.4)`,
            showLoaderOnConfirm: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            title: 'Update Status',
            html: `Are you sure you want to 
                <b class="text-${status === Status.ACTIVE ? 'success' : 'danger'}">
                    ${status === Status.ACTIVE ? 'ACTIVATE' : 'DEACTIVATE'}
                </b>
                this voucher?`,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: async () => {
                let res;
                if (status === Status.ACTIVE) {
                    res = (await activateVoucher(voucher.id)) as any;
                } else if (status === Status.INACTIVE) {
                    res = (await deactivateVoucher(voucher.id)) as any;
                } else return;

                if (res?.data?.id)
                    await toast({
                        html: `Voucher <b class="text-${status === Status.ACTIVE ? 'success' : 'danger'}">
                        ${status === Status.ACTIVE ? 'Activated' : 'Deactivated'}
                    </b>`,
                    });
                if (res?.error?.data?.message)
                    await toast({
                        titleText: res?.error.data.message,
                        icon: 'error',
                        timer: 7,
                    });
            },
        });
    };

    return (
        <div className={'space-y-3'}>
            <div className={'grid lg:grid-cols-3 gap-3'}>
                <Card className={'relative lg:col-span-2'}>
                    <CardBgCorner corner={3} />
                    <CardHeader className={'flex-row justify-between relative'}>
                        <span>
                            Account: #{account?.id}
                            <SidoohAccount account={account} />
                        </span>
                        <i className="text-sm text-muted-foreground text-end">
                            <b>
                                <small>CREATED ON</small>
                            </b>
                            <br /> {moment(voucher?.created_at).format('MMM Do, Y, hh:mm A')}
                        </i>
                    </CardHeader>
                    <CardContent className="relative">
                        <StatusBadge
                            status={voucher.status}
                            statuses={[Status.ACTIVE, Status.INACTIVE]}
                            onStatusChange={handleStatusChange}
                        />
                    </CardContent>
                </Card>
                <Card className={'relative bg-[linear-gradient(-45deg,#414ba7,#4a2613)] bg-center'}>
                    <CardHeader className="text-muted-foreground pb-0 lg:pb-6">BALANCE</CardHeader>
                    <CardContent>
                        <CountUp
                            className={'text-white text-xl lg:text-2xl'}
                            end={voucher.balance}
                            prefix={'KES '}
                            separator=","
                        />
                        <div className={'absolute top-3 end-3'}>
                            <VoucherTransactionForm voucher={voucher} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {voucher?.transactions?.length ? (
                <VoucherTransactionsTable transactions={voucher.transactions} />
            ) : (
                <AlertInfo title={'No Voucher Transactions Made Yet'} />
            )}
        </div>
    );
};

export default Show;

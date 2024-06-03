import { useActivateVoucherMutation, useDeactivateVoucherMutation, useVouchersQuery } from '@/services/vouchersApi.ts';
import { Link } from 'react-router-dom';
import SidoohAccount from '@/components/common/SidoohAccount';
import { Voucher } from '@/lib/types/models';
import { VoucherTransactionForm } from '../../components/VoucherTransactionForm.tsx';
import { FaRegEye } from 'react-icons/fa6';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { DataTable } from '@/components/datatable/DataTable.tsx';
import { currencyFormat, toast } from '@/lib/utils.ts';
import { Status } from '@/lib/enums.ts';
import Swal from 'sweetalert2';
import TableDate from '@/components/common/TableDate.tsx';
import Tooltip from '@/components/common/Tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';

const Vouchers = () => {
    let { data: vouchers, isLoading, isSuccess, isError, error } = useVouchersQuery();

    const [activateVoucher] = useActivateVoucherMutation();
    const [deactivateVoucher] = useDeactivateVoucherMutation();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !vouchers) return <Skeleton className={'h-[700px]'} />;

    return (
        <DataTable
            title={`Vouchers`}
            columns={[
                {
                    accessorKey: 'account',
                    header: 'Account',
                    accessorFn: (row: Voucher) => `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                    cell: ({ row }: any) => <SidoohAccount account={row.original.account} />,
                },
                {
                    accessorKey: 'type',
                    accessorFn: (r: Voucher) => r.voucher_type?.name,
                    header: 'Type',
                },
                {
                    accessorKey: 'balance',
                    header: 'Balance',
                    cell: ({ row }: any) => currencyFormat(row.original.balance),
                },
                {
                    accessorKey: 'status',
                    header: 'Status',
                    cell: ({ row: { original } }: { row: { original: Voucher } }) => (
                        <StatusBadge
                            status={original.status}
                            statuses={[Status.ACTIVE, Status.INACTIVE]}
                            onStatusChange={async (status) => {
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
                                            res = (await activateVoucher(original.id)) as any;
                                        } else if (status === Status.INACTIVE) {
                                            res = (await deactivateVoucher(original.id)) as any;
                                        } else return;

                                        if (res?.data?.id)
                                            await toast({
                                                html: `Voucher <b class="text-${
                                                    status === Status.ACTIVE ? 'success' : 'danger'
                                                }">
                                                                    ${
                                                                        status === Status.ACTIVE
                                                                            ? 'Activated'
                                                                            : 'Deactivated'
                                                                    }
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
                            }}
                        />
                    ),
                },
                {
                    accessorKey: 'updated_at',
                    header: 'Updated',
                    cell: ({ row }: any) => <TableDate date={row.original.updated_at} />,
                },
                {
                    id: 'Actions',
                    cell: ({ row: { original: voucher } }: any) => (
                        <div className={'flex justify-between'}>
                            <VoucherTransactionForm voucher={voucher} />

                            <Tooltip title={'View'} asChild>
                                <Link to={`/vouchers/${voucher.id}`}>
                                    <Button size={'icon'} variant={'ghost'} className={'rounded-full'}>
                                        <FaRegEye />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </div>
                    ),
                },
            ]}
            data={vouchers}
        />
    );
};

export default Vouchers;

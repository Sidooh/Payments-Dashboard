import { Card } from 'react-bootstrap';
import {
    useActivateVoucherMutation, useCreditVoucherMutation,
    useDeactivateVoucherMutation, useDebitVoucherMutation,
    useVouchersQuery
} from '../../features/vouchers/vouchersAPI';
import {
    currencyFormat,
    DataTable, Flex,
    SectionError,
    SectionLoader,
    Status,
    StatusChip,
    Sweet,
    TableDate,
    toast, Tooltip
} from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import SidoohAccount from 'components/common/SidoohAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { logger } from 'utils/logger';
import { Voucher } from "../../utils/types";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { transactVoucher } from "../../components/TransactVoucher";

const Vouchers = () => {
    let { data: vouchers, isLoading, isSuccess, isError, error } = useVouchersQuery();

    const [creditVoucher] = useCreditVoucherMutation();
    const [debitVoucher] = useDebitVoucherMutation();
    const [activateVoucher] = useActivateVoucherMutation();
    const [deactivateVoucher] = useDeactivateVoucherMutation();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !vouchers) return <SectionLoader/>;

    logger.log(vouchers);

    const handleQueryVoucher = async (voucher: Voucher, action: 'credit' | 'debit') => {
        await transactVoucher(action, voucher, creditVoucher, debitVoucher)
    }

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Vouchers`} columns={[
                    {
                        accessorKey: 'account',
                        header: 'Account',
                        accessorFn: (row: Voucher) => `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                        cell: ({ row }: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'type',
                        accessorFn: (r: Voucher) => r.voucher_type?.name,
                        header: 'Type',
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({ row }: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({ row: { original } }: { row: { original: Voucher } }) => (
                            <StatusChip status={original.status} statuses={[Status.ACTIVE, Status.INACTIVE]}
                                        onStatusChange={async status => {
                                            await Sweet.fire({
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
                                                allowOutsideClick: () => !Sweet.isLoading(),
                                                preConfirm: async () => {
                                                    let res;
                                                    if (status === Status.ACTIVE) {
                                                        res = await activateVoucher(original.id) as any;
                                                    } else if (status === Status.INACTIVE) {
                                                        res = await deactivateVoucher(original.id) as any;
                                                    } else return

                                                    if (res?.data?.id) await toast({
                                                        html: `Voucher <b class="text-${status === Status.ACTIVE ? 'success' : 'danger'}">
                                                                    ${status === Status.ACTIVE ? 'Activated' : 'Deactivated'}
                                                                </b>`
                                                    });
                                                    if (res?.error?.data?.message) await toast({
                                                        titleText: res?.error.data.message,
                                                        icon: 'error',
                                                        timer: 7
                                                    });
                                                }
                                            });
                                        }}/>
                        )
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Updated',
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row: { original: voucher } }: any) => (
                            <Flex justifyContent={'between'}>
                                <Tooltip title={'Debit'} placement={'top'}>
                                    <FontAwesomeIcon color={'red'} icon={faMinus} className={'cursor-pointer'}
                                                     onClick={() => handleQueryVoucher(voucher, 'debit')}/>
                                </Tooltip>
                                <Tooltip title={'Credit'} placement={'top'}>
                                    <FontAwesomeIcon color={'green'} icon={faAdd} className={'cursor-pointer'}
                                                     onClick={() => handleQueryVoucher(voucher, 'credit')}/>
                                </Tooltip>
                                <Tooltip title={'View'} placement={'top'}>
                                    <Link to={`/vouchers/${voucher.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                                </Tooltip>
                            </Flex>
                        )
                    }
                ]} data={vouchers}/>
            </Card.Body>
        </Card>
    );
};

export default Vouchers;

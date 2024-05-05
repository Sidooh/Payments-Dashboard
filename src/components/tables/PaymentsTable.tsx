import { Card } from 'react-bootstrap';
import { FloatAccount, Payment } from '@/utils/types';
import { DataTable, getRelativeDateAndTime, StatusChip, TableDate } from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import SidoohAccount from '../common/SidoohAccount';
import moment from 'moment';
import Latency from '../Latency';
import { BsArrowRight } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa6';

const PaymentsTable = ({ tableTitle, payments }: { tableTitle: string; payments: Payment[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable
                    title={tableTitle}
                    columns={[
                        {
                            accessorKey: 'account',
                            header: 'Account',
                            accessorFn: (row: FloatAccount) =>
                                `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                            cell: ({ row }: { row: { original: Payment } }) => (
                                <SidoohAccount account={row.original.account} />
                            ),
                        },
                        {
                            accessorKey: 'description',
                            header: 'Description',
                            cell: ({ row }: any) => (
                                <span>
                                    {row.original.description}
                                    <br />
                                    <small>
                                        <b>{row.original.destination}</b>
                                    </small>
                                </span>
                            ),
                        },
                        {
                            accessorKey: 'amount',
                            header: 'Amount',
                            cell: ({ row }: any) =>
                                new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'KES',
                                }).format(row.original.amount),
                        },
                        {
                            accessorKey: 'transfer',
                            header: 'Transfer',
                            cell: ({ row: { original: p } }: any) => (
                                <span className={'text-nowrap'}>
                                    {p.subtype} <BsArrowRight /> {p.destination_subtype}
                                </span>
                            ),
                        },
                        {
                            accessorKey: 'status',
                            header: 'Status',
                            cell: ({ row }: any) => <StatusChip status={row.original.status} />,
                        },
                        {
                            accessorKey: 'updated_at',
                            header: 'Updated',
                            accessorFn: (row: Payment) => getRelativeDateAndTime(row.updated_at).toString(),
                            cell: ({ row }: any) => <TableDate date={row.original.updated_at} />,
                        },
                        {
                            accessorKey: 'latency',
                            accessorFn: (r: Payment) => moment(r.updated_at).diff(r.created_at, 's'),
                            cell: ({ row: { original: p } }: any) => <Latency from={p.created_at} to={p.updated_at} />,
                        },
                        {
                            id: 'actions',
                            header: '',
                            cell: ({ row }: any) => (
                                <Link to={`/payments/${row.original.id}`}>
                                    <FaRegEye />
                                </Link>
                            ),
                        },
                    ]}
                    data={payments}
                />
            </Card.Body>
        </Card>
    );
};

export default PaymentsTable;

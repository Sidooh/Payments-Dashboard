import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import { getRelativeDateAndTime } from '@/lib/utils.ts';
import TableDate from '@/components/common/TableDate.tsx';
import moment from 'moment/moment';
import Latency from '@/components/Latency.tsx';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa6';
import { ColumnDef } from '@tanstack/react-table';
import { Payment } from '@/lib/types/models.ts';

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'account',
        header: 'Account',
        accessorFn: (row) => `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
        cell: ({ row }) => <SidoohAccount account={row.original.account} />,
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) =>
            new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'KES',
            }).format(row.original.amount),
    },
    {
        accessorKey: 'subtype',
        header: 'Source',
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
        accessorKey: 'destination_subtype',
        header: 'Destination',
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated',
        accessorFn: (row) => getRelativeDateAndTime(row.updated_at).toString(),
        cell: ({ row }) => <TableDate date={row.original.updated_at} />,
    },
    {
        accessorKey: 'latency',
        accessorFn: (r) => `${moment(r.updated_at).diff(r.created_at, 's')}`,
        cell: ({ row: { original: p } }) => <Latency from={p.created_at} to={p.updated_at} />,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
            <Link to={`/payments/${row.original.id}`}>
                <FaRegEye />
            </Link>
        ),
    },
];

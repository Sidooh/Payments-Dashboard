import { VoucherTransaction } from '@/lib/types/models';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa6';
import { DataTable } from '@/components/datatable/DataTable.tsx';
import TransactionTypeCell from '@/components/common/TransactionTypeCell.tsx';
import { currencyFormat, getRelativeDateAndTime } from '@/lib/utils.ts';
import TableDate from '@/components/common/TableDate.tsx';

const VoucherTransactionsTable = ({ transactions }: { transactions: VoucherTransaction[] }) => {
    return (
        <DataTable
            title={`Voucher Transactions`}
            columns={[
                {
                    accessorKey: 'type',
                    header: 'Type',
                    cell: ({ row }) => <TransactionTypeCell type={row.original.type} />,
                },
                {
                    accessorKey: 'amount',
                    header: 'Amount',
                    cell: ({ row }) => currencyFormat(row.original.amount),
                },
                {
                    accessorKey: 'description',
                    header: 'Description',
                },
                {
                    accessorKey: 'created_at',
                    header: 'Created',
                    accessorFn: (row) => getRelativeDateAndTime(row.created_at).toString(),
                    cell: ({ row }: any) => <TableDate date={row.original.created_at} />,
                },
                {
                    id: 'Actions',
                    cell: ({ row }: any) => (
                        <Link to={`/payments/${row.original?.payment?.id}`}>
                            <FaRegEye />
                        </Link>
                    ),
                },
            ]}
            data={transactions}
        />
    );
};

export default VoucherTransactionsTable;

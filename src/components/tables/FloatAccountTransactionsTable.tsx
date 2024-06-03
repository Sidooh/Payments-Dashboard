import { FloatAccountTransaction } from '@/lib/types/models';
import TransactionTypeCell from '@/components/common/TransactionTypeCell.tsx';
import { currencyFormat, getRelativeDateAndTime } from '@/lib/utils.ts';
import TableDate from '@/components/common/TableDate.tsx';
import { DataTable } from '@/components/datatable/DataTable.tsx';

type FloatAccountTransactionsTableProps = { transactions: FloatAccountTransaction[]; showAccountColumn?: boolean };

const FloatAccountTransactionsTable = ({
    transactions,
    showAccountColumn = false,
}: FloatAccountTransactionsTableProps) => {
    const columns = [
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }: any) => <TransactionTypeCell type={row.original.type} />,
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }: any) => currencyFormat(row.original.amount),
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'balance',
            header: 'Balance',
            cell: ({ row }: any) => currencyFormat(row.original.balance),
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            accessorFn: (row: FloatAccountTransaction) => getRelativeDateAndTime(row.created_at).toString(),
            cell: ({ row }: any) => <TableDate date={row.original.created_at} />,
        },
    ];

    if (showAccountColumn) {
        columns.unshift({
            accessorKey: 'account',
            header: 'Account',
            cell: ({ row }) => {
                if (row.original.float_account_id === 1) {
                    return 'PAYMENTS';
                } else if (row.original.float_account_id === 2) {
                    return 'SAVINGS';
                } else {
                    return row.original.float_account_id;
                }
            },
        });
    }

    return <DataTable title={`Float Account Transactions`} columns={columns} data={transactions} />;
};

export default FloatAccountTransactionsTable;

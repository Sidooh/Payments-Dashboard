import {Card} from 'react-bootstrap';
import {
    currencyFormat,
    DataTable,
    getRelativeDateAndTime,
    TableDate,
    TransactionTypeChip,
} from '@nabcellent/sui-react';
import {FloatAccountTransaction} from '@/utils/types';
import {Link} from 'react-router-dom';
import {FaRegEye} from 'react-icons/fa6';

type FloatAccountTransactionsTableProps = { transactions: FloatAccountTransaction[]; showAccountColumn?: boolean };

const FloatAccountTransactionsTable = ({
    transactions,
    showAccountColumn = false,
}: FloatAccountTransactionsTableProps) => {
    const columns = [
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }: { row: { original: FloatAccountTransaction } }) => (
                <TransactionTypeChip type={row.original.type} />
            ),
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
            cell: ({row}: any) => currencyFormat(row.original.balance),
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            accessorFn: (row: FloatAccountTransaction) => getRelativeDateAndTime(row.created_at).toString(),
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
    ];

    if (showAccountColumn) {
        columns.unshift({
            accessorKey: 'account',
            header: 'Account',
            cell: ({ row }: { row: { original: FloatAccountTransaction } }) => {
                if (row.original.float_account_id === 1) {
                    return 'PAYMENTS';
                } else if (row.original.float_account_id === 2) {
                    return 'SAVINGS';
                } else {
                    return '-';
                }
            },
        });
    }

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Float Account Transactions`} columns={columns} data={transactions} />
            </Card.Body>
        </Card>
    );
};

export default FloatAccountTransactionsTable;

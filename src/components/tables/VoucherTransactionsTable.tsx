import { Card } from 'react-bootstrap';
import {
    currencyFormat,
    DataTable,
    getRelativeDateAndTime,
    TableDate,
    TransactionTypeChip
} from '@nabcellent/sui-react';
import { VoucherTransaction } from 'utils/types';
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/all";

const VoucherTransactionsTable = ({ transactions }: { transactions: VoucherTransaction[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Voucher Transactions`} columns={[
                    {
                        accessorKey: 'type',
                        header: 'Type',
                        cell: ({ row }: { row: { original: VoucherTransaction } }) => <TransactionTypeChip
                            type={row.original.type}/>
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({ row }: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'description',
                        header: 'Description',
                    },
                    {
                        accessorKey: 'created_at',
                        header: 'Created',
                        accessorFn: (row: VoucherTransaction) => getRelativeDateAndTime(row.created_at).toString(),
                        cell: ({ row }: any) => <TableDate date={row.original.created_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/payments/${row.original?.payment?.id}`}><FaRegEye/></Link>
                        )
                    }
                ]} data={transactions}/>
            </Card.Body>
        </Card>
    );
};

export default VoucherTransactionsTable;

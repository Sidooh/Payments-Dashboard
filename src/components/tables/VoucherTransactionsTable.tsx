import { Card } from 'react-bootstrap';
import { currencyFormat, DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { VoucherTransaction } from 'utils/types';
import { ReadMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const VoucherTransactionsTable = ({transactions}: { transactions: VoucherTransaction[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Voucher Transactions`} columns={[
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({row}: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({row}: any) => <StatusChip status={row.original.payment?.status}/>
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Transaction Date',
                        cell: ({row}: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => (
                            <Link to={`/voucher-transactions/${row.original?.payment?.id}`}>
                                <ReadMore fontSize={'small'}/>
                            </Link>
                        )
                    }
                ]} data={transactions}/>
            </Card.Body>
        </Card>
    );
};

export default VoucherTransactionsTable;

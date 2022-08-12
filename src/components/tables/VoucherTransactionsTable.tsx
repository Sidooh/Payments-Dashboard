import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { currencyFormat, DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { VoucherTransaction } from 'utils/types';

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
                        cell: ({row}: any) => <TableActions entityId={row.original.payment?.id} entity={'payment'}/>
                    }
                ]} data={transactions}/>
            </Card.Body>
        </Card>
    );
};

export default VoucherTransactionsTable;

import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { useVoucherTransactionsQuery } from 'features/vouchers/vouchersAPI';
import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip, TableDate } from '@nabcellent/sui-react';

const VoucherTransactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useVoucherTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

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

export default VoucherTransactions;

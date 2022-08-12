import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip, TableDate } from '@nabcellent/sui-react';

const Payments = () => {
    let { data:payments, isLoading, isSuccess, isError, error } = usePaymentsQuery();
    console.log(payments);

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !payments) return <SectionLoader />;

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Payments'} columns={[
                    {
                        accessorKey: 'subtype',
                        header: 'Via'
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({ row }: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({ row }: any) => <StatusChip status={row.original.status}/>
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Date',
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at} />
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => <TableActions entityId={row.original.id} entity={'payment'} />
                    }
                ]} data={payments} />
            </Card.Body>
        </Card>
    );
};

export default Payments;

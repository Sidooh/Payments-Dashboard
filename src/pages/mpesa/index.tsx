import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { useParams } from 'react-router-dom';
import { useMpesaPaymentsQuery } from '../../features/mpesa/mpesaAPI';
import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip, TableDate } from '@nabcellent/sui-react';

const Payments = () => {
    const {subType} = useParams();

    let {data: payments, isLoading, isSuccess, isError, error} = useMpesaPaymentsQuery(String(subType));
    console.log(payments);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`${subType?.toUpperCase()} Payments`} columns={[
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({row}: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({row}: any) => <StatusChip status={row.original.status}/>
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Date',
                        cell: ({row}: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => <TableActions entityId={row.original.id} entity={'payment'}/>
                    }
                ]} data={payments}/>
            </Card.Body>
        </Card>
    );
};

export default Payments;

import { Card } from 'react-bootstrap';
import StatusChip from 'components/chips/StatusChip';
import TableDate from 'components/common/TableDate';
import TableActions from 'components/common/TableActions';
import DataTable from 'components/common/datatable';
import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import { SectionLoader } from 'components/common/Loader';
import { SectionError } from 'components/common/Error';
import { useParams } from 'react-router-dom';
import { currencyFormat } from '../../utils/helpers';

const Payments = () => {
    let {data: payments, isLoading, isSuccess, isError, error} = usePaymentsQuery();
    console.log(payments);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

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
                        cell: ({row}: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({row}: any) => <StatusChip status={row.original.status} entity={'payment'}
                                                          entityId={row.original.id}/>
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

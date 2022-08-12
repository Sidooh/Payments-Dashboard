import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { Payment } from 'utils/types';
import { currencyFormat, DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { useNavigate } from 'react-router-dom';

const RecentPayments = ({payments}: { payments: Payment[] }) => {
    const navigate = useNavigate();

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Recent Payments'} columns={[
                    {
                        accessorKey: 'subtype',
                        header: 'Sub Type'
                    },
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
                        cell: ({row}: any) => <TableDate date={row.original.updated_at ?? row.original.created_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => <TableActions entityId={row.original.id} entity={'payment'}/>
                    }
                ]} data={payments} onViewAll={() => navigate('/payments')}/>
            </Card.Body>
        </Card>
    );
};

export default RecentPayments;

import { Card } from 'react-bootstrap';
import { Payment } from 'utils/types';
import { currencyFormat, DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';

const RecentPayments = ({payments}: { payments: Payment[] }) => {
    const navigate = useNavigate();

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Recent Payments'} columns={[
                    {
                        accessorKey: 'id',
                        header: '#'
                    },
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
                        cell: ({row}: any) => (
                            <Link to={`/payments/${row.original.id}`}><ReadMore fontSize={'small'}/></Link>
                        )
                    }
                ]} data={payments} onViewAll={() => navigate('/payments')}/>
            </Card.Body>
        </Card>
    );
};

export default RecentPayments;

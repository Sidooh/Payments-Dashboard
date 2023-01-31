import { Card } from 'react-bootstrap';
import { Payment } from 'utils/types';
import { currencyFormat, DataTable, getRelativeDateAndTime, StatusChip, TableDate } from '@nabcellent/sui-react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

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
                        accessorFn: (row: Payment) => getRelativeDateAndTime(row.updated_at).toString(),
                        cell: ({row}: any) => <TableDate date={row.original.updated_at ?? row.original.created_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => (
                            <Link to={`/payments/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                        )
                    }
                ]} data={payments} onViewAll={() => navigate('/payments')}/>
            </Card.Body>
        </Card>
    );
};

export default RecentPayments;

import { Card } from 'react-bootstrap';
import { Payment } from 'utils/types';
import { DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { ReadMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PaymentsTable = ({tableTitle, payments}: { tableTitle: string, payments: Payment[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={tableTitle} columns={[
                    {
                        accessorKey: 'id',
                        header: '#',
                    },
                    {
                        accessorKey: 'description',
                        header: 'Description',
                        cell: ({row}: any) => (
                            <span>
                                {row.original.description}<br/>
                                <small><b>{row.original.destination}</b></small>
                            </span>
                        )
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({row}: any) => (new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'KES'
                        })).format(row.original.amount)
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
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
                        id: 'actions',
                        header: '',
                        cell: ({row}: any) => (
                            <Link to={`/payments/${row.original.id}`}><ReadMore fontSize={'small'}/></Link>
                        )
                    }
                ]} data={payments}/>
            </Card.Body>
        </Card>
    );
};

export default PaymentsTable;

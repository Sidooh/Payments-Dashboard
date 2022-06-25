import { useNavigate } from 'react-router-dom';
import DataTable from 'components/common/datatable';
import { Card } from 'react-bootstrap';
import { Tooltip } from '@mui/material';
import PhoneChip from '../../../components/chips/PhoneChip';
import StatusChip from '../../../components/chips/StatusChip';
import TableDate from '../../../components/common/TableDate';
import TableActions from '../../../components/common/TableActions';

const PendingTransactions = () => {
    const navigate = useNavigate();

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable bulkActions onCreateRow={() => navigate('/notifications/create')}
                           title={'Pending Transactions'} columns={[
                    {
                        accessor: 'customer',
                        Header  : 'Customer',
                        Cell    : ({row}: any) => (
                            <Tooltip title={row.original.user.email}>
                                <span>
                                            {row.original.user.last_name} <br/>
                                            <small>{row.original.user.user_roles_str}</small>
                                        </span>
                            </Tooltip>
                        )
                    },
                    {
                        accessor: 'phone',
                        Header  : 'Phone',
                        Cell    : ({row}: any) => <PhoneChip phone={row.original.phone}/>
                    },
                    {
                        accessor: 'product',
                        Header  : 'Product',
                    },
                    {
                        accessor: 'amount',
                        Header  : 'Amount',
                        Cell    : ({row}: any) => (new Intl.NumberFormat('en-GB', {
                            style   : 'currency',
                            currency: 'KES'
                        })).format(row.original.amount)
                    },
                    {
                        accessor: 'payment',
                        Header  : 'Payment',
                    },
                    {
                        accessor: 'status',
                        Header  : 'Status',
                        Cell    : ({row}: any) => <StatusChip status={row.original.status} entity={'transaction'}
                                                              entityId={row.original.id}/>
                    },
                    {
                        accessor: 'created_at',
                        Header: 'Date',
                        className: 'text-end',
                        Cell: ({ row }:any) => <TableDate date={row.original.created_at}/>
                    },
                    {
                        accessor: 'actions',
                        disableSortBy: true,
                        className: 'text-end',
                        Cell: ({ row }:any) => <TableActions entityId={row.original.id} entity={'user'}/>
                    }
                ]} data={[]}/>
            </Card.Body>
        </Card>
    );
};

export default PendingTransactions;

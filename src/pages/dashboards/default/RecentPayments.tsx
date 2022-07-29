import { Card } from 'react-bootstrap';
import DataTable from 'components/common/datatable';
import StatusChip from 'components/chips/StatusChip';
import TableDate from 'components/common/TableDate';
import TableActions from 'components/common/TableActions';
import { Payment } from 'utils/types';
import { currencyFormat } from '../../../utils/helpers';

const RecentPayments = ({payments}: { payments: Payment[] }) => {
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
                        cell: ({row}: any) => <StatusChip status={row.original.status} entity={'payment'}
                                                          entityId={row.original.id}/>
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
                ]} data={payments} viewAllLink={'/payments'}/>
            </Card.Body>
        </Card>
    );
};

export default RecentPayments;

import { Card } from 'react-bootstrap';
import TableDate from 'components/common/TableDate';
import TableActions from 'components/common/TableActions';
import DataTable from 'components/common/datatable';
import { SectionLoader } from 'components/common/Loader';
import { SectionError } from 'components/common/Error';
import { useVoucherTransactionsQuery } from 'features/vouchers/vouchersAPI';
import { currencyFormat } from '../../utils/helpers';
import StatusChip from '../../components/chips/StatusChip';

const VoucherTransactions = () => {
    let { data, isLoading, isSuccess, isError, error } = useVoucherTransactionsQuery();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !data) return <SectionLoader />;

    let transactions = data.data

    console.log(data);

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
                        cell: ({ row }: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({ row }: any) => <StatusChip status={row.original.payment?.status} entity={'voucher'}
                            entityId={row.original.id} />
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Transaction Date',
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at} />
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => <TableActions entityId={row.original.payment.id} entity={'payment'} />
                    }
                ]} data={transactions} />
            </Card.Body>
        </Card>
    );
};

export default VoucherTransactions;

import { Card } from 'react-bootstrap';
import TableActions from 'components/common/TableActions';
import { useVouchersQuery } from '../../features/vouchers/vouchersAPI';
import { currencyFormat, DataTable, PhoneChip, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';

const Vouchers = () => {
    let { data:vouchers, isLoading, isSuccess, isError, error } = useVouchersQuery();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !vouchers) return <SectionLoader />;

    console.log(vouchers);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Vouchers`} columns={[
                    {
                        accessorKey: 'customer',
                        header: 'Customer',
                        cell: ({ row }: any) => <PhoneChip phone={row.original.account.phone} />
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({ row }: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Last Updated At',
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at} />
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => <TableActions entityId={row.original.id} entity={'voucher'} />
                    }
                ]} data={vouchers} />
            </Card.Body>
        </Card>
    );
};

export default Vouchers;

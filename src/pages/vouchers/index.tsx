import { Card } from 'react-bootstrap';
import TableDate from 'components/common/TableDate';
import TableActions from 'components/common/TableActions';
import DataTable from 'components/common/datatable';
import { SectionLoader } from 'components/common/Loader';
import { SectionError } from 'components/common/Error';
import { useVouchersQuery } from '../../features/vouchers/vouchersAPI';
import { currencyFormat } from '../../utils/helpers';
import PhoneChip from '../../components/chips/PhoneChip';

const Vouchers = () => {
    let {data: vouchers, isLoading, isSuccess, isError, error} = useVouchersQuery();
    console.log(vouchers);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !vouchers) return <SectionLoader/>;

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Vouchers`} columns={[
                    {
                        accessorKey: 'customer',
                        header: 'Customer',
                        cell: ({row}: any) => <PhoneChip phone={row.original.account.phone}/>
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({row}: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Last Updated At',
                        cell: ({row}: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => <TableActions entityId={row.original.id} entity={'voucher'}/>
                    }
                ]} data={vouchers}/>
            </Card.Body>
        </Card>
    );
};

export default Vouchers;

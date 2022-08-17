import { Card } from 'react-bootstrap';
import { useVouchersQuery } from '../../features/vouchers/vouchersAPI';
import { currencyFormat, DataTable, PhoneChip, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';
import { ReadMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SidoohAccount from 'components/common/SidoohAccount';

const Vouchers = () => {
    let {data: vouchers, isLoading, isSuccess, isError, error} = useVouchersQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !vouchers) return <SectionLoader/>;

    console.log(vouchers);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Vouchers`} columns={[
                    {
                        accessorKey: 'customer',
                        header: 'Customer',
                        cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
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
                        header: 'Updated At',
                        cell: ({row}: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({row}: any) => (
                            <Link to={`/vouchers/${row.original.id}`}><ReadMore fontSize={'small'}/></Link>
                        )
                    }
                ]} data={vouchers}/>
            </Card.Body>
        </Card>
    );
};

export default Vouchers;

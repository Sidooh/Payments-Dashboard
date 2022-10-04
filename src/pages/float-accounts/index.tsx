import { Card } from 'react-bootstrap';
import { useVouchersQuery } from '../../features/vouchers/vouchersAPI';
import { currencyFormat, DataTable, PhoneChip, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import SidoohAccount from 'components/common/SidoohAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { logger } from 'utils/logger';
import { useFloatAccountsQuery } from "../../features/float-accounts/floatAccountsApi";

const FloatAccounts = () => {
    let {data: floatAccounts, isLoading, isSuccess, isError, error} = useFloatAccountsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !floatAccounts) return <SectionLoader/>;

    logger.log(floatAccounts);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Float Accounts`} columns={[
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
                            <Link to={`/float-accounts/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                        )
                    }
                ]} data={floatAccounts}/>
            </Card.Body>
        </Card>
    );
};

export default FloatAccounts;

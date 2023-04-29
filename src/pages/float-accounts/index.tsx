import { Card } from 'react-bootstrap';
import {
    currencyFormat,
    DataTable,
    getRelativeDateAndTime,
    SectionError,
    SectionLoader,
    TableDate
} from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import { logger } from 'utils/logger';
import { useFloatAccountsQuery } from "../../features/float-accounts/floatAccountsApi";
import { FloatAccount } from "../../utils/types";
import { FaRegEye } from "react-icons/all";

const FloatAccounts = () => {
    let { data: floatAccounts, isLoading, isSuccess, isError, error } = useFloatAccountsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !floatAccounts) return <SectionLoader/>;

    logger.log(floatAccounts);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Float Accounts`} columns={[
                    // {
                    //     accessorKey: 'account',
                    //     accessorFn: (row: FloatAccount) => `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                    //     header: 'Account',
                    //     cell: ({ row }: any) => <SidoohAccount account={row.original.account}/>
                    // },
                    // {
                    //     accessorKey: 'floatable',
                    //     header: 'Floatable',
                    //     cell: ({ row }: any) => row.original.floatable_type
                    // },
                    {
                        accessorKey: 'description',
                        header: 'Description',
                        cell: ({ row }: any) => row.original.description
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({ row }: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Updated',
                        accessorFn: (row: FloatAccount) => getRelativeDateAndTime(row.updated_at).toString(),
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/float-accounts/${row.original.id}`}><FaRegEye/></Link>
                        )
                    }
                ]} data={floatAccounts}/>
            </Card.Body>
        </Card>
    );
};

export default FloatAccounts;

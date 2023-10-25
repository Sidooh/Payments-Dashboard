import { Card } from 'react-bootstrap';
import {
    currencyFormat,
    DataTable,
    Flex,
    getRelativeDateAndTime,
    IconButton,
    SectionError,
    SectionLoader,
    TableDate,
    Tooltip,
} from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import { logger } from '@/utils/logger';
import { useFloatAccountsQuery, useTopUpFloatAccountMutation } from '@/services/floatAccountsApi.ts';
import { FloatAccount } from '@/utils/types.ts';
import { FaPlus, FaRegEye } from 'react-icons/fa6';
import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import { topUpFloatAccount } from '@/components/TopUpFloatAccount.tsx';

const FloatAccounts = () => {
    let { data: floatAccounts, isLoading, isSuccess, isError, error } = useFloatAccountsQuery();
    const [topUpMutation] = useTopUpFloatAccountMutation();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !floatAccounts) return <SectionLoader />;

    logger.log(floatAccounts);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable
                    title={`Float Accounts`}
                    columns={[
                        {
                            accessorKey: 'account',
                            accessorFn: (row: FloatAccount) =>
                                `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                            header: 'Account',
                            cell: ({ row }: any) => <SidoohAccount account={row.original.account} />,
                        },
                        {
                            accessorKey: 'floatable',
                            header: 'Floatable',
                            cell: ({ row }: any) => row.original.floatable_type,
                        },
                        {
                            accessorKey: 'description',
                            header: 'Description',
                            cell: ({ row }: any) => row.original.description,
                        },
                        {
                            accessorKey: 'balance',
                            header: 'Balance',
                            cell: ({ row }: any) => currencyFormat(row.original.balance),
                        },
                        {
                            accessorKey: 'updated_at',
                            header: 'Updated',
                            accessorFn: (row: FloatAccount) => getRelativeDateAndTime(row.updated_at).toString(),
                            cell: ({ row }: any) => <TableDate date={row.original.updated_at} />,
                        },
                        {
                            id: 'Actions',
                            cell: ({ row }: any) => (
                                <Flex justifyContent={'between'}>
                                    <Tooltip title={'Top Up'} placement={'top'}>
                                        <IconButton size={'sm'}>
                                            <FaPlus
                                                color={'green'}
                                                className={'cursor-pointer'}
                                                onClick={() =>
                                                    topUpFloatAccount<typeof topUpMutation>(
                                                        row.original,
                                                        floatAccounts!,
                                                        topUpMutation
                                                    )
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={'View'} placement={'top'}>
                                        <Link to={`/float-accounts/${row.original.id}`}>
                                            <IconButton size={'sm'}>
                                                <FaRegEye />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </Flex>
                            ),
                        },
                    ]}
                    data={floatAccounts}
                />
            </Card.Body>
        </Card>
    );
};

export default FloatAccounts;

import { Link } from 'react-router-dom';
import { useFloatAccountsQuery } from '@/services/floatAccountsApi.ts';
import { FloatAccount } from '@/lib/types/models';
import { FaPlus, FaRegEye } from 'react-icons/fa6';
import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import FloatTopUpForm from '@/components/FloatTopUpForm.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { DataTable } from '@/components/datatable/DataTable.tsx';
import { currencyFormat, getRelativeDateAndTime } from '@/lib/utils.ts';
import TableDate from '@/components/common/TableDate.tsx';
import Tooltip from '@/components/common/Tooltip.tsx';
import { Button } from '@/components/ui/button.tsx';

const FloatAccounts = () => {
    let { data: floatAccounts, isLoading, isSuccess, isError, error } = useFloatAccountsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !floatAccounts) return <Skeleton className={'h-[700px]'} />;

    return (
        <DataTable
            title={`Float Accounts`}
            columns={[
                {
                    accessorKey: 'account',
                    accessorFn: (row: FloatAccount) => `${row.account?.phone}: ${row.account?.user?.name ?? ''}`,
                    header: 'Account',
                    cell: ({ row }: any) => <SidoohAccount account={row.original.account} />,
                },
                {
                    accessorKey: 'floatable_type',
                    header: 'Floatable',
                    cell: ({ row }: any) => row.original.floatable_type,
                },
                {
                    accessorKey: 'description',
                    header: 'Description',
                    accessorFn: (row: FloatAccount) => row.description ?? '',
                },
                {
                    accessorKey: 'balance',
                    header: 'Balance',
                    accessorFn: (row: FloatAccount) => currencyFormat(row.balance),
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
                    cell: ({ row: { original } }) => (
                        <div className={'flex justify-between'}>
                            <FloatTopUpForm
                                floatAccount={original}
                                floatAccounts={floatAccounts.filter((f) => f.id !== original.id)}
                                trigger={
                                    <Button size={'icon'} variant={'ghost'} className={'rounded-full'}>
                                        <FaPlus color={'green'} />
                                    </Button>
                                }
                            />
                            <Tooltip title={'View'} placement={'top'} asChild>
                                <Link to={`/float-accounts/${original.id}`}>
                                    <Button size={'icon'} variant={'ghost'}>
                                        <FaRegEye />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </div>
                    ),
                },
            ]}
            data={floatAccounts}
        />
    );
};

export default FloatAccounts;

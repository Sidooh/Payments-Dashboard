import { useFloatAccountsTransactionsQuery } from '@/services/floatAccountsApi';
import FloatAccountTransactionsTable from '@/components/tables/FloatAccountTransactionsTable';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const FloatAccountsTransactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useFloatAccountsTransactionsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !transactions) return <Skeleton className={'h-[700px]'} />;

    return <FloatAccountTransactionsTable transactions={transactions} showAccountColumn />;
};

export default FloatAccountsTransactions;

import { useVoucherTransactionsQuery } from '@/services/vouchersApi';
import VoucherTransactionsTable from '@/components/tables/VoucherTransactionsTable';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const VoucherTransactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useVoucherTransactionsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !transactions) return <Skeleton className={'h-[700px]'} />;

    return <VoucherTransactionsTable transactions={transactions} />;
};

export default VoucherTransactions;

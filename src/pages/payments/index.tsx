import { usePaymentsQuery } from '@/services/paymentsApi';
import PaymentsTable from '@/components/tables/payments-table/PaymentsTable.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Payments = () => {
    let { data: payments, isLoading, isSuccess, isError, error, refetch, isFetching } = usePaymentsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !payments) return <Skeleton className={'h-[700px]'} />;

    return <PaymentsTable tableTitle={'Payments'} payments={payments} isRefreshing={isFetching} onRefresh={refetch} />;
};

export default Payments;

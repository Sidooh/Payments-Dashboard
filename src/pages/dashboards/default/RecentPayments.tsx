import { usePaymentsQuery } from '@/services/paymentsApi';
import PaymentsTable from '@/components/tables/payments-table/PaymentsTable.tsx';
import { Payment } from '@/lib/types/models';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Status } from '@/lib/enums.ts';

const RecentPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error, refetch, isFetching } = usePaymentsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !payments) return <Skeleton className={'h-[700px]'} />;

    payments = payments.filter((t: Payment) => t.status !== Status.PENDING);

    return (
        <PaymentsTable
            tableTitle={'Recent Payments'}
            payments={payments}
            isRefreshing={isFetching}
            onRefresh={refetch}
        />
    );
};

export default RecentPayments;

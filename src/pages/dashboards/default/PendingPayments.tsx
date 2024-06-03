import { usePaymentsQuery } from '@/services/paymentsApi';
import PaymentsTable from '@/components/tables/payments-table/PaymentsTable.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Status } from '@/lib/enums.ts';
import AlertInfo from '@/components/alerts/AlertInfo.tsx';

const PendingPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error } = usePaymentsQuery(Status.PENDING);

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !payments) return <Skeleton className={'h-[300px]'} />;

    return payments.length ? (
        <PaymentsTable tableTitle={'Pending Payments'} payments={payments} />
    ) : (
        <AlertInfo title={'No Pending Payments'} />
    );
};

export default PendingPayments;

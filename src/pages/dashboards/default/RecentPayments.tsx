import { usePaymentsQuery } from '@/services/paymentsApi';
import PaymentsTable from '@/components/tables/PaymentsTable';
import { Payment } from '@/utils/types';
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';

const RecentPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error } = usePaymentsQuery();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !payments) return <ComponentLoader />;

    payments = payments.filter((t: Payment) => t.status !== Status.PENDING);

    return <PaymentsTable tableTitle={'Recent Payments'} payments={payments} />;
};

export default RecentPayments;

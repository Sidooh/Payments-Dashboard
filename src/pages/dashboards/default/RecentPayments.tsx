import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import PaymentsTable from 'components/tables/PaymentsTable';
import { Payment } from 'utils/types';
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';
import { logger } from 'utils/logger';

const RecentPayments = () => {
    let {data: payments, isLoading, isSuccess, isError, error} = usePaymentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <ComponentLoader/>;

    payments = payments.filter((t: Payment) => t.status !== Status.PENDING);
    logger.log('Recent Payments', payments);

    return <PaymentsTable tableTitle={'Recent Payments'} payments={payments}/>;
};

export default RecentPayments;

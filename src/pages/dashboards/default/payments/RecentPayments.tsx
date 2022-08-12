import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import Payments from './Payments';
import { Payment } from 'utils/types';
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';

const RecentPayments = () => {
    let {data: payments, isLoading, isSuccess, isError, error} = usePaymentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <ComponentLoader/>;

    payments = payments.filter((t: Payment) => t.status !== Status.PENDING);
    console.log('Recent Payments', payments);

    return <Payments tableTitle={'Recent Payments'} payments={payments}/>;
};

export default RecentPayments;

import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import PaymentsTable from 'components/tables/PaymentsTable';
import { logger } from 'utils/logger';

const Payments = () => {
    let {data: payments, isLoading, isSuccess, isError, error} = usePaymentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

    logger.log(payments);

    return <PaymentsTable tableTitle={'Payments'} payments={payments}/>;
};

export default Payments;

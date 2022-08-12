import {usePaymentsQuery} from 'features/payments/paymentsAPI';
import {SectionError} from 'components/common/Error';
import {ComponentLoader} from 'components/common/Loader';
import Payments from './Payments';
import {Payment} from 'utils/types';
import {Status} from 'utils/enums';

const RecentPayments = () => {
    let {data: paymentData, isLoading, isSuccess, isError, error} = usePaymentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !paymentData) return <ComponentLoader/>;

    const payments = paymentData.data.filter((t: Payment) => t.status !== Status.PENDING);
    console.log('Recent Payments', payments);

    return <Payments tableTitle={'Recent Payments'} payments={payments}/>;
};

export default RecentPayments;

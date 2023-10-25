import { usePaymentsQuery } from '@/services/paymentsApi';
import PaymentsTable from '@/components/tables/PaymentsTable';
import CardHeader from '@/components/common/CardHeader';
import { Card } from 'react-bootstrap';
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';
import { FaInfo } from 'react-icons/fa6';

const PendingPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error } = usePaymentsQuery(Status.PENDING);

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !payments) return <ComponentLoader />;

    return payments.length ? (
        <PaymentsTable tableTitle={'Pending Payments'} payments={payments} />
    ) : (
        <Card className={'mb-3 bg-soft-primary'}>
            <CardHeader title={'No Pending Payments'}>
                <FaInfo />
            </CardHeader>
        </Card>
    );
};

export default PendingPayments;

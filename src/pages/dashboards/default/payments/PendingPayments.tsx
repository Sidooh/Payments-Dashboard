import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import PaymentsTable from 'components/tables/PaymentsTable';
import CardHeader from "components/common/CardHeader";
import { Card } from 'react-bootstrap';
import { Icon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';

const PendingPayments = () => {
    let {data: payments, isLoading, isSuccess, isError, error} = usePaymentsQuery(Status.PENDING);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <ComponentLoader/>;

    console.log('Pending Payments', payments);

    return payments.length ? <PaymentsTable tableTitle={'Pending Payments'} payments={payments}/> : (
        <Card className={'mb-3 bg-soft-primary'}>
            <CardHeader title={'No Pending Payments'}>
                <Icon><FontAwesomeIcon icon={faInfo}/></Icon>
            </CardHeader>
        </Card>
    );
};

export default PendingPayments;

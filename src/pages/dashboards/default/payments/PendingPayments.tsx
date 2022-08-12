import { usePaymentsQuery } from 'features/payments/paymentsAPI';
import Payments from './Payments';
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

    if (payments.length)
        return <Payments tableTitle={'Pending Payments'} payments={payments}/>;
    else
        return (
            <Card className={'mb-3 bg-soft-primary'}>
                <CardHeader title={'No pending Payments'}>
                    <Icon><FontAwesomeIcon icon={faInfo}/></Icon>
                </CardHeader>
            </Card>
        );
};

export default PendingPayments;

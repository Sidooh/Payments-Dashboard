import {usePaymentsQuery} from 'features/payments/paymentsAPI';
import {SectionError} from 'components/common/Error';
import {ComponentLoader} from 'components/common/Loader';
import {Status} from 'utils/enums';
import Payments from './Payments';
import CardHeader from "../../../../components/common/CardHeader";
import {Card} from 'react-bootstrap';
import {Icon} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons/faInfo";

const PendingPayments = () => {
    let {data: paymentData, isLoading, isSuccess, isError, error} = usePaymentsQuery(Status.PENDING);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !paymentData) return <ComponentLoader/>;

    const {data: payments} = paymentData;
    console.log('Pending Payments', payments);

    if (payments.length)
        return <Payments tableTitle={'Pending Payments'} payments={payments}/>;
    else
        return <Card className={'mb-3 bg-soft-primary'}>
            <CardHeader title={'No pending Payments'}>
                <Icon><FontAwesomeIcon icon={faInfo}/></Icon>
            </CardHeader>
        </Card>
};

export default PendingPayments;

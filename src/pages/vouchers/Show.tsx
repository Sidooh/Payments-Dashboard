import { useParams } from 'react-router-dom';
import {
    useActivateVoucherMutation,
    useDeactivateVoucherMutation,
    useVoucherQuery
} from 'features/vouchers/vouchersAPI';
import { SectionError, SectionLoader, Status, StatusChip, Sweet, toast } from '@nabcellent/sui-react';
import VoucherTransactionsTable from '../../components/tables/VoucherTransactionsTable';
import CardHeader from '../../components/common/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { Card, Col, Row } from 'react-bootstrap';
import CardBgCorner from 'components/CardBgCorner';
import { CONFIG } from '../../config';
import CountUp from 'react-countup';
import { logger } from 'utils/logger';

const Show = () => {
    const { id } = useParams();
    const { data: voucher, isError, error, isLoading, isSuccess } = useVoucherQuery(Number(id));

    const [activateVoucher] = useActivateVoucherMutation();
    const [deactivateVoucher] = useDeactivateVoucherMutation();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !voucher) return <SectionLoader/>;

    logger.log('Voucher:', voucher);
    const account = voucher.account;

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={3}/>
                <Card.Body className="position-relative">
                    <h5>Account: #{account?.id}</h5>
                    <h6 className="mb-2">
                        <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/users/${account?.user_id}`}
                           target={'_blank'} rel={'noreferrer noopener'}>
                            {account?.user?.name}
                        </a>
                    </h6>
                    <p className="mb-0 fs--1">
                        <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account?.id}`}
                           target={'_blank'} rel={'noreferrer noopener'}>
                            {account?.phone}
                        </a>
                    </p>
                    <StatusChip status={voucher.status} statuses={[Status.ACTIVE, Status.INACTIVE]}
                                onStatusChange={async status => {
                                    await Sweet.fire({
                                        backdrop: `rgba(0, 0, 150, 0.4)`,
                                        showLoaderOnConfirm: true,
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Proceed',
                                        title: 'Update Status',
                                        html: `Are you sure you want to 
                                            <b class="text-${status === Status.ACTIVE ? 'success' : 'danger'}">
                                                ${status === Status.ACTIVE ? 'ACTIVATE' : 'DEACTIVATE'}
                                            </b>
                                            this voucher?`,
                                        allowOutsideClick: () => !Sweet.isLoading(),
                                        preConfirm: async () => {
                                            let res;
                                            if (status === Status.ACTIVE) {
                                                res = await activateVoucher(voucher.id) as any;
                                            } else if (status === Status.INACTIVE) {
                                                res = await deactivateVoucher(voucher.id) as any;
                                            } else return

                                            if (res?.data?.id) await toast({
                                                html: `Voucher <b class="text-${status === Status.ACTIVE ? 'success' : 'danger'}">
                                                    ${status === Status.ACTIVE ? 'Activated' : 'Deactivated'}
                                                </b>`
                                            });
                                            if (res?.error?.data?.message) await toast({
                                                titleText: res?.error.data.message,
                                                icon: 'error',
                                                timer: 7
                                            });
                                        }
                                    });
                                }}/>
                </Card.Body>
            </Card>

            <Row className={'justify-content-center mb-3'}>
                <Col lg={6}>
                    <Card className={'bg-line-chart-gradient'}>
                        <Card.Header className={'bg-transparent light'}>
                            <h6 className="text-white">BALANCE</h6>
                            <h4 className="text-white m-0">
                                <CountUp end={voucher.balance} prefix={'KES '} separator=","/>
                            </h4>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>

            {voucher?.transactions?.length ?
                <VoucherTransactionsTable transactions={voucher.transactions}/> : (
                    <Card className={'mb-3 bg-soft-primary'}>
                        <CardHeader title={'No Voucher Transactions Made'}><FontAwesomeIcon icon={faInfo}/></CardHeader>
                    </Card>
                )}
        </>
    );
};

export default Show;

import { useParams } from 'react-router-dom';
import {
    useActivateVoucherMutation,
    useCreditVoucherMutation,
    useDeactivateVoucherMutation,
    useDebitVoucherMutation,
    useVoucherQuery
} from 'features/vouchers/vouchersAPI';
import { Flex, SectionError, SectionLoader, Status, StatusChip, Sweet, toast, Tooltip } from '@nabcellent/sui-react';
import VoucherTransactionsTable from '../../components/tables/VoucherTransactionsTable';
import CardHeader from '../../components/common/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faInfo, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'react-bootstrap';
import CardBgCorner from 'components/CardBgCorner';
import { CONFIG } from '../../config';
import CountUp from 'react-countup';
import { logger } from 'utils/logger';
import { queryVoucher } from "../../utils/helpers";
import moment from "moment/moment";

const Show = () => {
    const { id } = useParams();
    const { data: voucher, isError, error, isLoading, isSuccess } = useVoucherQuery(Number(id));

    const [creditVoucher] = useCreditVoucherMutation();
    const [debitVoucher] = useDebitVoucherMutation();
    const [activateVoucher] = useActivateVoucherMutation();
    const [deactivateVoucher] = useDeactivateVoucherMutation();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !voucher) return <SectionLoader/>;

    logger.log('Voucher:', voucher);
    const account = voucher.account;

    const handleQueryVoucher = async (action: 'credit' | 'debit') => {
        await queryVoucher(action, voucher, creditVoucher, debitVoucher)
    }

    const handleStatusChange = async (status: Status) => {
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
    }

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={3}/>
                <Card.Body className="position-relative">
                    <Flex justifyContent={'between'} alignItems={'start'}>
                        <div>
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
                                        onStatusChange={handleStatusChange}/>
                        </div>
                        <i className="fs--1">
                            <b>CREATED:</b> {moment(voucher?.created_at).format('MMM Do, Y, hh:mm A')}
                        </i>
                    </Flex>
                </Card.Body>
            </Card>

            <Row className={'justify-content-center mb-3'}>
                <Col lg={6}>
                    <Card className={'bg-line-chart-gradient'}>
                        <Card.Header
                            className={'bg-transparent light d-flex justify-content-between align-items-start'}>
                            <div>
                                <h6 className="text-white">BALANCE</h6>
                                <h4 className="text-white m-0">
                                    <CountUp end={voucher.balance} prefix={'KES '} separator=","/>
                                </h4>
                            </div>

                            <div className="row gx-2 fw-bolder">
                                <button className="col-auto btn btn-sm btn-light py-0 rounded-end-0"
                                        onClick={() => handleQueryVoucher('debit')}
                                        style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                                    <Tooltip title={'Debit'} placement={'top'}>
                                        <FontAwesomeIcon color={'red'} icon={faMinus}/>
                                    </Tooltip>
                                </button>
                                <button className="col-auto btn btn-sm btn-light py-0 rounded-start-0"
                                        onClick={() => handleQueryVoucher('credit')}
                                        style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                                    <Tooltip title={'Credit'} placement={'top'}>
                                        <FontAwesomeIcon color={'green'} icon={faAdd}/>
                                    </Tooltip>
                                </button>
                            </div>
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

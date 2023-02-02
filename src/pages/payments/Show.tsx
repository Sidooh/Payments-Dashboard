import { Link, useParams } from 'react-router-dom';
import {
    useCheckPaymentMutation,
    useCompletePaymentMutation,
    useFailPaymentMutation,
    usePaymentQuery,
    useQuerySTKStatusMutation,
    useRetryPurchaseMutation,
    useReversePaymentMutation
} from 'features/payments/paymentsAPI';
import CardBgCorner from 'components/CardBgCorner';
import moment from 'moment';
import { PaymentSubType, PaymentType } from 'utils/enums';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import MpesaPayment from './MpesaPayment';
import SourceProvider from './SourceProvider';
import {
    currencyFormat,
    Flex,
    SectionError,
    SectionLoader,
    Status,
    StatusChip,
    Sweet,
    toast,
    Tooltip
} from '@nabcellent/sui-react';
import { logger } from 'utils/logger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRotateLeft,
    faArrowRotateRight,
    faArrowsRotate,
    faClockRotateLeft,
    faCrosshairs,
    faRepeat
} from "@fortawesome/free-solid-svg-icons";
import { SweetAlertOptions } from 'sweetalert2';
import { Fragment } from "react";
import { CONFIG } from "../../config";
import DestinationProvider from "./DestinationProvider";
import { FloatAccountTransaction, Payment, StkRequest, VoucherTransaction } from "../../utils/types";

const Show = () => {
    const { id } = useParams();
    const { data: payment, isError, error, isLoading, isSuccess } = usePaymentQuery(Number(id));

    const [checkPayment] = useCheckPaymentMutation();
    const [reversePayment] = useReversePaymentMutation();
    const [retryPurchase] = useRetryPurchaseMutation();
    const [querySTKStatus] = useQuerySTKStatusMutation();
    const [completePayment] = useCompletePaymentMutation();
    const [failPayment] = useFailPaymentMutation();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payment) return <SectionLoader/>;

    logger.log('Payment:', payment);

    const queryPayment = async (action: 'reverse' | 'check-payment' | 'retry-purchase' | 'query-status') => {
        let options: SweetAlertOptions = {
            backdrop: `rgba(0, 0, 150, 0.4)`,
            showLoaderOnConfirm: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            allowOutsideClick: () => !Sweet.isLoading()
        };

        const queryErrorAlert = (res: any, titleText: string) => toast({
            titleText,
            text: res?.error?.data?.message || res?.error?.error,
            icon: 'error',
        });

        if (action === 'check-payment') {
            options.title = 'Check Payment';
            options.text = 'Are you sure you want to check this payment?';
            options.preConfirm = async () => {
                const res = await checkPayment(payment.id) as any;
                logger.log(res);

                if (res?.data?.id) toast({ titleText: 'Check Payment Complete!' });
                if (res?.error) await queryErrorAlert(res, 'Check Payment Error!');
            };
        }
        if (action === 'reverse') {
            options.title = 'Reverse Payment';
            options.text = 'Are you sure you want to reverse this payment?';
            options.preConfirm = async () => {
                const res = await reversePayment(payment.id) as any;
                logger.log(res);

                if (res?.data?.id) toast({ titleText: 'Payment Reversal Complete!' });
                if (res?.error) await queryErrorAlert(res, 'Payment Reversal Error!');
            };
        }
        if (action === 'retry-purchase') {
            options.title = 'Retry Purchase';
            options.text = 'Are you sure you want to retry the purchase for this payment?';
            options.preConfirm = async () => {
                const res = await retryPurchase(payment.id) as any;
                logger.log(res);

                if (res?.data?.id) toast({ titleText: 'Purchase Retry Complete!' });
                if (res?.error) await queryErrorAlert(res, 'Purchase Retry Error!');
            };
        }
        if (action === 'query-status') {
            options.title = 'Query STK Status';
            options.text = 'Are you sure you want to query STK transactions?';
            options.preConfirm = async () => {
                const res = await querySTKStatus() as any;
                logger.log(res);

                if (res?.data?.status === 0) {
                    toast({ titleText: 'STK Status Query Complete!' })
                } else {
                    await queryErrorAlert(res, 'Something went wrong!');
                }
            };
        }

        await Sweet.fire(options);
    }

    const paymentDropdownItems = [];
    if (payment?.status === Status.PENDING) {
        paymentDropdownItems.push(
            <Dropdown.Item as="button" onClick={() => queryPayment('check-payment')}>
                <FontAwesomeIcon icon={faArrowsRotate}/>&nbsp; Check Payment
            </Dropdown.Item>
        );

        if (payment.subtype === PaymentSubType.STK && (payment.provider as StkRequest)?.status !== Status.PAID) {
            paymentDropdownItems.push(
                <Dropdown.Item as="button" onClick={() => queryPayment('query-status')}>
                    <FontAwesomeIcon icon={faRepeat}/>&nbsp; Query Status
                </Dropdown.Item>
            )
        }
    }
    if (payment?.status === Status.COMPLETED) {
        paymentDropdownItems.push(
            <Dropdown.Item as="button" onClick={() => queryPayment('retry-purchase')}>
                <FontAwesomeIcon icon={faArrowRotateRight}/>&nbsp; Retry Purchase
            </Dropdown.Item>
        );
        paymentDropdownItems.push(
            <Dropdown.Item as="button" onClick={() => queryPayment('reverse')}>
                <FontAwesomeIcon icon={faArrowRotateLeft}/>&nbsp; Reverse Payment
            </Dropdown.Item>
        );
    }

    return (
        <>
            <Card className="mb-3">
                <CardBgCorner corner={4}/>
                <Card.Body className="position-relative">
                    <Flex justifyContent={'between'} className={'mb-3'}>
                        <div>
                            <h5 className={'m-0'}>Payment Details: #{payment?.id}</h5>
                            <p className="fs--1">{moment(payment?.created_at).format('MMM Do, Y, hh:mm A')}</p>
                        </div>
                        <div className={'text-end'}>
                            <h4 className={'m-0'}>{payment?.type.toUpperCase()}</h4>
                            <small><b>{payment.subtype}</b></small>
                        </div>
                    </Flex>
                    <Flex justifyContent={'between'} alignItems={'end'}>
                        <StatusChip status={payment.status} statuses={[Status.COMPLETED, Status.FAILED]}
                                    onStatusChange={async status => {
                                        await Sweet.fire({
                                            backdrop: `rgba(0, 0, 150, 0.4)`,
                                            showLoaderOnConfirm: true,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Proceed',
                                            title: 'Update Status',
                                            html: `Are you sure you want to update the status of this payment to <b>${status}</b>?`,
                                            allowOutsideClick: () => !Sweet.isLoading(),
                                            preConfirm: async () => {
                                                let res;
                                                if (status === Status.COMPLETED) {
                                                    res = await completePayment(payment.id) as any;
                                                } else if (status === Status.FAILED) {
                                                    res = await failPayment(payment.id) as any;
                                                }

                                                if (res?.data?.id) await toast({ titleText: 'Payment status updated!' });
                                                if (res?.error?.data?.message) await toast({
                                                    titleText: res?.error.data.message,
                                                    icon: 'error',
                                                    timer: 7
                                                });
                                            }
                                        });
                                    }}/>
                        <Flex alignItems={'center'}>
                            {payment?.description?.toLowerCase().includes('reversal') && (
                                <Tooltip title={'Previous Payment'} placement={'left'}>
                                    <Link to={`/payments/${payment.destination_data.payment_id}`}
                                          className={'btn btn-secondary py-1 px-2 rounded-circle'}>
                                        <FontAwesomeIcon icon={faClockRotateLeft}/>
                                    </Link>
                                </Tooltip>
                            )}

                            {paymentDropdownItems.length > 0 && (
                                <Dropdown>
                                    <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                        <FontAwesomeIcon icon={faCrosshairs}
                                                         className={'btn btn-danger py-2 px-2 rounded-circle'}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {paymentDropdownItems.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Flex>
                    </Flex>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <CardBgCorner corner={1}/>
                <Card.Body className={'position-relative'}>
                    <Row>
                        <Col lg={4} className="mb-4 mb-lg-0">
                            <h5 className="mb-3 fs-0">Account</h5>
                            <h6 className="mb-2">
                                <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/users/${payment.account?.user_id}`}
                                   target={'_blank'} rel={'noreferrer noopener'}>{payment.account?.user?.name}
                                </a>
                            </h6>
                            <p className="mb-0 fs--1">
                                <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${payment.account?.id}`}
                                   target={'_blank'} rel={'noreferrer noopener'}>{payment.account?.phone}
                                </a>
                            </p>
                        </Col>
                        <Col lg={8} className="mb-4 mb-lg-0">
                            <h5 className="mb-3 fs-0">Details</h5>
                            <Row>
                                <Col>
                                    <p className="mb-0 fs--1"><b>Description: </b>{payment.description}</p>
                                    <div className="fs--1"><b>Amount: </b>({currencyFormat(payment.amount)})</div>
                                </Col>
                                <Col>
                                    <p className="mb-0 fs--1"><b>Source: </b>{payment.type} ~ {payment.subtype}</p>
                                    <p className="mb-0 fs--1">
                                        <b>Destination: </b>{payment.destination_type} ~ {payment.destination_subtype}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {payment?.type === PaymentType.MPESA && <MpesaPayment payment={payment}/>}
            {payment?.type === PaymentType.SIDOOH &&
                <SourceProvider payment={payment as Payment<FloatAccountTransaction | VoucherTransaction>}/>}
            <DestinationProvider payment={payment}/>
        </>
    );
};

export default Show;

import { useParams } from 'react-router-dom';
import { SectionError, SectionLoader, Tooltip } from '@nabcellent/sui-react';
import CardHeader from '@/components/common/CardHeader';
import { Card, Col, Row } from 'react-bootstrap';
import CardBgCorner from '@/components/CardBgCorner';
import { CONFIG } from '@/config';
import CountUp from 'react-countup';
import { logger } from '@/utils/logger';
import { useFloatAccountQuery, useFloatAccountsQuery, useTopUpFloatAccountMutation } from '@/services/floatAccountsApi';
import FloatAccountTransactionsTable from '@/components/tables/FloatAccountTransactionsTable';
import { FaInfo, FaPlus } from 'react-icons/fa6';
import { topUpFloatAccount } from '@/components/TopUpFloatAccount.tsx';

const Show = () => {
    const { id } = useParams();
    const { data: floatAccount, isError, error, isLoading, isSuccess } = useFloatAccountQuery(Number(id));
    const { data: floatAccounts } = useFloatAccountsQuery();
    const [topUpMutation] = useTopUpFloatAccountMutation();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !floatAccount) return <SectionLoader />;

    logger.log(floatAccount);
    const account = floatAccount.account;

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={3} />
                <Card.Body className="position-relative">
                    <h5>Float Account: {floatAccount.description}</h5>
                    <h6>Account: #{account?.id}</h6>
                    <h6 className="mb-2">
                        <a
                            href={`${CONFIG.sidooh.services.accounts.dashboard.url}/users/${account?.user_id}`}
                            target={'_blank'}
                            rel={'noreferrer noopener'}
                        >
                            {account?.user?.name}
                        </a>
                    </h6>
                    <p className="mb-0 fs--1">
                        <a
                            href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account?.id}`}
                            target={'_blank'}
                            rel={'noreferrer noopener'}
                        >
                            {account?.phone}
                        </a>
                    </p>
                </Card.Body>
            </Card>

            <Row className={'justify-content-center mb-3'}>
                <Col lg={6}>
                    <Card className={'bg-line-chart-gradient'}>
                        <Card.Body className={'bg-transparent light d-flex justify-content-between align-items-start'}>
                            <div>
                                <h6 className="text-white">BALANCE</h6>
                                <h4 className="text-white m-0">
                                    <CountUp end={floatAccount.balance} prefix={'KES '} separator="," />
                                </h4>
                            </div>

                            {floatAccounts && floatAccounts?.length > 0 && (
                                <button
                                    className="btn btn-sm btn-light p-0 rounded-circle"
                                    onClick={() => topUpFloatAccount(floatAccount, floatAccounts, topUpMutation)}
                                    style={{ width: 30, height: 30 }}
                                >
                                    <Tooltip title={'Top Up'} placement={'top'}>
                                        <FaPlus style={{ color: 'green' }} />
                                    </Tooltip>
                                </button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {floatAccount?.transactions?.length ? (
                <FloatAccountTransactionsTable transactions={floatAccount.transactions} />
            ) : (
                <Card className={'mb-3 bg-soft-primary'}>
                    <CardHeader title={'No Float Transactions Made Yet.'}>
                        <FaInfo />
                    </CardHeader>
                </Card>
            )}
        </>
    );
};

export default Show;

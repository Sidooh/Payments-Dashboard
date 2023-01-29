import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMpesaPaymentsQuery } from '../../features/mpesa/mpesaAPI';
import {
    currencyFormat,
    DataTable, PhoneChip,
    SectionError,
    SectionLoader,
    StatusChip,
    Str,
    TableDate
} from '@nabcellent/sui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { logger } from 'utils/logger';
import { CONFIG } from "../../config";
import { MpesaC2BCallback, Payment } from "../../utils/types";

const STKPayments = () => {
        let { data: payments, isLoading, isSuccess, isError, error } = useMpesaPaymentsQuery({
            type: 'MPESA',
            sub_type: 'c2b'
        });
        logger.log(payments);

        if (isError) return <SectionError error={error}/>;
        if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

        return (
            <Card className={'mb-3'}>
                <Card.Body>
                    <DataTable title={`C2B Payments`} columns={[
                        {
                            accessorKey: 'user',
                            accessorFn:(p:Payment<MpesaC2BCallback>) => {
                                const name = Str.headline(`${p.provider?.first_name} ${p.provider?.middle_name} ${p.provider?.last_name}`)
                                return `${name}: ${p.provider?.msisdn}`
                            },
                            header: 'User',
                            cell: ({ row: { original } }: any) => {
                                const provider = original.provider
                                const name = Str.headline(`${provider?.first_name} ${provider?.middle_name} ${provider?.last_name}`)

                                return (
                                    <>
                                        {name} <br/>
                                        <PhoneChip phone={provider.msisdn}/>
                                    </>
                                )
                            }
                        },
                        {
                            accessorKey: 'amount',
                            header: 'Amount',
                            cell: ({ row }: any) => currencyFormat(row.original.amount)
                        },
                        {
                            accessorKey: 'trans_id',
                            accessorFn: (p: Payment<MpesaC2BCallback>) => p.provider?.trans_id,
                            header: 'Transaction ID'
                        },
                        {
                            accessorKey: 'status',
                            header: 'Status',
                            cell: ({ row }: any) => <StatusChip status={row.original.status}/>
                        },
                        {
                            accessorKey: 'updated_at',
                            header: 'Created',
                            cell: ({ row }: any) => <TableDate date={row.original.created_at}/>
                        },
                        {
                            id: 'Actions',
                            cell: ({ row }: any) => (
                                <Link to={`/payments/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                            )
                        }
                    ]} data={payments}/>
                </Card.Body>
            </Card>
        );
    }
;

export default STKPayments;

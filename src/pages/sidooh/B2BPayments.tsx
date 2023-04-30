import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMpesaPaymentsQuery } from '../../features/mpesa/mpesaAPI';
import {
    currencyFormat,
    DataTable,
    getRelativeDateAndTime, IconButton,
    SectionError,
    SectionLoader,
    StatusChip,
    TableDate
} from '@nabcellent/sui-react';
import { logger } from 'utils/logger';
import { Payment } from "../../utils/types";
import moment from "moment/moment";
import Latency from "../../components/Latency";
import { FaEye, FaRegEye } from "react-icons/all";

const B2BPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error } = useMpesaPaymentsQuery({
        type: 'SIDOOH',
        sub_type: 'B2B'
    });
    logger.log(payments);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`B2B Payments`} columns={[
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({ row }: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'description',
                        header: 'Description',
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({ row }: any) => <StatusChip status={row.original.status}/>
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Updated',
                        accessorFn: (row: Payment) => getRelativeDateAndTime(row.updated_at).toString(),
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        accessorKey: 'latency',
                        accessorFn: (r: Payment) => moment(r.updated_at).diff(r.created_at, 's'),
                        cell: ({ row: { original: p } }: any) => <Latency from={p.created_at} to={p.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/payments/${row.original.id}`}>
                                <IconButton size={'sm'}><FaRegEye/></IconButton>
                            </Link>
                        )
                    }
                ]} data={payments}/>
            </Card.Body>
        </Card>
    );
};

export default B2BPayments;

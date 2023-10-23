import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMpesaPaymentsQuery } from '../../features/mpesa/mpesaAPI';
import {
    currencyFormat,
    DataTable,
    getRelativeDateAndTime,
    SectionError,
    SectionLoader,
    StatusChip,
    TableDate
} from '@nabcellent/sui-react';
import { logger } from 'utils/logger';
import { Payment } from "../../utils/types";
import { FaRegEye } from "react-icons/fa6";

const STKPayments = () => {
    let { data: payments, isLoading, isSuccess, isError, error } = useMpesaPaymentsQuery({
        type: 'mpesa',
        sub_type: 'stk'
    });
    logger.log(payments);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payments) return <SectionLoader/>;

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`STK Payments`} columns={[
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({ row }: any) => currencyFormat(row.original.amount)
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
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/payments/${row.original.id}`}><FaRegEye/></Link>
                        )
                    }
                ]} data={payments}/>
            </Card.Body>
        </Card>
    );
};

export default STKPayments;

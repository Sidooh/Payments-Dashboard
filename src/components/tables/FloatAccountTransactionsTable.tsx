import { Card } from 'react-bootstrap';
import { currencyFormat, DataTable, getRelativeDateAndTime, TableDate } from '@nabcellent/sui-react';
import { FloatAccountTransaction } from 'utils/types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const FloatAccountTransactionsTable = ({ transactions }: { transactions: FloatAccountTransaction[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Float Account Transactions`} columns={[
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
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
                        accessorKey: 'created_at',
                        header: 'Created',
                        accessorFn: (row: FloatAccountTransaction) => getRelativeDateAndTime(row.created_at).toString(),
                        cell: ({ row }: any) => <TableDate date={row.original.created_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/payments/${row.original?.payment?.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                        )
                    }
                ]} data={transactions}/>
            </Card.Body>
        </Card>
    );
};

export default FloatAccountTransactionsTable;

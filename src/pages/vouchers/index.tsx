import { Card } from 'react-bootstrap';
import { useVouchersQuery } from '../../features/vouchers/vouchersAPI';
import { currencyFormat, DataTable, PhoneChip, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import SidoohAccount from 'components/common/SidoohAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { logger } from 'utils/logger';
import { Voucher } from "../../utils/types";

const Vouchers = () => {
    let { data: vouchers, isLoading, isSuccess, isError, error } = useVouchersQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !vouchers) return <SectionLoader/>;

    logger.log(vouchers);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={`Vouchers`} columns={[
                    {
                        accessorKey: 'account',
                        header: 'Account',
                        cell: ({ row }: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'type',
                        accessorFn: (r: Voucher) => r.voucher_type?.name,
                        header: 'Type',
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({ row }: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'updated_at',
                        header: 'Updated At',
                        cell: ({ row }: any) => <TableDate date={row.original.updated_at}/>
                    },
                    {
                        id: 'Actions',
                        cell: ({ row }: any) => (
                            <Link to={`/vouchers/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                        )
                    }
                ]} data={vouchers}/>
            </Card.Body>
        </Card>
    );
};

export default Vouchers;

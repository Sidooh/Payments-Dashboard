import { useVoucherTransactionsQuery } from 'features/vouchers/vouchersAPI';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import VoucherTransactionsTable from 'components/tables/VoucherTransactionsTable';

const VoucherTransactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useVoucherTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

    return <VoucherTransactionsTable transactions={transactions}/>
};

export default VoucherTransactions;

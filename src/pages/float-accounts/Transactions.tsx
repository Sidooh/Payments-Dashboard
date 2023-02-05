import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import { logger } from 'utils/logger';
import { useFloatAccountsTransactionsQuery } from "features/float-accounts/floatAccountsApi";
import FloatAccountTransactionsTable from "components/tables/FloatAccountTransactionsTable";

const FloatAccountsTransactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useFloatAccountsTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    logger.log(transactions);

    return <FloatAccountTransactionsTable transactions={transactions} showAccountColumn/>
};

export default FloatAccountsTransactions;

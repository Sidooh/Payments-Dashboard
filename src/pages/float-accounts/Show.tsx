import { useParams } from 'react-router-dom';
import CardBgCorner from '@/components/CardBgCorner';
import CountUp from 'react-countup';
import { useFloatAccountQuery, useFloatAccountsQuery } from '@/services/floatAccountsApi';
import FloatAccountTransactionsTable from '@/components/tables/FloatAccountTransactionsTable';
import { FaPlus } from 'react-icons/fa6';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import AlertInfo from '@/components/alerts/AlertInfo.tsx';
import SidoohAccount from '@/components/common/SidoohAccount.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import FloatTopUpForm from '@/components/FloatTopUpForm.tsx';

const Show = () => {
    const { id } = useParams();
    const { data: floatAccount, isError, error, isLoading, isSuccess } = useFloatAccountQuery(Number(id));
    const { data: floatAccounts } = useFloatAccountsQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !floatAccount) return <Skeleton className={'h-[500px]'} />;

    const account = floatAccount.account;

    return (
        <div className={'space-y-3'}>
            <Card className={'relative'}>
                <CardBgCorner corner={3} />
                <CardHeader className={'relative font-semibold leading-none tracking-tight'}>
                    <p>Float Account: #{floatAccount.id}</p>
                    <p>Sidooh Account: #{account?.id}</p>
                </CardHeader>
                <CardContent className="relative space-y-3">
                    <SidoohAccount account={account} />
                    <Separator />
                    <div>
                        <p className={'text-muted-foreground text-xs'}>Description</p>
                        <p>{floatAccount.description}</p>
                    </div>
                </CardContent>
            </Card>

            <div className={'grid lg:grid-cols-3'}>
                <div className={'lg:col-start-2'}>
                    <Card className={'relative bg-[linear-gradient(-45deg,#414ba7,#4a2613)] bg-center'}>
                        <CardHeader className="text-muted-foreground text-sm pb-0">BALANCE</CardHeader>

                        <CardContent>
                            <CountUp
                                className={'text-white text-xl'}
                                end={floatAccount.balance}
                                prefix={'KES '}
                                separator=","
                            />

                            {floatAccounts && floatAccounts?.length > 0 && (
                                <FloatTopUpForm
                                    floatAccount={floatAccount}
                                    floatAccounts={floatAccounts.filter((f) => f.id !== floatAccount.id)}
                                    trigger={
                                        <Button
                                            size={'icon'}
                                            variant={'secondary'}
                                            className="rounded-full absolute top-3 end-3 w-7 h-7"
                                        >
                                            <FaPlus color={'green'} />
                                        </Button>
                                    }
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {floatAccount?.transactions?.length ? (
                <FloatAccountTransactionsTable transactions={floatAccount.transactions} />
            ) : (
                <AlertInfo title={'No Float Account Transactions Made Yet.'} />
            )}
        </div>
    );
};

export default Show;

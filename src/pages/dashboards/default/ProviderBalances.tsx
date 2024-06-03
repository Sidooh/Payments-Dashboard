import { useGetProvidersBalancesQuery } from '@/services/dashboardApi';
import CountUp from 'react-countup';
import CardBgCorner from '@/components/CardBgCorner';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';

const ProviderBalances = () => {
    const { data, isError, error, isLoading, isSuccess } = useGetProvidersBalancesQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !data) return <Skeleton className={'h-[100px]'} />;

    return (
        <div className="grid grid-cols-3 gap-3 h-full">
            <div className={'2xl:mb-2'}>
                <Card className={'relative bg-[linear-gradient(-45deg,#414ba7,#4a2613)] bg-center'}>
                    <CardBgCorner />
                    <CardHeader className="md:mb-0 lg:mb-2 text-muted-foreground pb-0">Org. Mpesa Balance</CardHeader>
                    <CardContent>
                        <h4 className="m-0 fs-1 fw-bold text-white">
                            <CountUp end={data.org_balance} separator="," prefix={'KES '} decimals={2} />
                        </h4>
                    </CardContent>
                </Card>
            </div>
            <div className={'2xl:mb-2'}>
                <Card className={'relative bg-[linear-gradient(-45deg,#414ba7,#4a2613)] bg-center'}>
                    <CardBgCorner corner={2} />
                    <CardHeader className="md:mb-0 lg:mb-2 text-muted-foreground pb-0">B2B Balance</CardHeader>
                    <CardContent>
                        <h4 className="m-0 fs-1 fw-bold text-white">
                            <CountUp end={data.b2b_balance} separator="," prefix={'KES '} decimals={2} />
                        </h4>
                    </CardContent>
                </Card>
            </div>
            <div className={'2xl:mb-2'}>
                <Card className={'relative bg-[linear-gradient(-45deg,#414ba7,#4a2613)] bg-center'}>
                    <CardBgCorner corner={2} />
                    <CardHeader className="md:mb-0 lg:mb-2 text-muted-foreground pb-0">B2C Balance</CardHeader>
                    <CardContent>
                        <h4 className="m-0 fs-1 fw-bold text-white">
                            <CountUp end={data.b2c_balance} separator="," prefix={'KES '} decimals={2} />
                        </h4>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProviderBalances;

import { useGetDashboardSummariesQuery } from '@/services/dashboardApi';
import CardBgCorner from '@/components/CardBgCorner';
import CountUp from 'react-countup';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Badge } from '@/components/ui/badge.tsx';

const PaymentSummaries = () => {
    const { data: stats, isError, error, isLoading, isSuccess } = useGetDashboardSummariesQuery();

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !stats) return <Skeleton className={'h-[120px]'} />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-3 h-full">
            <Card className={'relative'}>
                <CardBgCorner corner={2} />
                <CardHeader className={'pb-0'}>
                    <span className={'text-sm text-muted-foreground'}>Payments</span>
                    <div className="absolute top-3 right-6">
                        <Badge className={'rounded-full'}>
                            <CountUp end={stats.total_payments_today} separator="," />
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className={'relative flex flex-col justify-content-center'}>
                    <h5 className="text-xl font-semibold">
                        <CountUp end={stats.total_payments} separator="," />
                    </h5>
                </CardContent>
            </Card>
            <Card className={'relative'}>
                <CardBgCorner />
                <CardHeader className={'pb-0'}>
                    <span className={'text-sm text-muted-foreground'}>Revenue</span>
                    <div className="absolute top-3 right-6">
                        <Badge className={'bg-green-500 rounded-full'}>
                            <CountUp end={stats.total_revenue_today} prefix={'KES '} separator="," />
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className={'flex flex-col justify-content-center'}>
                    <h5 className="text-xl font-semibold">
                        <CountUp end={stats.total_revenue} prefix={'KES '} separator="," />
                    </h5>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentSummaries;

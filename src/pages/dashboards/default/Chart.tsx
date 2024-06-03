import { useEffect, useState } from 'react';
import { useGetDashboardChartDataQuery } from '@/services/dashboardApi';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartDataset,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartTooltip,
    TooltipItem,
} from 'chart.js';
import CardBgCorner from '../../../components/CardBgCorner';
import { AnalyticsChartData, RawAnalytics } from '@/lib/types';
import { FaSync } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { Frequency, Period, Status } from '@/lib/enums.ts';
import { groupBy, Str } from '@/lib/utils.ts';
import { ChartAid } from '@/lib/ChartAid.ts';
import AlertError from '@/components/alerts/AlertError.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Button } from '@/components/ui/button.tsx';

Chart.register(Title, ChartTooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
Chart.defaults.color = '#fff';
Chart.defaults.font.weight = 700;
Chart.defaults.font.family = "'Avenir', sans-serif";

const DashboardChart = () => {
    const { data, isError, error, isLoading, isSuccess, refetch } = useGetDashboardChartDataQuery();

    const [txStatus, setTxStatus] = useState<Status | 'ALL'>(Status.COMPLETED);
    const [chartTypeOpt, setChartTypeOpt] = useState<'time-series' | 'cumulative'>('time-series');
    const [labels, setLabels] = useState<string[]>([]);
    const [datasets, setDatasets] = useState<ChartDataset<'line'>[]>([]);
    const [checkedPeriods, setCheckedPeriods] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            const property = txStatus === 'ALL' ? 'date' : 'status';
            let groupedData: { [key: string]: AnalyticsChartData[] } = groupBy(data, property),
                rawAnalytics: RawAnalytics[];

            if (txStatus === 'ALL') {
                rawAnalytics = Object.keys(groupedData).map((date) => {
                    return groupedData[date].reduce(
                        (prev, curr) => ({
                            date,
                            amount: prev.amount + Number(curr.amount),
                            count: prev.count + curr.count,
                        }),
                        { date: '', count: 0, amount: 0 }
                    );
                });
            } else {
                rawAnalytics = groupedData[txStatus] ?? [];
            }

            const aggregate = (agg?: 'amount' | 'count') => {
                const aid = new ChartAid(Period.LAST_24_HOURS, Frequency.HOURLY, agg);
                let { labels, dataset } = aid.getDataset(rawAnalytics);

                if (chartTypeOpt === 'cumulative') {
                    dataset = dataset.reduce((a: number[], b, i) => (i === 0 ? [b] : [...a, b + a[i - 1]]), []);
                }

                return { labels, dataset };
            };

            let datasets: ChartDataset<'line'>[] = [];
            ['count', 'amount'].forEach((a, i) => {
                const { labels, dataset: data } = aggregate(a as 'count' | 'amount');

                if (i === 0) setLabels(labels);

                datasets.push({
                    data,
                    label: Str.headline(a),
                    borderColor: Str.headline(a) === 'Amount' ? '#1A801A' : '#9D9BC3',
                });
            });

            setDatasets(datasets);
        }
    }, [data, chartTypeOpt, txStatus, checkedPeriods]);

    useEffect(() => {
        if (data) setCheckedPeriods(Object.keys(data));
    }, [data]);

    if (isError) return <AlertError error={error} />;
    if (isLoading || !isSuccess || !data) return <Skeleton className={'h-[300px]'} />;

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    color: 'rgba(250, 250, 250, .1)',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                align: 'start',
                display: true,
                text: 'PAYMENTS',
                font: {
                    size: 14,
                },
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: (item: TooltipItem<'line'>) => {
                        const label = Str.headline(String(item.dataset.label));

                        return `${label}: ${label === 'Amount' ? 'KES' : ''} ${item.formattedValue}`;
                    },
                },
            },
        },
    };

    const chartData: ChartData<'line'> = {
        labels,
        datasets: datasets.map((d) => ({
            label: d.label,
            data: d.data,
            borderColor: d.borderColor,
            backgroundColor: '#0F1B4C',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointStyle: 'star',
        })),
    };

    return (
        <Card className={'relative'}>
            <CardBgCorner />
            <CardContent
                className={'p-3 lg:p-6 relative pt-3 pb-2 rounded-xl'}
                style={{
                    height: 300,
                    backgroundImage: 'linear-gradient(-45deg, rgba(65, 75, 167, .5), #198019)',
                }}
            >
                <div className="flex absolute right-0 me-3">
                    <Button size={'icon'} className="shadow-sm me-2 w-7 h-7" type="button" onClick={() => refetch()}>
                        <FaSync size={12} />
                    </Button>
                    <Select
                        value={chartTypeOpt}
                        onValueChange={(e) => setChartTypeOpt(e as 'time-series' | 'cumulative')}
                    >
                        <SelectTrigger className="w-24 h-7 lg:w-[120px] px-2 me-2">
                            <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chart Type</SelectLabel>
                                <SelectItem value="time-series">Time Series</SelectItem>
                                <SelectItem value="cumulative">Cumulative</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={txStatus} onValueChange={(e) => setTxStatus(e as Status)}>
                        <SelectTrigger className="w-24 h-7 lg:w-[120px] px-2">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="ALL">ALL</SelectItem>
                                {[Status.COMPLETED, Status.FAILED, Status.PENDING, Status.REFUNDED].map((status, i) => (
                                    <SelectItem key={`status-${i}`} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Line options={options} data={chartData} />
            </CardContent>
        </Card>
    );
};

export default DashboardChart;

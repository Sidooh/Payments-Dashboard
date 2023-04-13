import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { useGetDashboardChartDataQuery } from 'features/dashboard/dashboard.api';
import {
    ChartAid,
    ComponentLoader,
    Frequency,
    groupBy,
    LoadingButton,
    Period,
    RawAnalytics,
    SectionError,
    Status,
    Str
} from '@nabcellent/sui-react';
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    Chart,
    ChartData, ChartDataset,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartTooltip,
    TooltipItem
} from "chart.js";
import CardBgCorner from "../../../components/CardBgCorner";
import { AnalyticsChartData } from "../../../utils/types";

type Dataset = { label: string, dataset: number[], color: string }

Chart.register(Title, ChartTooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
Chart.defaults.color = '#fff'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const DashboardChart = () => {
    const { data, isError, error, isLoading, isSuccess, refetch } = useGetDashboardChartDataQuery();

    const [txStatus, setTxStatus] = useState<Status | 'ALL'>(Status.COMPLETED);
    const [chartTypeOpt, setChartTypeOpt] = useState<'time-series' | 'cumulative'>('time-series')
    const [labels, setLabels] = useState<string[]>([])
    const [datasets, setDatasets] = useState<ChartDataset<'line'>[]>([])
    const [checkedPeriods, setCheckedPeriods] = useState<(string)[]>([])

    useEffect(() => {
        if (data) {
            const property = txStatus === 'ALL' ? 'date' : 'status'
            let groupedData: { [key: string]: AnalyticsChartData[] } = groupBy(data, property),
                rawAnalytics: RawAnalytics[];

            if (txStatus === 'ALL') {
                rawAnalytics = Object.keys(groupedData).map(date => {
                    return groupedData[date].reduce((prev, curr) => ({
                        date,
                        amount: prev.amount + Number(curr.amount),
                        count: prev.count + curr.count,
                    }), { date: '', count: 0, amount: 0 })
                })
            } else {
                rawAnalytics = groupedData[txStatus] ?? []
            }

            const aggregate = (agg?: 'amount' | 'count') => {
                const aid = new ChartAid(Period.LAST_24_HOURS, Frequency.HOURLY, agg)
                let { labels, dataset } = aid.getDataset(rawAnalytics)

                if (chartTypeOpt === 'cumulative') {
                    dataset = dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
                }

                return { labels, dataset }
            }

            let datasets: ChartDataset<'line'>[] = [];
            ['count', 'amount'].forEach((a, i) => {
                const { labels, dataset: data } = aggregate(a as 'count' | 'amount')

                if (i === 0) setLabels(labels)

                datasets.push({
                    data,
                    label: Str.headline(a),
                    borderColor: Str.headline(a) === 'Amount' ? '#900' : '#fff'
                })
            })

            setDatasets(datasets)
        }
    }, [data, chartTypeOpt, txStatus, checkedPeriods])

    useEffect(() => {
        if (data) setCheckedPeriods(Object.keys(data))
    }, [data])

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

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
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            x: {
                grid: {
                    color: 'rgba(250, 250, 250, .1)',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                align: 'start',
                display: true,
                text: 'PAYMENTS',
                font: {
                    size: 17
                },
                padding: {
                    bottom: 20
                }
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: (item: TooltipItem<'line'>) => {
                        const label = Str.headline(String(item.dataset.label))

                        return `${label}: ${label === 'Amount' ? 'KES' : ''} ${item.formattedValue}`
                    }
                }
            }
        },
    };

    const chartData: ChartData<'line'> = {
        labels,
        datasets: datasets.map(d => ({
            label: d.label,
            data: d.data,
            borderColor: d.borderColor,
            backgroundColor: '#0F1B4C',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointStyle: 'star'
        })),
    };

    return (
        <Card className="rounded-3 overflow-hidden h-100 shadow-none">
            <CardBgCorner/>
            <Card.Body className={'position-relative pb-2'} style={{
                height: 300,
                backgroundImage: 'linear-gradient(-45deg, rgba(65, 75, 167, .5), #198019)'
            }}>
                <div className="d-flex position-absolute right-0 me-3">
                    <LoadingButton className="btn btn-sm btn-light me-2 refresh-chart" type="button"
                                   title="Update LineChart" onClick={() => refetch()}>
                        <FontAwesomeIcon icon={faSync}/>
                    </LoadingButton>
                    <Form.Select className="px-2 me-2" value={chartTypeOpt} size={'sm'} onChange={e => {
                        setChartTypeOpt(e.target.value as 'time-series' | 'cumulative')
                    }}>
                        <option value="time-series">Time Series</option>
                        <option value="cumulative">Cumulative</option>
                    </Form.Select>
                    <Form.Select className="px-2" size="sm" value={txStatus}
                                 onChange={e => setTxStatus(e.target.value as Status)}>
                        <option value="ALL">All</option>
                        {[Status.COMPLETED, Status.FAILED, Status.PENDING, Status.REFUNDED].map((status, i) => (
                            <option key={`status-${i}`} value={status}>{status}</option>
                        ))}
                    </Form.Select>
                </div>

                <Line options={options} data={chartData}/>
            </Card.Body>
        </Card>
    );
};

export default DashboardChart;

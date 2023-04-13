import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import {
    ChartAid,
    chartGradient,
    ComponentLoader,
    Frequency,
    groupBy,
    Period,
    RawAnalytics,
    SectionError,
    Status, Str
} from '@nabcellent/sui-react';
import { ChartData, ChartDataset, ChartOptions, TooltipItem } from "chart.js";
import { useGetPaymentsQuery } from 'features/analytics/analyticsApi';
import { defaultLineChartOptions } from "utils/helpers";
import LineChart from "components/LineChart";
import { AnalyticsChartData } from "../../../utils/types";

type Agg = 'count' | 'amount'

const Payments = () => {
    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetPaymentsQuery();

    const [txStatus, setTxStatus] = useState<Status | 'ALL'>(Status.COMPLETED);
    const [chartTypeOpt, setChartTypeOpt] = useState<'time-series' | 'cumulative'>('time-series')
    const [chartPeriodOpt, setChartPeriodOpt] = useState(Period.LAST_SIX_MONTHS)
    const [chartFreqOpt, setChartFreqOpt] = useState(Frequency.MONTHLY)
    const [labels, setLabels] = useState<string[]>([])
    const [datasets, setDatasets] = useState<ChartDataset<'line'>[]>([])
    const [checkedAgg, setCheckedAgg] = useState<Agg[]>(['count', 'amount'])

    const getAggColor = (agg: Agg) => {
        return agg.toLowerCase() === 'count' ? [15, 27, 76] : [100, 250, 50]
    }

    useEffect(() => {
        if (data?.length) {
            let groupedData: {
                    [key: string]: AnalyticsChartData[]
                } = groupBy(data, txStatus === 'ALL' ? 'date' : 'status'),
                rawAnalytics: RawAnalytics[]

            if (txStatus === 'ALL') {
                rawAnalytics = Object.keys(groupedData).map(date => {
                    return groupedData[date].reduce((prev, curr) => ({
                        date,
                        count: prev.count + curr.count,
                        amount: Number(prev.amount) + Number(curr.amount)
                    }), { date: '', count: 0, amount: 0 })
                })
            } else {
                rawAnalytics = groupedData[txStatus]
            }

            let datasets: ChartDataset<'line'>[] = [];
            checkedAgg.forEach((a, i) => {
                const aid = new ChartAid(chartPeriodOpt, chartFreqOpt, a)
                aid.timeIsUTC = true
                let { labels, dataset } = aid.getDataset(rawAnalytics)

                if (chartTypeOpt === 'cumulative') {
                    dataset = dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
                }

                if (i === 0) setLabels(labels)

                const rgb = getAggColor(a as Agg)

                datasets.push({
                    data: dataset,
                    label: Str.headline(a),
                    borderColor: `rgba(${rgb.join(', ')}, .3)`,
                    backgroundColor: chartGradient(rgb)
                })
            })

            setDatasets(datasets)
        }
    }, [data, chartPeriodOpt, chartFreqOpt, chartTypeOpt, txStatus, checkedAgg])

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    const options: ChartOptions<'line'> = defaultLineChartOptions({
        plugins: {
            title: {
                text: 'Payments',
                padding: {
                    bottom: 45
                }
            },
            tooltip: {
                callbacks: {
                    label: (item: TooltipItem<'line'>) => {
                        const label = Str.headline(String(item.dataset.label))

                        return `${label}: ${label === 'Amount' ? 'KES' : ''} ${item.formattedValue}`
                    }
                }
            },
        }
    });

    const chartData: ChartData<'line'> = {
        labels,
        datasets: datasets.map(d => ({
            label: d.label,
            data: d.data,
            borderColor: d.borderColor,
            backgroundColor: d.backgroundColor,
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointStyle: 'star'
        })),
    };

    const handleCheckedAgg = (e: ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checkedAgg];

        if (e.target.checked) {
            updatedList = [...(checkedAgg as Agg[]), e.target.value as Agg];
        } else {
            updatedList.splice(checkedAgg.indexOf(e.target.value as Agg), 1);
        }

        setCheckedAgg(updatedList);
    }

    return (
        <Col>
            <LineChart
                data={chartData}
                options={options}
                refetch={refetch}
                isFetching={isFetching}
                txStatus={txStatus} setTxStatus={setTxStatus}
                chartTypeOpt={chartTypeOpt} setChartTypeOpt={setChartTypeOpt}
                chartPeriodOpt={chartPeriodOpt} setChartPeriodOpt={setChartPeriodOpt}
                chartFreqOpt={chartFreqOpt} setChartFreqOpt={setChartFreqOpt}
                extraModifiers={['amount', 'count'].sort().map((agg, i) => (
                    <Form.Check key={`agg-${i}`} className={`px-2 me-2 ms-3`} id={`agg-tx-${i}`} value={agg}
                                style={{ color: `rgb(${getAggColor(agg as Agg).join(',')})` }}
                                type={'checkbox'} label={<b>{Str.headline(agg)}</b>}
                                checked={checkedAgg.includes(agg as Agg)}
                                onChange={handleCheckedAgg}/>
                ))}
            />
        </Col>
    );
};

export default Payments;

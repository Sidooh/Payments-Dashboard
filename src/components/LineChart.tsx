import { Card, Form } from "react-bootstrap";
import { chartSelectOptions, Frequency, LoadingButton, Period, Status, Str } from "@nabcellent/sui-react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { Dispatch, ReactNode } from "react";
import { FaSync } from "react-icons/all";
import CardBgCorner from "./CardBgCorner";

type LineChartProps = {
    options: ChartOptions<'line'>
    data: ChartData<'line'>
    refetch: () => QueryActionCreatorResult<any>,
    isFetching: boolean,
    chartTypeOpt: 'time-series' | 'cumulative'
    setChartTypeOpt: Dispatch<LineChartProps['chartTypeOpt']>
    chartPeriodOpt: Period
    setChartPeriodOpt: Dispatch<Period>
    chartFreqOpt: Frequency
    setChartFreqOpt: Dispatch<Frequency>
    txStatus: Status | 'ALL'
    setTxStatus: Dispatch<Status | 'ALL'>
    extraModifiers?: ReactNode
    cardBg?: 1 | 2 | 3 | 4 | 5
}

const LineChart = ({
    options,
    data,
    refetch,
    isFetching,
    chartTypeOpt,
    setChartTypeOpt,
    chartPeriodOpt,
    setChartPeriodOpt,
    chartFreqOpt,
    setChartFreqOpt,
    txStatus,
    setTxStatus,
    extraModifiers,
}: LineChartProps) => {
    return (
        <Card className="rounded-3 overflow-hidden">
            <CardBgCorner corner={5}/>
            <Card.Body className={'position-relative pb-2'} style={{ height: 350, }}>
                <div className="position-absolute right-0 me-3">
                    <div className={'d-flex'}>
                        <LoadingButton loading={isFetching} className="btn btn-sm btn-light border-0 me-2"
                                       spinner-position="replace" onClick={() => refetch()}>
                            <FaSync size={12}/>
                        </LoadingButton>
                        <Form.Select className="px-2 me-2" value={chartTypeOpt} size={'sm'} onChange={e => {
                            setChartTypeOpt(e.target.value as 'time-series' | 'cumulative')
                        }}>
                            <option value="time-series">Time Series</option>
                            <option value="cumulative">Cumulative</option>
                        </Form.Select>
                        <Form.Select className="px-2 me-2" size={'sm'} value={chartPeriodOpt}
                                     onChange={e => {
                                         setChartPeriodOpt(e.target.value as Period)
                                         setChartFreqOpt(chartSelectOptions[e.target.value as Period][0])
                                     }}>
                            {Object.values(Period).map(p => <option key={p} value={p}>{Str.headline(p)}</option>)}
                        </Form.Select>
                        <Form.Select className="px-2 me-2" value={chartFreqOpt} size={'sm'} onChange={e => {
                            setChartFreqOpt(e.target.value as Frequency)
                        }} disabled={chartSelectOptions[chartPeriodOpt].length < 2}>
                            {chartSelectOptions[chartPeriodOpt].map(f => (
                                <option key={f} value={f}>{Str.headline(f)}</option>
                            ))}
                        </Form.Select>
                        <Form.Select className="px-2" size="sm" value={txStatus}
                                     onChange={e => setTxStatus(e.target.value as Status)}>
                            <option value="ALL">All</option>
                            {[Status.COMPLETED, Status.FAILED, Status.PENDING, Status.REFUNDED].map((status, i) => (
                                <option key={`status-${i}`} value={status}>{status}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className={'d-flex justify-content-end mt-2'}>{extraModifiers}</div>
                </div>

                <Line options={options} data={data}/>
            </Card.Body>
        </Card>
    );
};

export default LineChart;
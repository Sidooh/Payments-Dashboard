import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { getColor, rgbaColor } from 'utils/helpers';
import { PaymentStatus } from './Payment';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import ECharts from 'components/common/echarts';

type ChartData = {
    all: number[],
    successful: number[],
    failed: number[]
}
type PaymentChartType = {
    data: ChartData
    paymentStatus: PaymentStatus
    style: object
}

echarts.use([LineChart, TooltipComponent, GridComponent, LegendComponent]);

const getOptions = (data: ChartData, paymentStatus: PaymentStatus, isDark: boolean) => ({
    tooltip: {
        trigger           : 'axis',
        axisPointer       : {
            type: 'none'
        },
        padding           : [7, 10],
        backgroundColor   : getColor('100'),
        borderColor       : getColor('300'),
        borderWidth       : 1,
        transitionDuration: 0,
        textStyle         : {
            fontWeight: 500,
            fontSize  : 12,
            color     : getColor('dark')
        },
        formatter         : (params: any) => `${params[0].axisValue} - ${params[0].value} USD`
    },
    xAxis  : {
        show: true,
        type       : 'category',
        data       : [
            '9:00 AM',
            '10:00 AM',
            '11:00 AM',
            '12:00 PM',
            '1:00 PM',
            '2:00 PM',
            '3:00 PM',
            '4:00 PM',
            '5:00 PM',
            '6:00 PM',
            '7:00 PM',
            '8:00 PM'
        ],
        boundaryGap: false,
        splitLine  : {
            show     : true,
            lineStyle: {
                color: rgbaColor('#fff', 0.1)
            },
            interval : 0
        },
        axisLine   : {
            lineStyle: {
                color: rgbaColor('#fff', 0.1)
            }
        },
        axisTick   : {
            show     : true,
            length   : 10,
            lineStyle: {
                color: rgbaColor('#fff', 0.1)
            }
        },
        axisLabel  : {
            color     : getColor('400'),
            fontWeight: 600,
            fontSize  : 12,
            margin    : 15,
            interval  : window.innerWidth < 768 ? 'auto' : 0,
            formatter : (value: string) => value.substring(0, value.length - 3)
        }
    },
    yAxis  : {
        type       : 'value',
        axisPointer: {
            show: false
        },
        splitLine  : {
            show: false
        },
        axisLabel  : {
            show: false
        },
        axisTick   : {show: false},
        axisLine   : {show: false}
    },
    series : [
        {
            type     : 'line',
            smooth   : true,
            data     : data[paymentStatus].map(item => (item * 3.14).toFixed(2)),
            symbol   : 'emptyCircle',
            itemStyle: {
                color: isDark ? getColor('primary') : getColor('white')
            },
            lineStyle: {
                color: isDark
                    ? rgbaColor(getColor('primary'), 0.8)
                    : rgbaColor(getColor('white'), 0.8)
            },
            areaStyle: {
                color: {
                    type      : 'linear',
                    x         : 0,
                    y         : 0,
                    x2        : 0,
                    y2        : 1,
                    colorStops: [
                        {
                            offset: 0,
                            color : isDark
                                ? rgbaColor(getColor('primary'), 0.5)
                                : rgbaColor('#fff', 0.5)
                        },
                        {
                            offset: 1,
                            color : isDark
                                ? rgbaColor(getColor('primary'), 0)
                                : rgbaColor('#fff', 0)
                        }
                    ]
                }
            },
            emphasis : {
                lineStyle: {
                    width: 2
                }
            }
        }
    ],
    grid   : {right: 15, left: 15, bottom: '15%', top: 0}
});

const PaymentChart = ({data, paymentStatus, style}: PaymentChartType ) => {
    const {isDark} = useAppSelector((state: RootState) => state.theme);

    return (
        <ECharts
            echarts={echarts}
            options={getOptions(data, paymentStatus, isDark)}
            style={style}
        />
    );
};

export default PaymentChart;

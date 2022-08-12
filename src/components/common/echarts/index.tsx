import {CSSProperties, memo} from 'react';
import _ from 'lodash';
import BaseECharts from './BaseECharts';
import { getColor } from '@nabcellent/sui-react';

const getOption = () => ({
    color: getColor('primary'),
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'none'
        },
        padding: [7, 10],
        backgroundColor: getColor('100'),
        borderColor: getColor('100'),
        textStyle: {color: getColor('dark')},
        borderWidth: 1,
        transitionDuration: 0
    },
    xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false
    },
    yAxis: {
        show: false,
        type: 'value',
        boundaryGap: false
    },
    series: [
        {
            type: 'bar',
            symbol: 'none'
        }
    ],
});

type BasicEChartsType = {
    echarts: any
    options: any
    style: CSSProperties
};

const ECharts = ({echarts, options, ...rest}: BasicEChartsType) => {
    return (
        <BaseECharts
            echarts={echarts}
            options={_.merge(getOption(), options)}
            {...rest}
        />
    );
};

export default memo(ECharts);

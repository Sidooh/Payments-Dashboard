import { useEffect, useState } from 'react';
import { bind, clear } from 'size-sensor';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts/types/dist/echarts';

export const isFunction = (v: any) => typeof v === 'function';

const BaseECharts = ({
                    options,
                    notMerge = false,
                    lazyUpdate = false,
                    showLoading, loadingOption = undefined,
                    onEvents, onChartReady,
                    theme, className, style
                }: any) => {
    const [htmlElement, setHtmlElement] = useState<HTMLDivElement>(null!);
    const [isInitialResize, setIsInitialResize] = useState(true);

    /**
     * return the existing EChart object
     */
    const getEchartsInstance = () => echarts.getInstanceByDom(htmlElement);

    const initEchartsInstance = async () => {
        return new Promise((resolve) => {
            // create temporary EChart instance
            if (!(htmlElement instanceof HTMLElement)) return;

            echarts.init(htmlElement, theme as string, options);
            const chartsInstance = getEchartsInstance();

            if (!chartsInstance) return;

            chartsInstance.on('finished', () => {
                // get final width and height
                const width = htmlElement.clientWidth;
                const height = htmlElement.clientHeight;

                // dispose temporary EChart instance
                echarts.dispose(htmlElement);

                // recreate EChart instance
                // we use final width and height only if not originally provided as opts
                const opts = {
                    width,
                    height,
                    ...options,
                };
                resolve(echarts.init(htmlElement, theme, opts));
            });
        });
    };

    /**
     * render the echarts
     */
    const updateEChartsOption = (): EChartsType | undefined => {
        // 1. get or initial the echarts object
        const chartInstance = getEchartsInstance();

        if (!chartInstance) return;

        // 2. set the echarts option
        chartInstance.setOption(options, notMerge, lazyUpdate);
        // 3. set loading mask
        if (showLoading) chartInstance.showLoading(loadingOption);
        else chartInstance.hideLoading();

        return chartInstance;
    };

    // bind the events
    const bindEvents = (instance: EChartsType, events: any[]) => {
        function _bindEvent(eventName: string, fn: (param: unknown, instance: EChartsType) => boolean | void) {
            // ignore the event config which not satisfy
            if (isFunction(fn)) instance.on(eventName, (param: unknown) => fn(param, instance));
        }

        // loop and bind
        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events, eventName)) {
                _bindEvent(eventName, events[eventName]);
            }
        }
    };

    /**
     * resize wrapper
     */
    const resize = () => {
        // 1. get the echarts object
        const chartInstance = getEchartsInstance();

        if (!chartInstance) return;

        // 2. call echarts instance resize if not the initial resize
        // should not happen on first render as it will cancel initial echarts animations
        if (isInitialResize) {
            try {
                chartInstance.resize({
                    width: 'auto',
                    height: 'auto',
                });
            } catch (e) {
                console.warn(e);
            }
        }

        // 3. update variable for future calls
        setIsInitialResize(false);
    };

    const renderNewEcharts = async () => {
        // 1. init echarts instance
        await initEchartsInstance();

        // 2. update echarts instance
        const chartInstance = updateEChartsOption();

        if (!chartInstance) return;

        // 3. bind events
        bindEvents(chartInstance, onEvents || {});

        // 4. on chart ready
        if (isFunction(onChartReady)) onChartReady(chartInstance);

        // 5. on resize
        if (htmlElement) bind(htmlElement, () => resize());
    };

    useEffect(() => {
        renderNewEcharts();

        /**
         * dispose echarts and clear size-sensor
         */
        return () => {
            if (htmlElement) {
                try {
                    clear(htmlElement);
                } catch (e) {
                    console.warn(e);
                }

                // dispose echarts instance
                echarts.dispose(htmlElement);
            }
        };
    }, [htmlElement, renderNewEcharts]);

    const newStyle = {height: 300, ...style};

    return (
        <div
            ref={(e) => setHtmlElement(e!)}
            style={newStyle}
            className={`echarts-for-react ${className}`}
        />
    );
};

export default BaseECharts;
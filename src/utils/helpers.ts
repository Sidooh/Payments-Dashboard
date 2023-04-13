import { ChartOptions } from "chart.js";
import { merge } from "chart.js/helpers";
import { rgbaColor } from "@nabcellent/sui-react";

export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const flattenRoutes = (children: any) => {
    const allChildren: any[] = [];

    const flatChild = (children: any) => {
        children.forEach((child: any) => {
            if (child.children) {
                flatChild(child.children);
            } else {
                allChildren.push(child);
            }
        });
    };
    flatChild(children);

    return allChildren;
};

export const getFlattenedRoutes = (children: any) => children.reduce(
    (acc: any, val: any) => {
        if (val.children) {
            return {
                ...acc,
                [camelize(val.name)]: flattenRoutes(val.children)
            };
        } else {
            return {
                ...acc,
                unTitled: [...acc.unTitled, val]
            };
        }
    },
    { unTitled: [] }
);

export const defaultLineChartOptions = (options?: ChartOptions<'line'>): ChartOptions<'line'> => merge({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            border: {
                display: false
            },
            grid: {
                color: 'rgba(250, 250, 250, .1)',
            },
            ticks: {
                color: rgbaColor('#0F1B4C', 0.7),
            }
        },
        y: {
            grace: '5%',
            border: {
                display: false
            },
            beginAtZero: true,
            grid: {
                lineWidth: .3
            },
            ticks: {
                color: rgbaColor('#648381', 1),
                font: {
                    weight: 600
                },
                callback: (val: number | string) => Intl.NumberFormat('en', { notation: 'compact' }).format(Number(val))
            }
        },
    },
    elements: {
        line: {
            borderWidth: 0,
            tension: .3,
            fill: true
        },
        point: {
            pointStyle: 'star',
            radius: 5,
            hoverRadius: 10
        }
    },
    plugins: {
        title: {
            padding: {
                bottom: 20
            },
            display: true,
            align: 'start',
            font: {
                size: 17
            },
            color: rgbaColor('#0F1B4C', 0.7),
        },
        legend: {
            display: false,
            labels: {
                usePointStyle: true
            }
        },
        tooltip: {
            padding: {
                x: 10,
                y: 5
            },
            displayColors: false,
        }
    }
}, options)
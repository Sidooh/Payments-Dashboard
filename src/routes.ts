import { RouteType } from "utils/types";
import {
    faWrench,
    faPieChart,
    faGlobe,
    faMoneyCheckDollar,
    faHandHoldingDollar,
    faSackDollar
} from '@fortawesome/free-solid-svg-icons';

export const dashboardRoutes: RouteType = {
    label: 'Dashboard',
    labelDisable: true,
    children: [
        {
            name: 'Dashboard',
            active: true,
            icon: faPieChart,
            children: [
                {
                    name: 'Home',
                    to: '/',
                    exact: true,
                    active: true
                },
            ]
        }
    ]
};

export const appRoutes: RouteType = {
    label: 'App',
    children: [
        {
            name: 'Payments',
            icon: faSackDollar,
            to: '/payments',
            active: true,
        },
        {
            name: 'MPESA',
            icon: faMoneyCheckDollar,
            to: '/payments',
            children: [
                {name: 'STK', to: '/mpesa/stk',},
                {name: 'C2B', to: '/mpesa/c2b',},
                {name: 'B2C', to: '/mpesa/b2c',},
            ]
        },
        {
            name: 'Vouchers',
            icon: faHandHoldingDollar,
            to: '/payments',
            children: [
                {name: 'Vouchers', to: '/vouchers',},
                {name: 'Transactions', to: '/vouchers/transactions',},
            ]
        },
    ]
};

const routes = [
    dashboardRoutes,
    appRoutes
];

export default routes;
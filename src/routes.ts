import { RouteType } from "@nabcellent/sui-react";
import { faHandHoldingDollar, faMoneyCheckDollar, faPieChart, faSackDollar } from '@fortawesome/free-solid-svg-icons';

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
            active:true,
            children: [
                {name: 'STK', to: '/mpesa/stk', active: true},
                {name: 'C2B', to: '/mpesa/c2b', active: true},
                {name: 'B2C', to: '/mpesa/b2c', active: true},
            ]
        },
        {
            name: 'Vouchers',
            icon: faHandHoldingDollar,
            to: '/payments',
            active:true,
            children: [
                {name: 'Vouchers', to: '/vouchers', active: true},
                {name: 'Transactions', to: '/voucher/transactions', active: true},
            ]
        },
    ]
};

const routes = [
    dashboardRoutes,
    appRoutes
];

export default routes;
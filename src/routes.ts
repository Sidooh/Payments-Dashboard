import { RouteType } from "utils/types";
import { faWrench, faPieChart, faGlobe } from '@fortawesome/free-solid-svg-icons';

export const dashboardRoutes: RouteType = {
    label       : 'Dashboard',
    labelDisable: true,
    children    : [
        {
            name    : 'Dashboard',
            active  : true,
            icon    : faPieChart,
            children: [
                {
                    name  : 'Home',
                    to    : '/',
                    exact : true,
                    active: true
                },
            ]
        }
    ]
};

export const transactionRoutes: RouteType = {
    label: 'Transactions',
    children: [
        {
            name: 'All Transactions',
            icon: faGlobe,
            to: '/transactions',
            active: true,
        },
    ]
};

export const appRoutes: RouteType = {
    label: 'App',
    children: [
        {
            name: 'Settings',
            icon: faWrench,
            to: '/settings',
            active: true
        },
    ]
};

const routes = [
    dashboardRoutes,
    transactionRoutes,
    appRoutes
];

export default routes
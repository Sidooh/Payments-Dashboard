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

export const paymentRoutes: RouteType = {
    label: 'Payments',
    children: [
        {
            name: 'All Payments',
            icon: faGlobe,
            to: '/payments',
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
    paymentRoutes,
    appRoutes
];

export default routes
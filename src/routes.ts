import { RouteType } from "@nabcellent/sui-react";
import {
    faHandHoldingDollar,
    faMoneyCheckDollar,
    faPieChart,
    faSackDollar,
    faGhost
} from '@fortawesome/free-solid-svg-icons';

const routes: RouteType[] = [
    {
        label: 'Dashboard',
        labelDisable: true,
        children: [
            {
                name: 'Dashboard',
                active: false,
                icon: faPieChart,
                children: [
                    {
                        name: 'Home',
                        to: '/',
                        exact: true,
                        active: false
                    },
                ]
            }
        ]
    },
    {
        label: 'App',
        children: [
            {
                name: 'Payments',
                icon: faSackDollar,
                to: '/payments',
                active: false,
            },
        ]
    },
    {
        label: 'Providers',
        children: [
            {
                name: 'MPESA',
                icon: faMoneyCheckDollar,
                active: false,
                children: [
                    {name: 'STK', to: '/mpesa/stk', active: false},
                    {name: 'C2B', to: '/mpesa/c2b', active: false},
                    {name: 'B2C', to: '/mpesa/b2c', active: false},
                ]
            },
            {
                name: 'Vouchers',
                icon: faHandHoldingDollar,
                active: false,
                children: [
                    {name: 'Vouchers', to: '/vouchers', active: false},
                    {name: 'Transactions', to: '/voucher/transactions', active: false},
                ]
            },
            {
                name: 'Float',
                icon: faGhost,
                active: false,
                children: [
                    {name: 'Accounts', to: '/float-accounts-accounts', active: false},
                    {name: 'Transactions', to: '/float-accounts-accounts/transactions', active: false},
                ]
            },
        ]
    }
];

export default routes;
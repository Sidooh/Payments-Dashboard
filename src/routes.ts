import { RouteType } from "@nabcellent/sui-react";
import { faDollarSign, faMoneyCheckDollar, faPieChart, faSackDollar } from '@fortawesome/free-solid-svg-icons';

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
        label: 'SIDOOH',
        children: [
            {
                icon: faDollarSign,
                name: 'Voucher', to: '/mpesa/stk', active: true, children: [
                    { name: 'Vouchers', to: '/vouchers', active: false },
                    { name: 'Transactions', to: '/voucher/transactions', active: false },
                ]
            },
            {
                icon: faDollarSign,
                name: 'Float', to: '/mpesa/c2b', active: true, children: [
                    { name: 'Accounts', to: '/float-accounts', active: false },
                    { name: 'Transactions', to: '/float-accounts/transactions', active: false },
                ]
            },
            { icon: faDollarSign, name: 'B2B', to: '/sidooh/b2b', active: false }
        ]
    },
    {
        label: 'MPESA',
        children: [
            { icon: faMoneyCheckDollar, name: 'STK', to: '/mpesa/stk', active: false },
            { icon: faMoneyCheckDollar, name: 'C2B', to: '/mpesa/c2b', active: false },
            { icon: faMoneyCheckDollar, name: 'B2C', to: '/mpesa/b2c', active: false },
        ]
    },
];

export default routes;
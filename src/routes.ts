import { FaChartPie } from 'react-icons/fa6';
import { MdPayments } from 'react-icons/md';
import { RiCoupon2Fill } from 'react-icons/ri';
import { SiFloatplane } from 'react-icons/si';
import { RouteType } from '@/lib/types';

const routes: RouteType[] = [
    {
        label: 'Dashboard',
        children: [
            {
                name: 'Home',
                active: true,
                icon: FaChartPie,
                to: '/',
            },
        ],
    },
    {
        label: 'App',
        children: [
            {
                name: 'Payments',
                icon: MdPayments,
                to: '/payments',
                active: false,
            },
        ],
    },
    {
        label: 'Sidooh',
        children: [
            {
                icon: RiCoupon2Fill,
                name: 'Voucher',
                to: '/',
                active: true,
                children: [
                    { name: 'Vouchers', to: '/vouchers', active: false },
                    { name: 'Transactions', to: '/voucher/transactions', active: false },
                ],
            },
            {
                icon: SiFloatplane,
                name: 'Float',
                to: '/',
                active: true,
                children: [
                    { name: 'Accounts', to: '/float-accounts', active: false },
                    { name: 'Transactions', to: '/float-accounts/transactions', active: false },
                ],
            },
        ],
    },
];

export default routes;

import { RouteType } from "@nabcellent/sui-react";
import {
    FaBusinessTime,
    FaChartPie,
    GiPayMoney,
    GiReceiveMoney,
    MdPayments,
    RiCoupon2Fill,
    SiFloatplane,
    TbPrompt
} from "react-icons/all";

const routes: RouteType[] = [
    {
        label: 'Dashboard',
        labelDisable: true,
        children: [
            {
                name: 'Dashboard',
                active: true,
                icon: FaChartPie,
                children: [
                    { name: 'Home', to: '/', },
                    { name: 'Analytics', to: '/dashboard/analytics', },
                ]
            }
        ]
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
        ]
    },
    {
        label: 'SIDOOH',
        children: [
            {
                icon: RiCoupon2Fill,
                name: 'Voucher', to: '/', active: true, children: [
                    { name: 'Vouchers', to: '/vouchers', active: false },
                    { name: 'Transactions', to: '/voucher/transactions', active: false },
                ]
            },
            {
                icon: SiFloatplane,
                name: 'Float', to: '/', active: true, children: [
                    { name: 'Accounts', to: '/float-accounts', active: false },
                    { name: 'Transactions', to: '/float-accounts/transactions', active: false },
                ]
            },
            { icon: FaBusinessTime, name: 'B2B', to: '/sidooh/b2b', active: false }
        ]
    },
    {
        label: 'MPESA',
        children: [
            { icon: TbPrompt, name: 'STK', to: '/mpesa/stk', active: false },
            { icon: GiPayMoney, name: 'C2B', to: '/mpesa/c2b', active: false },
            { icon: GiReceiveMoney, name: 'B2C', to: '/mpesa/b2c', active: false },
        ]
    },
];

export default routes;
import PendingPayments from './PendingPayments';
import RecentPayments from './RecentPayments';
import PaymentSummaries from './PaymentSummaries';
import DashboardChart from './Chart';
import ProviderBalances from './ProviderBalances';

const Dashboard = () => (
    <div className={'space-y-3'}>
        <div className="grid 2xl:grid-cols-12 gap-3">
            <div className={'2xl:col-span-9'}>
                <DashboardChart />
            </div>
            <div className={'2xl:col-span-3'}>
                <PaymentSummaries />
            </div>
        </div>

        <PendingPayments />
        <RecentPayments />
        <ProviderBalances />
    </div>
);

export default Dashboard;

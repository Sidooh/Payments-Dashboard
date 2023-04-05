import PendingPayments from "./PendingPayments";
import RecentPayments from "./RecentPayments";
import { Col, Row } from "react-bootstrap";
import PaymentSummaries from "./PaymentSummaries";
import DashboardChart from "./Chart";
import ProviderBalances from "./ProviderBalances";

const Dashboard = () => {
    return (
        <>
            <Row className="g-3 mb-3">
                <Col xxl={9}><DashboardChart/></Col>
                <Col><PaymentSummaries/></Col>
            </Row>

            <PendingPayments/>
            <RecentPayments/>
            <ProviderBalances/>
        </>
    );
};

export default Dashboard;

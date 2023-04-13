import Row from "react-bootstrap/Row";
import Payments from "./Payments";
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    SubTitle,
    Title,
    Tooltip
} from "chart.js";
import PaymentsSLOs from "./PaymentsSLOs";
import VendorsSLOs from "./VendorsSLOs";

Chart.register(Title, SubTitle, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)
Chart.defaults.color = '#fff'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const Dashboard = () => {
    return (
        <Row className={'g-3'}>
            <h5 className="text-primary text-center position-relative">
                <span className="bg-200 px-3">PAYMENTS</span>
                <span className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"/>
            </h5>
            <Payments/>

            <PaymentsSLOs/>
            <VendorsSLOs/>
        </Row>
    );
};

export default Dashboard;

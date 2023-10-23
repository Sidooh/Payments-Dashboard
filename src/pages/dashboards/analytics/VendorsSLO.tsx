import { useGetVendorsSLOsQuery } from "../../../features/analytics/analyticsApi";
import { Card, Col, Row } from "react-bootstrap";
import { ComponentLoader, IconButton, SectionError, Str, Tooltip } from "@nabcellent/sui-react";
import CardBgCorner from "../../../components/CardBgCorner";
import CountUp from "react-countup";
import { FaPercentage, FaSync } from "react-icons/fa";

const VendorsSLO = () => {
    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetVendorsSLOsQuery()

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    return (
        <Col xs={12} className={'mb-3'}>
            <h5 className="text-primary text-center position-relative">
                    <span className="bg-200 px-3">
                        Vendors Success Rate
                        <Tooltip title="Refresh SLOs" placement="start">
                            <IconButton loading={isFetching} color={'secondary'} onClick={() => refetch()}>
                                <FaSync size={12}/>
                            </IconButton>
                        </Tooltip>
                    </span>
                <span
                    className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"></span>
            </h5>

            <Card>
                <CardBgCorner corner={5}/>
                <Card.Body className={'bg-dark'}>
                    <div className={'d-flex'}>
                        <h5 className={'text-light border-bottom pe-lg-5'}>YTD</h5>
                    </div>
                    <Row className={'g-2'}>
                        {Object.keys(data).map((product) => {
                            let color = 'success', slo = data[product as keyof typeof data]

                            if(slo < 70) color = 'danger'
                            else if(slo < 90) color = 'warning'

                            return (
                                <Col key={product} md={4} lg={3} className={`text-center`}>
                                    <div className="py-3">
                                        <div className={`icon-circle icon-circle-${color} fw-bold`}>
                                            <CountUp end={data[product as keyof typeof data]} className="me-1 fs-2"/>
                                            <FaPercentage/>
                                        </div>
                                        <h6 className={`mb-1 fw-bold text-${color}`}>{Str.headline(product)}</h6>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VendorsSLO;
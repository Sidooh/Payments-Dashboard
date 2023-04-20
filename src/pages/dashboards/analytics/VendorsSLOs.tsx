import { useGetVendorsSLOsQuery } from "../../../features/analytics/analyticsApi";
import { Card, Col, Row } from "react-bootstrap";
import { ComponentLoader, LoadingButton, SectionError, Str, Tooltip } from "@nabcellent/sui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import CardBgCorner from "../../../components/CardBgCorner";
import CountUp from "react-countup";
import moment from "moment";
import { FaPercentage } from "react-icons/all";

const VendorsSLOs = () => {
    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetVendorsSLOsQuery()

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    return (
        <Col xs={12} className={'mb-3'}>
            <h5 className="text-primary text-center position-relative">
                    <span className="bg-200 px-3">
                        VENDORS SUCCESS RATE - SLOs
                        <Tooltip title="Refresh SLOs" placement="left">
                            <LoadingButton loading={isFetching} className="btn btn-sm border-0 py-2"
                                           spinner-position="replace" onClick={() => refetch()}>
                                <FontAwesomeIcon icon={faSync}/>
                            </LoadingButton>
                        </Tooltip>
                    </span>
                <span
                    className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"></span>
            </h5>

            <Card>
                <CardBgCorner corner={5}/>
                <Card.Body>
                    <h5 className={'text-primary text-decoration-underline'}>YTD</h5>
                    <Row className={'g-2'}>
                        {Object.keys(data).map((product) => {
                            let color = 'success', slo = data[product as keyof typeof data]

                            if(slo < 70) color = 'danger'
                            else if(slo < 90) color = 'warning'

                            return (
                                <Col key={product} md={4} lg={3} xl={2} className={`text-center border-bottom`}>
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

export default VendorsSLOs;
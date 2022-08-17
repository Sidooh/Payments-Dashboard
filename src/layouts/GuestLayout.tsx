import { memo, Suspense } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { IMAGES } from 'constants/images';
import { Logo, PageLoader } from '@nabcellent/sui-react';

const GuestLayout = () => {
    return (
        <Container fluid className="py-0">
            <Row className="flex-center min-vh-100 g-0">
                <Col sm={10} md={8} lg={6} xl={4} xxl={3} className="position-relative">
                    <img className="bg-auth-circle-shape" src={IMAGES.icons.spotIllustrations.bg_shape} alt=""
                         width="250"/>
                    <img className="bg-auth-circle-shape-2" src={IMAGES.icons.spotIllustrations.shape_1} alt=""
                         width="150"/>
                    <Logo src={IMAGES.logos.sidooh} width={120}/>
                    <Card>
                        <Card.Body className="p-4 p-sm-5">
                            <Suspense fallback={<PageLoader/>}><Outlet/></Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default memo(GuestLayout);

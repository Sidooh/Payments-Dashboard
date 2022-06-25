import { styled } from '@mui/material/styles';
import Section from './Section';
import { Col, Row } from 'react-bootstrap';
import Logo from './Logo';
import PrettyJSON from './PrettyJSON';

/** ____________________________________________________    PAGE ERROR
 * */
type ErrorFallbackType = {
    error: Error
    resetErrorBoundary: () => void
}

export const ErrorFallback = ({error, resetErrorBoundary}: ErrorFallbackType) => {
    return (
        <Section className="py-0">
            <Row className="flex-center min-vh-100 py-6">
                <Col sm={11} md={9} lg={7} xl={6} className="col-xxl-5">
                    <Logo/>
                    <div className="card p-3 text-danger fw-bolder">
                        <h3>Oops! An Error Occurred!</h3>

                        <pre>{error.message}</pre>

                        <div><PrettyJSON data={error}/></div>

                        <button className={'btn btn btn-falcon-primary'} onClick={resetErrorBoundary}>
                            Try again
                        </button>
                    </div>
                </Col>
            </Row>
        </Section>
    );
};

/** ____________________________________________________    SECTION ERROR
 * */
const Wrapper = styled('div')({
    height: '80vh'
});

const Card = styled('div')({
    maxHeight: '70vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const ErrorWrapper = styled('div')({
    overflowY: 'auto',
    '::-webkit-scrollbar': {
        width: 0
    }
});

export const SectionError = ({error}: any) => {
    return (
        <Wrapper className="row position-relative fw-bolder ">
            <Card className="col-xl-10 position-absolute card p-3 bg-soft-danger text-danger">
                <h3>Oops! An Error Occurred!</h3>

                <ErrorWrapper>
                    <PrettyJSON data={error}/>
                </ErrorWrapper>
            </Card>
        </Wrapper>
    );
};
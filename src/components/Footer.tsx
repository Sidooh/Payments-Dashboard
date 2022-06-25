import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { CONFIG } from 'config';

const Footer = () => {
    return (
        <footer className="footer">
            <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
                <Col sm="auto">
                    <p className="mb-0 text-600">
                        Notify | <Link to="/">Sidooh</Link>{' '}
                        <br className="d-sm-none"/> &copy; {new Date().getFullYear()}
                    </p>
                </Col>
                <Col sm="auto"><p className="mb-0 text-600">v{CONFIG.sidooh.version}</p></Col>
            </Row>
        </footer>
    );
};

export default Footer;
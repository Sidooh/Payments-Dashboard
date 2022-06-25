import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';
import Avatar from 'components/common/Avatar';
import { waffleLinks, WaffleLinkType } from 'constants/waffleLinks';
import 'simplebar/dist/simplebar.min.css';

const Waffle = () => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.innerWidth < 1200 && setShow(false);
        });
    }, []);

    return (
        <Dropdown navbar={true} as="li" show={show} onToggle={() => setShow(!show)}>
            <Dropdown.Toggle bsPrefix="toggle" as={Link} to="#!" className="nav-link fa-icon-wait nine-dots p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="37" viewBox="0 0 16 16" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#6C6E71"/>
                    <circle cx="2" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="2" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="2" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="2" r="2" fill="#6C6E71"/>
                </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-caret-bg" show={show}>
                <Card className="shadow-none">
                    <SimpleBarReact className="nine-dots-dropdown">
                        <Card.Body className={'px-3'}>
                            <Row className="text-center g-0">
                                {waffleLinks.map((item, index) => (
                                    <WaffleLinkItem key={index} {...item} />
                                ))}
                                <Col xs={12}>
                                    <Link to="#!" className="btn btn-outline-primary btn-sm mt-4">Show more</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </SimpleBarReact>
                </Card>
            </Dropdown.Menu>
        </Dropdown>
    );
};

const WaffleLinkItem = ({avatar, avatarText, img, title, link, hr, enabled = false}: WaffleLinkType) => {
    return (
        <>
            {hr ? (
                <Col xs={12}>
                    <hr className="my-3 mx-n3 bg-200"/>
                </Col>
            ) : (
                <Col xs={4}>
                    <div
                        className={`d-block ${!enabled ? 'bg-100 ' : 'hover-bg-200 cursor-pointer rounded-3'} px-2 py-3 text-center text-decoration-none`}
                        onClick={() => !enabled ? false : window.open(link)}>
                        {avatar && <Avatar src={avatar} size="2xl"/>}
                        {avatarText && (
                            <Avatar
                                isExact
                                name={avatarText}
                                size="2xl"
                                mediaClass="fs-2 bg-soft-primary text-primary"
                            />
                        )}
                        {img && <img src={img} width={40} height={40} alt={''}/>}
                        <p
                            className={classNames(
                                'mb-0 fw-medium text-800 text-truncate fs--2',
                                {
                                    'pt-1': img
                                }
                            )}
                        >
                            {title}
                        </p>
                    </div>
                </Col>
            )}
        </>
    );
};

export default Waffle;

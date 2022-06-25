import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { rawEarlierNotifications, rawNewNotifications } from 'constants/notification';
import { isIterableArray } from 'utils/helpers';
import CardHeader from 'components/common/CardHeader';
import Notification from 'components/common/Notification';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAllRead] = useState(false);

    // Handler
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.innerWidth < 1200 && setIsOpen(false);
        });
    }, []);

    return (
        <Dropdown navbar={true} as="li" show={isOpen} onToggle={handleToggle}>
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className={classNames('px-0 nav-link', {
                    'notification-indicator notification-indicator-primary': !isAllRead
                })}
            >
                <FontAwesomeIcon icon={faBell} transform="shrink-6" className="fs-4"/>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-card dropdown-menu-end dropdown-caret-bg">
                <Card
                    className="dropdown-menu-notification dropdown-menu-end shadow-none"
                    style={{maxWidth: '20rem'}}
                >
                    <CardHeader
                        className="card-header"
                        title="Notifications"
                        titleTag="h6"
                        light={false}
                        endEl={
                            <Link className="card-link fw-normal" to="#!">
                                Mark all as read
                            </Link>
                        }
                    />
                    <ListGroup
                        variant="flush"
                        className="fw-normal fs--1 scrollbar"
                        style={{maxHeight: '19rem'}}
                    >
                        <div className="list-group-title">NEW</div>
                        {' '}
                        {isIterableArray(rawNewNotifications) &&
                            rawNewNotifications.map(notification => (
                                <ListGroup.Item key={notification.id} onClick={handleToggle}>
                                    <Notification {...notification} flush/>
                                </ListGroup.Item>
                            ))}
                        <div className="list-group-title">EARLIER</div>
                        {isIterableArray(rawEarlierNotifications) &&
                            rawEarlierNotifications.map(notification => (
                                <ListGroup.Item key={notification.id} onClick={handleToggle}>
                                    <Notification {...notification} flush/>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                    <div
                        className="card-footer text-center border-top"
                        onClick={handleToggle}
                    >
                        <Link className="card-link d-block" to="#!">
                            View all
                        </Link>
                    </div>
                </Card>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationDropdown;

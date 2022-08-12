import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAppDispatch } from 'app/hooks';
import { logout, reset } from 'features/auth/authSlice';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@nabcellent/sui-react';

const ProfileDropdown = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSignOut = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <Dropdown navbar={true} as="li">
            <Dropdown.Toggle bsPrefix="toggle" as={Link} to="#!" className="pe-0 ps-2 nav-link">
                <Avatar isExact name={'P'} size="2xl" mediaClass="fs-2 bg-soft-primary text-primary"/>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-card  dropdown-menu-end">
                <div className="bg-white rounded-2 py-2 dark__bg-1000">
                    <Dropdown.Item className="fw-bold text-warning" href="#!">
                        <FontAwesomeIcon icon={faCrown} className="me-1"/>
                        <span>Sidooh</span>
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#!">Set status</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/user/profile">
                        Profile &amp; account
                    </Dropdown.Item>
                    <Dropdown.Item href="#!">Feedback</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as={Link} to="/user/settings">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                        Sign Out
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;

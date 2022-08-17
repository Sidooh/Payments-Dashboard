import { Nav } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTheme } from 'features/theme/themeSlice';
import { RootState } from 'app/store';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import { Waffle } from '@nabcellent/sui-react';
import { CONFIG } from 'config';

const TopNavRightSideNavItem = () => {
    const dispatch = useAppDispatch();

    const {isDark} = useAppSelector((state: RootState) => state.theme);

    return (
        <Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">
            <Nav.Item as={'li'}>
                <Nav.Link className="px-2 theme-control-toggle"
                          onClick={() => dispatch(setTheme({key: 'isDark', value: !isDark}))}>
                    <Tooltip title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
                        <div className="theme-control-toggle-label">
                            <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="fs-0"/>
                        </div>
                    </Tooltip>
                </Nav.Link>
            </Nav.Item>

            <Waffle links={[
                {
                    avatarText: 'A',
                    title: 'Accounts',
                    link: CONFIG.sidooh.services.accounts.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'E',
                    title: 'Enterprise',
                    link: `/events/event-detail`,
                    contentClass: 'bg-soft-primary text-primary',
                },
                {
                    avatarText: 'N',
                    title: 'Notify',
                    link: CONFIG.sidooh.services.notify.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'P',
                    title: 'Products',
                    link: CONFIG.sidooh.services.products.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'S',
                    title: 'Savings',
                    link: CONFIG.sidooh.services.savings.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'U',
                    title: 'USSD',
                    link: CONFIG.sidooh.services.ussd.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                }
            ]}/>
            <ProfileDropdown/>
        </Nav>
    );
};

export default TopNavRightSideNavItem;

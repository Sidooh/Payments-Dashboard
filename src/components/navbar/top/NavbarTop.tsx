import { memo, useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import classNames from 'classnames';
import Logo from '../../common/Logo';
import SearchBox from './SearchBox';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { setTheme } from 'features/theme/themeSlice';
import { navbarBreakPoint, topNavbarBreakpoint } from 'constants/breakpoints';

const NavbarTop = () => {
    const dispatch = useAppDispatch();
    const {showBurgerMenu, navbarPosition, navbarCollapsed} = useAppSelector((state: RootState) => state.theme);

    const {pathname} = useLocation();
    const isChat = pathname.includes('chat');

    const [showDropShadow, setShowDropShadow] = useState(false);

    const handleBurgerMenu = () => {
        navbarPosition === 'top' && dispatch(setTheme({key: 'navbarCollapsed', value: !navbarCollapsed}));
        (navbarPosition === 'vertical' || navbarPosition === 'combo') && dispatch(setTheme({
            key: 'showBurgerMenu',
            value: !showBurgerMenu
        }));
    };

    const setDropShadow = () => {
        const el = document.documentElement;
        if (el.scrollTop > 0) {
            setShowDropShadow(true);
        } else {
            setShowDropShadow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', setDropShadow);
        return () => window.removeEventListener('scroll', setDropShadow);
    }, []);

    return (
        <Navbar
            className={classNames('navbar-glass  fs--1 navbar-top sticky-kit', {
                // 'navbar-glass-shadow': showDropShadow
                'navbar-glass-shadow': showDropShadow && !isChat
            })}
            expand={
                navbarPosition === 'top' || navbarPosition === 'combo'
                    ? topNavbarBreakpoint
                    : true
            }
        >
            <Navbar.Toggle
                className={classNames('toggle-icon-wrapper me-md-3 me-2', {
                    'd-lg-none': navbarPosition === 'top',
                    [`d-${navbarBreakPoint}-none`]:
                    navbarPosition === 'vertical' || navbarPosition === 'combo'
                })}
                as="div"
            >
                <button
                    className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center"
                    onClick={handleBurgerMenu}
                    id="burgerMenu"
                >
          <span className="navbar-toggle-icon">
            <span className="toggle-line"/>
          </span>
                </button>
            </Navbar.Toggle>

            <Logo at="navbar-top" width={40}/>

            {navbarPosition === 'top' || navbarPosition === 'combo' ? (
                <Navbar.Collapse in={navbarCollapsed} className="scrollbar pb-3 pb-lg-0">
                    <Nav navbar>
                        <NavbarTopDropDownMenus/>
                    </Nav>
                </Navbar.Collapse>
            ) : (
                <Nav navbar className={`align-items-center d-none d-${topNavbarBreakpoint}-block`} as="ul">
                    <Nav.Item as="li">
                        <SearchBox/>
                    </Nav.Item>
                </Nav>
            )}

            <TopNavRightSideNavItem/>
        </Navbar>
    );
};

export default memo(NavbarTop);

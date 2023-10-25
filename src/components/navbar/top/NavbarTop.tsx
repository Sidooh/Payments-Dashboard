import { memo, useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import classNames from 'classnames';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { RootState } from '@/app/store';
import { setTheme } from '@/features/theme/themeSlice';
import { navbarBreakPoint, topNavbarBreakpoint } from '@/constants/breakpoints';
import { Logo } from '@nabcellent/sui-react';
import { IMAGES } from '@/constants/images';

const NavbarTop = () => {
    const dispatch = useAppDispatch();
    const { showBurgerMenu, navbarPosition, navbarCollapsed } = useAppSelector((state: RootState) => state.theme);

    const { pathname } = useLocation();
    const isChat = pathname.includes('chat');

    const [showDropShadow, setShowDropShadow] = useState(false);

    const handleBurgerMenu = () => {
        navbarPosition === 'top' && dispatch(setTheme({ key: 'navbarCollapsed', value: !navbarCollapsed }));
        (navbarPosition === 'vertical' || navbarPosition === 'combo') &&
            dispatch(
                setTheme({
                    key: 'showBurgerMenu',
                    value: !showBurgerMenu,
                })
            );
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
            className={`navbar-glass  fs--1 navbar-top sticky-kit ${
                showDropShadow && !isChat && 'navbar-glass-shadow'
            }`}
            expand={navbarPosition === 'top' || navbarPosition === 'combo' ? topNavbarBreakpoint : true}
        >
            <Navbar.Toggle
                className={classNames('toggle-icon-wrapper me-md-3 me-2', {
                    'd-lg-none': navbarPosition === 'top',
                    [`d-${navbarBreakPoint}-none`]: navbarPosition === 'vertical' || navbarPosition === 'combo',
                })}
                as="div"
            >
                <button
                    className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center"
                    onClick={handleBurgerMenu}
                    id="burgerMenu"
                >
                    <span className="navbar-toggle-icon">
                        <span className="toggle-line" />
                    </span>
                </button>
            </Navbar.Toggle>

            <Logo src={IMAGES.logos.sidooh} at="navbar-top" width={40} />

            <TopNavRightSideNavItem />
        </Navbar>
    );
};

export default memo(NavbarTop);

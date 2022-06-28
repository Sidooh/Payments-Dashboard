import { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { setTheme } from 'features/theme/themeSlice';
import { RouteChildType } from 'utils/types';

type NavbarNavLinkType = {
    title?: string,
    label?: string
    route?: RouteChildType
};

const NavbarNavLink = ({title, route}: NavbarNavLinkType) => {
    const dispatch = useAppDispatch();

    const {navbarCollapsed, showBurgerMenu} = useAppSelector((state: RootState) => state.theme);

    const handleClick = () => {
        if (navbarCollapsed) dispatch(setTheme({key: 'navbarCollapsed', value: !navbarCollapsed}));
        if (showBurgerMenu) dispatch(setTheme({key: 'showBurgerMenu', value: !showBurgerMenu}));
    };

    return (
        <Nav.Link
            as={Link}
            className={`fw-medium ${!route?.active && 'text-500'} ${title ? 'text-700 mb-0 fw-bold' : 'py-1'} ${(!title && route?.active) && 'link-600'}`}
            to={String(route?.to)}
            onClick={handleClick}
        >
            {title ? title : route?.name}
        </Nav.Link>
    );
};

export default memo(NavbarNavLink);

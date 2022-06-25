import NavbarDropdown from './NavbarDropdown';
import { appRoutes, dashboardRoutes } from 'routes';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarDropdownApp from './NavbarDropdownApp';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { setTheme } from 'features/theme/themeSlice';

const NavbarTopDropDownMenus = () => {
    const dispatch = useAppDispatch()

    const {navbarCollapsed, showBurgerMenu} = useAppSelector((state: RootState) => state.theme);

    const handleDropdownItemClick = () => {
        if (navbarCollapsed) dispatch(setTheme({key: 'navbarCollapsed', value: !navbarCollapsed}));
        if (showBurgerMenu) dispatch(setTheme({key: 'showBurgerMenu', value: !showBurgerMenu}));
    };

    return (
        <>
            <NavbarDropdown title="dashboard">
                {dashboardRoutes.children[0].children?.map(route => (
                    <Dropdown.Item
                        key={route.name}
                        as={Link}
                        className={route.active ? 'link-600' : 'text-500'}
                        to={String(route.to)}
                        onClick={handleDropdownItemClick}
                    >
                        {route.name}
                    </Dropdown.Item>
                ))}
            </NavbarDropdown>

            <NavbarDropdown title="app">
                <NavbarDropdownApp items={appRoutes.children}/>
            </NavbarDropdown>
        </>
    );
};

export default NavbarTopDropDownMenus;

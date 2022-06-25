import { memo } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { getFlattenedRoutes } from 'utils/helpers';
import NavbarNavLink from './NavbarNavLink';
import { RouteChildType } from 'utils/types';

type NavbarDropdownAppType = {
    items: RouteChildType[]
}

const NavbarDropdownApp = ({items}: NavbarDropdownAppType) => {
    const routes = getFlattenedRoutes(items);

    return (
        <Row>
            <Col md={5}>
                <Nav className="flex-column">
                    {routes.unTitled.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Email" title="Email"/>
                    {routes.email.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Events" title="Events"/>
                    {routes.events.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Social" title="Social"/>
                    {routes.social.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                </Nav>
            </Col>
            <Col md={5}>
                <NavbarNavLink label="E Commerce" title="E Commerce"/>
                {routes.eCommerce.map((route:any) => (
                    <NavbarNavLink key={route.name} route={route}/>
                ))}
            </Col>
        </Row>
    );
};

export default memo(NavbarDropdownApp);

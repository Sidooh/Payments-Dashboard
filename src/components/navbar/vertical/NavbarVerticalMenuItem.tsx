import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, RouteChildType } from '@nabcellent/sui-react';

export type NavbarVerticalMenuItemType = {
    route: RouteChildType
};

const NavbarVerticalMenuItem = ({route}: NavbarVerticalMenuItemType) => (
    <Flex alignItems="center">
        {route.icon && <span className="nav-link-icon"><FontAwesomeIcon icon={route.icon}/></span>}
        <span className="nav-link-text ps-1">{route.name}</span>
    </Flex>
);

export default React.memo(NavbarVerticalMenuItem);

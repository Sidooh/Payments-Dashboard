import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import SoftBadge from 'components/common/SoftBadge';
import { RouteChildType } from 'utils/types';

export type NavbarVerticalMenuItemType = {
    route: RouteChildType
};

const NavbarVerticalMenuItem = ({route}: NavbarVerticalMenuItemType) => {
    return (
        <Flex alignItems="center">
            {route.icon && (
                <span className="nav-link-icon">
          <FontAwesomeIcon icon={route.icon}/>
        </span>
            )}
            <span className="nav-link-text ps-1">{route.name}</span>
            {route.badge && (
                <SoftBadge pill bg={route.badge.type} className="ms-2">
                    {route.badge.text}
                </SoftBadge>
            )}
        </Flex>
    );
};

export default React.memo(NavbarVerticalMenuItem);

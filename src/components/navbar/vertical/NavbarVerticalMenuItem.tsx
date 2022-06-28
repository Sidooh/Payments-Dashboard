import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import { RouteChildType } from 'utils/types';
import { Chip } from '@mui/material';

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
            {route.badge && <Chip label={route.badge.text} color={route.badge.type} className={'ms-2'}/>}
        </Flex>
    );
};

export default React.memo(NavbarVerticalMenuItem);

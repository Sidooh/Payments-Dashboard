import { Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { setTheme } from '@/features/theme/themeSlice';
import { Tooltip } from '@nabcellent/sui-react';

const ToggleButton = () => {
    const dispatch = useAppDispatch();
    const { isNavbarVerticalCollapsed } = useAppSelector((state) => state.theme);

    const handleClick = () => {
        document.getElementsByTagName('html')[0].classList.toggle('navbar-vertical-collapsed');
        dispatch(setTheme({ key: 'isNavbarVerticalCollapsed', value: !isNavbarVerticalCollapsed }));
    };

    return (
        <Tooltip title={'Toggle Navigation'} placement={'end'}>
            <div className="toggle-icon-wrapper">
                <Button
                    variant="link"
                    className="navbar-toggler-humburger-icon navbar-vertical-toggle"
                    id="toggleNavigationTooltip"
                    onClick={handleClick}
                >
                    <span className="navbar-toggle-icon">
                        <span className="toggle-line" />
                    </span>
                </Button>
            </div>
        </Tooltip>
    );
};

export default ToggleButton;

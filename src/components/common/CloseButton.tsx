import { memo } from 'react';
import { CloseButton as Button } from 'react-bootstrap';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

type CloseButtonType = {
    size: 'sm' | 'lg',
    noOutline?: boolean,
    variant?: 'white', // use 'white' for white variant
    onClick: () => void,
    className?: string
};

const CloseButton = ({
    size,
    onClick,
    noOutline,
    variant,
    className,
    ...rest
}: CloseButtonType) => {
    const {isDark} = useAppSelector(state => state.theme);

    return (
        <Button
            variant={variant ? variant : isDark ? 'white' : undefined}
            className={classNames(className, {
                [`btn-${size}`]: size,
                'outline-none' : noOutline
            })}
            onClick={onClick}
            {...rest}
        />
    );
};

export default memo(CloseButton);

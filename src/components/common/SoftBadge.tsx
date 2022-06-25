import { memo, ReactNode } from 'react';
import classNames from 'classnames';

type SoftBadgeType = {
    bg?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark',
    pill?: boolean,
    children?: ReactNode,
    className?: string
};

const SoftBadge = ({bg = 'primary', pill, children, className}: SoftBadgeType) => {
    return (
        <div className={classNames(className, `badge badge-soft-${bg}`, {'rounded-pill': pill})}>
            {children}
        </div>
    );
};

export default memo(SoftBadge);

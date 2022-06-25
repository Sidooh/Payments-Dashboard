import { memo, ReactNode } from 'react';
import classNames from 'classnames';

type FlexType = {
    children: ReactNode,
    justifyContent?: string,
    inline?: boolean,
    alignItems?: string,
    alignContent?: string,
    wrap?: string,
    className?: string,
    tag?: string,
    breakpoint?: string,
    direction?: string
};

const Flex = ({
    justifyContent,
    alignItems,
    alignContent,
    inline,
    wrap,
    className,
    tag: Tag = 'div',
    children,
    breakpoint,
    direction,
    ...rest
}: FlexType) => {
    return (
        // @ts-ignore
        <Tag className={classNames(
            {
                [`d-${breakpoint ? breakpoint + '-' : ''}flex`]       : !inline,
                [`d-${breakpoint ? breakpoint + '-' : ''}inline-flex`]: inline,
                [`flex-${direction}`]                                 : direction,
                [`justify-content-${justifyContent}`]                 : justifyContent,
                [`align-items-${alignItems}`]                         : alignItems,
                [`align-content-${alignContent}`]                     : alignContent,
                [`flex-${wrap}`]                                      : wrap
            },
            className
        )} {...rest}>
            {children}
        </Tag>
    );
};

export default memo(Flex);

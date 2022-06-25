import { memo, ReactNode } from 'react';
import { isIterableArray } from 'utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from './Flex';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type AvatarType = {
    size?: 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | string
    rounded?: string,
    src?: string | string[],
    name?: string,
    emoji?: string,
    className?: string,
    mediaClass?: string,
    isExact?: boolean,
    icon?: IconProp
};

type AvatarGroupType = {
    children: ReactNode,
    className?: string,
    dense?: boolean
};

const Avatar = ({
                    size = 'xl',
                    rounded = 'circle',
                    src,
                    name,
                    emoji = '😊',
                    className,
                    mediaClass,
                    isExact = false,
                    icon
                }: AvatarType) => {
    const classNames = ['avatar', `avatar-${size}`, className].join(' ');
    const mediaClasses = [
        rounded ? `rounded-${rounded}` : 'rounded',
        mediaClass
    ].join(' ');

    const getAvatar = () => {
        if (src) {
            if (isIterableArray(src)) {
                return (
                    <div className={`${mediaClasses} overflow-hidden h-100 d-flex`}>
                        <div className="w-50 border-right">
                            <img src={src[0]} alt=""/>
                        </div>
                        <div className="w-50 d-flex flex-column">
                            <img src={src[1]} alt="" className="h-50 border-bottom"/>
                            <img src={src[2]} alt="" className="h-50"/>
                        </div>
                    </div>
                );
            } else {
                return <img className={mediaClasses} src={src as string} alt=""/>;
            }
        }

        if (name) {
            return (
                <div className={`avatar-name ${mediaClasses}`}>
                    <span>{isExact
                        ? name
                        // @ts-ignore
                        : name.match(/\b\w/g).join('')}</span>
                </div>
            );
        }

        if (icon) {
            return (
                <Flex className={`avatar-name ${mediaClasses}`}>
                    <FontAwesomeIcon icon={icon}/>
                </Flex>
            );
        }

        return (
            <div className={`avatar-emoji ${mediaClasses}`}>
        <span role="img" aria-label="Emoji">
          {emoji}
        </span>
            </div>
        );
    };

    return <div className={classNames}>{getAvatar()}</div>;
};

export const AvatarGroup = ({children, dense, className}: AvatarGroupType) => {
    return (
        <div
            className={classNames(className, 'avatar-group', {
                'avatar-group-dense': dense
            })}
        >
            {children}
        </div>
    );
};

export default memo(Avatar);

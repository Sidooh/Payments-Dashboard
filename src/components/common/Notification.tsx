import { ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar, { AvatarType } from 'components/common/Avatar';

export type NotificationType = {
    avatar?: AvatarType
    time: string
    className?: string,
    unread?: boolean,
    flush?: boolean,
    emoji?: string,
    children?: ReactNode
};

const Notification = ({
    avatar,
    time,
    className,
    unread = false,
    flush = false,
    emoji,
    children
}: NotificationType) => (
    <Link
        className={classNames(
            'notification',
            {'notification-unread': unread, 'notification-flush': flush},
            className
        )}
        to="#!"
    >
        {avatar && (
            <div className="notification-avatar">
                <Avatar {...avatar} className="me-3"/>
            </div>
        )}
        <div className="notification-body">
            <p className="mb-1" dangerouslySetInnerHTML={{__html: children as string}}/>
            <span className="notification-time">
        {emoji && (
            <span className="me-2" role="img" aria-label="Emoji">
            {emoji}
          </span>
        )}
                {time}
      </span>
        </div>
    </Link>
);

export default Notification;

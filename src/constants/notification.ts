import { IMAGES } from './images';

export const notifications = [
    {
        id: 1,
        avatar: {
            src: IMAGES.team['1'],
            size: 'xl'
        },
        children:
            'Announcing the winners of the <strong>The only book awards</strong> decided by you, the readers. Check out the champions and runners-up in all 21 categories now!',
        time: 'Just Now',
        emoji: '📢',
        className: 'rounded-0 border-x-0 border-300 border-bottom-0',
        to: '#!'
    },
];

export const rawNewNotifications = [
    {
        id: 1,
        avatar: {
            src: IMAGES.team['1'],
            size: '2xl'
        },
        children:
            '<strong>Emma Watson</strong> replied to your comment : "Hello world 😍"',
        time: 'Just Now',
        emoji: '💬',
        className: 'rounded-0 border-x-0 border-300 border-bottom-0',
        to: '#!',
        unread: true
    },
];

export const rawEarlierNotifications = [
    {
        id: 1,
        avatar: {
            src: IMAGES.icons.weather_sm,
            size: '2xl'
        },
        children:
            "The forecast today shows a low of 20&#8451; in California. See today's weather.",
        time: '1d',
        emoji: '🌤️',
        className: 'rounded-0 border-x-0 border-300 border-bottom-0',
        to: '#!'
    },
];

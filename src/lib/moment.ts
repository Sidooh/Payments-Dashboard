import moment from 'moment';

declare module 'moment' {
    interface Moment {
        isLastYear(): boolean;

        isCurrentYear(): boolean;

        isLastMonth(): boolean;

        isCurrentMonth(): boolean;

        isLastWeek(): boolean;

        isCurrentWeek(): boolean;

        isYesterday(): boolean;

        isToday(): boolean;

        isLastHour(): boolean;

        isCurrentHour(): boolean;
    }
}

(moment as any).fn.isCurrentHour = function (): moment.Moment {
    return this.isSame(moment().startOf('h'), 'h');
};
(moment as any).fn.isLastHour = function (): moment.Moment {
    return this.isSame(moment().subtract(1, 'h').startOf('h'), 'h');
};
(moment as any).fn.isToday = function (): moment.Moment {
    return this.isSame(moment().startOf('d'), 'd');
};
(moment as any).fn.isYesterday = function (): moment.Moment {
    return this.isSame(moment().subtract(1, 'd').startOf('d'), 'd');
};
(moment as any).fn.isCurrentWeek = function (): moment.Moment {
    return this.isSame(moment().startOf('w'), 'w');
};
(moment as any).fn.isLastWeek = function (): moment.Moment {
    return this.isSame(moment().subtract(1, 'w').startOf('w'), 'w');
};
(moment as any).fn.isCurrentMonth = function (): moment.Moment {
    return this.isSame(moment().startOf('M'), 'M');
};
(moment as any).fn.isLastMonth = function (): moment.Moment {
    return this.isSame(moment().subtract(1, 'M').startOf('M'), 'M');
};
(moment as any).fn.isCurrentYear = function (): moment.Moment {
    return this.isSame(moment().startOf('y'), 'y');
};
(moment as any).fn.isLastYear = function (): moment.Moment {
    return this.isSame(moment().subtract(1, 'y').startOf('y'), 'y');
};

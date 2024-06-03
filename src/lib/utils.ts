import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import moment from 'moment';
import { FaCalendarXmark, FaCheck, FaCircleExclamation, FaCircleInfo, FaHourglassStart } from 'react-icons/fa6';
import { Status, Telco } from '@/lib/enums.ts';
import { IconType } from 'react-icons';
import { SerializedError } from '@reduxjs/toolkit';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const toast = async (options: SweetAlertOptions = {}) => {
    const mergedOptions: SweetAlertOptions = {
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 7000,
        ...options,
    };

    await Swal.fire(mergedOptions);
};

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error != null && 'message' in error && typeof error.message === 'string';
}

export const decodeJWT = (token: string) => {
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};

export const groupBy = (array: any[], property: string, asArray = false) => {
    let hash: any = {},
        props = property.split('.');

    for (let i = 0; i < array.length; i++) {
        let key = props.reduce((acc, prop) => acc && acc[prop], array[i]);

        if (!hash[key]) hash[key] = [];

        hash[key].push(array[i]);
    }

    if (asArray) return Object.values(hash);

    return hash;
};

export const Str = {
    headline: (str?: string) => {
        if (!str) return '';

        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    },
    ucFirst: (str: string) => {
        str = str.toLowerCase();

        return str.charAt(0).toUpperCase() + str.slice(1);
    },
};

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf('day');
const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
export const getRelativeDateAndTime = (date: string | Date) => {
    let relativeDate: string;
    const time = moment(date).format('hh:mm A');

    if (time === 'Invalid date') console.error(date);

    if (moment(date).isSame(TODAY, 'd')) {
        relativeDate = 'Today';
    } else if (moment(date).isSame(YESTERDAY, 'd')) {
        relativeDate = 'Yesterday';
    } else {
        relativeDate = moment(date).format('D.M.y');
    }

    const toString = () => `${relativeDate} @${time}`;

    return { date: relativeDate, time, toString };
};

export const getStatusIcon = (status: Status): IconType | undefined => {
    if ([Status.COMPLETED, Status.ACTIVE, Status.PAID].includes(status)) return FaCheck;
    if ([Status.FAILED, Status.INACTIVE].includes(status)) return FaCircleExclamation;
    if (status === Status.PENDING) return FaHourglassStart;
    if (status === Status.REFUNDED) return FaCircleInfo;
    if (status === Status.EXPIRED) return FaCalendarXmark;
};

export const getErrorMsg = (e: FetchBaseQueryError | SerializedError) => {
    if (isFetchBaseQueryError(e)) {
        if ('data' in e) {
            if ('message' in (e.data as object)) {
                return (e as { data: { message: string } }).data.message;
            }
        }
        if (e.status === 'FETCH_ERROR') {
            return 'It seems the server is down😞 please try again later.';
        }
    } else if (isErrorWithMessage(e)) {
        return e.message;
    }

    return 'Something went wrong';
};

export const getTelcoColor = (telco?: Telco, asRGB = false) => {
    let color = '#648381';
    if (telco === Telco.SAFARICOM) {
        color = '#59BC58';
    } else if (telco === Telco.AIRTEL) {
        color = '#EE4326';
    } else if (telco === Telco.TELKOM) {
        color = '#30AACB';
    }

    return asRGB ? hexToRgb(color) : color;
};
export const getTelcoFromPhone = (phone: string | number) => {
    phone = String(phone);

    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return Telco.SAFARICOM;
    } else if (phone.match(airtelRegEx)) {
        return Telco.AIRTEL;
    } else if (phone.match(telkomRegEx)) {
        return Telco.TELKOM;
    } else if (phone.match(equitelRegEx)) {
        return Telco.EQUITEL;
    } else if (phone.match(faibaRegEx)) {
        return Telco.FAIBA;
    }
};

export const hexToRgb = (hexValue: string) => {
    let hex;
    hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue);
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b)
    );
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

export const currencyFormat = (number?: number, currency = 'KES', decimals = 2): string => {
    const n = Number(number);

    if (isNaN(n)) return '0';

    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        maximumFractionDigits: decimals,
    }).format(n);
};

export function getUniquePropertyValues<T>(array: T[], propertyName: keyof T): T[keyof T][] {
    const uniqueValues: Set<T[keyof T]> = new Set();

    array.forEach((item) => {
        uniqueValues.add(item[propertyName]);
    });

    return Array.from(uniqueValues);
}

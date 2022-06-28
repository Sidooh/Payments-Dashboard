import Toastify from 'toastify-js';
import { ToastDataType } from './types';
import { Telco } from './enums';
import { parsePhoneNumber } from 'libphonenumber-js';

export const getItemFromStore = (key: string, defaultValue?: string | boolean, store = localStorage) => {
    try {
        return JSON.parse(String(store.getItem(key))) || defaultValue;
    } catch {
        return store.getItem(key) || defaultValue;
    }
};
export const setItemToStore = (key: string, payload: string, store = localStorage) => store.setItem(key, payload);

export const isIterableArray = (array: any) => Array.isArray(array) && !!array.length;

export const capitalize = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const flattenRoutes = (children: any) => {
    const allChildren: any[] = [];

    const flatChild = (children: any) => {
        children.forEach((child: any) => {
            if (child.children) {
                flatChild(child.children);
            } else {
                allChildren.push(child);
            }
        });
    };
    flatChild(children);

    return allChildren;
};

export const getFlattenedRoutes = (children: any) => children.reduce(
    (acc: any, val: any) => {
        if (val.children) {
            return {
                ...acc,
                [camelize(val.name)]: flattenRoutes(val.children)
            };
        } else {
            return {
                ...acc,
                unTitled: [...acc.unTitled, val]
            };
        }
    },
    {unTitled: []}
);

const vendor = ((navigator && navigator.vendor) || '').toLowerCase();
const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();

// build a 'comparator' object for various comparison checks
let comparator = {
    '<' : (a: any, b: string) => a < b,
    '<=': (a: any, b: string) => a <= b,
    '>' : (a: any, b: string) => a > b,
    '>=': (a: any, b: string) => a >= b
};

// helper function which compares a version to a range
function compareVersion(version: any, range?: string) {
    let string: string = (range + '');
    let n = +(string.match(/\d+/) || NaN);
    let op: string = string.match(/^[<>]=?|/) ? string.match(/^[<>]=?|/)![0] : "";

    // @ts-ignore
    return comparator[op] ? comparator[op](version, n) : (version === n);
}

// is current operating system windows?
export const is = {
    windows: () => {
        return navigator.userAgent.indexOf("Win") !== -1;
    },
    chrome : (range?: string): boolean => {
        let match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && !is.opera() && compareVersion(match[1], range);
    },
    opera  : (range?: string): boolean => {
        let match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    firefox: (range?: string): boolean => {
        let match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    }
};

export const toast = (data: ToastDataType) => {
    let duration = (data.duration ?? 7) * 1000,
        type = data.type ?? 'success',
        close = data.close ?? true;

    Toastify({
        text     : data.msg,
        duration : duration,
        close    : close,
        gravity  : data.gravity ?? 'bottom',
        position : data.position ?? 'right',
        className: type,
    }).showToast();
};

export const JWT = {
    decode: (token: string) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
};

export const parsePhone = (phone?: string|number) => phone && parsePhoneNumber(String(phone), 'KE').number;

export const getTelcoFromPhone = (phone: string) => {
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
    } else {
        return null;
    }
};
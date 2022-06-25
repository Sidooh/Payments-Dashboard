import { HTMLAttributes } from 'react';

interface ITheme {
    [key: string]: string;
}

interface IPrettyJSON extends HTMLAttributes<HTMLElement> {
    json?: any;
    data?: any;
    replacer?: (key: string, value: any) => any | null;
    space?: number | string;
    themeClassName?: string;
    theme?: ITheme;
    silent?: boolean;
    onJSONPrettyError?: (e: Error) => void;
    mainStyle?: string;
    keyStyle?: string;
    stringStyle?: string;
    valueStyle?: string;
    booleanStyle?: string;
    errorStyle?: string;
}

const getStyleValue = (name: string, theme: ITheme, styles: any): string => {
    const extra = styles[name + 'Style'] || '';
    const style = theme ? theme[name] || '' : '';
    return extra ? `${extra};${style}` : style;
};

const getStyle = (name: string, theme: ITheme, styles: any): string => {
    const value = getStyleValue(name, theme, styles);
    return value ? ` style="${value}"` : '';
};

const xssmap: { [key: string]: string } = {
    '"' : '&quot;',
    '\'': '&apos;',
    '&' : '&amp;',
    '>' : '&gt;',
    '<' : '&lt',
};

function xss(s: string): string {
    if (!s) {
        return s;
    }

    return s.replace(/[<>&"']/g, (m) => {
        return xssmap[m];
    });
}

const _replace = (theme: ITheme, styles: any, ind: string, key: string, val: string, tra: string) => {
    const spanEnd = '</span>';
    const keySpan = `<span class="__json-key__"${getStyle('key', theme, styles)}>`;
    const valSpan = `<span class="__json-value__"${getStyle('value', theme, styles)}>`;
    const strSpan = `<span class="__json-string__"${getStyle('string', theme, styles)}>`;
    const booSpan = `<span class="__json-boolean__"${getStyle('boolean', theme, styles)}>`;

    let sps = ind || '';
    if (key) {
        sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, '') + spanEnd + '": ';
    }

    if (val) {
        if (val === 'true' || val === 'false') {
            sps = sps + booSpan + val + spanEnd;
        } else {
            sps = sps + (val[0] === '"' ? strSpan : valSpan) + val + spanEnd;
        }
    }

    return sps + (tra || '');
};

const _pretty = (theme: ITheme, obj: any, space: number, styles: any, replacer?: (k: string, v: any) => any) => {
    const regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*],?|\{\s*},?)?$/mg;
    const text = JSON.stringify(obj, typeof replacer === 'function' ? replacer : undefined, isNaN(space) ? 2 : space);

    /* istanbul ignore next */
    if (!text) return text;

    return text.replace(/&/g, '&amp;').replace(/\\"([^,])/g, '\\&quot;$1')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(regLine, _replace.bind(null, theme, styles));
};

const PrettyJSON = ({
    json = '', data = '', replacer, space = 2, themeClassName, theme = {}, onJSONPrettyError, onError, silent = true,
    mainStyle,
    keyStyle,
    valueStyle,
    stringStyle,
    booleanStyle,
    errorStyle,
    ...rest
}: IPrettyJSON) => {
    let obj = data || json;

    const styles = {
        mainStyle,
        keyStyle,
        valueStyle,
        stringStyle,
        booleanStyle,
        errorStyle
    };

    if (typeof obj === 'string') {
        try {
            obj = JSON.parse(obj);
        } catch (e: any) {
            if (!silent) console.warn(`[react-json-pretty]: ${e.message}`);
            if (onJSONPrettyError) onJSONPrettyError(e);
            if (!onJSONPrettyError && onError) {
                onError(e);
                console.warn('JSONPretty#onError is deprecated, please use JSONPretty#onJSONPrettyError instead');
            }

            return (
                <div {...rest} dangerouslySetInnerHTML={{
                    __html:
                        `<pre class="__json-pretty-error__"${getStyle('error', theme, styles)}>${xss(obj)}</pre>`
                }}>
                </div>
            );
        }
    }

    return (
        <div {...rest} dangerouslySetInnerHTML={{
            __html:
                `<pre class="${themeClassName}"${getStyle('main', theme, styles)}>${
                    _pretty(theme, obj, +space, styles, replacer)
                }</pre>`
        }}>
        </div>
    );
};

export default PrettyJSON;

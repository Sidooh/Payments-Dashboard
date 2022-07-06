import { InputHTMLAttributes, useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';

export default function DebouncedInput({value: initialValue, onChange, debounce = 500, ...props}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
    label?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => onChange(value), debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return <FormControl {...props} size="sm" value={value} onChange={e => setValue(e.target.value)}/>;
}

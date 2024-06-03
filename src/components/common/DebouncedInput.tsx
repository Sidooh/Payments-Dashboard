import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils.ts';

type DebouncedInputProps = {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
    label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
    ({ value: initialValue, onChange, debounce = 500, className, ...props }, ref) => {
        const [value, setValue] = useState(initialValue);

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        useEffect(() => {
            const timeout = setTimeout(() => onChange(value), debounce);

            return () => clearTimeout(timeout);
        }, [value]);

        return (
            <Input
                ref={ref}
                className={cn('h-7', className)}
                {...props}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    }
);

DebouncedInput.displayName = 'DebouncedInput';

export default DebouncedInput;

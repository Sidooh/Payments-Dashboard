import { HTMLProps, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

export default function IndeterminateCheckbox({
    indeterminate,
    className = '',
    checked,
    onChange,
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') ref.current.indeterminate = Boolean(checked) && indeterminate;
    }, [ref, indeterminate]);

    return (
        <Form.Check className={`${className} cursor-pointer mb-0 d-flex align-items-center`}>
            <Form.Check.Input ref={ref} checked={checked} onChange={onChange}/>
        </Form.Check>
    );
}
import { HTMLProps, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

export default function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') ref.current.indeterminate = !rest.checked && indeterminate;
    }, [ref, indeterminate]);

    return (
        <Form.Check className={`${className} cursor-pointer form-check mb-0 d-flex align-items-center`}>
            <Form.Check.Input ref={ref} {...rest} />
        </Form.Check>
    );
}
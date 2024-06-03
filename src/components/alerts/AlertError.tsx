import { SerializedError } from '@reduxjs/toolkit';
import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { cn, getErrorMsg, isFetchBaseQueryError } from '@/lib/utils.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { LuAlertCircle } from 'react-icons/lu';
import { logout } from '@/features/auth/authSlice.ts';
import { useAppDispatch } from '@/app/store.ts';

interface ServerErrorProps extends HTMLAttributes<HTMLButtonElement> {
    error?: FetchBaseQueryError | SerializedError | string;
}

const AlertError = forwardRef<HTMLDivElement, ServerErrorProps>(({ error, className }, ref) => {
    const [message, setMessage] = useState('...na sina fom shida ni gani🤡');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            if (typeof error === 'string') {
                setMessage(error);
            } else {
                if (isFetchBaseQueryError(error) && error.status === 401) {
                    dispatch(logout());
                }

                setMessage(getErrorMsg(error));
            }
        }
    }, [error]);

    if (!error) return <></>;

    return (
        <Alert ref={ref} variant={'destructive'} className={cn('border-dashed bg-red-50', className)}>
            <LuAlertCircle className="h-4 w-4" />
            <AlertTitle>Oops...</AlertTitle>
            <AlertDescription>---: {message}</AlertDescription>
        </Alert>
    );
});

AlertError.displayName = 'ServerError';

export default AlertError;

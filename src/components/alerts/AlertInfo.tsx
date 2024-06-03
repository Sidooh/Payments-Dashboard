import { forwardRef, HTMLAttributes } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { cn } from '@/lib/utils.ts';
import { BiInfoCircle } from 'react-icons/bi';

interface ServerErrorProps extends HTMLAttributes<HTMLButtonElement> {
    message?: string;
}

const AlertInfo = forwardRef<HTMLDivElement, ServerErrorProps>(({ message, className }, ref) => {
    if (!message) return <></>;

    return (
        <Alert ref={ref} className={cn('border-dashed border-blue-600 bg-blue-50', { className })}>
            <BiInfoCircle className="h-4 w-4" />
            <AlertTitle>PS: 😀</AlertTitle>
            <AlertDescription>---: {message}</AlertDescription>
        </Alert>
    );
});

AlertInfo.displayName = 'AlertInfo';

export default AlertInfo;

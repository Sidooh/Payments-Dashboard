import { Tooltip as BaseTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Side } from '@radix-ui/react-popper';
import { cn } from '@/lib/utils.ts';

type TooltipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    title: ReactNode;
    asChild?: boolean;
    placement?: Side;
    contentClassName?: string;
};

const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
    ({ children, title, placement, asChild = false, contentClassName }, ref) => (
        <TooltipProvider>
            <BaseTooltip>
                <TooltipTrigger ref={ref} asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={placement} className={cn(contentClassName)}>
                    {title}
                </TooltipContent>
            </BaseTooltip>
        </TooltipProvider>
    )
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;

import * as React from 'react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import routes from '@/routes.ts';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import Logo from '@/components/common/Logo.tsx';
import { CgMenuLeft } from 'react-icons/cg';

interface MobileLinkProps extends NavLinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

const MobileLink = ({ to, onOpenChange, className, children, ...props }: MobileLinkProps) => (
    <NavLink to={to} onClick={() => onOpenChange?.(false)} className={className} {...props}>
        {children}
    </NavLink>
);

export function MobileNav() {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <CgMenuLeft size={24} />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-4/6 pr-0">
                <MobileLink to="/" className="flex items-center" onOpenChange={setOpen}>
                    <Logo />
                </MobileLink>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                    <div className="flex flex-col space-y-4">
                        {routes.map((r, index) => (
                            <div key={index} className="flex flex-col pt-6 pe-6">
                                <h2 className="pe-4 tracking-tight text-gray-400">{r.label}</h2>
                                <div className="space-y-2">
                                    {r.children.map(({ name, icon: Icon, to, children }, i) => (
                                        <Fragment key={`child-${name}-${i}`}>
                                            <MobileLink
                                                end
                                                to={to ?? ''}
                                                onOpenChange={setOpen}
                                                className={({ isActive }) =>
                                                    cn('group flex items-center pe-4 py-2 font-medium', {
                                                        'hover:text-gray-500': !children,
                                                        'text-primary border-e-2 border-e-primary/70':
                                                            isActive && !children,
                                                    })
                                                }
                                            >
                                                <Icon className="mr-2 h-4 w-4" />
                                                {name}
                                            </MobileLink>
                                            {children &&
                                                children.length > 0 &&
                                                children.map((child, i) => (
                                                    <MobileLink
                                                        end
                                                        to={String(child.to)}
                                                        key={`grand-child-${child.name}-${i}`}
                                                        onOpenChange={setOpen}
                                                        className={({ isActive }) =>
                                                            cn(
                                                                'group flex items-center ps-6 py-0 font-medium text-gray-700 hover:text-gray-900',
                                                                {
                                                                    'text-primary border-e-2 border-e-primary/70':
                                                                        isActive,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        - {child.name}
                                                    </MobileLink>
                                                ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

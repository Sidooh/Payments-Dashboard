import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/common/Logo.tsx';
import { FaUser } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { MobileNav } from '@/layouts/partials/MobileNav.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useAppDispatch } from '@/app/store.ts';
import { logout, reset } from '@/features/auth/authSlice.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import waffle from '@/assets/images/waffle.svg';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { cn } from '@/lib/utils.ts';
import { ModeToggle } from '@/components/ModeToggle.tsx';
import { CONFIG } from '@/config.ts';

const Waffle = () => {
    const links = [
        {
            avatarText: 'A',
            title: 'Accounts',
            link: CONFIG.services.accounts.dashboard.url,
            color: 'blue',
        },
        {
            avatarText: 'E',
            title: 'Enterprise',
            link: `/`,
            disabled: true,
        },
        {
            avatarText: 'M',
            title: 'Merchants',
            link: CONFIG.services.merchants.dashboard.url,
        },
        {
            avatarText: 'N',
            title: 'Notify',
            link: CONFIG.services.notify.dashboard.url,
        },
        {
            avatarText: 'P',
            title: 'Products',
            link: CONFIG.services.products.dashboard.url,
        },
        {
            avatarText: 'S',
            title: 'Savings',
            link: CONFIG.services.savings.dashboard.url,
        },
        {
            avatarText: 'U',
            title: 'USSD',
            link: CONFIG.services.ussd.dashboard.url,
        },
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant={'ghost'} className={'rounded-full'}>
                    <img src={waffle} alt="" width={15} height={15} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <ScrollArea>
                    <div className="grid grid-cols-3 gap-y-3">
                        {links.map((l) => (
                            <a
                                key={l.title}
                                href={l.link}
                                className={cn('space-y-2 py-2 rounded-lg', {
                                    'hover:bg-primary/10': !l.disabled,
                                })}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                <Avatar className={'mx-auto'}>
                                    <AvatarFallback>{l.avatarText}</AvatarFallback>
                                </Avatar>
                                <p
                                    className={cn(`mb-0 font-medium text-truncate text-xs text-center`, {
                                        'text-gray-800': !l.disabled,
                                        'text-gray-400': l.disabled,
                                    })}
                                >
                                    {l.title}
                                </p>
                            </a>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showDropShadow, setShowDropShadow] = useState(false);

    const setDropShadow = () => {
        const el = document.documentElement;
        if (el.scrollTop > 0) {
            setShowDropShadow(true);
        } else {
            setShowDropShadow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', setDropShadow);

        return () => window.removeEventListener('scroll', setDropShadow);
    }, []);

    const handleSignOut = () => {
        dispatch(logout());
        dispatch(reset());

        navigate('/login');
    };

    const user = {
        name: 'Admin',
        email: 'international@sidooh.co.ke',
        image: null,
    };

    return (
        <header
            className={cn('sticky top-0 z-40 bg-background', {
                'shadow-[0_.5rem_.5rem_-.5rem_#0003]': showDropShadow,
            })}
        >
            <div className="px-3 lg:container flex h-16 items-center justify-between py-4">
                <div className="flex gap-3">
                    <MobileNav />
                    <Link to="/" className="items-center space-x-2 flex">
                        <Logo />
                    </Link>
                </div>

                <div className={'flex items-center space-x-2'}>
                    <ModeToggle />

                    <Waffle />

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className={'h-8 w-8'}>
                                {user.image ? (
                                    <AvatarImage alt="Picture" src={user.image} />
                                ) : (
                                    <AvatarFallback>
                                        <span className="sr-only">{user.name}</span>
                                        <FaUser />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {user.name && <p className="font-medium">{user.name}</p>}
                                    {user.email && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleSignOut();
                                }}
                            >
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;

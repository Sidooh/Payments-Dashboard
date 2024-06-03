import { cn } from '@/lib/utils';
import routes from '@/routes.ts';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';

export default function Sidebar() {
    return (
        <nav className={'pb-12 fixed w-[12.625rem]'}>
            <div className="space-y-4 py-4">
                {routes.map((r, i) => (
                    <div key={`route-${i}`} className="px-3 py-2 text-sm">
                        <h2 className="mb-2 px-4 tracking-tight text-gray-400">{r.label}</h2>
                        <div className="space-y-1">
                            {r.children.map(({ name, icon: Icon, to, children }, i) => (
                                <Fragment key={`child-${name}-${i}`}>
                                    <NavLink
                                        end
                                        to={to ?? ''}
                                        className={({ isActive }) =>
                                            cn('group flex items-center px-3 py-2 font-medium', {
                                                'hover:text-gray-500': !children,
                                                'text-primary border-e-2 border-e-primary/70': isActive && !children,
                                            })
                                        }
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {name}
                                    </NavLink>
                                    {children &&
                                        children.length > 0 &&
                                        children.map((child, i) => (
                                            <NavLink
                                                end
                                                to={String(child.to)}
                                                key={`grand-child-${child.name}-${i}`}
                                                className={({ isActive }) =>
                                                    cn(
                                                        'group flex items-center ps-9 py-0 font-medium text-gray-700 hover:text-gray-900',
                                                        {
                                                            'text-primary border-e-2 border-e-primary/70': isActive,
                                                        }
                                                    )
                                                }
                                            >
                                                - {child.name}
                                            </NavLink>
                                        ))}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}

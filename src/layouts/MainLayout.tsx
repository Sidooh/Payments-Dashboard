import { memo, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer, SectionError, SectionLoader } from '@nabcellent/sui-react';
import { CONFIG } from '../config';

const MainLayout = () => {
    const {hash, pathname} = useLocation();
    const isKanban = pathname.includes('kanban');

    const {isFluid, navbarPosition} = useAppSelector((state: RootState) => state.theme);

    useEffect(() => {
        setTimeout(() => {
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({block: 'start', behavior: 'smooth'});
                }
            }
        }, 0);
    }, [hash]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={isFluid ? 'container-fluid' : 'container'}>
            {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
                <NavbarVertical/>
            )}
            <div className={`content ${isKanban && 'pb-0'}`}>
                <NavbarTop/>
                {/*------ Main Routes ------*/}
                <ErrorBoundary FallbackComponent={SectionError} onReset={() => window.location.reload()}>
                    <Suspense fallback={<SectionLoader/>}><Outlet/></Suspense>
                </ErrorBoundary>

                {!isKanban && <Footer version={CONFIG.sidooh.version} serviceName={'Payments'}/>}
            </div>
        </div>
    );
};

export default memo(MainLayout);

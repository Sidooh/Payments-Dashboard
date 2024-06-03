import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import ErrorFallback from '@/components/errors/ErrorFallback';
import PageLoader from '@/components/loaders/PageLoader';
import Sidebar from '@/layouts/partials/Sidebar';
import Header from '@/layouts/partials/Header';
import Footer from '@/layouts/partials/Footer';

const MainLayout = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => {
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);

                if (element) {
                    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
                }
            }
        }, 0);
    }, [hash]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex min-h-screen flex-col space-y-3">
            <Header />

            <div className="px-3 lg:px-0 lg:container lg:grid flex-1 gap-12 md:grid-cols-[200px_1fr] pb-6">
                <aside className={'hidden md:block'}>
                    <Sidebar />
                </aside>

                <main className="min-h-screen relative pb-12">
                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>

                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;

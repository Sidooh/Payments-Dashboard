import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { IMAGES } from '@/constants/images';
import { CONFIG } from '@/config.ts';
import PageLoader from '@/components/loaders/PageLoader.tsx';

const GuestLayout = () => {
    return (
        <div className={'flex justify-center items-center min-h-screen p-6'}>
            <div className={'flex items-center justify-center mb-4 flex-col relative'}>
                <img
                    className="hidden lg:block absolute end-[-8.75rem] top-[-5.125rem]"
                    src={IMAGES.icons.spotIllustrations.bg_shape}
                    alt=""
                    width="250"
                />
                <img
                    className="hidden lg:block absolute start-[-6.75rem] bottom-[-2.4375rem]"
                    src={IMAGES.icons.spotIllustrations.shape_1}
                    alt=""
                    width="150"
                />

                <img className="me-2" src={IMAGES.logos.sidooh} alt="Logo" width={120} />
                <h6 className={'font-semibold text-[10pt]'} style={{ margin: `-.48rem 0 2rem` }}>
                    {CONFIG.app.name}
                </h6>

                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default memo(GuestLayout);

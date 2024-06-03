import { CONFIG } from '@/config.ts';
import moment from 'moment';

const Footer = () => {
    return (
        <footer className="absolute bottom-0 w-full">
            <div className="flex justify-between text-xs mt-4 mb-3">
                <p className="mb-0 text-600">
                    {CONFIG.app.name} |{' '}
                    <a href="/" className={'text-primary'}>
                        Sidooh
                    </a>{' '}
                    &copy; {new Date().getFullYear()}
                </p>
                <p className="mb-0 text-600">
                    v{CONFIG.app.version} | {moment().format('D.M.y')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;

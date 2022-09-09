import { useEffect, useState } from 'react';
import { refreshTheme } from '../features/theme/themeSlice';
import { useAppDispatch } from '../app/hooks';

const useTheme = (isDark: boolean) => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);

        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        dispatch(refreshTheme());

        setIsLoaded(true);
    }, [isDark]);

    return { isLoaded };
};

export default useTheme;

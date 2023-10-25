import { RootState, useAppSelector } from '../app/store';

export const useAuth = () => {
    return useAppSelector((state: RootState) => state.auth);
};

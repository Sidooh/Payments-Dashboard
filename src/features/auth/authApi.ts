import { CONFIG } from '@/config';
import axios from 'axios';
import { LoginRequest, LoginResponse } from '@/lib/types';

export const authAPI = {
    login: async (data: LoginRequest) => {
        try {
            const { data: res } = await axios.post<LoginResponse>(
                `${CONFIG.services.accounts.api.url}/users/signin`,
                data
            );

            localStorage.setItem('token', JSON.stringify(res.access_token));

            return res.access_token;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status && [400, 422].includes(err.response?.status) && Boolean(err.response?.data)) {
                    throw new Error(err.response?.data.errors[0].message);
                } else if (err.response?.status === 401 && err.response.data) {
                    throw new Error('Invalid credentials!');
                } else if (err.response?.status === 429) {
                    throw new Error('Sorry! We failed to sign you in. Please try again in a few minutes.');
                } else if (err.code === 'ERR_NETWORK') {
                    throw new Error('Network Error! Service unavailable.');
                } else {
                    throw new Error('Something went wrong!');
                }
            } else {
                console.error('Unexpected errors:', err);
            }
        }
    },
    logout: () => localStorage.removeItem('token'),
};

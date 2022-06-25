import axios from 'axios';
import { CONFIG } from 'config';
import { JWT } from 'utils/helpers';

const API_URL = `${ CONFIG.sidooh.services.accounts.api.url }/users/signin`;

export type LoginRequest = {
    email: string
    password: string
}

export const authAPI = {
    login: async (userData: LoginRequest) => {
        let {data} = await axios.post(API_URL, userData, {withCredentials: true});

        if (data) {
            data = {
                token: data.token,
                user: JWT.decode(data.token),
                credentials: userData
            };

            localStorage.setItem('auth', JSON.stringify(data));
        }

        return data;
    },
    logout: () => localStorage.removeItem('auth')
};
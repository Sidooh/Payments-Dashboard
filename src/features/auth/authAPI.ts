import { CONFIG } from 'config';
import { JWT } from 'utils/helpers';

const API_URL = `${CONFIG.sidooh.services.accounts.api.url}/users/signin`;

export type LoginRequest = {
    email: string
    password: string
}

export const authAPI = {
    login : async (userData: LoginRequest) => {
        // let {data} = await axios.post(API_URL, userData, {withCredentials: true});
        let response = await fetch(API_URL, {
            method : 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body   : JSON.stringify(userData)
        });
        let {token, errors} = await response.json();

        let data;
        if (token) {
            data = {
                token      : token,
                user       : JWT.decode(token),
                credentials: userData
            };

            localStorage.setItem('auth', JSON.stringify(data));
        } else {
            console.error(errors);
        }

        return data;
    },
    logout: () => localStorage.removeItem('auth')
};

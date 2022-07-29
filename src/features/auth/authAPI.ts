import { CONFIG } from 'config';

const API_URL = `${CONFIG.sidooh.services.accounts.api.url}/users/signin`;

export type LoginRequest = {
    email: string
    password: string
}

export const authAPI = {
    login: async (userData: LoginRequest) => {
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        let {access_token: token, errors} = await response.json();

        if (token) {
            localStorage.setItem('auth', JSON.stringify({token}));
        } else {
            console.error(errors);
        }

        return {token};
    },
    logout: () => localStorage.removeItem('auth')
};

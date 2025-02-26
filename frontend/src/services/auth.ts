import { ENDPOINT } from '../constants/endpoints';
import type { LoginAuth, RegisterAuth } from '../models/auth';

export const loginUser = async ({ email, password }: LoginAuth) => {
    const data = await fetch(ENDPOINT.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    return data;
};

export const registerUser = async ({ email, password }: RegisterAuth) => {
    const data = await fetch(ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    return data;
};

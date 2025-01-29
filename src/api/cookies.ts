import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = `${import.meta.env.VITE_APP_NAME}-auth`;

export const getAuthToken = (): string | undefined =>
    Cookies.get(AUTH_COOKIE_NAME);

export const setAuthToken = (value: string, remember = false) =>
    Cookies.set(AUTH_COOKIE_NAME, value, {
        secure: true,
        expires: remember ? 14 : 1 / 48,
        sameSite: 'strict',
    });

export const removeAuthToken = () => {
    const cookie = Cookies.get(AUTH_COOKIE_NAME);

    if (cookie) Cookies.remove(AUTH_COOKIE_NAME);
};

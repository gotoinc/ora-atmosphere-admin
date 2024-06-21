import { isAxiosError } from 'axios';

export const useThrowError = (err: unknown) => {
    if (isAxiosError(err)) {
        throw err.response?.data;
    } else {
        throw err;
    }
};

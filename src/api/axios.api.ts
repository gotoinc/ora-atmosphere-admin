import type { AxiosStatic } from 'axios';
import axios from 'axios';

import { getAuthToken } from '@/api/cookies.ts';

export const setupAxios = (axiosObject: AxiosStatic) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    axiosObject.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    axiosObject.interceptors.request.use(
        (config) => {
            const token = getAuthToken();

            if (token) {
                config.headers.Authorization = `Token ${token}`;
            }

            return config;
        },
        async (error) => await Promise.reject(error)
    );
};

export const clenAxios = axios.create();

export default axios;

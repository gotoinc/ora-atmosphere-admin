import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(function (config) {
    const token = Cookies.get('ora_admin');

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});

axios.defaults.baseURL =
    'http://atmosphere-api.eba-menjd7cv.eu-west-3.elasticbeanstalk.com';

export default axios;

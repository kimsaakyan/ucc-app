import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3333',
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = token;

    return config;
});

export default instance;

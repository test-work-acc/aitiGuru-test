import axios from 'axios';


const API_BASE_URL = 'https://dummyjson.com';


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        }

        return Promise.reject(error);
    }
);

export default apiClient;
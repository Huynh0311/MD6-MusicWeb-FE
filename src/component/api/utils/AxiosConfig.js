import axios from "axios";
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWxhMjAiLCJpYXQiOjE2OTY0NzQyMjUsImV4cCI6ODgwOTY0NzQyMjV9.bCR6EugxLd-clADuety6zSsi65pueNQculMnABFYzkk';
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
});

instance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;

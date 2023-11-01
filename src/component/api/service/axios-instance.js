import axios from "axios";
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dWFubGUxMkBnbWFpbC5jb20iLCJpYXQiOjE2OTY1ODE3OTIsImV4cCI6ODgwOTY1ODE3OTJ9.R9OwpZdJ1lxM1O3QK4_H4Fkrr9-PCj5U4a9sVq5UNSI';
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
});

instance.interceptors.request.use(
    (config) => {
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
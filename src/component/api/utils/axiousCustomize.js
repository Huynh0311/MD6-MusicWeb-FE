import axios from "axios";
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyMTIzNCIsImlhdCI6MTY5NjU4NTExOCwiZXhwIjo4ODA5NjU4NTExOH0.CndViRPHMs0TUiUtF-WLBrwi3VPuyEvXgel5cOH4AZI';
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

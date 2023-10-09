import axios from "axios";
let account = JSON.parse(localStorage.getItem("data"));
let token = account.token;
console.log(token)
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
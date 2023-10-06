import axios from "axios";
let account = localStorage.getItem("data");
let token = '';
if (account) {
    const parsedAccount = JSON.parse(account);
    token = parsedAccount.token;
}
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
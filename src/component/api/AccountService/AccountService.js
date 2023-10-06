import axios from "axios";

class AccountService {
    getAllAccount = () => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/apiAccount/all")
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    }

    findById = (id) => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/apiAccount/findById/" + id)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    }

    updateAccount = (id, account) => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/apiAccount/saveAccount/" + id, account)
                .then(response => {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    }

    updatePassword = (account) => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/apiAccount/save", account)
                .then(response => {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    }
}

let axiosConfig = new AccountService();
export default axiosConfig;
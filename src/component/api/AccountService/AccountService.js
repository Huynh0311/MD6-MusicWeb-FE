
import instance from "../utils/AxiosCustomize";

class AccountService {
    getAllAccount = () => {
       return instance.post("apiAccount/all");
    }

    findById = (id) => {
        return instance.post("apiAccount/findById/" + id);
    }

    updateAccount = (id, account) => {
        return instance.post("http://localhost:8080/apiAccount/saveAccount/" + id, account)

    }

    updatePassword = (account) => {
        return instance.post("http://localhost:8080/apiAccount/save", account)
    }
}

let accountService = new AccountService();
export default accountService;
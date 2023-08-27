import { api } from "./Api";

class AccountService {
    async createAccount(body) {
        console.log("new account data: ", body)
        const res = await api.post('/account/register', body)
        console.log('response data: ', res.data);
        // Need to store the account data in pinia
    }
}

export const accountService = new AccountService();
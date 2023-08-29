import { api } from "./Api";

class AccountService {
    async createAccount(body) {
        try {
            const res = await api.post('/account/register', body);
            console.log('response data: ', res.data);
        } catch (error) {
            console.error("Error: ", error);
        }
        // Need to store the account data in pinia
    }

    async login(body) {
        try {
            const res = await api.post('/account/login', body);
            console.log('login response data: ', res.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }
}

export const accountService = new AccountService();
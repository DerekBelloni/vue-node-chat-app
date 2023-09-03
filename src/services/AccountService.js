import { api } from "./Api";

class AccountService {
    async createAccount(body) {
        try {
            const res = await api.post('/account/register', body);
            return res.data;
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    async login(body) {
        try {
            const res = await api.post('/account/login', body);
            return res.data;
        } catch (error) {
            console.error("Error: ", error);
        }
    }
}

export const accountService = new AccountService();
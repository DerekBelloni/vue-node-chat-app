import { api } from "./Api";

class AccountService {
    async createAccount(body) {
        try {
            const res = await api.post('/account/register', body);
            return res.data;
        } catch (error) {
            throw new Error('Failed to create account.')
        }
    }

    async login(body) {
        try {
            const res = await api.post('/account/login', body);
            return res.data;
        } catch (error) {
            throw new Error('Failed to login.')
        }
    }

    async getAccountBySession(sessionID) {
        try {
            const res = await api.post('/account/refresh', {session_id: sessionID});
            console.log(res.data);
            return res.data;
        } catch (error) {
            throw new Error('Failed to retrieve account data.')
        }
    }

    async logout() {
        try {
            let logoutRes = await api.get('/account/logout')
            return 'User has been logged out.'
        } catch (error) {
            throw new Error('Failed to logout.')
        }
    }
}

export const accountService = new AccountService();
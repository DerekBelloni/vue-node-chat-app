
import { api } from "./Api";

class AccountService {
    setRouterInstance(router) {
        this.router = router
    }

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
            if (res.status === 200) {
                console.log('banana: ',res.data);
                return res.data;
            } else if (res.status === 401) {
                this.router.push('/login');
            }
        } catch (error) {
            this.router.push('/login');
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
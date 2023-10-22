
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
            console.log("Error creating account: ", error);
        }
    }

    async login(body) {
        try {
            const res = await api.post('/account/login', body);
            return res.data;
        } catch (error) {
            console.log("Error logging in: ", error);
        }
    }

    async getAccountBySession(sessionID) {
        try {
            const res = await api.post('/account/refresh', {session_id: sessionID});
            if (res.status === 200) {
                return res.data;
            } else if (res.status === 401) {
                this.router.push('/login');
            }
        } catch (error) {
            this.router.push('/login');
            console.log("Error retrieving account: ", error);
        }
    }

    async logout() {
        try {
            let logoutRes = await api.get('/account/logout');
            return 'User has been logged out.';
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    }
}

export const accountService = new AccountService();
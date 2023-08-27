import { dbContext } from '../db/DbContext.js';

class AccountService {
    async createAccount(body) {
        console.log("body", body);
        const newAccount = await dbContext.Account.create(body);
        console.log("new account: ", newAccount);
        return newAccount;
    }
}

export const accountService = new AccountService();

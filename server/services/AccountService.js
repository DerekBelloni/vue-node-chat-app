import { dbContext } from '../db/DbContext.js';
import bcrypt from 'bcrypt'

class AccountService {
    async createAccount(req) {
        req.body.password = this.hashPassword(req.body.password);
        const newAccount = await dbContext.Account.create(req.body);
        req.session.isAuth = true;
        return {newAccount, session_id: req.session.id}
    }

    hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPass = bcrypt.hashSync(password, salt);

        password = hashedPass;
        return password
    }

    //make checking the account a separate function from getting the account
    async getAccount(req) {
        console.log("[Session ID]: ", req.session.id)
        const account = await dbContext.Account.find({
            email: req.body.email
        });
        const hash = account[0].password
        const providedPass = req.body.password
        

        return new Promise((resolve, reject) => {
            bcrypt.compare(providedPass, hash, (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err)
                    return;
                }
                if (result) {
                    req.session.isAuth = true;
                    console.log('[Session auth]: ', req.session.isAuth);
                    resolve({ account, session_id: req.session.id});
                } else {
                    reject(new Error('Invalid login credentials.'))
                }
            })
        })
    }

    async logout(req) {
        if (req.session.isAuth) {
            req.session.destroy((err) => {
                if (err) {
                    return { status: 'error', message: 'Logout failed.', error: err}
                } else {
                    return { status: 'success', message: 'User successfully logged out.'};
                }
            });
        }
    }
}

export const accountService = new AccountService();

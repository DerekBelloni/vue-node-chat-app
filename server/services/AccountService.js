import { dbContext } from '../db/DbContext.js';
import bcrypt from 'bcrypt'
import { sessionStore } from '../db/SessionStore.js'
import _ from 'lodash';

class AccountService {
    async createAccount(req) {
        req.body.password = this.hashPassword(req.body.password);
        const newAccount = await dbContext.Account.create(req.body);
        req.session.accountID = newAccount._id;
        req.session.isAuth = true;
        await this.updateSessionWithAcctID(req, newAccount._id);
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
        console.log('account in login, service layer: ', account[0])
        const hash = account[0].password
        const providedPass = req.body.password
        
        await this.updateSessionWithAcctID(req, account[0]._id);

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

    async updateSessionWithAcctID(req, accountID) {
        const session = req.session;

        if (session) {
            session.accountID = accountID
            await sessionStore.set(session.id, session);
        } else {
            console.error('Session not found.');
        }
    }

    async getAccountBySession(req) {
        const sessionData = await new Promise((resolve, reject) => {
            sessionStore.get(req.session.id, (err, data) => {
                if (err) {
                    reject(err);
                } else (
                    resolve(data)
                )
            })
        })
        if (!_.isEmpty(sessionData)) {
            const account = await dbContext.Account.findById(sessionData.accountID).exec();
            return account
        }
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

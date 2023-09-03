import { dbContext } from '../db/DbContext.js';
import bcrypt from 'bcrypt'

class AccountService {
    async createAccount(req) {
        req.body.password = this.hashPassword(req.body.password);
        const newAccount = await dbContext.Account.create(req.body);
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
        const account = await dbContext.Account.find({
            email: req.body.email
        })
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
                    resolve({ account, session_id: req.session.id});
                } else {
                    reject(new Error('Invalid login credentials.'))
                }
            })
        })
    }
}

export const accountService = new AccountService();

import { dbContext } from '../db/DbContext.js';
import bcrypt from 'bcrypt'

class AccountService {
    async createAccount(body) {
        body.password = this.hashPassword(body.password);
        const newAccount = await dbContext.Account.create(body);
        return newAccount;
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
        console.log('account: ', account[0].password);
        const hash = account[0].password
        const providedPass = req.body.password

        bcrypt.compare(providedPass, hash, (err, result) => {
            if (err) {
                // throw a forbidden, maybe a toast message
                console.error(err)
                return;
            }

            if (result) {
                console.log("session id: ", req.session.id);
                return { account, session_id: req.session.id};
            } else {
                // throw an error
                console.log('kiwi')
            }
        })
        return account

    }
}

export const accountService = new AccountService();

import { accountService } from "../services/AccountService.js";

export class AccountController {
    static async createAccount(req, res, next) {
        try {
            console.log('in account controller: ', req.session)
            const account = await accountService.createAccount(req, res);
            res.send(account);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "An error occurred"})
        }
    }

    static async login(req, res, next) {
        try {
            const account = await accountService.getAccount(req)
            res.send(account);
        } catch (error) {
            console.log("error: ", error)
            res.status(500).json({ error: "An error occurred"})
        }
    }

    static async logout(req, res, next) {
        try {
            await accountService.logout(req);
            res.status(204).header('X-Logout-Message', 'User has successfully logged out.').send();
        } catch (err) {
            res.status(500).json({ error: "An error occurred"});
        }
    }   
}

export default AccountController;
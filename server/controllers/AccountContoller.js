import { accountService } from "../services/AccountService.js";

export class AccountController {
    static async createAccount(req, res, next) {
        try {
            console.log("request: ", req.body.username)
            await accountService.createAccount(req.body);
            res.status(201).json({ message: "User created successfully"})
            console.log('response: ', res);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "An error occurred"})
        }
    }
}

export default AccountController;
import { accountService } from "../services/AccountService.js";

export class AccountController {
    static async createAccount(req, res, next) {
        try {
            await accountService.createAccount(req.body);
            res.status(201).json({ message: "User created successfully"})
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "An error occurred"})
        }
    }

    static async login(req, res, next) {
        try {
            const account = await accountService.getAccount(req)
            // res.status(201).json({ message: "Logged in successfully"})
            res.send(account);
        } catch (error) {
            console.log("error: ", error)
            res.status(500).json({ error: "An error occurred"})
        }
    }
}

export default AccountController;
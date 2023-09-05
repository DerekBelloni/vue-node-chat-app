import express from 'express'
import { AccountController } from '../controllers/AccountContoller.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>Hello!</h1>
    </br>
    <span>${req.session.cookie}</span>
    `);
})
router.post('/account/login', AccountController.login)
router.post('/account/register', AccountController.createAccount)
router.get('/account/logout', AccountController.logout);

export default router;
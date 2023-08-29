import express from 'express'
import { AccountController } from '../controllers/AccountContoller.js'

const router = express.Router();

router.post('/account/login', AccountController.login)
router.post('/account/register', AccountController.createAccount)

export default router;
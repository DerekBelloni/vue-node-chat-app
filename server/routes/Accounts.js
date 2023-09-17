import express from 'express'
import _ from 'lodash';
import dotenv from 'dotenv'
import { AccountController } from '../controllers/AccountContoller.js'
dotenv.config();

const router = express.Router();

router.post('/account/login', AccountController.login);
router.post('/account/refresh', AccountController.getAccountBySession);
router.post('/account/register', AccountController.createAccount);
router.get('/account/logout', AccountController.logout);

export default router;
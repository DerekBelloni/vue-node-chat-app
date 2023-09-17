import express from 'express'
import _ from 'lodash';
import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();

router.post('/profiles/:user_id');

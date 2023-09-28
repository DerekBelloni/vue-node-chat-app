import express from 'express';
import path from 'path';
import _ from 'lodash';
import dotenv from 'dotenv';
import { AccountController } from '../controllers/AccountContoller.js';
import { ProfilesController } from '../controllers/ProfilesContoller.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    } 
})

const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

// Account
router.post('/account/login', AccountController.login);
router.post('/account/refresh', AccountController.getAccountBySession);
router.post('/account/register', AccountController.createAccount);
router.get('/account/logout', AccountController.logout);

// Profile
// router.post('/profile/:accountID', ProfilesController.uploadProfilePic);
router.post('/profile/:accountID', upload.single('file'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    ProfilesController.uploadProfilePic(req, res)
        .then(() => {
            next();
        })
});

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
})

export default router;
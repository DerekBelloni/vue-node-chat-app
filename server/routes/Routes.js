import express from 'express';
import path from 'path';
import _ from 'lodash';
import dotenv from 'dotenv';
import { AccountController } from '../controllers/AccountContoller.js';
import { ProfilesController } from '../controllers/ProfilesContoller.js';
import { UploadsController } from '../controllers/UploadsController.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

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
router.post('/profile/replace/:accountID', upload.single('file'), async (req, res) => {
    console.log(req.body.fileToRemove)
    if (!_.isEmpty(req.body.fileToRemove)) {
        fs.unlink(`./uploads/${req.body.fileToRemove}`, (err) => {
            if (err) {
                return res.status(500).send({ error: 'Failed to delete file' });
            }
            console.log('file deleted successfully');
            ProfilesController.replaceProfilePic(req, res, () => {
                res.status(200).send({ message: "Profile picture replaced successfully!"})
            });
        })
    }
})

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

// upload a file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
})

// get upload by file name
router.get('/upload/:filename', UploadsController.getProfilePic)

export default router;
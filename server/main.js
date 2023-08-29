import express from 'express';
import dotenv from 'dotenv'
import { DbConnection } from './db/DbConfig.js'
import { createServer } from 'http'
import routes from './routes/Accounts.js'
import cors from 'cors'
import sessions from 'express-session'
dotenv.config();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);

DbConnection.connect();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5250'
}));
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
    resave: true,
    saveUninitialized: false
}));
app.use('/', routes);

httpServer.listen(port, () => {
    console.log(`[SERVING ON PORT]: ${port}`);
})



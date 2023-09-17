import express from 'express';
import dotenv from 'dotenv'
import { DbConnection } from './db/DbConfig.js'
import { createServer } from 'http'
import routes from './routes/Accounts.js'
import cors from 'cors'
import sessions from 'express-session'
import {sessionStore, sessionMiddleware} from './db/SessionStore.js'

dotenv.config();
const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
DbConnection.connect();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5250',
    credentials: true,
    exposedHeaders: ['set-cookie']
}));


app.use(sessions({
    secret: process.env.SESSION_SECRET,
    name: 'appSession',
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        domain: 'localhost'
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));
app.use(sessionMiddleware);
app.use('/', routes);

httpServer.listen(port, () => {
    console.log(`[SERVING ON PORT]: ${port}`);
})



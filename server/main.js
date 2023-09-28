import express from 'express';
import dotenv from 'dotenv'
import { DbConnection } from './db/DbConfig.js'
import { createServer } from 'http'
import routes from './routes/Routes.js'
import cors from 'cors'
import {sessionMiddleware} from './db/SessionStore.js'

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

app.use(sessionMiddleware);
app.use('/', routes);

httpServer.listen(port, () => {
    console.log(`[SERVING ON PORT]: ${port}`);
})



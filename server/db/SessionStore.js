import sessions from 'express-session';
import MongoDBSession from 'connect-mongodb-session';

const MongoDBSessionStore = MongoDBSession(sessions);

const sessionStore = new MongoDBSessionStore({
    uri: process.env.MONGO_CONNECTION_STRING,
    collection: 'sessions',
});


const sessionMiddleware = sessions({
    secret: process.env.SESSION_SECRET,
    name: 'appSession',
    cookie: {
        maxAge: 60 * 60 * 1000, 
        secure: false,
        httpOnly: true,
        domain: 'localhost',
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
});

export { sessionStore, sessionMiddleware };
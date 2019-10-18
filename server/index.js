require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const controller = require('./controller');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database connected.')
})

//auth
app.post('/auth/register', controller.register);
app.post('/auth/login', controller.login);
app.get('/auth/user', controller.getUser);
app.post('/auth/logout', controller.logout)

app.listen(SERVER_PORT, () => console.log('Listening on port', SERVER_PORT));
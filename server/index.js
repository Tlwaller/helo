require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const AuthController = require('./Controllers/AuthController');
const PostController = require('./Controllers/PostController');

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
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);
app.get('/auth/user', AuthController.getUser);
app.post('/auth/logout', AuthController.logout);

//posts
app.post('/api/posts', PostController.createPost);
app.get('/api/posts', PostController.getPosts);
app.get('/api/post/post_id', PostController.getPostsById);
app.get("/api/posts/userposts", getPostsByTitle);

app.listen(SERVER_PORT, () => console.log('Listening on port', SERVER_PORT));
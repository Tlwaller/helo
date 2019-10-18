const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.auth.checkForUsername(username);

        if(foundUser[0]) {
            res.status(403).json("Username taken.");
            
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await db.auth.registerUser(username, hash);
            req.session.user = {
                id: newUser[0].id,
                username: newUser[0].username,
                url: newUser[0].url
            }
            res.status(200).json(req.session.user);
        }
    },

    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.auth.checkForUsername(username);

        if(!foundUser[0]) {
            res.status(403).json("Username/password incorrect.")
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash);

            if(!isAuthenticated) {
                return res.status(403).json('Username/password incorrect.');
            } else {
                req.session.user = {
                    id: foundUser[0].id,
                    username: foundUser[0].username,
                    url: foundUser[0].url
                }
                res.status(200).json(req.session.user);
            }
        }
    },
    
    getUser: (req, res) => {
        console.log(req.session.user);
        if (req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.sendStatus(401);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
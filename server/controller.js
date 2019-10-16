const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.auth.registerUser(username, hash);

        req.session.user = {
            id: newUser[0].id,
            username: newUser[0].username
        }

        res.status(200).json(req.session.user);
    }
}
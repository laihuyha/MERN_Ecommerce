const user = require('../models/user');
exports.signup = (req, res) => {
    console.log('request body', req.body);
    const user = new user(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save user in DB"
            });
        } else {
            res.json({ user });
        }
    });
}
<<<<<<< HEAD
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
=======
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });

        }
        req.profile = user;
        next();
    })
>>>>>>> Ha
}
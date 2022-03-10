const User = require('..//models//user');
const { errorHandler } = require('..//helpers/dbErrorHandler');
exports.signup = (req, res) => {
    console.log('request body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        } else {
            res.json({ user });
        }
    });
}
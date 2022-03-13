const User = require('..//models//user'); //create a new user using user model
const { errorHandler } = require('..//helpers/dbErrorHandler'); //import error handler
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); //for authorization check
exports.signup = (req, res) => {
    // console.log('request body', req.body);
    const user = new User(req.body);
    //Handling error when save user
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

exports.signin = (req, res) => {
    //find the email and password from database
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        //if user is found make sure the email and password match
        //create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        //generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        //return response with user and token to frontend client
        const { _id, name, email, roles } = user;
        return res.json({ token, user: { _id, email, name, roles } });
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success!' });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});
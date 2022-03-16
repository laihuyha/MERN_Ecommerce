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

//This function is used to check if the user is authenticated and authorized to access the route with the specified Account ID
// for exmple: An User can only access his/her own account not other user's account
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.roles === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
}
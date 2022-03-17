const express = require('express'); //importing express
const router = express.Router(); //importing router

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth'); //importing requireSignin
const { userById } = require('../Controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.param('userId', userById);

const express = require('express'); //importing express
const router = express.Router(); //importing router

const { requireSignin } = require('../controllers/auth'); //importing requireSignin
const { userById } = require('../Controllers/user');

router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.param('userId', userById);

module.exports = router;
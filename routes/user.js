<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { signup } = require('../Controllers/user');

// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.post("/signup", signup);
=======
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
>>>>>>> Ha

module.exports = router;
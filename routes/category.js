const express = require('express'); //importing express
const router = express.Router(); //importing router

const { create } = require('../Controllers/category'); //importing auth controller
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth'); //importing requireSignin
const { userById } = require('../Controllers/user');
// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.post(
    "/category/create/:userId",
    requireSignin, 
    isAuth,
    isAdmin, 
    create
 );


//requireSignin example
// router.get('/Hello', requireSignin, (req, res) => {
//     res.send('Hello World! from node router');
// });

router.param('userId', userById);

module.exports = router;
const express = require('express'); //importing express
const router = express.Router(); //importing router

const { signup, signin, signout, requireSignin } = require('../Controllers/user'); //importing signup controller
const { userSignupValidator } = require('../validator'); //importing signup validator

// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//requireSignin example
// router.get('/Hello', requireSignin, (req, res) => {
//     res.send('Hello World! from node router');
// });

module.exports = router;
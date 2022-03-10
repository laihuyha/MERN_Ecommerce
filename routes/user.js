const express = require('express'); //importing express
const router = express.Router(); //importing router

const { signup } = require('../Controllers/user'); //importing signup controller
const { userSignupValidator } = require('../validator'); //importing signup validator

// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.post("/signup", userSignupValidator, signup);

module.exports = router;
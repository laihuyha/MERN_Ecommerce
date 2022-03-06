const express = require('express');
const router = express.Router();

const { signup } = require('../Controllers/user');

// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.post("/signup", signup);

module.exports = router;
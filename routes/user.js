const express = require('express');
const router = express.Router();

const { sayHi } = require('../Controllers/user');

// router.get('/', (req, res) => {
//     res.send('Hello World! from node router')
// });

router.get("/", sayHi);

module.exports = router;
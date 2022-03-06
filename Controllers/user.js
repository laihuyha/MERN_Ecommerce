const res = require("express/lib/response")

exports.sayHi = (req, res) => {
    res.json({ message: "Hello World!" });
};
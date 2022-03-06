const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//importing routes
const userRoutes = require('./routes/user');

//app
const app = express();
//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected')
}).catch(err => {
    console.log(`DB connection error: ${err.message}`)
});


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.user(cookieParser());
//routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express'); //for setting up the express server
const mongoose = require('mongoose'); //for setting up the mongoose database
const morgan = require('morgan'); //for logging the requests
const bodyParser = require('body-parser'); //for parsing the body of the request
const cookieParser = require('cookie-parser'); //for parsing the cookies
const cors = require('cors'); //for allowing cross origin requests from different domains (e.g. frontend and backend)
const expressValidator = require('express-validator'); //for validating the request body
require('dotenv').config(); //for setting up the environment variables

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
// app.use('/api', braintreeRoutes);
// app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
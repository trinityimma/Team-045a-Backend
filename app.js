const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Require all routes
const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware registered
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));


// Global Middleware registered
// Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// ************ REGISTER ROUTES HERE ********** //

app.use('/',indexRouter);

// ************ END ROUTE REGISTRATION ********** //




module.exports = app;
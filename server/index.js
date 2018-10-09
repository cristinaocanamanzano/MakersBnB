var express = require('express')
var bodyParser = require('body-parser')

var usersRouter = require('./users.js')
var listingsRouter = require('./listings.js')
var bookingsRouter = require('./bookings.js')

var app = express();

app.use(bodyParser())
//
// app.use(function(req, res, next) {
//   req.db = db;
//   next()
// })

app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;

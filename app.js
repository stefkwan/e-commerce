const express = require('express');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/user');

const port = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce-' + process.env.NODE_ENV);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: 'Whoa how did you get here?',
  });
});

module.exports = app;

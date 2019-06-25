if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
  require('dotenv').config()
}

console.log("at app.js")

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const routes = require('./routes')

const port = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce-' + process.env.NODE_ENV);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: 'Whoa how did you get here?',
  });
});

module.exports = app;

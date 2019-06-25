let pEnv = process.env.NODE_ENV;
if(pEnv === "test" || 
	pEnv === "testWin" ||
	pEnv === "dev" ||
	pEnv === "devWin"){
  require('dotenv').config()
}

console.log("at app.js")

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const routes = require('./routes')

const port = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce-' + process.env.NODE_ENV);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: 'Whoa how did you get here?',
  });
});

app.listen(port, () => 
	console.log(`Server Starts on ${port}`))

module.exports = app;

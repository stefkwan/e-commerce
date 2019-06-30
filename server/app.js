let pEnv = process.env.NODE_ENV;
if(pEnv === "test" || 
	pEnv === "development"){
  require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const routes = require('./routes')
const port = 3000;

var cors = require('cors')
app.use(cors())

mongoose.connect('mongodb://localhost:27017/ecommerce-' + process.env.NODE_ENV,  
	{useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use(function(err, req, res, next) {
  // console.log(err);
  let status = err.status || 500
  let message = err.message || "error with no error message passed"
  res.status(status).json(message);
});

app.listen(port, () => 
	console.log(`Server Starts on ${port}`))

module.exports = app;

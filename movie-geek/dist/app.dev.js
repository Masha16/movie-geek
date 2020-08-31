"use strict";

require('dotenv').config();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var express = require('express');

var favicon = require('serve-favicon');

var hbs = require('hbs');

var mongoose = require('mongoose');

var logger = require('morgan');

var path = require('path');

mongoose.connect('mongodb://localhost/movie-geek', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (x) {
  console.log("Connected to Mongo! Database name: \"".concat(x.connections[0].name, "\""));
})["catch"](function (err) {
  console.error('Error connecting to mongo', err);
});

var app_name = require('./package.json').name;

var debug = require('debug')("".concat(app_name, ":").concat(path.basename(__filename).split('.')[0]));

var app = express(); // Middleware Setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express["static"](path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); // default value for title local

app.locals.title = 'Express - Generated with IronGenerator';

var index = require('./routes/index');

app.use('/', index);

var auth = require('./routes/auth');

app.use('/', auth);
module.exports = app;
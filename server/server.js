var express = require('express');
var app = express();
var browserify = require ('browserify');
var bodyParser = require('body-parser');
//var angular = require('angular');

console.log("i am alive");

app.use(express.static('client'));

app.listen(3000);

module.exports = app;
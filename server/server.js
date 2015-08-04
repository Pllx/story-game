var express = require('express');
var app = express();
var browserify = require ('browserify');
var bodyParser = require('body-parser');
//var angular = require('angular');

console.log("i am alive");

app.use(express.static('client'));

module.exports = app;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://stustan:stustan@ds063809.mongolab.com:63809/student-auth-app', function(err) {
  if(err){ return err; }
  console.log('connected to DB');
});

var StoryRecordSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: false},
	storySnippet: {type: String, required: true},
	postLocation: String,
	access_token: String
});

var StoryRecord = mongoose.model('StoryRecord', StoryRecordSchema);

app.use(bodyParser.json());

app.get('/storyrecords', function(req,res,next){
    StoryRecord.find({}, function(err,data){
	    if (err){
	     res.send(err);
	    }
	    res.send(data);
  	})
});

app.post('/storyrecords', function(req,res,next){
	console.log("sent post request to /storyrecords");
	console.log(req.body);
	var storyRec = new StoryRecord(req.body);
	storyRec.save();
	res.sendStatus(200);
});


app.listen(3000);

module.exports = app;
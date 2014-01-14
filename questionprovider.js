var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

QuestionProvider = function(host, port) {
  this.db= new Db('examadmindb', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}), {w:1});
  this.db.open(function(){});
};


QuestionProvider.prototype.getQuestionCollection= function(callback) {
  this.db.collection('questions', function(error, appdatas_collection) {
    if( error ) callback(error);
    else callback(null, appdatas_collection);
  });
};


//get all questions
QuestionProvider.prototype.getAllQuestions = function(callback) {
    this.getQuestionCollection(function(error, questions_collection) {
      if( error ) callback(error)
      else {
        questions_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

exports.QuestionProvider = QuestionProvider;
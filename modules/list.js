var mongoDB     = require('mongodb').MongoClient;
var db = require('mongodb').Db

//var connection_string = 'mongodb://0.0.0.0:27017/sampledb';

//var connection_string = 'mongodb+srv://dstlmike1:308boonave@cluster0-esmha.mongodb.net/test';
var connection_string = 'mongodb://0.0.0.0:27017/sampledb';


if(process.env.MONGODB_PASSWORD){
  connection_string = 'mongodb://' + process.env.MONGODB_USER + ":" +
  process.env.MONGODB_PASSWORD + "@" +
  process.env.MONGODB_SERVICE_HOST + ':' +
  process.env.MONGODB_SERVICE_PORT + '/' +
  process.env.MONGODB_DATABASE;
}

function connect(callback){
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    callback(db);
  });
}

var list = function(collection, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    db.collection(collection).find().toArray(function(err, docs) {
      //var allDocs = db.collection(sampledb).find().toArray(function(err, docs) {
 


callback(docs);
      db.close();
    });
  });
}

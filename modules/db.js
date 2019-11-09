var mongoDB     = require('mongodb').MongoClient;
var db = require('mongodb').Db

//var connection_string = 'mongodb://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

//var connection_string = 'mongodb://0.0.0.0:27017/test';
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


//var connection_string = 'mongodb+srv://dstlmike1:308boonave@cluster0-esmha.mongodb.net/test';
//var connection_string = 'mongodb://0.0.0.0:27017/sampledb';
//var connection_string = 'mongodb://' + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT + '/' + process.env.MONGODB_DATABASE;


//if(process.env.MONGODB_PASSWORD){
  //connection_string = 'mongodb://' + process.env.MONGODB_USER + ":" +
  //process.env.MONGODB_PASSWORD + "@" +
  //process.env.MONGODB_SERVICE_HOST + ':' +
  //process.env.MONGODB_SERVICE_PORT + '/' +
  //process.env.MONGODB_DATABASE;
//}

//var connection_string = mongodb+srv://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-esmha.mongodb.net/test?retryWrites=true&w=majority

if(process.env.MONGODB_PASSWORD){
  // //connection_string = 'mongodb://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' + process.env.MONGODB_USER + ":" +
  connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' + process.env.MONGODB_USER + ":" +
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

exports.getAllDocuments = function(collection, docs, callback) {
  connect(function(db){
    //if(err) throw err;
    //var allDocs = db.collection(collection).find().toArray(function(err, docs) {
    var allDocs = db.collection(collection).find().toArray(docs, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}  
    //callback(docs);
      //db.close();
    //});
  //});
//}

exports.findDocs = function(collection, matchHash, callback) {
  connect(function(db){
    var cursor = db.collection(collection).find(matchHash);
    var ret = [];
    cursor.each(function(err, doc){
      if(doc != null)
        ret.push(doc);
      else
        callback(ret);
    });
  });
}

exports.addDoc = function(collection, doc, callback) {
  connect(function(db){
    var ret = db.collection(collection).insert(doc, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.updateOneDoc = function(collection, findJson, updateJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).updateOne(findJson, updateJson, function(err, result) {
      if (callback)
        callback(result);
      db.close();
    })
  });
}

exports.removeOneDoc = function(collection, findJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).deleteOne(findJson, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.countDocs = function (collection, callback) {
  connect(function(db){
    var ret = db.collection(collection).count(function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.randomDoc = function(collection, callback) {
  connect(function(db){
    var coll = db.collection(collection);
    cursor = coll.find({});

    coll.count(function(err, count){
      var random = Math.floor(Math.random() * count);
      cursor.skip(random);
      cursor.limit(1);
      cursor.each(function(err, doc){
        if(doc != null){
          callback(doc);
          return;
        }
      });
    });
  });
}

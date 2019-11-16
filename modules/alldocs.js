var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
//'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //var dbo = db.db("sampledb");
  //var query = { name: "test" };
  var query = {};
  var dbo = db.collection('user_triggers').find(query).toArray(function(err, attachments, result) { 
if (err) throw err;
dbo
    console.log(result);
alert( "Hello");
    db.close();
  });
});


var express = require("express");

var bodyParser = require("body-parser");

var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


var mongoose = require('mongoose');

mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));

db.once('open', function(callback){
    console.log("connection succeeded");
})

  

var app = express();

  


//app.use(bodyParser.json());

//app.use(express.static('public'));
//app.use(bodyParser.urlencoded({

   //extended: true
//}));


app.get('/', function(req, res){
  }


var port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
var ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1"; //server.listen(port, ip); 
app.listen(port, ip, function() {
console.log('Server started at ' + date + ' & listening on port ' + port);

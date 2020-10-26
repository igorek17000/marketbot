var mongoDB     = require('mongodb').MongoClient;
//var mongoose = require('mongodb').MongoClient;


//var db = require('mongodb').Db;
var bot = require('./bot.js');
//var connection_string = 'mongodb://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

//var connection_string = 'mongodb://0.0.0.0:27017/test';
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

//var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017/sampledb';


var express=require("express"); 

var bodyParser=require("body-parser"); 

  

const mongoose = require('mongoose'); 

mongoose.connect(connection_string); 

var db=mongoose.connection; 

db.on('error', console.log.bind(console, "connection error")); 

db.once('open', function(callback){ 

    console.log("connection succeeded"); 
}) 

  

var app=express() 

  

  
app.use(bodyParser.json()); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 

    extended: true
})); 

  

app.post('/sign_up', function(req,res){ 

    var name = req.body.name; 

    var email =req.body.email; 

    var pass = req.body.password; 

    var phone =req.body.phone; 

  

    var data = { 

        "name": name, 

        "email":email, 

        "password":pass, 

        "phone":phone 

    } 

db.collection('details').insertOne(data,function(err, collection){ 

        if (err) throw err; 

        console.log("Record inserted Successfully"); 

              

    }); 

          

    return res.redirect('signup_success.html'); 
}) 

  

  

app.get('/',function(req,res){ 
res.set({ 

    'Access-control-Allow-Origin': '*'

    }); 

return res.redirect('index.html'); 
}).listen(3000) 

  

  

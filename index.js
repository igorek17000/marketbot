#!/bin/env node

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var config = require('./uploads/server/config');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var crypto = require('crypto');
var cors = require('cors');
var mongoose = require('mongoose');
var connectt = mongoose.connection;
var imageRouter = require('./uploads/server/routes/image');
let gfs;



var express = require("express");
var bodyParser = require("body-parser");
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var app = express();
var upp = require('./uploads/server/app.js'); //express();
var uppp = express(); //require('./uploads/routes/image');
var mongoose = require('mongoose');
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var customerSchema = new mongoose.Schema({ name: String, answer: String, joke: String, regex: String, description: String, password: String });
var Customer = mongoose.model('Customer', customerSchema, 'joke_bot');
var dbt = mongoose.connection;

var matchHash;
matchHash = this.res;
var nodemailer = require('nodemailer');
var moment = require('moment-timezone');
moment.tz.setDefault('America/Toronto');
var date = moment().format('LLLL');
var commandListSuccess = require('./commands_success/command-list.js'); //commandListSuccess.buildHTML(cmdArr, config.bot_name);
var ccml = require('./modules/command-list.js');




var path = require('path');
var fs = require('fs');
var http, director, bot, router, server, port, ip, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');


router = new director.http.Router({
/*
  '/'    : {
    get: ping
  },

'/' : {
get: home
},

'/login' : {
get: login
//get: clicks
//console.log(req.body);
},

'/clicks' : {
get: clicks
//post: clicks
},

'/signup_success' : {
post: signup
},


'/amaral' : {
get: amaral
},

'/commandlist' : {
get: bot.commands
},


'/rend' : {
get: rend,
//post: login
},


'/test' : {
get: test
},
*/
  '/init' : {
    get:  bot.init,
    post: bot.init
  },

/*
'/countdown' : {
    get: count
 },
*/
/*
'/commands_success' : {
  get: bot.command_success,
  post: commands_success
},

'/rend_command' : {
  get: rend_command
},
*/
  '/commands' : {
//  get: signup,
//post: signup
   post: bot.commands
},


  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },

});


server = http.createServer(function(req, res) {
  req.chunks = [];
  res.chunks = [];
//  var url = req.url;
 // url.id = url.split("/")[2];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());

  });







if(req.url === '/init' || req.url === '/commands' || req.url === '/bot/:botRoom' || req.url === '/bot/308boonbot') {
//if(req.url === '/bc' || req.url === '/countdown' || req.url === '/login' || req.url === '/details' || req.url === '/detail' || req.url === '/jokes' || req.url === '/amaral' || req.url === '/amaralbot' || req.url === '/images' || req.url === '/images/:id' || req.url === '/me' || req.url === '/upp' || req.url === '/delete/:id' || req.url === '/recent' || req.url === '/multiple' || req.url === '/files' || req.url === '/file/:filename' || req.url === '/image/:filename' || req.url === '/file/del/:id' || req.url === '/uploads/' || req.url === '/upp/' || req.url === '/uploads') {
// var url = req.url;
 //url.id = url.split('/')[2]; 

// app(req, res);

 // } else {
//if(!req.url === '/' || !req.url === '/init' || !req.url === '/commands' || !req.url === '/bot/:botRoom') { // || req.url === '/' || req.url === '/' || req.url === '/' || 
//app(req, res);
//} else {
router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
  res.end(err.message);
    });
}  else {
app(req, res);
}
});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

server.listen(port, ip, function() {
console.log('Server started at ' + date + ' & listening on port ' + port);

});

//--------------

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

//app.set('view engine', 'jade');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
//app.set('view engine', 'html');
app.set('views', 'views'); // '/server/views', /'client/views'); // || 'views', './uploads/server/views'); //require('jade').__express);
//upp.engine('ejs', require('ejs').renderFile);


app.get('/', function(req, res) {
//res.writeHead(200);
res.setHeader('Content-type', 'text/html');
   // var html = "https://ai.marketing/en/campaign/klknl5jjd1";
var html = fs.readFileSync(path.join(__dirname + "/views/ai.html"));
res.send(html);
});


var routes = require('./routes/homemodel');
// connect to mongodb with default port (27017)
//mongoose.connect('mongodb://localhost/imagespath');

app.use(routes);

app.use(upp);

function ping() {
  this.res.writeHead(200);
  this.res.end(); //"I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}


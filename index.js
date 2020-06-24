#!/bin/env node

var nodemailer = require('nodemailer');
var moment = require('moment'); 
var date = moment().utcOffset(-240).format('LLLL');


var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');

//image       = require('./2A34A9R.jpg');

router = new director.http.Router({
  '/'    : {
    get: ping
  },
'/quotes' : {
get: pingit
},

'/test' : {
get: forms,
//post: forms
},

  '/init' : {
    get:  bot.init,
    post: bot.init
  },
  '/commands' : {
    get: bot.commands
    //post: bot.commands
  },
  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },
  
});

server = http.createServer(function (req, res, err) {
  req.chunks = [];
  res.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
     
  });
 


  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);

  });


});


port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

//server.listen(port, ip);

server.listen(port, ip, function() { 
console.log('Server started at ' + date + ' & listening on port ' + port);


//console.log((new Date()) + ' Server is listening on port ' + port);
});

function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\https://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/commands");
}

function pingit() {
  this.res.writeHead(200);
  this.res.end("The sky's the limit.\nFind what you love to do and embrace it.\nEverything else will fall into place.\nAlexBot quotes");
}

function form(req, res) {
this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(today);
}

function forms() {
var req = this.req;
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
 this.res.writeHead(200, {"Content-Type": "text/html"} );
  this.res.end("yes");
}
// -

#!/bin/env node

var nodemailer = require('nodemailer');

var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./modules/command-list.js');
//image       = require('./2A34A9R.jpg');

router = new director.http.Router({
  '/'    : {
    get: ping
  },
'/quotes' : {
get: pingit
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
  //'/image' : {
  //get: image
  //},
});

server = http.createServer(function (req, res) {
  req.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  


  router.dispatch(req, res, err, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });



});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

server.listen(port, ip);

function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\https://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/commands");
}

function pingit() {
  this.res.writeHead(200);
  this.res.end("The sky's the limit.\nFind what you love to do and embrace it.\nEverything else will fall into place.\nAlexBot quotes");
}

#!/bin/env node

var nodemailer = require('nodemailer');
var moment = require('moment'); 
var date = moment().utcOffset(-240).format('LLLL');
var app = require('express');
var path = require('path');
//var demo = require('./commands/countdown.html');
var fs = require('fs');
var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');
//var down = require('./modules/countdown-list.js');

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

'/countdown' : { 
    get: count
 },

  '/commands' : {
    get: bot.commands
   
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
router.post('Server');

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

function count() {
  this.res.writeHead(200);
  this.res.render('countdown');
  this.res.send(html);
}


/*
function form(req, res, data) {
res.sendFile('./commands/index.html', { root: __dirname }) 
var firstname = this.req.query.firstname; 
if (firstname != "") { 
this.res.send("Your email address is " + firstname + "@gullele.com"); 
} else { 
this.res.send("Please provide us first name"); 
} 
}

*/


/*
response.sendFile(__dirname + "/commands/index.html"); 
});

function forms() {
//http.createServer(function(req, res){ 
if (req.url === '/form') { 
res.writeHead(200, {'Content-Type': 'text/html'}); 
fs.createReadStream('./commands/index.html').pipe(res); 
} else if (ext.test(req.url)) { 
fs.exists(path.join(__dirname, req.url), function (exists) { 
if (exists) { 
res.writeHead(200, {'Content-Type': 'text/html'}); 
fs.createReadStream('./commands/index.html').pipe(res); 

} else { 
res.writeHead(404, {'Content-Type': 'text/html'}); 
fs.createReadStream('404.html').pipe(res); 
});
//} else { 
// add a RESTful service 
} 
})//.listen(port, ip);

}

function forms(req, res, function(data)) {
//var req = this.req;
 //this.res.sendFile(__dirname+"/views/index.html");
 this.res.writeHead(200, {"Content-Type": "text/html"});
this.res.sendFile(__dirname + "/commands/" + "index.html");

  //this.res.end("yes");
}
*/
// -

#!/bin/env node


//var req = this.req;
//var res = this.res;
var matchHash;
matchHash = this.res;
var nodemailer = require('nodemailer');
var moment = require('moment-timezone'); 
moment.tz.setDefault('America/Toronto'); 
//var date = moment().utcOffset(-300).format('LLLL');
var date = moment().format('LLLL');
var commandListSuccess = require('./commands_success/command-list.js'); //commandListSuccess.buildHTML(cmdArr, config.bot_name);
var ccml = require('./modules/command-list.js');



/*
var moment = require('moment-timezone');

//moment.tz.setDefault('America/Toronto');

//var moment = require('moment');
var date = moment.tz.setDefault('America/Toronto');
*/
//var app = require('express');
var path = require('path');
//var demo = require('./commands/countdown.html');
var fs = require('fs');
var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');
//var countdown;

//image       = require('./2A34A9R.jpg');

router = new director.http.Router({
  '/'    : {
    get: ping
  },

'/home' : {
get: home
},

'/rend' : {
get: rend
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


'/login' : {
get: login,
//post: login
},


'/test' : {
get: test
},

  '/init' : {
    get:  bot.init,
    post: bot.init
  },

'/countdown' : {
    get: count
 },

'/commands_success' : {
  get: bot.command_success,
  post: commands_success
},

'/rend_command' : {
  get: rend_command
},

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

//--------------


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


/*
app.post('/signup_success', function(req,res){
*/
/*
    var name = doc.name; // this.req.name; //body.name;

    var email = doc.email; //this.req.email; //body.email;

    var pass = doc.password; // this.req.password; //body.password;

    var phone = doc.phone; // this.req.phone; //body.phone;

  

    var data = {

        "name": name,
         unique: true,

        "email":email,

        "password":pass,

        "phone":phone,
        {"name": 1}, {unique: true}

    }
*/
/*
db.collection('details').insertOne(data,function(err, collection){
//if (result["name"] != data.name) {

        if (err) throw err;

        console.log("Record inserted Successfully");

           //   }

    });

          

    return res.redirect('signup_success.html');
})

  

  

app.get('/rend',function(req,res){
res.set({

    'Access-control-Allow-Origin': '*'

    });

return res.redirect('index.html');
});

  

  

console.log("server listening at port 8080");

*/



function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}

function count() {
  this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/countdown.html"));
this.res.write(html);
this.res.end();
}

function test() {
  this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/test.html"));
this.res.write(html);
this.res.end();
}

function home() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/home.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html")));
  this.res.end();
}


function rend() {
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var html = fs.readFileSync(path.join(__dirname + "/index.html"));
this.res.write(html);
this.res.end();
}

function rend_command() {
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var html = fs.readFileSync(path.join(__dirname + "/commands_success/index.html"));
this.res.write(html);
this.res.end();
}


function commands_success() {
/*
var mainHTML, allHTML, modHTML, ownerHTML;
var fs = require('fs');
//var config = require('../config/config');


//init();

function init() {
  getFileAll('commands_success/command_success.html', function(data) {
    mainHTML = data;
  });
  getFileAll('commands_success/partials/_all.html', function(data) {
    allHTML = data;
  });
  getFileAll('commands_success/partials/_mod.html', function(data) {
    modHTML = data;
  });
  getFileAll('commands_success/partials/_owner.html', function(data) {
    ownerHTML = data;
  });
}

//feels pointless, come up with a better way to do this
function getFileAll(path, callback) {
//fs.readFileSync(path.join, 'utf8', function(err, data){ //(__dirname + "/views/amaral.html"));

  fs.readFile(path, 'utf8', function(err, data){
    callback(data);
  });
}

var buildHTML = function (cmdArray, bot_name) {
  var modArr   = [];
  var ownerArr = [];
  var allArr   = [];
  //bot_name     = config.bot_name;

  cmdArray.sort(function(a, b) {
    if (a.cmd < b.cmd)
      return - 1;
    else if (a.cmd > b.cmd)
      return 1;
    else
      return 0;
  });

  for (cmd in cmdArray) {
    if (!cmdArray[cmd].desc)
      cmdArray[cmd].desc = "No description provided ... thanks lazy mods";

    if (cmdArray[cmd].owner)
      ownerArr.push(cmdArray[cmd]);
    else if (cmdArray[cmd].mod)
      modArr.push(cmdArray[cmd]);
    else
      allArr.push(cmdArray[cmd]);
  }

  //put this repetitive code in a function ... you're better than this
  var allBuiltHTML   = '';
  var modBuiltHTML   = '';
  var ownerBuiltHTML = '';

  for (cmd in allArr) {
    var addHTML = allHTML.replace('$$command_name', allArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', allArr[cmd].desc);
    allBuiltHTML += addHTML;
  }

  for (cmd in modArr) {
    var addHTML = modHTML.replace('$$command_name', modArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', modArr[cmd].desc);
    modBuiltHTML += addHTML;
  }

  for (cmd in ownerArr) {
    var addHTML = ownerHTML.replace('$$command_name', ownerArr[cmd].cmd);
    addHTML = addHTML.replace('$$command_desc', ownerArr[cmd].desc);
    ownerBuiltHTML += addHTML;
  }

  var mainBuiltHTML = mainHTML;
  mainBuiltHTML = mainBuiltHTML.replace('$$bot_name', 'Alex Bot');
  mainBuiltHTML = mainBuiltHTML.replace('$$all', allBuiltHTML);
  mainBuiltHTML = mainBuiltHTML.replace('$$mod', modBuiltHTML);
  mainBuiltHTML = mainBuiltHTML.replace('$$owner', ownerBuiltHTML);

  return mainBuiltHTML;
}
*/


//_______€€€_______


  var bot_name = "AlexBot";
  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');

  /*
 for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
*/
//}

 var output = commandListSuccess.buildHTML(cmdArr, bot_name); //; //ccml.buildHTML(cmdArr, bot_name); //buildHTML(cmdArr, bot_name);


var name = this.req.body.name;
    var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;

  

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }

   var cursor = db.collection('details').find({name});
var ret = [];
var results = cursor; //.each();

function getAllDocs() {
//init();
db.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;

if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
additFunc();
}

if (docs) {
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
  console.log('displaying commands at /commands_success');
console.log(docs); //db.close();
}
});
//bot.command_success();
}


function additFunc() {
//results.forEach(iterateFunc, errorFunc);

db.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log("User " + data.name + " added");
});
}

function iterateFunc(doc, callback) {
console.log(JSON.stringify(doc, null, 4));
}
function errorFunc(error) {
console.log(error);
}

getAllDocs();
//bot.commands();
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
var bot_name = "AlexBot";
  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');
/*
   for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
*/
var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html"));
//var outputSuccess = buildHTML(cmdArr, bot_name);
this.res.write(output);
//this.res.write(html);
//this.res.redirect('signup_success.html');
this.res.end();
//this.res.writeHead(200, {"Content-Type": "text/html"}); 
//this.res.end();
}





function signup() {
var output;



var name = this.req.body.name;

    var email = this.req.body.email;

    var pass = this.req.body.password;

    var phone = this.req.body.phone;

  

    var data = {

        "name": name,

        "email": email,

        "password": pass,

        "phone": phone

    }


 /*
  var collection = {
  "name": name,
  "email": email,
  "password": pass,
  "phone": phone
  }
*/


   var cursor = db.collection('details').find({name});
var ret = [];
var results = cursor; //.each();

//var done = "this.res.statusCode = 200; this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); var html = fs.readFileSync(path.join(__dirname + "/index.html")); this.res.write(html); this.res.end();";

function getAllDocs() {


db.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;

if (docs < 1) {
additFunc();
//var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

}
if (docs) {

//var html = fs.readFileSync(path.join(__dirname + "/index.html"));

console.log(docs); //db.close();
}
});
}

//var res = null;
/*
var res = {
"name": name
}
*/
function additFunc() {
//results.forEach(iterateFunc, errorFunc);

//var one = {{"name": 1}, {unique: true}};
//if (!collection.name) {
db.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log(data.name + "\n User added");
//console.log(result + "\n added");
});

}

function iterateFunc(doc, callback) {

console.log(JSON.stringify(doc, null, 4));


}
function errorFunc(error) {
console.log(error);
}

getAllDocs();
var cmdArr = [];
var cmdarray = [];

  console.log('displaying commands at /commands');

  for(var lib in bot.checkCommandsHSH){
    var newCmds = bot.checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
 }

//var output = bot.commandList.buildHTML(cmdArr, bot.config.bot_name);


  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
//var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html")); //"/signup_success.html"));
var html = bot.commands(output); //bot.commands();
this.res.write(html);
//this.res.redirect('signup_success.html');
this.res.end();
}



function amaral() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/amaral.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html")));
  this.res.end();
}

function login() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var html = fs.readFileSync(path.join(__dirname + "/views/login.html"));
this.res.write(html);


 // this.res.write(fs.readFile(path.join(__dirname + "./views/login.html")));
  this.res.end();
}

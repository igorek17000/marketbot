/*global init*/
//

var express = require("express");
//
var bodyParser = require("body-parser");

var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


var mongoose = require('mongoose');

//mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

var dbs = mongoose.connection;


dbs.on('error', console.log.bind(console, "connection error"));

dbs.once('open', async function(callback){
global.customerSchema = new mongoose.Schema({ name: String, email: String, pass: String, phone: String, output: String }); 
global.Customer = mongoose.model('Customer', customerSchema, 'details'); 
//global.docs = Customer.find({name}, function(err, doc)); 
//var doc = docs.;
//global.docs = docs;

 /*
if (callback)
callback(docs);
*/
    console.log("connection succeeded");
})
/*
var Schema = mongoose.Schema; 
var SomeModelSchema = new Schema({ 
name: String,   
email: String,
pass: String,
phone: String
 }); 
// Compile model from schema 
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
*/
//var app = express();


//
//load modules
var db_table = 'details';
var sysCommands  = require('./modules/sys-commands');
var db           = require('./modules/db.js');
var mods         = require('./modules/mods');


//var countdowner  = require('./modules/countdown-list');
//var chunks = [];
var commandList  = require('./modules/command-list');
var commandListSuccess  = require('./commands_success/command-list');
var rooms        = require('./modules/rooms');

//commands with custom actions
var alexBot      = require('./custom_commands/alex-bot');
var flynnBot     = require('./custom_commands/flynn-bot-timesheet');
var emailBot     = require('./custom_commands/email');
var birthdayBot  = require('./custom_commands/birthdays');
var api = require('./custom_commands/api');
//var testit = require('./commands/index.html');

//var postbot      = require('./custom_commands/postbot');
var userCmds     = require('./custom_commands/user-commands');
var userMentions = require('./custom_commands/user-mentions');
var sysTriggers  = require('./custom_commands/system-triggers');
var quotes       = require('./custom_commands/quotes');
var atEveryone   = require('./custom_commands/at-everyone');
var funCommands  = require('./custom_commands/fun-commands');
var gif          = require('./custom_commands/giphy-api');
var catFact      = require('./custom_commands/cat-fact');
var urbanDict    = require('./custom_commands/urban-dictionary');


var moment = require('moment-timezone');

moment.tz.setDefault('America/Toronto');

//var date = moment().utcOffset(-300).format('LLLL');
var date = moment().format('LLLL');
//var go         = require('./modules/server.js');
var fs           = require('fs');
var concat       = require('concat');
var cron = require('node-cron');
var express = require('express');
var nodemailer = require('nodemailer');
app = express();
var weather = require('weather-js');
var colors = require('colors');
var chalk = require('chalk');
//chalk.enabled = true;
//import { Octokit } from "@octokit/core";


//load config
var config       = require('./config/config');
var HTTPS        = require('https');

//Temporarily just an array of the commands functions. Make an object with configuration values.
var checkCommandsHSH = [alexBot, flynnBot, emailBot, birthdayBot, api, mods, sysTriggers, userCmds, userMentions, sysCommands, atEveryone, funCommands, quotes, rooms, gif, catFact, urbanDict];

exports.init = function() {
  var req = this.req;
  init.initPage(req, function(body){
    this.res.writeHead(200, {"Content-Type": "text/html"});
    this.res.end(body);
  });
}

exports.respond = function(botRoom) { //botRoom, chunks, chunk) {
//var req = this.req;
//var IncomingMessage = IncomingMessage;
//app.use('/bot/:botRoom', function(req, res) {
//var chunks = [];
//var chunk = '';
//var resi = chunks += chunk;
//var req = this.req; //[]; //req.chunks; //[]; // IncomingMessage;
//req = []; //this.req.chunks = []; // []; //chunks = chunks += chunk;
//req.chunks = []; 
//req.get('data', function(chunk) {
//req.chunks = [];
//req.chunks.push(chunk.toString());
//});

var request = this;
//var request = JSON.parse(this.req.chunks[0]); //this.req[this]; //this.req[chunkit]; //req[chunks.chunks]; //.chunks; //req.param); 
//app.post('/bot/:botRoom', function(req, res) {
//req.on('data', function(chunk) {
//chunks = chunks += chunk;
//res.send(chunk.toString());
//});
//});
//*/

//var request = JSON.stringify(req.chunks[0]); 

//var request = bodyParser.json(req); //chunk
/*
var http = require('http'); 
http.post({ 
options = {
    hostname: 'api.groupme.com',
    path: '/v3/bot/:botRoom',
    method: 'POST'
  };

hostname: 'localhost', 
port: 11000, 
path: '/', 
agent: false 
}).on('response', (response) => { 
response.on('data', (chunk) => { 
// Do your processing on the chunk here 
console.log(chunk.toString()); 
}); 
});
*/


  var dataHash = {

    request:      request,
    currentBot:   rooms.getRoom(botRoom),
    isMod:        mods.isMod(request.user_id),
   // user_id:      mods.isMod(request.id),
    bots:         rooms.getRooms(),
    botARoom:     rooms.getUserPath(botRoom),
    funMode:      sysCommands.fun_mode(),
    owner:        config.env().owner
  };
console.log('-------------------------');
this.res.writeHead(200);
//this.res.write(request);
  //this.res.write(request);
 // res.send(request);
//this.res.send.status(200);
this.res.end();
//});

/*

exports.respond = function(req, res, botRoom) {
//var botRoom = rooms.getUserPath(botRoom);
var req = this.req;
var res = this.res;
var chunks = [];
//var chunk = '';
//chunks = chunks += chunk;
var chunks = [];
//req.chunks = [];
//res.chunks = [];
var chunk = '';
//var res = chunks += chunk;
req.on('data', function(chunk) {
chunks = chunks += chunk;
req.chunks.push(chunk.toString());
});


  var request = this.req.chunks;

  var dataHash = {

    request:      request,
    currentBot:   rooms.getRoom(botRoom),
    isMod:        mods.isMod(request.user_id),
    bots:         rooms.getRooms(),
    botARoom:     rooms.getUserPath(botRoom),
    funMode:      sysCommands.fun_mode(),
    owner:        config.env().owner
  };
console.log(request);
  res.writeHead(200);
  //this.res.write(request);
  res.end();
*/
 // if (dataHash.request.sender_type == 'bot') return;
  dataHash.request.text = dataHash.request.text.trim();

  if (!rooms.getRoom(botRoom).id && botRoom != 'config')
    return;

//if (rooms.getRoom(botRoom) == '282865de8ce30137567238148f')
    //logName = botRoom.name;



  for(var lib in checkCommandsHSH) {
    checkCommandsHSH[lib].checkCommands(dataHash, function(check, result, attachments){
      if (check) sendDelayedMessage(result, attachments, rooms.getRoom(botRoom).id);
    });
}
  }

/*
exports.countdown = function() {
  //var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = countdowner;
  //var output = cmdArr;
//var output = checkCommandsHSH[].getCmdListDescription();

//return cmdArr;
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);
//this.res.end(cmdArr);
}
*/

exports.command = function() {
var docs = docs[0] ; //, out;
//var output = {}; //= commandList.buildHTML(cmdArr, config.bot_name);
//output.good = commandList.buildHTML(cmdArr, config.bot_name);
//output.bad = 'The End!';
//var out = docs; // function(data) {
//var docs = data; // docs;
//return docs;
//}
/*
if(docs) {
output = commandList.buildHTML(cmdArr, config.bot_name)

} else {
//if (docs < 1) {
output = 'The End';
}
*/
var name = this.req.body.name;
    var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;
    var out = "commandList.buildHTML(cmdArr, config.bot_name)";
  

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone,
        "output": out
    }

  // var cursor = dbs.collection('details').find({name});
//var ret = [];
//var results = cursor.toArray(function(err, docs) { //; //.each();

function getAllDocs() {
//var output;
//var output = "";
//init();
dbs.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;
//var output = docs;

if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
additFunc();
//this.res.writeHead(200, {"Content-Type": "text/html"});
  //this.res.end('The End');
var output = 'The End!';
//this.res.send(output);
//var output = "";
//return output; //"Invalid login name and password"; //additFunc();
}

if (docs) {

//output = 'commandList.buildHTML(cmdArr, config.bot_name)';
//this.res.send(output);
var output = commandList.buildHTML(cmdArr, config.bot_name);
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
 // console.log('displaying commands at /commands_success');
console.log(docs); //db.close();
//console.log(doc.output);
//console.log(req, res);
//console.log(output); //
//page();
//var output = "commandList.buildHTML(cmdArr, config.bot_name);";

//dbs.close();
//output = data.output;
//this.res.json(JSON.stringify(docs[{name}]));


}
/*
var cmdArr = []; 
console.log('displaying commands at /commands'); 
for(var lib in checkCommandsHSH){ 
var newCmds = checkCommandsHSH[lib].getCmdListDescription(); 
if (newCmds) 
cmdArr = cmdArr.concat(newCmds); 
} 
var output = commandList.buildHTML(cmdArr, config.bot_name);
return output;
*/
//this.res.write(output);
//this.res.end();
});
//output;
//this.res.writeHead(200, {"Content-Type": "text/html"}); 
//this.res.end(output);
}


function additFunc() {
//results.forEach(iterateFunc, errorFunc);

dbs.collection('details').insertOne(data, function(err, collection){
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

  var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
/*
//var output = commandListSuccess.buildHTML(cmdArr, config.bot_name);
this.res.on('end', function(res) {
var output = commandList.buildHTML(cmdArr, config.bot_name);

callback(output);
});
}
*/
//if (callback)
// callback(output);
// var output = commandListSuccess.buildHTML(cmdArr, config.bot_name);
//this.res.statusCode = 200;
//this.res.contentType = "text/html";
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);
//}
}







//-----------------
/*
function resolveAfter2Seconds() {
  return new Promise(resolve, reject => {
    setTimeout(() => {
var output = 'commandList.buildHTML(cmdArr, config.bot_name)';

      resolve(output);
    }, 2000);
  });
}
*/
//-----------------


exports.commands = async function() {


var mainHTML, allHTML, modHTML, ownerHTML;
var fs = require('fs');
//var config = require('../config/config');


init();

function init() {
  getFileAll('commands/command.html', function(data) {
    mainHTML = data;
  });
  getFileAll('commands/partials/_all.html', function(data) {
    allHTML = data;
  });
  getFileAll('commands/partials/_mod.html', function(data) {
    modHTML = data;
  });
  getFileAll('commands/partials/_owner.html', function(data) {
    ownerHTML = data;
  });
}

//feels pointless, come up with a better way to do this
function getFileAll(path, callback) {
  fs.readFile(path, 'utf8', function(err, data){
    callback(data);
  });
}

function buildHTML(cmdArray, bot_name) {
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











var ret = dbs.collection('details').find({name});



function retrieveUser(name, callback) { 

dbs.collection('details').find({name}, function(err, users) { 
if (err) { 
callback(err, null); 
} else { 
callback(null, users[0]); 
console.log(users[0]);
} 
}); 
};





//hard coded temporarily ... maybe permanently ... losing motivation to work on this //if(alexb.name == 'cc' && dataHash.currentBot.type == 'hp') //continue; var alexbReg = new RegExp(alexb.regex, "i"); if (dataHash.request.text && alexbReg.test(dataHash.request.text)){ var val = alexbReg.exec(dataHash.request.text); // if (dataHash.currentBot("282865de8ce30137567238148f")) { //var msg = "308BoonBot\n" + alexb.message; callback(true, alexb.message, alexb.attachments, []); break;
var name = this.req.body.name;
    var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;
    //var out = output; //commandList.buildHTML(cmdArr, config.bot_name);
  
    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone,
        "output": output
    }

/*
function additFunc() {
//results.forEach(iterateFunc, errorFunc);

dbs.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;

console.log("User " + data.name + " added");
});
}
//mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
dbs.collection('details').find({name}).toArray(function(err, docs) {
if(err) throw err;


if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
additFunc()
}
if(docs) {
console.log(docs);
//ret.push(docs);



} 
});
*/

var mongoose = require('mongoose'); 
//var runtest = await run(docs).catch(error => console.log(error.stack)); 
var docs = Customer.find({name}).exec(); 
//var users = Customer.find({name}, function(err, docs) { //); 


async function run() { 
Customer.find({}, function(err, docs) {
if (err) throw err;
else res.render('index.html', {Customers: docs});
});
var docs = await Customer.find({name}); 
//if (docs < 1) {
//await Customer.create({ name: name, email: email, pass: pass, phone: phone, output: output }); 
//}
console.log(docs); 
console.log("tag");
}

var cmdArr = [];
var cmdarray = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
 }

var output = buildHTML(cmdArr, config.bot_name);
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);


}





//-----------

exports.commands2 = function() {
/*
var cmdArr = [];
var cmdArray = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
*/
//var 
var output = commandList.buildHTML(cmdArr, config.bot_name);


/*
//var output = '';
//var output = commandList.buildHTML(cmdArr, config.bot_name);
var docs, data;
*/
var name = this.req.body.name;
    var email = this.req.body.email;
    var pass = this.req.body.password;
    var phone = this.req.body.phone;
    var out = commandList.buildHTML(cmdArr, config.bot_name);
  

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone,
        "output": out
    }


function getAllDocs() {

/*
var findit = dbs.collection('details').find({name});
var dta = findit.toArray(function(err, data) {
//docs = data;
*/
dbs.collection('details').find({name}, function(err, docs) { //{name}).toArray(function(err, docs) {
if(err) throw err;


if (docs < 1) { //docs[name] != null || docs[name] != data.name) { //< 1) {
additFunc()
}
if(docs.name) {
console.log(docs);
} 
});

}
/*
dta;
if (data < 1) { //!callback[{name}]) { //&& !callback[0].name) {
console.log('Not Found'); //db.close();
dbs.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log("User " + data.name + " added");
});
//return docs;
}
if (data) { 
//push.callback();//&& callback[{name}] == name) {
console.log(data);
}
});
//console.log(docs);
//if (docs[0]) {
output = data; // data.output; //'Hi';
//return output;

*/

function additFunc() {
//results.forEach(iterateFunc, errorFunc);

dbs.collection('details').insertOne(data, function(err, collection){
        if (err)
throw err;
console.log("User " + data.name + " added");
});
}
/*
function iterateFunc(doc, callback) {
console.log(JSON.stringify(doc, null, 4));
}
function errorFunc(error) {
console.log(error);
}

getAllDocs();

*/
  var cmdArr = [];
var cmdArray = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
 }
console.log(this.res);
var output = commandList.buildHTML(cmdArr, config.bot_name);

console.log(output);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);
//}
}







//---;---
exports.command_success = function() {

  var cmdArr = [];

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  commandListSuccess.buildHTML(cmdArr, config.bot_name);
//outputSuccess;
/*
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


function getIt(matchHash, data, callback) {
db.getSuccessDocument();

var matchHash = { 
name: data.name 
}


var data = {        
"name": name,        
"email": email,        
"password": pass,        
"phone": phone 
}


}
//getIt();
*/
/*

this.res.statusCode = 200;
this.res.setHeader('Content-type', 'text/html');
var outputSuccess = commandListSuccess.buildHTML(cmdArr, config.bot_name);
//var html = fs.readFileSync(path.join(__dirname + "/views/countdown.html"));
this.res.write(outputSuccess);
//this.res.write(html);
this.res.end();
*/
/*
this.res.write(); //200, {"Content-Type": "text/html"}); 
this.res.end(outputSuccess);
*/
}




//*****
exports.commands_success = function() {

//var db = require('./index.js');

  var cmdArr = [];
  //function cmdit() {
//console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }
//}
  var outputSuccess = commandListSuccess.buildHTML(cmdArr, config.bot_name);


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

//var cursor = db.getAllDocuments();

  // var cursor = db.collection('details').find({name});
//var ret = [];
//var results = cursor; //.each();

//var done = "this.res.statusCode = 200; this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); var html = fs.readFileSync(path.join(__dirname + "/index.html")); this.res.write(html); this.res.end();";
function trw() {
  var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

  this.res.write(html);
}
function getIt() {
db.getSuccessDocuments();
var matchHash = {
"name": data.name

}
//console.log(docs);

//console.log(db_dable);

//db.collection('details').find({name}).toArray(function(err, docs) {
//if(err) throw err;
/*
if (docs < 1) {
//additFunc();
console.log("error");
throw err;
//var html = fs.readFileSync(path.join(__dirname + "/signup_success.html"));

}
if (docs) {
//cmdit();
//var html = fs.readFileSync(path.join(__dirname + "/index.html"));
  console.log('displaying commands at /commands_success');
//console.log(docs); //db.close();
}
//});
*/
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

getIt();



/*
  this.res.statusCode = 200;
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*');
//var html = fs.readFileSync(path.join(__dirname + "/commands_success/command_success.html"));
//trw();
this.res.write();
//this.res.redirect('signup_success.html');
this.res.end(outputSuccess);
*/
this.res.writeHead(200, {"Content-Type": "text/html"}); 
this.res.end(outputSuccess);

}




//------------------

exports.commandlist = function() {
  var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = commandList.buildHTML(cmdArr, config.bot_name);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);

}


exports.teston = function() {


  //console.log('displaying commands at /commands');
  var req = this.req
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);


 // var output = testit(user_name);

  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end();
}


/*router.get('/',(req, res) => {
  res.sendfile("index.html");
});
*/

function sendDelayedMessage(msg, attachments, botID, logID, nickName) {
  setTimeout(function() {
    postMessage(msg, attachments, botID, logID, nickName);
   // logMessage(msg, attachments, logID, logName);

  }, config.delay_time);
}

function postMessage(botResponse, attachments, botID, logID, nickName) {
  var options, body, botReq, logReq, botID, logID, nickName;
botID = botID;
logID = "b6c42cc2a1bee3c38f07723d78";
var chalk = require('chalk');
//chalk.enabled = true;
var nN = chalk.red;

var date = moment.tz('America/Toronto').format('LLLL');

//var nn = moment.tz().format('LLLL');
var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }

    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


/*    var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }


*/
    body = {

    "attachments" : attachments,
    "bot_id"      : botID,
    "text"        : botResponse
  };



/* body1 = {

    "attachments" : attachments,
    "bot_id"      : logID,
    "text"        : botResponse
  };
*/

     var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }



  //console.log('sending response to ' + nickName + '\n' + botResponse);



botReq = HTTPS.request(options, function(res) {
//console.log('\x1b[31m%s\x1b[0m', 'Hi' + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode + '\n' + botResponse)
var chalk = require('chalk');





console.log('\n' + nickName);
console.log(date);
//console.log(nn);



      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));

//-------




    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


/*    var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }


*/
    body = {

    "attachments" : attachments,
    "bot_id"      : logID,
    "text"        : nickName + "\n" + botResponse
  };



/* body1 = {

    "attachments" : attachments,
    "bot_id"      : logID,
    "text"        : nickName + "\n" + botResponse
  };
*/


    var logName ='';
      if (logID == 'b6c42cc2a1bee3c38f07723d78') {
           logName = 'Config';
           } else if (logID == '282865de8ce30137567238148f') {
           logName = "308BoonBot";
           } else if (logID == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (logID == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = logID;
           }

 // console.log('sending response to ' + logName + '\n' + botResponse);



logReq = HTTPS.request(options, function(res) {
console.log(logName + ' Status: ' + res.statusMessage + ' Status code: ' + res.statusCode + '\n' + botResponse)


      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });





  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  logReq.end(JSON.stringify(body));



}


/*
function logMessage(logResponse, attachments, request, botID, bot_id, logName, botRoom, callback) {
  var options, body, logReq, logName, bot_id, logID, botRoom;
var botName;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


for (room in rooom) {
room = rooom[room];

//var logName = '';
      if (request.currentBot == '308boonbot') { // == 'b6c42cc2a1bee3c38f07723d78') {
           logName = "BoonBot";
       /*     } else if (id == '282865de8ce30137567238148f') {
           logName = '308BoonBot';
           } else if (id == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (id == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = bot_id;

}

  body = {

    "attachments" : attachments,
    "bot_id"      : "b6c42cc2a1bee3c38f07723d78",
   // "text"        : logName
    "text"        : logName + logResponse
    //"name"        : logName
  };





logReq = HTTPS.request(options, function(res) {
console.log('Status: ' + res.statusMessage + ', Status code: ' + res.statusCode)
      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });


  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
    //logReq.end(JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });

logReq.on('end', function() {
this.res.writeHead(200); //, {"Content-Type": "application/json"});
this.res.end();
});

 // logReq(logName));



  logReq.end(JSON.stringify(body));
}


}

*/
